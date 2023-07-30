import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ArtistsStore } from './store/artists.storage';

@Module({
  controllers: [ArtistController],
  providers: [
    ArtistService,
    {
      provide: 'ArtistsStorageInterface',
      useClass: ArtistsStore,
    },
  ],
})
export class ArtistModule {}
