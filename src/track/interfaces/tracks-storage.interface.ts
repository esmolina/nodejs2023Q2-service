import { CreateTrackDto } from '../dto/create-track.dto';
import { TrackEntity } from '../entities/track.entity';
import { UpdateTrackDto } from '../dto/update-track.dto';

export interface TracksStorageInterface {
  createNewTrack: (createTrackDto: CreateTrackDto) => TrackEntity;
  getTracks: () => Array<TrackEntity>;
  getTrackById: (id: string) => TrackEntity | undefined;
  updateTrackInfo: (
    id: string,
    updateTrackDto: UpdateTrackDto,
  ) => TrackEntity | undefined;
  removeTrack: (id: string) => string | undefined;
  updateArtistIdInTracks: (artistId: string) => void;
  updateAlbumIdInTracks: (artistId: string) => void;
}
