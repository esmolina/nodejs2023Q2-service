import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { validateIdByUuid } from '../helpers/validateIdByUuid';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  checkIsLoginAvailable(createdUserLogin: string): void {
    const isLoginAvailable =
      this.userService.checkLoginIsAvailable(createdUserLogin);
    if (!isLoginAvailable) {
      throw new HttpException(
        `A user with the login '${createdUserLogin}' already exists`,
        HttpStatus.CONFLICT,
      );
    }
  }

  checkIsUserExist(id: string): void {
    const user = this.userService.findUserWitchAllAtributes(id);
    if (!user) {
      throw new HttpException(
        `Record with id #${id}} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  checkIsIdValid(id: string): void {
    if (!validateIdByUuid(id)) {
      throw new HttpException(
        `Id #${id} is invalid (not uuid)`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  checkErrorsChangePassword(
    id: string,
    oldPassword: string,
    newPassword: string,
  ): void {
    const user = this.userService.findUserWitchAllAtributes(id);
    if (user.password !== oldPassword) {
      throw new HttpException(`Old password is wrong`, HttpStatus.FORBIDDEN);
    }
    if (user.password === newPassword) {
      throw new HttpException(
        `The old password and the new password are the same`,
        HttpStatus.CONFLICT,
      );
    }
  }

  @Post()
  //may use @HttpCode(201)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    this.checkIsLoginAvailable(createUserDto.login);
    return this.userService.create(createUserDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    this.checkIsIdValid(id);
    this.checkIsUserExist(id);
    return this.userService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateUserPasswordDto: UpdatePasswordDto,
  ) {
    this.checkIsIdValid(id);
    this.checkIsUserExist(id);
    this.checkErrorsChangePassword(
      id,
      updateUserPasswordDto.oldPassword,
      updateUserPasswordDto.newPassword,
    );

    return this.userService.update(id, updateUserPasswordDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.checkIsIdValid(id);
    this.checkIsUserExist(id);
    return this.userService.remove(id);
  }
}
