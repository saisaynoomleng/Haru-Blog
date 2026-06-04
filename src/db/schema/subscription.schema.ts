import * as t from 'drizzle-orm/pg-core';
import { UserTable } from './users.schema';
import { SubscriptionStatus, timestamp } from './schema-helper';
import { relations, sql } from 'drizzle-orm';

export const SubscriptionsTable = t.pgTable(
  'subscriptions',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    userId: t
      .uuid('user_id')
      .references(() => UserTable.id, {
        onDelete: 'restrict',
      })
      .notNull(),
    sanityMembershipPlanId: t.varchar('sanity_membership_plan_id').notNull(),
    stripeSubscriptionId: t.varchar('stripe_subscription_id').unique(),
    stripeCustomerId: t.varchar('stripe_customer_id'),
    monthlyPriceSnapshotInCents: t
      .integer('monthly_price_snapshot_in_cents')
      .notNull(),
    planNameSnapshot: t
      .varchar('plan_name_snapshot', { length: 255 })
      .notNull(),
    billingIntervalSnapshot: t.varchar('billing_interval_snapshot', {
      length: 20,
    }),
    currentPeriodStart: t
      .timestamp('current_period_start', { withTimezone: true })
      .notNull(),
    currentPeriodEnd: t
      .timestamp('current_period_end', { withTimezone: true })
      .notNull(),
    status: SubscriptionStatus('status').notNull().default('incomplete'),
    ...timestamp,
  },
  (table) => [
    t.check('check_price', sql`${table.monthlyPriceSnapshotInCents} > 0`),
    t.uniqueIndex('user_order_idx').on(table.userId, table.id),
  ],
);

export const SubscriptionsTableRelations = relations(
  SubscriptionsTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [SubscriptionsTable.userId],
      references: [UserTable.id],
    }),
  }),
);
