import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../guard/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthEntity } from './entities/auth.entity';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthEntity,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  imports: [forwardRef(() => UserModule), JwtModule.register({})],
  exports: [AuthService],
})
export class AuthModule {}
