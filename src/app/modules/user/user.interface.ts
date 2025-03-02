import { Model } from 'mongoose';

export type IUser = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: 'user' | 'admin';
  status: 'active' | 'block';
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
