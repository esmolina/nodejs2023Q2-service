import { forwardRef, Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { ArtistModule } from '../artist/artist.module';
import { AlbumModule } from '../album/album.module';
import { TrackModule } from '../track/track.module';
import { FavsStore } from './store/favs.storage';

@Module({
  controllers: [FavsController],
  providers: [
    FavsService,
    {
      provide: 'FavsStorageInterface',
      useClass: FavsStore,
    },
  ],
  imports: [
    forwardRef(() => ArtistModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => TrackModule),
  ],
  exports: [FavsService],
})
export class FavsModule {}
