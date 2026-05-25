import * as t from 'drizzle-orm/pg-core';
import { timestamp, UserStatus } from './schema-helper';
import { relations } from 'drizzle-orm';
import { SubscriptionsTable } from './subscription.schema';

export const UserTable = t.pgTable(
  'users',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    firstName: t.varchar('first_name', { length: 255 }).notNull(),
    lastName: t.varchar('last_name', { length: 255 }).notNull(),
    email: t.varchar('email', { length: 255 }).notNull(),
    clerkUserId: t.varchar('clerk_user_id', { length: 255 }).notNull().unique(),
    imageUrl: t.varchar('image_url', { length: 255 }),
    stauts: UserStatus('status').notNull().default('user'),
    isDeleted: t.boolean('is_deleted').notNull().default(false),
    ...timestamp,
  },
  (table) => [t.uniqueIndex('user_clerk_idx').on(table.id, table.clerkUserId)],
);

export const UserTableRelations = relations(UserTable, ({ many }) => ({
  orders: many(SubscriptionsTable),
}));
