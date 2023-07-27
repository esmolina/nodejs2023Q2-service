import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersStore } from './store/users.storage';

@Injectable()
export class UserService {
  constructor(private storage: UsersStore) {}

  create(createUserDto: CreateUserDto): UserEntity {
    return this.storage.createNewUser(createUserDto);
  }

  findAll(): Array<UserEntity> {
    return this.storage.getUsers();
  }

  findOne(id: string): UserEntity | undefined {
    return this.storage.getUserById(id);
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
