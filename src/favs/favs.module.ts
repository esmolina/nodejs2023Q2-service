import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { ArtistModule } from '../artist/artist.module';
import { AlbumModule } from '../album/album.module';
import { TrackModule } from '../track/track.module';
import { ArtistEntity } from '../artist/entities/artist.entity';
import { TrackEntity } from '../track/entities/track.entity';
import { AlbumEntity } from '../album/entities/album.entity';
import { FavArtistsEntity } from './entities/fav-artist.entity';
import { FavAlbumsEntity } from './entities/fav-album.entity';
import { FavTracksEntity } from './entities/fav-track.entity';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [
    TypeOrmModule.forFeature([
      FavArtistsEntity,
      FavAlbumsEntity,
      FavTracksEntity,
      ArtistEntity,
      AlbumEntity,
      TrackEntity,
    ]),
    forwardRef(() => ArtistModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => TrackModule),
  ],
  exports: [FavsService],
})
export class FavsModule {}
