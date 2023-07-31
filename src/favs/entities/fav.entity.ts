import { ApiProperty } from '@nestjs/swagger';

export interface Artist {
  id: string;
  name: string;
  grammy: boolean;
}

export interface Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

export interface Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export class FavEntity {
  @ApiProperty({
    description: 'The array of artists',
    type: 'array',
  })
  artists: Array<Artist>;
  @ApiProperty({
    description: 'The array of albums',
    type: 'array',
  })
  albums: Array<Album>;
  @ApiProperty({
    description: 'The array of traks',
    type: 'array',
  })
  tracks: Array<Track>;
}
