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
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { validateIdByUuid } from '../helpers/validateIdByUuid';
import { ArtistEntity } from './entities/artist.entity';

@Controller('artist')
@ApiTags('artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  checkIsNewArtistNameAvailable(createdArtistName: string): void {
    const isRecordAvailable =
      this.artistService.checkNewArtistNAmeIsAvailable(createdArtistName);
    if (!isRecordAvailable) {
      // throw new HttpException(
      //   `A artist with the name '${createdArtistName}' already exists`,
      //   HttpStatus.CONFLICT,
      // );
      console.log(
        `A artist with the name '${createdArtistName}' already exists`,
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
  @ApiCreatedResponse({
    description: 'The artist has been created.',
    type: ArtistEntity,
  })
  @ApiBadRequestResponse({
    description: 'Request body does not contain required fields',
  })
  create(@Body() createArtistDto: CreateArtistDto) {
    this.checkIsNewArtistNameAvailable(createArtistDto.name);
    return this.artistService.create(createArtistDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Successfully get all artists.',
    type: [ArtistEntity],
  })
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Successfully get artis tby ID.',
    type: ArtistEntity,
  })
  @ApiNotFoundResponse({ description: 'Artist with the given ID not found.' })
  @ApiBadRequestResponse({
    description: 'Invalid artist ID (UUID).',
  })
  findOne(@Param('id') id: string) {
    this.checkIsIsIdValid(id);
    this.checkIsArtistExist(id);
    return this.artistService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'The artist has been updated successfully.',
    type: ArtistEntity,
  })
  @ApiNotFoundResponse({ description: 'Artist with the given ID not found.' })
  @ApiBadRequestResponse({
    description: 'Invalid artist ID (UUID).',
  })
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    this.checkIsIsIdValid(id);
    this.checkIsArtistExist(id);

    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'The artist has been deleted successfully.',
  })
  @ApiNotFoundResponse({ description: 'Artist with the given ID not found.' })
  @ApiBadRequestResponse({
    description: 'Invalid artist ID (UUID).',
  })
  remove(@Param('id') id: string) {
    this.checkIsIsIdValid(id);
    this.checkIsArtistExist(id);
    return this.artistService.remove(id);
  }
}
