# Song Library API

This project is a NestJS-based API that allows users to view and search songs from the database. Admins can add songs, fetch playlists from Spotify, and populate the database with tracks. The API supports features such as pagination and song management.

## Installation (with Docker)

### Prerequisites

Before you begin, ensure you have the following installed:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Setup

1. Clone the repository:

   git clone https://github.com/MohdDawoodAt/song-library-api.git

2. Navigate to the project directory:

   cd song-library-api

3. Build and start the containers:

   docker-compose up --build

   This will start both the backend service and MongoDB in separate containers.

4. The API will be running at `http://localhost:3000`.

### Environment Variables

Create a `.env` file in the root directory and specify them there.

Make sure you have a **Spotify Developer Account** and create an application to obtain the following credentials:

- **SPOTIFY_CLIENT_ID**
- **SPOTIFY_CLIENT_SECRET**
- **SPOTIFY_PLAYLIST_ID**

Additionally, define the following environment variables for admin access:

- **ADMIN_USERNAME**: The username for admin access.
- **ADMIN_PASSWORD**: The password for admin access.

## API Endpoints

### Authentication

- **POST** `/login`
  - Login for admin access with **ADMIN_USERNAME** and **ADMIN_PASSWORD**.

### Songs

- **GET** `/`

  - Get all songs with pagination.
  - Query Parameters:
    - `page` (default 1)
    - `limit` (default 5)

- **GET** `/search`

  - Search for songs by name.
  - Query Parameter:
    - `songName` (required)

- **POST** `/`

  - Add a song to the database.
  - Requires admin authentication via the **AuthGuard**.
  - Body:
    ```json
    {
      "name": "Song Name",
      "artists": "Artist Name",
      "album": "Album Name",
      "image": "Image URL",
      "releaseDate": "Release Date"
    }
    ```

- **GET** `/populate`
  - Fetch playlist tracks from Spotify and save them to the database.
  - Requires admin authentication via the **AuthGuard**.
  - Response: A message indicating the number of tracks fetched and saved.

### Example Requests

1. **Get all songs**:

   - URL: `http://localhost:3000/songs?page=1&limit=10`
   - Method: `GET`

2. **Search for songs**:

   - URL: `http://localhost:3000/songs/search?songName=your-song-name`
   - Method: `GET`

3. **Add a song**:
   - URL: `http://localhost:3000/songs`
   - Method: `POST`
   - Body:
     ```json
     {
       "name": "Song Name",
       "artists": "Artist Name",
       "album": "Album Name",
       "image": "Image URL",
       "releaseDate": "Release Date"
     }
     ```
