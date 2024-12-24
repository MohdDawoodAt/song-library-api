import { Module } from '@nestjs/common';

import { SongsModule } from './songs/songs.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SongsModule,
    AdminModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
