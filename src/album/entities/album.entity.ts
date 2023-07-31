import { ApiProperty } from '@nestjs/swagger';

export class AlbumEntity {
  @ApiProperty({
    description: 'The ID of the album',
    type: 'string',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({ description: 'The name of the album', type: 'string' })
  name: string;

  @ApiProperty({
    description: 'The year the album was released',
    type: 'number',
    format: 'int32',
  })
  year: number;

  @ApiProperty({
    description: 'The ID of the artist (if applicable)',
    type: 'string',
    format: 'uuid',
    nullable: true,
  })
  artistId: string | null;
}
