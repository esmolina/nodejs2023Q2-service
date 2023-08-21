import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({ description: 'Access token', format: 'string' })
  accessToken: string;

  @ApiProperty({ description: 'Refresh token', format: 'string' })
  refreshToken: string;
}
