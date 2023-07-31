import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumsStore } from './store/albums-storage';

@Module({
  controllers: [AlbumController],
  providers: [
    AlbumService,
    {
      provide: 'AlbumsStorageInterface',
      useClass: AlbumsStore,
    },
  ],
  exports: [AlbumService],
})
export class AlbumModule {}
