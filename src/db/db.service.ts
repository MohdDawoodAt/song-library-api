import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

@Injectable()
export class DbService {
  private pool: Pool;

  constructor(private configService: ConfigService) {
    this.pool = new Pool({
      user: this.configService.get<string>('POSTGRES_USER'),
      host: this.configService.get<string>('POSTGRES_HOST'),
      database: this.configService.get<string>('POSTGRES_DB'),
      password: this.configService.get<string>('POSTGRES_PASSWORD'),
      port: this.configService.get<number>('POSTGRES_PORT'),
    });

    this.pool
      .connect()
      .then(() => console.log('PostgreSQL connected successfully'))
      .catch((error) =>
        console.error('Error connecting to PostgreSQL:', error),
      );
  }

  getDrizzleInstance() {
    return drizzle(this.pool);
  }
}
