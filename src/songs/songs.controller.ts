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
  async findAllSongs(): Promise<Song[]> {
    return this.songsService.findAllSongs();
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
