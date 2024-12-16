import { pgTable, serial,varchar,boolean,timestamp,json } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  email: varchar('email').notNull().unique(),
  imageUrl:varchar('imageUrl'),
  subscription:boolean('subscription').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export const VideoData = pgTable('videoData',{
  id:serial('id').primaryKey(),
  script:json('script').notNull(),
  audioFileURL:varchar('audioFileURL').notNull(),
  captions:json('captions').notNull(),
  createdBy:varchar('createdBy').notNull(),
})