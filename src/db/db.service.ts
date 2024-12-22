import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { join } from 'path';

@Injectable()
export class DbService implements OnApplicationBootstrap {
  private pool: Pool;
  private db: any;
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
    this.db = drizzle(this.pool);
  }
  getDrizzleInstance() {
    return this.db;
  }

  async onApplicationBootstrap() {
    // Create a separate pool for migrations
    const migrationPool = new Pool({
      user: this.configService.get<string>('POSTGRES_USER'),
      host: this.configService.get<string>('POSTGRES_HOST'),
      database: this.configService.get<string>('POSTGRES_DB'),
      password: this.configService.get<string>('POSTGRES_PASSWORD'),
      port: this.configService.get<number>('POSTGRES_PORT'),
    });

    try {
      console.log('Starting database migrations...');

      // Create the migration database instance
      const migrationDb = drizzle(migrationPool);

      // Run the migrations
      await migrate(migrationDb, {
        migrationsFolder: join(__dirname, '../../drizzle'),
      });

      console.log('Migrations completed successfully');
    } catch (error) {
      console.error('Migration failed:', error);
      // In a real application, you might want to implement retry logic here
      throw error;
    } finally {
      // Always clean up the migration pool
      await migrationPool.end();
    }
  }
}
