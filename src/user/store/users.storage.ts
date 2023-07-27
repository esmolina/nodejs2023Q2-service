import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { UsersStorageInterface } from '../interfaces/user-storage.interface';
import { UserInterface } from '../interfaces/user-interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { getUserWithoutPassword } from '../helpers/getUserWithoutPassword';
import { UpdatePasswordDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersStore implements UsersStorageInterface {
  private users: Array<UserInterface> = [];

  checkTheUserNotExists(login: string): boolean {
    const userIndex = this.users.findIndex((user) => user.login === login);
    return userIndex === -1;
  }

  createNewUser(createUserDto: CreateUserDto): UserEntity {
    const newUser: UserInterface = {
      id: uuid(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);
    return getUserWithoutPassword(newUser);
  }

  getUsers(): Array<UserEntity> {
    return this.users.map(({ id, login, version, createdAt, updatedAt }) => ({
      id,
      login,
      version,
      createdAt,
      updatedAt,
    }));
  }

  getUserById(id: string): UserEntity | undefined {
    const user = this.users.find((user) => user.id === id);
    if (!user) return undefined;
    return getUserWithoutPassword(user);
  }

  getUserByIdWitchPassword(id: string): UserInterface | undefined {
    const user = this.users.find((user) => user.id === id);
    if (!user) return undefined;
    return user;
  }

  updateUserPassword(
    id: string,
    updateUserPasswordDto: UpdatePasswordDto,
  ): UserEntity | undefined {
    const user = this.users.find((user) => user.id === id);
    if (!user) return undefined;
    user.password = updateUserPasswordDto.newPassword;
    user.version = user.version + 1;
    user.updatedAt = Date.now();
    return getUserWithoutPassword(user);
  }

  removeUser(id: string): string | undefined {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) return undefined;
    this.users.splice(userIndex, 1);
    return `The user with ID #${id} was successfully deleted`;
  }
}
