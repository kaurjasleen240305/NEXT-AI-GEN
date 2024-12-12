import { pgTable, serial,varchar,boolean,timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  email: varchar('email').notNull().unique(),
  imageUrl:varchar('imageUrl'),
  subscription:boolean('subscription').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});