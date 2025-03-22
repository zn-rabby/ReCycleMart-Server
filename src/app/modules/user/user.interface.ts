import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type IUser = {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  role?: 'user' | 'admin';
  status?: 'ban' | 'unban';
  createdAt?: Date;
  updatedAt?: Date;
};

export interface UserModel extends Model<IUser> {
  isUserExists(email: string): Promise<IUser>;
  isPasswordMatch(
    plainTextPassword: string,
    hashPassword: string,
  ): Promise<boolean>;
}

export type IUserRole = keyof typeof USER_ROLE;

export type ILoginUser = {
  email: string;
  password: string;
};

export interface IJwtPayload {
  userId: string;
  name: string;
}
