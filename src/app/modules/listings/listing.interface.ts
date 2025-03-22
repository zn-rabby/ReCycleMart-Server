import { Types } from 'mongoose';

export type IListing = {
  name: string;
  title: string;
  description: string;
  price: number;
  condition: 'new' | 'used' | 'refurbished';
  images: string[];
  category: 'electronics' | 'clothing' | 'gadgets' | 'sports';
  location: string;
  userID?: Types.ObjectId;
  status: 'available' | 'sold' | 'pending' | 'hidden';
  createdAt?: Date;
  updatedAt?: Date;
  negotiable?: boolean;
  ratingCount?: number;
  stock: number;
};
