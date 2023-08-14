import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { AlbumEntity } from '../../album/entities/album.entity';

@Entity('favAlbums')
export class FavAlbumsEntity {
  @PrimaryColumn({ name: 'albumId', type: 'uuid' })
  albumId: string | null;

  @ManyToOne(() => AlbumEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'albumId', referencedColumnName: 'id' })
  album: AlbumEntity;
}
