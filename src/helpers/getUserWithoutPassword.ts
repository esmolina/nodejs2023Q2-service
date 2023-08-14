import { UserEntity } from '../user/entities/user.entity';

export const getUserWithoutPassword = (user: UserEntity) => {
  const { id, login, version, createdAt, updatedAt } = user;
  return { id, login, version, createdAt, updatedAt };
};
