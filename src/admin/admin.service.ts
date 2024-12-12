import { Injectable } from '@nestjs/common';
import { Admin } from './schemas/admin.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    private configService: ConfigService,
  ) {}

  async findAdmin(username: string): Promise<Admin | undefined> {
    const existingAdmin = await this.adminModel.findOne({ username: username });
    return existingAdmin;
  }

  async initializeAdmin() {
    const existingAdmin = await this.findAdmin(
      this.configService.get<string>('ADMIN_USERNAME'),
    );
    if (existingAdmin) {
      return;
    } else {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      const newAdmin = new this.adminModel({
        username: this.configService.get<string>('ADMIN_USERNAME'),
        passwordHash: hashedPassword,
      });
      await newAdmin.save();
    }
  }
}
