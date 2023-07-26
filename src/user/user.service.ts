import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { v4 as uuid } from 'uuid';
import { GetUserDto } from './dto/get-user.dto';

export interface User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

@Injectable()
export class UserService {
  private users: Array<User> = [];

  create(createUserDto: CreateUserDto) {
    const newUser: User = {
      id: uuid(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);
    return `A user named ${newUser.login} with ID #${newUser.id} has been created`;
  }

  findAll(): Array<GetUserDto> {
    return this.users.map(({ id, login, version, createdAt, updatedAt }) => ({
      id,
      login,
      version,
      createdAt,
      updatedAt,
    }));
  }

  findOne(id: string): GetUserDto | undefined {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      const { id, login, version, createdAt, updatedAt } = user;
      return { id, login, version, createdAt, updatedAt };
    }
    return undefined;
  }

  update(id: string, updateUserPasswordDto: UpdatePasswordDto) {
    const user = this.users.find((user) => user.id === id);
    if (!user) return undefined;
    user.password = updateUserPasswordDto.newPassword;
    user.version = user.version + 1;
    user.updatedAt = Date.now();
    return `User password has been successfully changed`;
  }

  remove(id: string) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    this.users.splice(userIndex, 1);
    return `The user with ID #${id} was successfully deleted`;
  }
}
