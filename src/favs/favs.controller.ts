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
import { FavsService } from './favs.service';
import { validateIdByUuid } from '../helpers/validateIdByUuid';

@Controller('favs')
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
  getAllFavorites() {
    return this.favsService.getFavs();
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  addArtistToFavorites(@Param('id') artistId: string) {
    this.checkIsIsIdValid(artistId);
    if (!this.favsService.checkIsArtistExist(artistId)) {
      this.setErrorResourceNotExist('artist', artistId);
    }
    this.favsService.addToFavorites('artist', artistId);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtistFromFavorites(@Param('id') artistId: string) {
    this.checkIsIsIdValid(artistId);
    this.checkIsNotFavorite('artist', artistId);
    this.favsService.removeFromFavorites('artist', artistId);
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  addAlbumToFavorites(@Param('id') albumId: string) {
    this.checkIsIsIdValid(albumId);
    if (!this.favsService.checkIsAlbumExist(albumId)) {
      this.setErrorResourceNotExist('album', albumId);
    }
    this.favsService.addToFavorites('album', albumId);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbumFromFavorites(@Param('id') albumId: string) {
    this.checkIsIsIdValid(albumId);
    this.checkIsNotFavorite('album', albumId);
    this.favsService.removeFromFavorites('album', albumId);
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  addTrackToFavorites(@Param('id') trackId: string) {
    this.checkIsIsIdValid(trackId);
    if (!this.favsService.checkIsTrackExist(trackId)) {
      this.setErrorResourceNotExist('track', trackId);
    }
    this.favsService.addToFavorites('track', trackId);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrackFromFavorites(@Param('id') trackId: string) {
    this.checkIsIsIdValid(trackId);
    this.checkIsNotFavorite('track', trackId);
    this.favsService.removeFromFavorites('track', trackId);
  }
}
