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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { validateIdByUuid } from '../helpers/validateIdByUuid';

@Controller('track')
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
  create(@Body() createAlbumDto: CreateTrackDto) {
    if (createAlbumDto.artistId) {
      this.checkIsIsIdValid(createAlbumDto.artistId);
    }
    return this.trackService.create(createAlbumDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    this.checkIsIsIdValid(id);
    this.checkIsTrackExist(id);
    return this.trackService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    this.checkIsIsIdValid(id);
    this.checkIsTrackExist(id);

    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.checkIsIsIdValid(id);
    this.checkIsTrackExist(id);
    return this.trackService.remove(id);
  }
}
