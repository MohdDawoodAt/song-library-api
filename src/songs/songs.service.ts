import { Injectable } from '@nestjs/common';
import { Song } from './schemas/song.schema';
import { Model } from 'mongoose';
import { songDTO } from './dto/song.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SongsService {
  constructor(@InjectModel(Song.name) private songModel: Model<Song>) {}

  async findAllSongs(): Promise<Song[]> {
    return this.songModel.find().exec();
  }

  async addSong(songDTO: songDTO): Promise<Song> {
    const addedSong = await this.songModel.create(songDTO);
    return addedSong;
  }
}
