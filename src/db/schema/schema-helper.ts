import * as t from 'drizzle-orm/pg-core';

export const timestamp = {
  createdAt: t
    .timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: t
    .timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

export const UserStatus = t.pgEnum('userStatus', ['admin', 'user']);

export const ContactStatus = t.pgEnum('contactStatus', [
  'new',
  'old',
  'replied',
  'spam',
]);

export const SubscriptionStatus = t.pgEnum('orderStatus', [
  'pending',
  'paid',
  'cancelled',
  'confirmed',
]);
