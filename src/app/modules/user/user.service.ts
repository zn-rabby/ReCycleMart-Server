import { CLIENT_RENEG_LIMIT } from 'tls';
import AppError from '../../errors/appError';
import { IUser } from './user.interface';
import User from './user.model';

const getSingleUser = async (id: string) => {
  const user = await User.findById(id);
  console.log(id,"id",user)
  return user;
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

const deleteUser = async (id: string) => {
  // check deleteListing is exists
  const user = await User.findById(id);

  if (!user) {
    throw new AppError(404, 'User not found!');
  }

  const result = await User.findByIdAndDelete(id, { isDeleted: true });

  return result;
};

export const UserServices = {
  getSingleUser,
  updateUser,
  deleteUser,
};
