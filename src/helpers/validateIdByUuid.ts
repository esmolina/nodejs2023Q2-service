import { validate } from 'uuid';

export const validateIdByUuid = (userId: any): boolean => {
  return validate(userId);
};
