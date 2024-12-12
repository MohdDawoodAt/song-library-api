import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { Song, SongSchema } from './schemas/song.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { SpotifyService } from './spotify/spotify.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Song.name, schema: SongSchema }]),
  ],
  controllers: [SongsController],
  providers: [SongsService, SpotifyService],
})
export class SongsModule {}
