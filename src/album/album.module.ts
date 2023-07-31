import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumsStore } from './store/albums-storage';
import { TrackModule } from '../track/track.module';
import { AlbumEntity } from './entities/album.entity';

@Module({
  controllers: [AlbumController],
  providers: [
    AlbumService,
    {
      provide: 'AlbumsStorageInterface',
      useClass: AlbumsStore,
    },
  ],
  imports: [TrackModule],
  exports: [AlbumService],
})
export class AlbumModule {}
