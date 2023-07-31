import { ArtistEntity } from '../entities/artist.entity';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';

export interface ArtistsStorageInterface {
  checkTheArtistNotExists: (createdArtistName: string) => boolean;
  createNewArtist: (createArtistDto: CreateArtistDto) => ArtistEntity;
  getArtists: () => Array<ArtistEntity>;
  getArtistById: (id: string) => ArtistEntity | undefined;
  updateArtistInfo: (
    id: string,
    updateArtistDto: UpdateArtistDto,
  ) => ArtistEntity | undefined;
  removeArtist: (id: string) => string | undefined;
}
