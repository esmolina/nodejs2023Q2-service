import {
  HttpException,
  HttpStatus,
  Injectable,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async signUp(authDto: CreateUserDto) {
    return await this.userService.signUp(authDto);
  }

  async login(authDto: CreateUserDto) {
    const isPasswordValid = await this.userService.validateUserPassword(
      authDto,
    );
    if (!isPasswordValid) {
      throw new HttpException(`Old password is wrong`, HttpStatus.FORBIDDEN);
    }
  }

  refresh() {
    return `This action refresh`;
  }
}
