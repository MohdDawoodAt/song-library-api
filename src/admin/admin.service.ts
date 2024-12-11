import { Injectable } from '@nestjs/common';
import { Admin } from './schemas/admin.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private adminModel: Model<Admin>) {}

  async findAdmin(username: string): Promise<Admin | undefined> {
    const existingAdmin = await this.adminModel.findOne({ username: username });
    return existingAdmin;
  }

  async initializeAdmin() {
    const existingAdmin = await this.findAdmin(process.env.ADMIN_USERNAME);
    if (existingAdmin) {
      console.log('no added admin');
      console.log(existingAdmin);
      return;
    } else {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      const newAdmin = new this.adminModel({
        username: process.env.USERNAME,
        passwordHash: hashedPassword,
      });
      await newAdmin.save();
      console.log('added admin');
    }
  }
}
