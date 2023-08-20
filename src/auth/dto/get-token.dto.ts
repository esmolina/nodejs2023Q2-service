import { ApiProperty } from '@nestjs/swagger';

export class GetTokenDto {
  @ApiProperty({ description: 'Access token', format: 'string' })
  accessToken: string;

  @ApiProperty({ description: 'Refresh token', format: 'string' })
  refreshToken: string;
}
