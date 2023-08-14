import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { ArtistEntity } from '../../artist/entities/artist.entity';

@Entity('favArtists')
export class FavArtistsEntity {
  @PrimaryColumn({ name: 'artistId', type: 'uuid' })
  artistId: string | null;

  @ManyToOne(() => ArtistEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'artistId', referencedColumnName: 'id' })
  artist: ArtistEntity;
}
