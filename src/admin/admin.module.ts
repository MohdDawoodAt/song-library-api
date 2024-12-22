import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { AdminService } from './admin.service';
import { DbModule } from 'src/db/db.module';
// import { MongooseModule } from '@nestjs/mongoose';
// import { Admin, AdminSchema } from './schemas/admin.schema';

@Module({
  imports: [
    DbModule,
    // MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]), // Provide the AdminModel here
  ],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule implements OnApplicationBootstrap {
  constructor(private readonly adminService: AdminService) {}
  async onApplicationBootstrap() {
    // await this.adminService.initializeAdmin();
    // console.log('maybe adding admin');
  }
}
