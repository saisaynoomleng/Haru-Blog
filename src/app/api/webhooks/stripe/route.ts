import db from '@/db';
import { SubscriptionsTable } from '@/db/schema/subscription.schema';
import { env } from '@/lib/env/server';
import { stripe } from '@/lib/stripe';
import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  let event: Stripe.Event;

  try {
    const signature = (await headers()).get('stripe-signature');
    const body = await req.text();

    if (!signature) {
      return NextResponse.json(
        { message: 'Invalid Signature' },
        { status: 400 },
      );
    }

    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: `Webhook Error: ${error}`,
      },
      { status: 400 },
    );
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;

        const userId = session.metadata?.userId;
        const planId = session.metadata?.planId;
        const planName = session.metadata?.planName;

        if (!userId || !planId) break;

        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string,
        );

        await db.insert(SubscriptionsTable).values({
          userId,
          sanityMembershipPlanId: planId,
          stripeCustomerId: subscription.customer as string,
          stripeSubscriptionId: subscription.id,

          planNameSnapshot: planName ?? '',
          monthlyPriceSnapshotInCents:
            subscription.items.data[0].price.unit_amount ?? 0,

          billingIntervalSnapshot:
            subscription.items.data[0].price.recurring?.interval ?? 'month',
          status: subscription.status || 'active',

          currentPeriodStart: new Date(
            subscription.items.data[0].current_period_start * 1000,
          ),
          currentPeriodEnd: new Date(
            subscription.items.data[0].current_period_end * 1000,
          ),
        });

        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;

        await db
          .update(SubscriptionsTable)
          .set({
            status: subscription.status,
            currentPeriodStart: new Date(
              subscription.items.data[0].current_period_start * 1000,
            ),
            currentPeriodEnd: new Date(
              subscription.items.data[0].current_period_end * 1000,
            ),
          })
          .where(eq(SubscriptionsTable.stripeSubscriptionId, subscription.id));

        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;

        await db
          .update(SubscriptionsTable)
          .set({
            status: 'canceled',
          })
          .where(eq(SubscriptionsTable.stripeSubscriptionId, subscription.id));

        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: 'Webhook handler failed',
      },
      { status: 500 },
    );
  }
}
