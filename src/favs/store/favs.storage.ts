import { Injectable } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { FavsStorageInterface } from '../interfaces/favs-storage.interface';
import { FavsDataBaseInterface } from '../interfaces/favs-data-base.interface';

@Injectable()
export class FavsStore implements FavsStorageInterface {
  private favoritesIds: FavsDataBaseInterface = {
    artists: [],
    albums: [],
    tracks: [],
  };

  checkIsNotFavorite(
    type: 'artist' | 'album' | 'track',
    searchableId: string,
  ): boolean {
    const resourceIndex = this.favoritesIds[`${type}s`].findIndex(
      (id) => id === searchableId,
    );
    return resourceIndex === -1;
  }

  getAllFavoritesIds(): FavsDataBaseInterface {
    return this.favoritesIds;
  }

  addToFavorites(type: 'artist' | 'album' | 'track', id: string): void {
    if (type === 'artist') {
      this.favoritesIds.artists.push(id);
    } else if (type === 'album') {
      this.favoritesIds.albums.push(id);
    } else if (type === 'track') {
      this.favoritesIds.tracks.push(id);
    } else {
      throw new HttpException('Invalid favorite type', HttpStatus.BAD_REQUEST);
    }
  }

  removeFromFavorites(type: 'artist' | 'album' | 'track', id: string): void {
    if (type === 'artist') {
      const index = this.favoritesIds.artists.indexOf(id);
      if (index !== -1) {
        this.favoritesIds.artists.splice(index, 1);
      }
    } else if (type === 'album') {
      const index = this.favoritesIds.albums.indexOf(id);
      if (index !== -1) {
        this.favoritesIds.albums.splice(index, 1);
      }
    } else if (type === 'track') {
      const index = this.favoritesIds.tracks.indexOf(id);
      if (index !== -1) {
        this.favoritesIds.tracks.splice(index, 1);
      }
    } else {
      throw new HttpException('Invalid favorite type', HttpStatus.BAD_REQUEST);
    }
  }
}
