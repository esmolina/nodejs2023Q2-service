import { UserInterface } from '../interfaces/user-interface';
import { GetUserDto } from '../dto/get-user.dto';
import { UserEntity } from '../entities/user.entity';

export const getUserWithoutPassword = (user: UserInterface): UserEntity => {
  const { id, login, version, createdAt, updatedAt } = user;
  return { id, login, version, createdAt, updatedAt };
};
