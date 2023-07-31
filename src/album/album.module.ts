import { forwardRef, Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumsStore } from './store/albums-storage';
import { TrackModule } from '../track/track.module';
import { FavsModule } from '../favs/favs.module';

@Module({
  controllers: [AlbumController],
  providers: [
    AlbumService,
    {
      provide: 'AlbumsStorageInterface',
      useClass: AlbumsStore,
    },
  ],
  imports: [forwardRef(() => TrackModule), forwardRef(() => FavsModule)],
  exports: [AlbumService],
})
export class AlbumModule {}
