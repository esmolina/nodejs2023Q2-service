import { IsInt, IsString, IsOptional } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  artistId: string | null;

  @IsOptional()
  @IsString()
  albumId: string | null;

  @IsInt()
  duration: number;
}
