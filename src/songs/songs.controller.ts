import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { songDTO } from './dto/song.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ConfigService } from '@nestjs/config';

@Controller()
export class SongsController {
  constructor(
    private songsService: SongsService,
    private configService: ConfigService,
  ) {}

  @Get()
  async findAllSongs(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '8',
  ): Promise<{ songs: songDTO[]; totalPages: number }> {
    return this.songsService.findAllSongs(Number(page), Number(limit));
  }

  @Get('search')
  searchSongs(@Query('songName') songName: string): Promise<songDTO[]> {
    if (!songName) {
      throw new BadRequestException('songName parameter is required');
    } else {
      return this.songsService.searchSongs(songName);
    }
  }
  @UseGuards(AuthGuard)
  @Post()
  async addSong(@Body() song: songDTO) {
    return this.songsService.addSong(song);
  }

  @UseGuards(AuthGuard)
  @Post('populate')
  populateDatabase() {
    return this.songsService.fetchAndSavePlaylistTracks(
      this.configService.get<string>('SPOTIFY_PLAYLIST_ID'),
    );
  }
}
