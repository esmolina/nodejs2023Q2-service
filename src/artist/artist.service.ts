import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { FavsService } from '../favs/favs.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
    @Inject(forwardRef(() => AlbumService))
    private albumsService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private tracksService: TrackService,
    @Inject(forwardRef(() => FavsService))
    private favsService: FavsService,
  ) {}

  async create(createArtistDto: CreateArtistDto): Promise<ArtistEntity> {
    const newArtist = this.artistRepository.create(createArtistDto);
    return await this.artistRepository.save(newArtist);
  }

  async findAll(): Promise<ArtistEntity[]> {
    const artists = this.artistRepository.find();
    return artists;
  }

  async findOne(id: string): Promise<ArtistEntity | undefined> {
    const artist = await this.artistRepository.findOne({ where: { id: id } });
    return artist;
  }

  async update(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<ArtistEntity | undefined> {
    const updatedArtist = await this.artistRepository.findOne({
      where: { id: id },
    });
    if (!updatedArtist) return undefined;

    updatedArtist.name = updateArtistDto.name ?? updatedArtist.name;
    updatedArtist.grammy = updateArtistDto.grammy ?? updatedArtist.grammy;

    return this.artistRepository.save(updatedArtist);
  }

  async remove(id: string): Promise<string | undefined> {
    const result = await this.artistRepository.delete(id);
    if (result.affected === 0) return undefined;
    await this.albumsService.updateArtistIdInAlbums(id);
    await this.tracksService.updateArtistIdInTracks(id);
    await this.favsService.removeFromFavorites('artist', id);
    return `The artist with ID #${id} was successfully deleted`;
  }

  async getFavorites(ids: Array<string>): Promise<ArtistEntity[]> {
    const favouritesArray: Array<ArtistEntity> = [];
    for (let i = 0; i < ids.length; i++) {
      const favArtist = await this.findOne(ids[i]);
      if (favArtist) {
        favouritesArray.push(favArtist);
      }
    }
    return favouritesArray;
  }

  async isArtistExist(id: string): Promise<boolean> {
    return !!(await this.findOne(id));
  }

  async checkNewArtistNameIsExist(
    createdArtistLogin: string,
  ): Promise<boolean> {
    return !!(await this.artistRepository.findOne({
      where: { name: createdArtistLogin },
    }));
  }
}
