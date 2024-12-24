import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { AdminService } from './admin.service';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule implements OnApplicationBootstrap {
  constructor(private readonly adminService: AdminService) {}
  async onApplicationBootstrap() {
    await this.adminService.initializeAdmin();
  }
}
