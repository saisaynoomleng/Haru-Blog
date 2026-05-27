import * as t from 'drizzle-orm/pg-core';

export const NewsletterSubscriptionTable = t.pgTable('newsletters', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  email: t.varchar('email', { length: 255 }).notNull().unique(),
});
