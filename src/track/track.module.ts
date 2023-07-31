import { Module, forwardRef } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TracksStore } from './store/tracks-storage';
import { FavsModule } from '../favs/favs.module';

@Module({
  controllers: [TrackController],
  providers: [
    TrackService,
    {
      provide: 'TracksStorageInterface',
      useClass: TracksStore,
    },
  ],
  imports: [forwardRef(() => FavsModule)],
  exports: [TrackService],
})
export class TrackModule {}
