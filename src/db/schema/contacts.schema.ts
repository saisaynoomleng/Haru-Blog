import * as t from 'drizzle-orm/pg-core';
import { ContactStatus, timestamp } from './schema-helper';

export const ContactTable = t.pgTable('contacts', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  name: t.varchar('name', { length: 255 }).notNull(),
  email: t.varchar('email', { length: 255 }).notNull(),
  subject: t.text('subject').notNull(),
  message: t.text('message').notNull(),
  status: ContactStatus('status').notNull().default('new'),
  ...timestamp,
});
