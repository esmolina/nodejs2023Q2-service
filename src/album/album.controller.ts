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
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiNotFoundResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { validateIdByUuid } from '../helpers/validateIdByUuid';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';

@Controller('album')
@ApiTags('albums')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  checkIsNewAlbumNameAvailable(createdAlbumName: string): void {
    const isRecordAvailable =
      this.albumService.checkNewAlbumNameIsAvailable(createdAlbumName);
    if (!isRecordAvailable) {
      // throw new HttpException(
      //   `A album with the name '${createdAlbumName}' already exists`,
      //   HttpStatus.CONFLICT,
      // );
      console.log(`A album with the name '${createdAlbumName}' already exists`);
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
  @ApiCreatedResponse({
    description: 'The album has been created successfully.',
    type: AlbumEntity,
  })
  @ApiBadRequestResponse({ description: 'Album ID (UUID) is incorrect.' })
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
  @ApiOkResponse({
    description: 'Successfully get all albums.',
    type: [AlbumEntity],
  })
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Successfully get the album.',
    type: AlbumEntity,
  })
  @ApiBadRequestResponse({ description: 'Album ID (UUID) is incorrect.' })
  @ApiNotFoundResponse({ description: 'Album with the given ID not found.' })
  findOne(@Param('id') id: string) {
    this.checkIsIsIdValid(id);
    this.checkIsAlbumExist(id);
    return this.albumService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'The album has been updated successfully.',
    type: AlbumEntity,
  })
  @ApiBadRequestResponse({ description: 'Album ID (UUID) is incorrect.' })
  @ApiNotFoundResponse({ description: 'Album with the given ID not found.' })
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    this.checkIsIsIdValid(id);
    this.checkIsAlbumExist(id);

    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'The album has been deleted successfully.',
  })
  @ApiBadRequestResponse({ description: 'Album ID (UUID) is incorrect.' })
  @ApiNotFoundResponse({ description: 'Album with the given ID not found.' })
  remove(@Param('id') id: string) {
    this.checkIsIsIdValid(id);
    this.checkIsAlbumExist(id);
    return this.albumService.remove(id);
  }
}
