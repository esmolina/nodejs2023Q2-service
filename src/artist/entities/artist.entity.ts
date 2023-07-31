import { ApiProperty } from '@nestjs/swagger';

export class ArtistEntity {
  @ApiProperty({
    description: 'The ID of the artist',
    type: 'string',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({ description: 'The name of the artist', type: 'string' })
  name: string;

  @ApiProperty({
    description: 'If the artist has Grammy-prize, this flag will be true',
    type: 'boolean',
  })
  grammy: boolean;
}
