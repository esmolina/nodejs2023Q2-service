import { Inject, Injectable } from '@nestjs/common';
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
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

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
    result.artists = this.artistService.getFavorites(ids.artists);
    result.albums = this.albumService.getFavorites(ids.albums);
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
