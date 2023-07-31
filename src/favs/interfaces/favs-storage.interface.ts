import { FavsDataBaseInterface } from './favs-data-base.interface';

export interface FavsStorageInterface {
  getAllFavoritesIds: () => FavsDataBaseInterface;
  addToFavorites: (type: 'artist' | 'album' | 'track', id: string) => void;
  removeFromFavorites: (type: 'artist' | 'album' | 'track', id: string) => void;
}
