import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('favs')
export class FavEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
