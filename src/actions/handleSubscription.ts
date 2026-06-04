'use server';

import db from '@/db';
import { SubscriptionsTable } from '@/db/schema/subscription.schema';
import { UserTable } from '@/db/schema/users.schema';
import { env } from '@/lib/env/client';
import { stripe } from '@/lib/stripe';
import { PrevFormStateProps } from '@/lib/types';
import { SubscriptionFormSchema } from '@/lib/validations';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

export const handleSubscription = async (
  prevState: PrevFormStateProps,
  formData: FormData,
): Promise<PrevFormStateProps> => {
  let sessionUrl;
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    const user = await db.query.UserTable.findFirst({
      where: eq(UserTable.clerkUserId, userId),
      columns: {
        id: true,
      },
    });

    if (!user?.id) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    const rawData = Object.fromEntries(formData.entries());

    const result = SubscriptionFormSchema.safeParse(rawData);

    // const existingSubscription = await db.query.SubscriptionsTable.findFirst({
    //   where: eq(SubscriptionsTable.userId, user.id),
    // });

    // if (existingSubscription) {
    //   return {
    //     success: false,
    //     message: 'You already have a subscription',
    //   };
    // }

    if (!result.success) {
      return {
        success: false,
        message: result.error.issues[0].message,
      };
    }

    const { _id, name, stripePriceId } = result.data;

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',

      metadata: {
        userId: user.id,
        sanityMembershipPlanId: _id,
        planName: name,
      },

      line_items: [
        {
          price: stripePriceId,
          quantity: 1,
        },
      ],

      success_url: `${env.NEXT_PUBLIC_URL}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.NEXT_PUBLIC_URL}/`,
    });

    if (!session.url) {
      return {
        success: false,
        message: 'Failed to create checkout session',
      };
    }

    sessionUrl = session.url;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Something went wrong!',
    };
  }
  redirect(sessionUrl);
};
