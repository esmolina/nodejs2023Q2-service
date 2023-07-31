import { IsInt, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTrackDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  artistId: string | null;

  @ApiProperty()
  @IsOptional()
  @IsString()
  albumId: string | null;

  @ApiProperty()
  @IsInt()
  duration: number;
}
