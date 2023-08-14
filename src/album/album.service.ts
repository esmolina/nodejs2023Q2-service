import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';
import { TrackService } from '../track/track.service';
import { FavsService } from '../favs/favs.service';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    @Inject(forwardRef(() => TrackService))
    private tracksService: TrackService,
    @Inject(forwardRef(() => FavsService))
    private favsService: FavsService,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<AlbumEntity> {
    const newAlbum = this.albumRepository.create(createAlbumDto);
    if (!createAlbumDto.artistId) {
      newAlbum.artistId = null;
    }
    return await this.albumRepository.save(newAlbum);
  }

  async findAll(): Promise<AlbumEntity[]> {
    const albums = this.albumRepository.find();
    return albums;
  }

  async findOne(id: string): Promise<AlbumEntity | undefined> {
    const album = await this.albumRepository.findOne({ where: { id: id } });
    return album;
  }

  async update(
    id: string,
    updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumEntity | undefined> {
    const album = await this.albumRepository.findOne({ where: { id: id } });
    if (!album) return undefined;

    if (updateAlbumDto.name) album.name = updateAlbumDto.name;
    if (updateAlbumDto.year) album.year = updateAlbumDto.year;
    if (updateAlbumDto.artistId !== undefined)
      album.artistId = updateAlbumDto.artistId;

    return this.albumRepository.save(album);
  }

  async remove(id: string): Promise<string | undefined> {
    const result = await this.albumRepository.delete(id);
    if (result.affected === 0) return undefined;
    return `The album with ID #${id} was successfully deleted`;
  }

  async updateArtistIdInAlbums(artistId: string): Promise<void> {
    await this.albumRepository
      .createQueryBuilder()
      .update(AlbumEntity)
      .set({ artistId: null })
      .where('artistId = :artistId', { artistId })
      .execute();
  }

  async getFavorites(ids: Array<string>): Promise<AlbumEntity[]> {
    const favouritesArray: Array<AlbumEntity> = [];
    for (const id of ids) {
      const favAlbum = await this.findOne(id);
      if (favAlbum) {
        favouritesArray.push(favAlbum);
      }
    }
    return favouritesArray;
  }
}
