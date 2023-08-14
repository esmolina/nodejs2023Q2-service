import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user')
export class UserEntity {
  @ApiProperty({
    description: 'The ID of the user',
    type: 'string',
    format: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'The login of the user', type: 'string' })
  @Column({ type: 'varchar', nullable: false })
  login: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @ApiProperty({
    description:
      "The number shows how many times the user's information has been updated",
    type: 'number',
    format: 'int32',
  })
  @Column({ type: 'integer', nullable: true })
  version: number;

  @ApiProperty({
    description:
      'The timestamp that reflects the time of the last change in user information',
    type: 'number',
    format: 'int32',
  })
  @Column({ type: 'bigint', nullable: true })
  createdAt: number;

  @ApiProperty({
    description: 'timestamp that reflects the time of account creation',
    type: 'number',
    format: 'int32',
  })
  @Column({ type: 'bigint', nullable: true })
  updatedAt: number;

  // another way to return a user without a password
  // toResponse() {
  //   const { id, login, version, createdAt, updatedAt } = this;
  //   return { id, login, version, createdAt, updatedAt };
  // }
}
