import { UserInterface } from '../user/interfaces/user-interface';
import { UserEntity } from '../user/entities/user.entity';

export const getUserWithoutPassword = (user: UserInterface): UserEntity => {
  const { id, login, version, createdAt, updatedAt } = user;
  return { id, login, version, createdAt, updatedAt };
};
