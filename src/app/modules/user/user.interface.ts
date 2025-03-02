export type IUser = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: 'user' | 'admin';
  createdAt?: Date;
  updatedAt?: Date;
};
