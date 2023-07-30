import { Inject, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistsStorageInterface } from './interfaces/artist-storage.interface';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @Inject('ArtistsStorageInterface') private storage: ArtistsStorageInterface,
  ) {}

  checkNewArtistNAmeIsAvailable(createdArtistLogin: string): boolean {
    return this.storage.checkTheArtistNotExists(createdArtistLogin);
  }

  create(createArtistDto: CreateArtistDto): ArtistEntity {
    return this.storage.createNewArtist(createArtistDto);
  }

  findAll(): Array<ArtistEntity> {
    return this.storage.getArtists();
  }

  findOne(id: string): ArtistEntity | undefined {
    return this.storage.getArtistById(id);
  }

  update(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): ArtistEntity | undefined {
    return this.storage.updateArtistInfo(id, updateArtistDto);
  }

  remove(id: string): string | undefined {
    return this.storage.removeArtist(id);
  }
}
