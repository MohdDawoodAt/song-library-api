import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { SongSchema } from 'src/db/schemas/song.schema';
import { AdminSchema } from './schemas/admin.schema';
export const DRIZZLE = Symbol('drizzle-connection');
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const dbUrl = configService.get<string>('PG_URL');
        const pool = new Pool({
          connectionString: dbUrl,
        });
        return drizzle(pool, {
          schema: {
            Admin: AdminSchema,
            Song: SongSchema,
          },
        });
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DbModule {}
