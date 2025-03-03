import { Types } from 'mongoose';

export type ITransaction = {
  buyerID: Types.ObjectId;    
  sellerID: Types.ObjectId;   
  itemID: Types.ObjectId;    
  status: 'pending' | 'completed'; 
  createdAt?: Date;
  updatedAt?: Date;
};
