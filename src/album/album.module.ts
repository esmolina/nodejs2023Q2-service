import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TrackModule } from '../track/track.module';
import { FavsModule } from '../favs/favs.module';
import { AlbumEntity } from './entities/album.entity';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [
    TypeOrmModule.forFeature([AlbumEntity]),
    forwardRef(() => TrackModule),
    forwardRef(() => FavsModule),
  ],
  exports: [AlbumService],
})
export class AlbumModule {}
