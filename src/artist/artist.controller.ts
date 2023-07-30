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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { validateIdByUuid } from '../user/helpers/validateIdByUuid';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  checkIsNewArtistNameAvailable(createdArtistName: string): void {
    const isRecordAvailable =
      this.artistService.checkNewArtistNAmeIsAvailable(createdArtistName);
    if (!isRecordAvailable) {
      throw new HttpException(
        `A artist with the name '${createdArtistName}' already exists`,
        HttpStatus.CONFLICT,
      );
    }
  }

  checkIsArtistExist(id: string): void {
    const artist = this.artistService.findOne(id);
    if (!artist) {
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
  create(@Body() createArtistDto: CreateArtistDto) {
    this.checkIsNewArtistNameAvailable(createArtistDto.name);
    return this.artistService.create(createArtistDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    this.checkIsIsIdValid(id);
    this.checkIsArtistExist(id);
    return this.artistService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    this.checkIsIsIdValid(id);
    this.checkIsArtistExist(id);

    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.checkIsIsIdValid(id);
    this.checkIsArtistExist(id);
    return this.artistService.remove(id);
  }
}
