import { Injectable } from '@nestjs/common';
import { Song } from './schemas/song.schema';
import { Model } from 'mongoose';
import { songDTO } from './dto/song.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { SpotifyService } from './spotify/spotify.service';
// import axios from 'axios';

@Injectable()
export class SongsService {
  constructor(
    @InjectModel(Song.name) private songModel: Model<Song>,
    private configService: ConfigService,
    private spotifyService: SpotifyService,
  ) {}

  async findAllSongs(page: number, limit: number): Promise<Song[]> {
    const skip = (page - 1) * limit;
    return this.songModel.find().skip(skip).limit(limit).exec();
  }

  async searchSongs(songName: string): Promise<Song[]> {
    const foundSongs = this.songModel
      .find({
        name: { $regex: songName, $options: 'i' },
      })
      .exec();

    return foundSongs;
  }

  async addSong(songDTO: songDTO): Promise<Song> {
    const addedSong = await this.songModel.create(songDTO);
    return addedSong;
  }

  async saveTracksToDatabase(tracks: songDTO[]): Promise<void> {
    try {
      await this.songModel.insertMany(tracks, {
        ordered: false,
      });
    } catch {
      throw new Error('Failed to save tracks to Database');
    }
  }

  async fetchAndSavePlaylistTracks(
    playlistId: string,
  ): Promise<{ status: string }> {
    try {
      const tracks =
        await this.spotifyService.fetchSpotifyPlaylistTracks(playlistId); // Use the SpotifyService
      await this.saveTracksToDatabase(tracks);
      return {
        status: 'Successfully fetched and saved',
      };
    } catch {
      throw new Error('Failed to fetch and save playlist tracks.');
    }
  }
}
