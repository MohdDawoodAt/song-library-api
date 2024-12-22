import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';

import { SpotifyService } from './spotify/spotify.service';
import { DbModule } from 'src/db/db.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [DbModule],
  controllers: [SongsController],
  providers: [SongsService, SpotifyService, ConfigService],
})
export class SongsModule implements OnApplicationBootstrap {
  constructor(
    private readonly songService: SongsService,
    private configService: ConfigService,
  ) {}

  async onApplicationBootstrap() {
    await this.songService.fetchAndSavePlaylistTracks(
      this.configService.get<string>('SPOTIFY_PLAYLIST_ID'),
    );
  }
}
