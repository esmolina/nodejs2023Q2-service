import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TrackModule } from '../track/track.module';
import { FavsModule } from '../favs/favs.module';
import { AlbumEntity } from './entities/album.entity';
import { ArtistEntity } from '../artist/entities/artist.entity';
import { ArtistModule } from '../artist/artist.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, AlbumEntity],
  imports: [
    TypeOrmModule.forFeature([AlbumEntity, ArtistEntity]),
    forwardRef(() => TrackModule),
    forwardRef(() => FavsModule),
    forwardRef(() => ArtistModule),
  ],
  exports: [AlbumService, AlbumEntity],
})
export class AlbumModule {}
