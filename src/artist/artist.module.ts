import { forwardRef, Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { AlbumModule } from '../album/album.module';
import { TrackModule } from '../track/track.module';
import { FavsModule } from '../favs/favs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [
    TypeOrmModule.forFeature([ArtistEntity]),
    forwardRef(() => AlbumModule),
    forwardRef(() => TrackModule),
    forwardRef(() => FavsModule),
  ],
  exports: [ArtistService],
})
export class ArtistModule {}
