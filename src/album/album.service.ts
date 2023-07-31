import { Inject, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumsStorageInterface } from './interfaces/albums-storage.interface';
import { AlbumEntity } from './entities/album.entity';
import { TrackService } from '../track/track.service';

@Injectable()
export class AlbumService {
  constructor(
    @Inject('AlbumsStorageInterface') private storage: AlbumsStorageInterface,
    private tracksService: TrackService,
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
    this.tracksService.updateAlbumIdInTracks(id);
    return this.storage.removeAlbum(id);
  }

  updateArtistIdInAlbums(artistId: string): void {
    this.storage.updateArtistIdInAlbums(artistId);
  }

  getFavorites(ids: Array<string>): Array<AlbumEntity> {
    const favouritesArray: Array<AlbumEntity> = [];
    ids.map((id) => {
      const favAlbum = this.findOne(id);
      if (favAlbum) {
        favouritesArray.push(favAlbum);
      }
    });
    return favouritesArray;
  }

  isAlbumExist(id: string): boolean {
    return !!this.findOne(id);
  }
}
