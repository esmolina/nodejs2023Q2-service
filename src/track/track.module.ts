import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { FavsModule } from '../favs/favs.module';
import { TrackEntity } from './entities/track.entity';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [
    TypeOrmModule.forFeature([TrackEntity]),
    forwardRef(() => FavsModule),
  ],
  exports: [TrackService],
})
export class TrackModule {}
