import { Inject, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TracksStorageInterface } from './interfaces/tracks-storage.interface';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @Inject('TracksStorageInterface')
    private tracksStorage: TracksStorageInterface,
  ) {}

  create(createTrackDto: CreateTrackDto): TrackEntity {
    return this.tracksStorage.createNewTrack(createTrackDto);
  }

  findAll(): Array<TrackEntity> {
    return this.tracksStorage.getTracks();
  }

  findOne(id: string): TrackEntity | undefined {
    return this.tracksStorage.getTrackById(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto): TrackEntity | undefined {
    return this.tracksStorage.updateTrackInfo(id, updateTrackDto);
  }

  remove(id: string): string | undefined {
    return this.tracksStorage.removeTrack(id);
  }

  updateArtistIdInTracks(artistId: string): void {
    this.tracksStorage.updateArtistIdInTracks(artistId);
  }

  updateAlbumIdInTracks(artistId: string): void {
    this.tracksStorage.updateAlbumIdInTracks(artistId);
  }

  getFavorites(ids: Array<string>): Array<TrackEntity> {
    const favouritesArray: Array<TrackEntity> = [];
    ids.map((id) => {
      const favTrack = this.findOne(id);
      if (favTrack) {
        favouritesArray.push(favTrack);
      }
    });
    return favouritesArray;
  }
}
