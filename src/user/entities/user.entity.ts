import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
  @ApiProperty({
    description: 'The ID of the user',
    type: 'string',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({ description: 'The login of the user', type: 'string' })
  login: string;

  @ApiProperty({
    description:
      "The number shows how many times the user's information has been updated",
    type: 'number',
    format: 'int32',
  })
  version: number;

  @ApiProperty({
    description:
      'The timestamp that reflects the time of the last change in user information',
    type: 'number',
    format: 'int32',
  })
  createdAt: number;

  @ApiProperty({
    description: 'timestamp that reflects the time of account creation',
    type: 'number',
    format: 'int32',
  })
  updatedAt: number;
}
