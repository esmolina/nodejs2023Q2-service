import { GetUserDto } from '../dto/get-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';

export interface UsersStorageInterface {
  createNewUser: (createUserDto: CreateUserDto) => UserEntity;
  getUsers: () => Array<GetUserDto>;
  getUserById: (id: string) => UserEntity | undefined;
  updateUserPassword: (
    id: string,
    updateUserPasswordDto: UpdatePasswordDto,
  ) => UserEntity | undefined;
  removeUser: (id: string) => string | undefined;
}
