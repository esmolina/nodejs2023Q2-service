import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TracksStore } from './store/tracks-storage';

@Module({
  controllers: [TrackController],
  providers: [
    TrackService,
    {
      provide: 'TracksStorageInterface',
      useClass: TracksStore,
    },
  ],
  exports: [TrackService],
})
export class TrackModule {}
