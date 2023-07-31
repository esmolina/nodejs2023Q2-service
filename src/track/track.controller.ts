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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { validateIdByUuid } from '../helpers/validateIdByUuid';
import { AlbumEntity } from '../album/entities/album.entity';
import { TrackEntity } from './entities/track.entity';

@Controller('track')
@ApiTags('tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  checkIsTrackExist(id: string): void {
    const track = this.trackService.findOne(id);
    if (!track) {
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
    description: 'The track-record has been created successfully.',
    type: TrackEntity,
  })
  @ApiBadRequestResponse({
    description: 'Request body does not contain required fields',
  })
  create(@Body() createAlbumDto: CreateTrackDto) {
    if (createAlbumDto.artistId) {
      this.checkIsIsIdValid(createAlbumDto.artistId);
    }
    return this.trackService.create(createAlbumDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Successfully get all tracks.',
    type: [TrackEntity],
  })
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Successfully get the track.',
    type: AlbumEntity,
  })
  @ApiBadRequestResponse({ description: 'Track ID (UUID) is incorrect.' })
  @ApiNotFoundResponse({ description: 'Track with the given ID not found.' })
  findOne(@Param('id') id: string) {
    this.checkIsIsIdValid(id);
    this.checkIsTrackExist(id);
    return this.trackService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'The track has been updated successfully.',
    type: AlbumEntity,
  })
  @ApiBadRequestResponse({ description: 'Track ID (UUID) is incorrect.' })
  @ApiNotFoundResponse({ description: 'Track with the given ID not found.' })
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    this.checkIsIsIdValid(id);
    this.checkIsTrackExist(id);

    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'The track has been deleted successfully.',
  })
  @ApiBadRequestResponse({ description: 'Track ID (UUID) is incorrect.' })
  @ApiNotFoundResponse({ description: 'Track with the given ID not found.' })
  remove(@Param('id') id: string) {
    this.checkIsIsIdValid(id);
    this.checkIsTrackExist(id);
    return this.trackService.remove(id);
  }
}
