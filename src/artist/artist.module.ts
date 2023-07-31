import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ArtistsStore } from './store/artists.storage';
import { AlbumModule } from '../album/album.module';

@Module({
  controllers: [ArtistController],
  providers: [
    ArtistService,
    {
      provide: 'ArtistsStorageInterface',
      useClass: ArtistsStore,
    },
  ],
  imports: [AlbumModule],
})
export class ArtistModule {}
