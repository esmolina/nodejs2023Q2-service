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

@Controller('favs')
@ApiTags('favorites')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  async checkIsIsIdValid(id: string): Promise<void> {
    if (!validateIdByUuid(id)) {
      throw new HttpException(
        `Id #${id} is invalid (not uuid)`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // checkIsNotFavorite(type: 'artist' | 'album' | 'track', id: string): void {
  //   const isNotFavorite = this.favsService.checkIsIdNotFavorites(type, id);
  //   if (isNotFavorite) {
  //     throw new HttpException(`Is not favorite`, HttpStatus.BAD_REQUEST);
  //   }
  // }

  // setErrorResourceNotExist(type: 'artist' | 'album' | 'track', id: string) {
  //   throw new HttpException(
  //     `The ${type} with ID #${id} doesn't exist`,
  //     HttpStatus.UNPROCESSABLE_ENTITY,
  //   );
  // }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Successfully get all favorites.',
  })
  async getAllFavorites() {
    return await this.favsService.getFavs();
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
  async addArtistToFavorites(@Param('id') artistId: string) {
    await this.checkIsIsIdValid(artistId);
    await this.favsService.addToFavorites('artist', artistId);
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
  async removeArtistFromFavorites(@Param('id') artistId: string) {
    await this.checkIsIsIdValid(artistId);
    await this.favsService.removeFromFavorites('artist', artistId);
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
  async addAlbumToFavorites(@Param('id') albumId: string) {
    await this.checkIsIsIdValid(albumId);
    await this.favsService.addToFavorites('album', albumId);
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
  async removeAlbumFromFavorites(@Param('id') albumId: string) {
    await this.checkIsIsIdValid(albumId);
    await this.favsService.removeFromFavorites('album', albumId);
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
  async addTrackToFavorites(@Param('id') trackId: string) {
    await this.checkIsIsIdValid(trackId);
    await this.favsService.addToFavorites('track', trackId);
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
  async removeTrackFromFavorites(@Param('id') trackId: string) {
    await this.checkIsIsIdValid(trackId);
    await this.favsService.removeFromFavorites('track', trackId);
  }
}
