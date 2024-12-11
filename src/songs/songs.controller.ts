import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { Song } from './schemas/song.schema';
import { songDTO } from './dto/song.dto';

@Controller()
export class SongsController {
  constructor(private songsService: SongsService) {}

  @Get()
  async findAllSongs(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
  ): Promise<Song[]> {
    return this.songsService.findAllSongs(Number(page), Number(limit));
  }

  @Get('search')
  searchSongs(@Query('songName') songName: string): Promise<Song[]> {
    if (!songName) {
      throw new BadRequestException('songName parameter is required');
    } else {
      return this.songsService.searchSongs(songName);
    }
  }
  //   @UseGuards(AuthGuard)
  @Post()
  async addSong(@Body() song: songDTO) {
    return this.songsService.addSong(song);
  }
}
