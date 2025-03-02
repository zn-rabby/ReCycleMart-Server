import AppError from '../../errors/appError';
import { IUser } from '../user/user.interface';
import User from '../user/user.model';

const register = async (payload: IUser) => {
  const user = await User.isUserExists(payload.email);
  if (user) {
    throw new AppError(400, 'User Already exists !');
  }

  const result = await User.create(payload);
  return result;
};

export const AuthService = {
  register,
};
