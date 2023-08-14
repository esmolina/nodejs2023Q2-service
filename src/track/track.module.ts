import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { FavsModule } from '../favs/favs.module';
import { TrackEntity } from './entities/track.entity';
import { ArtistEntity } from '../artist/entities/artist.entity';
import { AlbumEntity } from '../album/entities/album.entity';

@Module({
  controllers: [TrackController],
  providers: [TrackService, TrackEntity],
  imports: [
    TypeOrmModule.forFeature([TrackEntity, ArtistEntity, AlbumEntity]),
    forwardRef(() => FavsModule),
  ],
  exports: [TrackService, TrackEntity],
})
export class TrackModule {}
