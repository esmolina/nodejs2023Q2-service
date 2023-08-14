import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { FavsService } from '../favs/favs.service';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
    @Inject(forwardRef(() => FavsService))
    private favsService: FavsService,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<TrackEntity> {
    const newTrack = this.trackRepository.create(createTrackDto);
    if (!createTrackDto.artistId) {
      newTrack.artistId = null;
    }
    if (!createTrackDto.albumId) {
      newTrack.artistId = null;
    }
    return await this.trackRepository.save(newTrack);
  }

  async findAll(): Promise<TrackEntity[]> {
    const tracks = this.trackRepository.find();
    return tracks;
  }

  async findOne(id: string): Promise<TrackEntity | undefined> {
    const track = await this.trackRepository.findOne({ where: { id: id } });
    return track;
  }

  async update(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<TrackEntity | undefined> {
    const updatedTrack = await this.trackRepository.findOne({
      where: { id: id },
    });
    if (!updatedTrack) return undefined;

    if (updateTrackDto.name) updatedTrack.name = updateTrackDto.name;
    if (updateTrackDto.duration)
      updatedTrack.duration = updateTrackDto.duration;
    if (updatedTrack.artistId !== undefined)
      updatedTrack.artistId = updateTrackDto.artistId;
    if (updatedTrack.albumId !== undefined)
      updatedTrack.albumId = updateTrackDto.albumId;

    return await this.trackRepository.save(updatedTrack);
  }

  async remove(id: string): Promise<string | undefined> {
    const result = await this.trackRepository.delete(id);
    if (result.affected === 0) return undefined;
    return `The track with ID #${id} was successfully deleted`;
  }

  async updateArtistIdInTracks(artistId: string): Promise<void> {
    const tracks = await this.trackRepository.find(); // Получаем промис

    tracks.forEach((track) => {
      if (track.artistId === artistId) {
        track.artistId = null;
        this.trackRepository.save(track);
      }
    });
  }

  async updateAlbumIdInTracks(albumId: string): Promise<void> {
    const tracks = await this.trackRepository.find(); // Получаем промис

    tracks.forEach((track) => {
      if (track.artistId === albumId) {
        track.albumId = null;
        this.trackRepository.save(track);
      }
    });
  }

  async getFavorites(ids: Array<string>): Promise<TrackEntity[]> {
    const favouritesArray: Array<TrackEntity> = [];
    for (let i = 0; i < ids.length; i++) {
      const favTrack = await this.findOne(ids[i]);
      if (favTrack) {
        favouritesArray.push(favTrack);
      }
    }
    return favouritesArray;
  }

  async isTrackExist(id: string): Promise<boolean> {
    return !!(await this.findOne(id));
  }
}
