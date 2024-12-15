import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';

// export type SongDocument = HydratedDocument<Song>;

export const Song = pgTable('songs', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  artist: varchar('artist', { length: 255 }).notNull(),
  album: varchar('album', { length: 255 }).notNull(),
  image: varchar('image', { length: 255 }).notNull(),
  releaseDate: varchar('releaseDate', { length: 255 }).notNull(),
});
