import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const AdminSchema = pgTable('admins', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password', { length: 255 }).notNull(),
});
