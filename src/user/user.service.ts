import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersStorageInterface } from './interfaces/user-storage.interface';
import { UserInterface } from './interfaces/user-interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('UsersStorageInterface') private storage: UsersStorageInterface,
  ) {}

  checkLoginIsAvailable(createdUserLogin: string): boolean {
    return this.storage.checkTheUserNotExists(createdUserLogin);
  }

  create(createUserDto: CreateUserDto): UserEntity {
    return this.storage.createNewUser(createUserDto);
  }

  findAll(): Array<UserEntity> {
    return this.storage.getUsers();
  }

  findOne(id: string): UserEntity | undefined {
    return this.storage.getUserById(id);
  }

  findUserWitchAllAtributes(id: string): UserInterface | undefined {
    return this.storage.getUserByIdWitchPassword(id);
  }

  update(
    id: string,
    updateUserPasswordDto: UpdatePasswordDto,
  ): UserEntity | undefined {
    return this.storage.updateUserPassword(id, updateUserPasswordDto);
  }

  remove(id: string): string | undefined {
    return this.storage.removeUser(id);
  }
}
