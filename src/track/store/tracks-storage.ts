import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { TracksStorageInterface } from '../interfaces/tracks-storage.interface';
import { TrackEntity } from '../entities/track.entity';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';

@Injectable()
export class TracksStore implements TracksStorageInterface {
  private tracks: Array<TrackEntity> = [];

  createNewTrack(createTrackDto: CreateTrackDto): TrackEntity {
    const newTrack: TrackEntity = {
      id: uuid(),
      name: createTrackDto.name,
      artistId: createTrackDto.artistId ?? null,
      albumId: createTrackDto.albumId ?? null,
      duration: createTrackDto.duration,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  getTracks(): Array<TrackEntity> {
    return this.tracks;
  }

  getTrackById(id: string): TrackEntity | undefined {
    const track = this.tracks.find((track) => track.id === id);
    if (!track) return undefined;
    return track;
  }

  updateTrackInfo(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): TrackEntity | undefined {
    const track = this.tracks.find((track) => track.id === id);
    if (!track) return undefined;
    track.name = updateTrackDto.name ?? track.name;
    track.artistId = updateTrackDto.artistId ?? track.artistId;
    track.albumId = updateTrackDto.albumId ?? track.albumId;
    track.duration = updateTrackDto.duration ?? track.duration;
    return track;
  }

  removeTrack(id: string): string | undefined {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) return undefined;
    this.tracks.splice(trackIndex, 1);
    return `The track with ID #${id} was successfully deleted`;
  }

  updateArtistIdInTracks(artistId: string): void {
    this.tracks.forEach((tracks) => {
      if (tracks.artistId === artistId) {
        tracks.artistId = null;
      }
    });
  }

  updateAlbumIdInTracks(albumId: string): void {
    this.tracks.forEach((tracks) => {
      if (tracks.albumId === albumId) {
        tracks.albumId = null;
      }
    });
  }
}
