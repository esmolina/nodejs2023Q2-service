import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistsStorageInterface } from './interfaces/artist-storage.interface';
import { ArtistEntity } from './entities/artist.entity';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { FavsService } from '../favs/favs.service';

@Injectable()
export class ArtistService {
  constructor(
    @Inject('ArtistsStorageInterface') private storage: ArtistsStorageInterface,
    @Inject(forwardRef(() => AlbumService))
    private albumsService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private tracksService: TrackService,
    @Inject(forwardRef(() => FavsService))
    private favsService: FavsService,
  ) {}

  checkNewArtistNAmeIsAvailable(createdArtistLogin: string): boolean {
    return this.storage.checkTheArtistNotExists(createdArtistLogin);
  }

  create(createArtistDto: CreateArtistDto): ArtistEntity {
    return this.storage.createNewArtist(createArtistDto);
  }

  findAll(): Array<ArtistEntity> {
    return this.storage.getArtists();
  }

  findOne(id: string): ArtistEntity | undefined {
    return this.storage.getArtistById(id);
  }

  update(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): ArtistEntity | undefined {
    return this.storage.updateArtistInfo(id, updateArtistDto);
  }

  remove(id: string): string | undefined {
    this.albumsService.updateArtistIdInAlbums(id);
    this.tracksService.updateArtistIdInTracks(id);
    this.favsService.removeFromFavorites('artist', id);
    return this.storage.removeArtist(id);
  }

  getFavorites(ids: Array<string>): Array<ArtistEntity> {
    const favouritesArray: Array<ArtistEntity> = [];
    ids.map((id) => {
      const favArtist = this.findOne(id);
      if (favArtist) {
        favouritesArray.push(favArtist);
      }
    });
    return favouritesArray;
  }

  isArtistExist(id: string): boolean {
    return !!this.findOne(id);
  }
}
