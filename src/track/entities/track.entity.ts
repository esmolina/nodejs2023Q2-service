import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('track')
export class TrackEntity {
  @ApiProperty({
    description: 'The ID of the track',
    type: 'string',
    format: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'The name of the track', type: 'string' })
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @ApiProperty({
    description: 'The ID of the artist',
    type: 'string',
    format: 'uuid',
  })
  @Column({ type: 'varchar', nullable: true })
  artistId: string | null;

  @ApiProperty({
    description: 'The ID of the album',
    type: 'string',
    format: 'uuid',
  })
  @Column({ type: 'varchar', nullable: true })
  albumId: string | null;

  @ApiProperty({
    description: 'The track duration, integer number',
    type: 'number',
    format: 'int32',
  })
  @Column({ type: 'integer', nullable: false })
  duration: number;
}
