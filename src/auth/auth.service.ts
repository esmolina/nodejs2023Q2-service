import {
  HttpException,
  HttpStatus,
  Injectable,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';
import { config } from 'dotenv';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AuthEntity } from './entities/auth.entity';

const env = config();
const JWT_SECRET_ACCESS_KEY = env.parsed.JWT_SECRET_KEY;
const JWT_SECRET_REFRESH_KEY = env.parsed.JWT_SECRET_REFRESH_KEY;
const TOKEN_ACCESS_EXPIRE_TIME = env.parsed.TOKEN_EXPIRE_TIME;
const TOKEN_REFRESH_EXPIRE_TIME = env.parsed.TOKEN_REFRESH_EXPIRE_TIME;

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(authDto: CreateUserDto) {
    return await this.userService.signUp(authDto);
  }

  async login(authDto: CreateUserDto) {
    const loggedUser = await this.userService.getUserWithLogin(authDto.login);
    const isPasswordValid = await this.userService.validateUserPassword(
      authDto,
    );
    if (!loggedUser) {
      throw new HttpException(`No user with such login`, HttpStatus.FORBIDDEN);
    }
    if (!isPasswordValid) {
      throw new HttpException(`Password is wrong`, HttpStatus.FORBIDDEN);
    }

    const authTokens: AuthEntity = {
      accessToken: await this.getAccessToken(loggedUser.id, loggedUser.login),
      refreshToken: await this.getRefreshToken(loggedUser.id, loggedUser.login),
    };

    return authTokens;
  }

  async refresh() {
    return `This action refresh`;
  }

  private async getAccessToken(userId: string, login: string) {
    const payload: JwtPayload = { userId, login };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: JWT_SECRET_ACCESS_KEY,
      expiresIn: TOKEN_ACCESS_EXPIRE_TIME,
    });
    return accessToken;
  }

  private async getRefreshToken(userId: string, login: string) {
    const payload: JwtPayload = { userId, login };
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: JWT_SECRET_REFRESH_KEY,
      expiresIn: TOKEN_REFRESH_EXPIRE_TIME,
    });
    return refreshToken;
  }
}
