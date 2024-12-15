import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [DbService, ConfigService],
  exports: [DbService],
})
export class DbModule {
  // constructor(private configService: ConfigService) {}
}
