import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { AdminSchema } from './schemas/admin.schema';
import { SongSchema } from 'src/songs/schemas/song.schema';
export const DRIZZLE = Symbol('drizzle-connection');
@Module({
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        // const dbUrl = configService.get<string>('pgUrl');
        const pool = new Pool({
          // connectionString: dbUrl,
          user: configService.get<string>('POSTGRES_USER'),
          host: configService.get<string>('POSTGRES_HOST'),
          database: configService.get<string>('POSTGRES_DB'),
          password: configService.get<string>('POSTGRES_PASSWORD'),
          port: configService.get<number>('POSTGRES_PORT'),
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
  exports: [DbService],
})
export class DbModule {
  // constructor(private configService: ConfigService) {}
}
