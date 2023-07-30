import { CreateAlbumDto } from '../dto/create-album.dto';
import { AlbumEntity } from '../entities/album.entity';
import { UpdateAlbumDto } from '../dto/update-album.dto';

export interface AlbumsStorageInterface {
  checkTheAlbumNotExists: (createdAlbumName: string) => boolean;
  createNewAlbum: (createAlbumDto: CreateAlbumDto) => AlbumEntity;
  getAlbums: () => Array<AlbumEntity>;
  getAlbumById: (id: string) => AlbumEntity | undefined;
  updateAlbumInfo: (
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ) => AlbumEntity | undefined;
  removeAlbum: (id: string) => string | undefined;
}
