import { Inject, Injectable } from '@nestjs/common';
import { songDTO } from './dto/song.dto';
import { ConfigService } from '@nestjs/config';
import { SpotifyService } from './spotify/spotify.service';
import { DRIZZLE } from 'src/db/db.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { SongSchema } from 'src/db/schemas/song.schema';
// import { pgTable } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// import axios from 'axios';

@Injectable()
export class SongsService {
  constructor(
    @Inject(DRIZZLE) private readonly db: NodePgDatabase,
    private configService: ConfigService,
    private spotifyService: SpotifyService,
  ) {}

  async findAllSongs(page: number, limit: number): Promise<songDTO[]> {
    const skip = (page - 1) * limit;
    return this.db
      .select()
      .from(SongSchema)
      .offset(skip)
      .limit(limit)
      .execute();
  }

  async searchSongs(songName: string): Promise<songDTO[]> {
    const foundSongs = this.db
      .select()
      .from(SongSchema)
      .where(sql`${SongSchema.name} ILIKE ${'%' + songName + '%'}`)
      .execute();

    return foundSongs;
  }

  async addSong(songDTO: songDTO): Promise<songDTO[]> {
    const addedSong = await this.db
      .insert(SongSchema)
      .values(songDTO)
      .returning();
    return addedSong;
  }

  async saveTracksToDatabase(tracks: songDTO[]): Promise<void> {
    try {
      // console.log(tracks);
      await this.db.insert(SongSchema).values(tracks);
    } catch {
      throw new Error('Failed to save tracks to Database');
    }
  }

  async fetchAndSavePlaylistTracks(
    playlistId: string,
  ): Promise<{ status: string }> {
    try {
      // console.log('fetchandsave tried ong');
      const tracks =
        await this.spotifyService.fetchSpotifyPlaylistTracks(playlistId);

      await this.saveTracksToDatabase(tracks);
      return {
        status: 'Successfully fetched and saved',
      };
    } catch {
      throw new Error('Failed to fetch and save playlist tracks.');
    }
  }
}
