import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class SpotifyService {
  constructor(private configService: ConfigService) {}

  async getSpotifyAccessToken(): Promise<string> {
    const clientId = this.configService.get<string>('SPOTIFY_CLIENT_ID');
    const clientSecret = this.configService.get<string>(
      'SPOTIFY_CLIENT_SECRET',
    );
    // console.log('spot client id:' + clientId);
    // console.log('spot client secret:' + clientSecret);
    const spotifyTokenUrl = 'https://accounts.spotify.com/api/token';

    const data = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    });

    try {
      const response = await axios.post(spotifyTokenUrl, data.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      // this.logger.log('Access token retrieved successfully.');
      // console.log('we got a spotify access token' + response.data);
      return response.data.access_token;
    } catch {
      // this.logger.error('Error fetching access token:', error);
      throw new Error('Failed to retrieve access token.');
    }
  }

  async fetchSpotifyPlaylistTracks(playlistId: string) {
    // console.log('tring to get access token');
    const accessToken = await this.getSpotifyAccessToken();
    // console.log('we got spotify access token ' + accessToken);
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      // console.log(response);

      return response.data.items.map((item: any) => ({
        name: item.track.name,
        artist: item.track.artists.map((artist: any) => artist.name).join(', '),
        album: item.track.album.name,
        image: item.track.album.images[0]?.url,
        popularity: item.track.popularity,
        releaseDate: item.track.album.release_date,
      }));
    } catch {
      //   this.logger.error('Error fetching playlist tracks:', error);
      throw new Error('Failed to fetch playlist tracks.');
    }
  }
}
