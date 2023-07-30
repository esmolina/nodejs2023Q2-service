import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumsStore } from './store/albums-storage';
import { ArtistModule } from '../artist/artist.module';

@Module({
  controllers: [AlbumController],
  providers: [
    AlbumService,
    {
      provide: 'AlbumsStorageInterface',
      useClass: AlbumsStore,
    },
  ],
  imports: [ArtistModule],
})
export class AlbumModule {}
