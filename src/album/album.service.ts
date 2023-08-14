import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
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
}
