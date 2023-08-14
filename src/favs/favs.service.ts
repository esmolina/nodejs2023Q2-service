import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavArtistsEntity } from './entities/fav-artist.entity';
import { FavAlbumsEntity } from './entities/fav-album.entity';
import { FavTracksEntity } from './entities/fav-track.entity';

@Injectable()
export class FavsService {
  constructor(
    @InjectRepository(FavArtistsEntity)
    private favArtistsRepository: Repository<FavArtistsEntity>,
    @InjectRepository(FavAlbumsEntity)
    private favAlbumsRepository: Repository<FavAlbumsEntity>,
    @InjectRepository(FavTracksEntity)
    private favTracksRepository: Repository<FavTracksEntity>,
  ) {}

  //
  // checkIsIdNotFavorites(
  //   type: 'artist' | 'album' | 'track',
  //   searchableId: string,
  // ): boolean {
  //   return this.favsStorage.checkIsNotFavorite(type, searchableId);
  // }
  //
  // checkIsArtistExist(id: string): boolean {
  //   // return this.artistService.isArtistExist(id);
  //   return true;
  // }
  //
  // checkIsAlbumExist(id: string): boolean {
  //   // return this.albumService.isAlbumExist(id);
  //   return true;
  // }
  //
  // checkIsTrackExist(id: string): boolean {
  //   // return this.trackService.isTrackExist(id);
  //   return true;
  // }
  //
  // findIds(): FavsDataBaseInterface {
  //   return this.favsStorage.getAllFavoritesIds();
  // }

  getRepoByType(type: 'artist' | 'album' | 'track') {
    let repo:
      | Repository<FavArtistsEntity>
      | Repository<FavAlbumsEntity>
      | Repository<FavTracksEntity>;

    switch (type) {
      case 'artist':
        repo = this.favArtistsRepository as Repository<FavArtistsEntity>;
        break;
      case 'album':
        repo = this.favAlbumsRepository as Repository<FavAlbumsEntity>;
        break;
      case 'track':
        repo = this.favTracksRepository as Repository<FavTracksEntity>;
        break;
      default:
        throw new Error(`Invalid type: ${type}`);
    }
    return repo;
  }

  async getFavs() {
    const favArtistsEntities = await this.favArtistsRepository.find({
      relations: ['artist'],
    });

    const favAlbumsEntities = await this.favAlbumsRepository.find({
      relations: [`album`],
    });
    const favTracksEntities = await this.favTracksRepository.find({
      relations: ['track'],
    });

    return {
      artists: favArtistsEntities.map((item) => item.artist),
      albums: favAlbumsEntities.map((item) => item.album),
      tracks: favTracksEntities.map((item) => item.track),
    };
  }

  async addToFavorites(type: 'artist' | 'album' | 'track', id: string) {
    const repo = this.getRepoByType(type);

    let newFavRecord: FavArtistsEntity | FavAlbumsEntity | FavTracksEntity;

    try {
      if (type === 'artist') {
        newFavRecord = repo.create({ artistId: id }) as FavArtistsEntity;
      } else if (type === 'album') {
        newFavRecord = repo.create({ albumId: id }) as FavAlbumsEntity;
      } else if (type === 'track') {
        newFavRecord = repo.create({ trackId: id }) as FavTracksEntity;
      }
      await (
        repo as Repository<FavArtistsEntity | FavAlbumsEntity | FavTracksEntity>
      ).save(newFavRecord);
    } catch (error) {
      throw new HttpException(
        `The ${type} with ID #${id} does not exist in data base`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async removeFromFavorites(type: 'artist' | 'album' | 'track', id: string) {
    const repo = this.getRepoByType(type);
    let result;
    try {
      if (type === 'artist') {
        result = (repo as Repository<FavArtistsEntity>).delete({
          artistId: id,
        });
      } else if (type === 'album') {
        result = (repo as Repository<FavAlbumsEntity>).delete({ albumId: id });
      } else if (type === 'track') {
        result = (repo as Repository<FavTracksEntity>).delete({ trackId: id });
      }

      if (result.affected === 0) return undefined;
      return `The ${type} with ID #${id} was successfully deleted from favourites`;
    } catch (error) {
      throw new HttpException(
        `The ${type} with ID #${id} does not exist in favourites`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
