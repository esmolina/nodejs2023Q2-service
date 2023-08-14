import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ApiProperty({
    description: 'The ID of the artist (if applicable)',
    type: 'string',
    format: 'uuid',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  artistId: string | null;
}
