import { ApiProperty } from '@nestjs/swagger';

export class TrackEntity {
  @ApiProperty({
    description: 'The ID of the track',
    type: 'string',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({ description: 'The name of the track', type: 'string' })
  name: string;

  @ApiProperty({
    description: 'The ID of the artist',
    type: 'string',
    format: 'uuid',
  })
  artistId: string | null;

  @ApiProperty({
    description: 'The ID of the album',
    type: 'string',
    format: 'uuid',
  })
  albumId: string | null;

  @ApiProperty({
    description: 'The track duration, integer number',
    type: 'number',
    format: 'int32',
  })
  duration: number;
}
