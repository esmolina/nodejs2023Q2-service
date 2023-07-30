import { Inject, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumsStorageInterface } from './interfaces/albums-storage.interface';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @Inject('AlbumsStorageInterface') private storage: AlbumsStorageInterface,
  ) {}

  checkNewAlbumNameIsAvailable(createdAlbumName: string): boolean {
    return this.storage.checkTheAlbumNotExists(createdAlbumName);
  }

  create(createAlbumDto: CreateAlbumDto): AlbumEntity {
    return this.storage.createNewAlbum(createAlbumDto);
  }

  findAll(): Array<AlbumEntity> {
    return this.storage.getAlbums();
  }

  findOne(id: string): AlbumEntity | undefined {
    return this.storage.getAlbumById(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): AlbumEntity | undefined {
    return this.storage.updateAlbumInfo(id, updateAlbumDto);
  }

  remove(id: string): string | undefined {
    return this.storage.removeAlbum(id);
  }
}
