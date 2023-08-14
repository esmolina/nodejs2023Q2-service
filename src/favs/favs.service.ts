import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { FavEntity } from './entities/fav.entity';
import { FavsDataBaseInterface } from './interfaces/favs-data-base.interface';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { FavsStorageInterface } from './interfaces/favs-storage.interface';

@Injectable()
export class FavsService {
  constructor(
    @Inject('FavsStorageInterface') private favsStorage: FavsStorageInterface,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

  checkIsIdNotFavorites(
    type: 'artist' | 'album' | 'track',
    searchableId: string,
  ): boolean {
    return this.favsStorage.checkIsNotFavorite(type, searchableId);
  }

  checkIsArtistExist(id: string): boolean {
    // return this.artistService.isArtistExist(id);
    return true;
  }

  checkIsAlbumExist(id: string): boolean {
    // return this.albumService.isAlbumExist(id);
    return true;
  }

  checkIsTrackExist(id: string): boolean {
    return this.trackService.isTrackExist(id);
  }

  findIds(): FavsDataBaseInterface {
    return this.favsStorage.getAllFavoritesIds();
  }

  getFavs(): FavEntity {
    const result: FavEntity = {
      artists: [],
      albums: [],
      tracks: [],
    };
    const ids = this.findIds();
    // result.artists = this.artistService.getFavorites(ids.artists);
    // result.albums = this.albumService.getFavorites(ids.albums);
    result.tracks = this.trackService.getFavorites(ids.tracks);
    return result;
  }

  addToFavorites(type: 'artist' | 'album' | 'track', id: string): void {
    this.favsStorage.addToFavorites(type, id);
  }

  removeFromFavorites(type: 'artist' | 'album' | 'track', id: string): void {
    this.favsStorage.removeFromFavorites(type, id);
  }
}
