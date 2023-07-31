import { IsNotEmpty, IsInt, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @ApiProperty()
  @IsNotEmpty()
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
