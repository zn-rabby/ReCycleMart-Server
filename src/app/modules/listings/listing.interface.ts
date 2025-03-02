import { Types } from 'mongoose';

export type IListing = {
  title: string;
  description: string;
  price: number;
  condition: 'new' | 'used' | 'refurbished';
  images: string;
  userID?: Types.ObjectId;
  status: 'available' | 'sold';
};
