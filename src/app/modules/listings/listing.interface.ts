import { Types } from 'mongoose';

export type IListing = {
  name: string;
  title: string;
  description: string;
  price: number;
  condition: 'new' | 'used' | 'refurbished';
  images: string[];
  category:
    | 'mobiles'
    | 'electronics'
    | 'vehicles'
    | 'property'
    | 'home'
    | 'pets'
    | 'cloths'
    | 'sports';
  location: string;
  userID?: Types.ObjectId;
  status: 'available' | 'sold';
  createdAt?: Date;
  updatedAt?: Date;
  contactNumber?: string;
  negotiable?: boolean;
  brand?: string;
  ratingCount?: number;
  stock: number;
};
