import { Body, Controller, Get, Post } from '@nestjs/common';
import { SongsService } from './songs.service';
import { Song } from './schemas/song.schema';
import { songDTO } from './dto/song.dto';

@Controller()
export class SongsController {
  constructor(private songsService: SongsService) {}

  @Get()
  findAllSongs(): Promise<Song[]> {
    return this.songsService.findAllSongs();
  }

  //   @UseGuards(AuthGuard)
  @Post()
  addSong(@Body() song: songDTO) {
    return this.songsService.addSong(song);
  }
}
