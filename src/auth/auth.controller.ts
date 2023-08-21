import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Public } from '../guard/set.public';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  signUp(@Body() signupDto: CreateUserDto) {
    return this.authService.signUp(signupDto);
  }

  @Public()
  @Post('login')
  signIn(@Body() signinDto: CreateUserDto) {
    return this.authService.login(signinDto);
  }

  // @Post('refresh')
  // refresh(@Body() signinDto: CreateUserDto) {}
}
