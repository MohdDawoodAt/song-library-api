import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';

import { SpotifyService } from './spotify/spotify.service';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [SongsController],
  providers: [SongsService, SpotifyService],
})
export class SongsModule {}
