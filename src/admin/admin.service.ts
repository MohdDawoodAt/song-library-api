import { Injectable } from '@nestjs/common';
import { Admin } from './schemas/admin.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private adminModel: Model<Admin>) {}

  async findAdmin(username: string): Promise<Admin | undefined> {
    const existingAdmin = await this.adminModel.findOne({ username: username });
    return existingAdmin;
  }
}
