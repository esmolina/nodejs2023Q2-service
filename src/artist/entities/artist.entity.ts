import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('artist')
export class ArtistEntity {
  @ApiProperty({
    description: 'The ID of the artist',
    type: 'string',
    format: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'The name of the artist', type: 'string' })
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @ApiProperty({
    description: 'If the artist has Grammy-prize, this flag will be true',
    type: 'boolean',
  })
  @Column({ type: 'boolean', nullable: false })
  grammy: boolean;
}
