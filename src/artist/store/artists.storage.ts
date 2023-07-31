import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { ArtistsStorageInterface } from '../interfaces/artist-storage.interface';
import { ArtistEntity } from '../entities/artist.entity';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';

@Injectable()
export class ArtistsStore implements ArtistsStorageInterface {
  private artists: Array<ArtistEntity> = [];

  checkTheArtistNotExists(createdArtistName: string): boolean {
    const artistIndex = this.artists.findIndex(
      (artist) => artist.name === createdArtistName,
    );
    return artistIndex === -1;
  }

  createNewArtist(createArtistDto: CreateArtistDto): ArtistEntity {
    const newArtist: ArtistEntity = {
      id: uuid(),
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  getArtists(): Array<ArtistEntity> {
    return this.artists;
  }

  getArtistById(id: string): ArtistEntity | undefined {
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) return undefined;
    return artist;
  }

  updateArtistInfo(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): ArtistEntity | undefined {
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) return undefined;
    artist.name = updateArtistDto.name ?? artist.name;
    artist.grammy = updateArtistDto.grammy ?? artist.grammy;
    return artist;
  }

  removeArtist(id: string): string | undefined {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    if (artistIndex === -1) return undefined;
    this.artists.splice(artistIndex, 1);
    return `The artist with ID #${id} was successfully deleted`;
  }
}
