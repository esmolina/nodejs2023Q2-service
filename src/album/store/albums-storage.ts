import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { AlbumEntity } from '../entities/album.entity';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { AlbumsStorageInterface } from '../interfaces/albums-storage.interface';

@Injectable()
export class AlbumsStore implements AlbumsStorageInterface {
  private albums: Array<AlbumEntity> = [];

  checkTheAlbumNotExists(createdAlbumName: string): boolean {
    const albumIndex = this.albums.findIndex(
      (album) => album.name === createdAlbumName,
    );
    return albumIndex === -1;
  }

  createNewAlbum(createAlbumDto: CreateAlbumDto): AlbumEntity {
    const newAlbum: AlbumEntity = {
      id: uuid(),
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId ?? null,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  getAlbums(): Array<AlbumEntity> {
    return this.albums;
  }

  getAlbumById(id: string): AlbumEntity | undefined {
    const album = this.albums.find((album) => album.id === id);
    if (!album) return undefined;
    return album;
  }

  updateAlbumInfo(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): AlbumEntity | undefined {
    const album = this.albums.find((album) => album.id === id);
    if (!album) return undefined;
    album.name = updateAlbumDto.name ?? album.name;
    album.year = updateAlbumDto.year ?? album.year;
    album.artistId = updateAlbumDto.artistId ?? album.artistId;
    return album;
  }

  removeAlbum(id: string): string | undefined {
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    if (albumIndex === -1) return undefined;
    this.albums.splice(albumIndex, 1);
    return `The album with ID #${id} was successfully deleted`;
  }

  updateArtistIdInAlbums(artistId: string): void {
    this.albums.forEach((album) => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });
  }
}
