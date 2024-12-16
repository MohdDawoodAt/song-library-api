import { Inject, Injectable } from '@nestjs/common';
// import { Admin, AdminSchema } from './schemas/admin.schema';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { DRIZZLE } from 'src/db/db.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { AdminSchema } from 'src/db/schemas/admin.schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class AdminService {
  constructor(
    @Inject(DRIZZLE) private readonly db: NodePgDatabase, // Inject Drizzle connection
    private configService: ConfigService,
  ) {}

  async findAdmin(username: string) {
    const existingAdmin = await this.db
      .select()
      .from(AdminSchema)
      .where(eq(AdminSchema.username, username))
      .execute();
    // console.log(existingAdmin);
    return existingAdmin;
  }

  async initializeAdmin() {
    const existingAdmin = await this.findAdmin(
      this.configService.get<string>('ADMIN_USERNAME'),
    );
    if (existingAdmin.length !== 0) {
      // console.log('admin exists');
      // console.log(existingAdmin);

      return;
    } else {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      await this.db
        .insert(AdminSchema)
        .values({
          username: this.configService.get<string>('ADMIN_USERNAME'),
          passwordHash: hashedPassword,
        })
        .execute();
      console.log('added admin');
    }
  }
}
