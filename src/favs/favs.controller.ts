import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { FavsService } from './favs.service';
import { validateIdByUuid } from '../helpers/validateIdByUuid';
import { FavEntity } from './entities/fav.entity';

@Controller('favs')
@ApiTags('favorites')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  checkIsIsIdValid(id: string): void {
    if (!validateIdByUuid(id)) {
      throw new HttpException(
        `Id #${id} is invalid (not uuid)`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  checkIsNotFavorite(type: 'artist' | 'album' | 'track', id: string): void {
    const isNotFavorite = this.favsService.checkIsIdNotFavorites(type, id);
    if (isNotFavorite) {
      throw new HttpException(`Is not favorite`, HttpStatus.BAD_REQUEST);
    }
  }

  setErrorResourceNotExist(type: 'artist' | 'album' | 'track', id: string) {
    throw new HttpException(
      `The ${type} with ID #${id} doesn't exist`,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Successfully get all favorites.',
    type: [FavEntity],
  })
  getAllFavorites() {
    return this.favsService.getFavs();
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'The artist successfully added to favorites.',
  })
  @ApiBadRequestResponse({ description: 'Artist ID (UUID) is incorrect.' })
  @ApiUnprocessableEntityResponse({
    description: "The artist with the given ID doesn't exist.",
  })
  addArtistToFavorites(@Param('id') artistId: string) {
    this.checkIsIsIdValid(artistId);
    if (!this.favsService.checkIsArtistExist(artistId)) {
      this.setErrorResourceNotExist('artist', artistId);
    }
    this.favsService.addToFavorites('artist', artistId);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'The artist has been successfully removed from favorites.',
  })
  @ApiBadRequestResponse({ description: 'Artist ID (UUID) is incorrect.' })
  @ApiNotFoundResponse({
    description: 'The artist with the given ID is not favorite.',
  })
  removeArtistFromFavorites(@Param('id') artistId: string) {
    this.checkIsIsIdValid(artistId);
    this.checkIsNotFavorite('artist', artistId);
    this.favsService.removeFromFavorites('artist', artistId);
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'The album successfully added to favorites.',
  })
  @ApiBadRequestResponse({ description: 'Album ID (UUID) is incorrect.' })
  @ApiUnprocessableEntityResponse({
    description: "The album with the given ID doesn't exist.",
  })
  addAlbumToFavorites(@Param('id') albumId: string) {
    this.checkIsIsIdValid(albumId);
    if (!this.favsService.checkIsAlbumExist(albumId)) {
      this.setErrorResourceNotExist('album', albumId);
    }
    this.favsService.addToFavorites('album', albumId);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'The album has been successfully removed from favorites.',
  })
  @ApiBadRequestResponse({ description: 'Album ID (UUID) is incorrect.' })
  @ApiNotFoundResponse({
    description: 'The album with the given ID is not favorite.',
  })
  removeAlbumFromFavorites(@Param('id') albumId: string) {
    this.checkIsIsIdValid(albumId);
    this.checkIsNotFavorite('album', albumId);
    this.favsService.removeFromFavorites('album', albumId);
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'The track successfully added to favorites.',
  })
  @ApiBadRequestResponse({ description: 'Track ID (UUID) is incorrect.' })
  @ApiUnprocessableEntityResponse({
    description: "The track with the given ID doesn't exist.",
  })
  addTrackToFavorites(@Param('id') trackId: string) {
    this.checkIsIsIdValid(trackId);
    if (!this.favsService.checkIsTrackExist(trackId)) {
      this.setErrorResourceNotExist('track', trackId);
    }
    this.favsService.addToFavorites('track', trackId);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'The track has been successfully removed from favorites.',
  })
  @ApiBadRequestResponse({ description: 'Track ID (UUID) is incorrect.' })
  @ApiNotFoundResponse({
    description: 'The track with the given ID is not favorite.',
  })
  removeTrackFromFavorites(@Param('id') trackId: string) {
    this.checkIsIsIdValid(trackId);
    this.checkIsNotFavorite('track', trackId);
    this.favsService.removeFromFavorites('track', trackId);
  }
}
