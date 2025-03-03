import { Types } from 'mongoose';

export type IListing = {
  title: string;
  description: string;
  price: number;
  condition: 'new' | 'used' | 'refurbished';
  images: string[]; 
  category: string; 
  location: string; 
  userID?: Types.ObjectId; 
  status: 'available' | 'sold' | 'pending' | 'hidden'; 
  views?: number; 
  createdAt?: Date;
  updatedAt?: Date;
  negotiable?: boolean; 
};
