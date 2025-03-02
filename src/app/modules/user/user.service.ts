import AppError from '../../errors/appError';
import { IUser } from './user.interface';
import User from './user.model';

const getSingleUser = async (id: string) => {
  const res = await User.findById(id);

  return res;
};

const updateUser = async (id: string, payload: Partial<IUser>) => {
  // check blog is exists
  const product = await User.findById({ _id: id });

  if (!product) {
    throw new AppError(404, 'User not found!');
  }

  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const UserServices = {
  getSingleUser,
  updateUser,
};
