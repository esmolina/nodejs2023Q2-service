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
  NotFoundException,
  HttpException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { validateIdByUuid } from '../helpers/validateIdByUuid';
import { UserEntity } from './entities/user.entity';

@Controller('user')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  async checkIsLoginAvailable(createdUserLogin: string): Promise<void> {
    const isLoginAvailable = await this.userService.checkLoginIsAvailable(
      createdUserLogin,
    );
    if (!isLoginAvailable) {
      // throw new HttpException(
      //   `A user with the login '${createdUserLogin}' already exists`,
      //   HttpStatus.CONFLICT,
      // );
      console.log(`A user with the login '${createdUserLogin}' already exists`);
    }
  }

  async checkIsUserExist(id: string): Promise<void> {
    const user = await this.userService.getUserWithPassword(id);
    if (!user) {
      throw new NotFoundException(`Record with id #${id} doesn't exist`);
    }
  }

  async checkIsIdValid(id: string): Promise<void> {
    if (!validateIdByUuid(id)) {
      throw new HttpException(
        `Id #${id} is invalid (not uuid)`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async checkErrorsChangePassword(
    id: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<void> {
    const user = await this.userService.getUserWithPassword(id);
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
  @ApiCreatedResponse({
    description: 'The user has been created successfully.',
    type: UserEntity,
  })
  @ApiBadRequestResponse({
    description: 'Request body does not contain required fields.',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    await this.checkIsLoginAvailable(createUserDto.login);
    return this.userService.create(createUserDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Successfully get all users.',
    type: [UserEntity],
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Successfully get the user.',
    type: UserEntity,
  })
  @ApiBadRequestResponse({ description: 'User ID (UUID) is incorrect.' })
  @ApiNotFoundResponse({ description: 'User with the given ID not found.' })
  async findOne(@Param('id') id: string) {
    await this.checkIsIdValid(id);
    await this.checkIsUserExist(id);
    return this.userService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'The user has been updated successfully.',
    type: UserEntity,
  })
  @ApiBadRequestResponse({ description: 'User ID (UUID) is incorrect.' })
  @ApiNotFoundResponse({ description: 'User with the given ID not found.' })
  @ApiForbiddenResponse({ description: 'Old password is wrong.' })
  async update(
    @Param('id') id: string,
    @Body() updateUserPasswordDto: UpdatePasswordDto,
  ) {
    await this.checkIsIdValid(id);
    await this.checkIsUserExist(id);
    await this.checkErrorsChangePassword(
      id,
      updateUserPasswordDto.oldPassword,
      updateUserPasswordDto.newPassword,
    );

    return this.userService.update(id, updateUserPasswordDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'The user has been deleted successfully.',
  })
  @ApiBadRequestResponse({ description: 'User ID (UUID) is incorrect.' })
  @ApiNotFoundResponse({ description: 'User with the given ID not found.' })
  async remove(@Param('id') id: string) {
    await this.checkIsIdValid(id);
    await this.checkIsUserExist(id);
    return this.userService.remove(id);
  }
}
