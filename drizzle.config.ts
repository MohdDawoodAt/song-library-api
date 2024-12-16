import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schemas/index.ts',
  out: './drizzle',
  dialect: 'postgresql', // Use this instead of driver
  dbCredentials: {
    url: process.env.PG_URL,
  },
});
