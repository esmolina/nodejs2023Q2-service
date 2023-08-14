import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { TrackEntity } from '../../track/entities/track.entity';

@Entity('favTracks')
export class FavTracksEntity {
  @PrimaryColumn({ name: 'trackId', type: 'uuid' })
  trackId: string | null;

  @ManyToOne(() => TrackEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'trackId', referencedColumnName: 'id' })
  track: TrackEntity;
}
