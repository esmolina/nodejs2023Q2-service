import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { validateIdByUuid } from '../user/helpers/validateIdByUuid';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  checkIsNewAlbumNameAvailable(createdAlbumName: string): void {
    const isRecordAvailable =
      this.albumService.checkNewAlbumNameIsAvailable(createdAlbumName);
    if (!isRecordAvailable) {
      throw new HttpException(
        `A album with the name '${createdAlbumName}' already exists`,
        HttpStatus.CONFLICT,
      );
    }
  }

  checkIsAlbumExist(id: string): void {
    const album = this.albumService.findOne(id);
    if (!album) {
      throw new HttpException(
        `Record with id #${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  checkIsIsIdValid(id: string): void {
    if (!validateIdByUuid(id)) {
      throw new HttpException(
        `Id #${id} is invalid (not uuid)`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAlbumDto: CreateAlbumDto) {
    this.checkIsNewAlbumNameAvailable(createAlbumDto.name);
    if (createAlbumDto.artistId) {
      this.checkIsIsIdValid(createAlbumDto.artistId);
    }
    this.checkIsNewAlbumNameAvailable(createAlbumDto.name);
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    this.checkIsIsIdValid(id);
    this.checkIsAlbumExist(id);
    return this.albumService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    this.checkIsIsIdValid(id);
    this.checkIsAlbumExist(id);

    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.checkIsIsIdValid(id);
    this.checkIsAlbumExist(id);
    return this.albumService.remove(id);
  }
}
