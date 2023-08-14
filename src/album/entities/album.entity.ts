import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ArtistEntity } from '../../artist/entities/artist.entity';

@Entity('album')
export class AlbumEntity {
  @ApiProperty({
    description: 'The ID of the album',
    type: 'string',
    format: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'The name of the album', type: 'string' })
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @ApiProperty({
    description: 'The year the album was released',
    type: 'number',
    format: 'int32',
  })
  @Column({ type: 'integer', nullable: false })
  year: number;

  @ApiProperty({
    description: 'The ID of the artist (if applicable)',
    type: 'string',
    format: 'uuid',
    nullable: true,
  })
  @Column({ name: 'artistId', type: 'varchar', nullable: true })
  artistId: string | null;

  @ManyToOne(() => ArtistEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artistId', referencedColumnName: 'id' })
  artist: ArtistEntity;
}
