import mongoose, { Schema, Document } from 'mongoose';
import { ITransaction } from './transactions.interface';

const transactionSchema = new Schema<ITransaction>(
  {
    buyerID: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    sellerID: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    itemID: { 
      type: Schema.Types.ObjectId, 
      ref: 'Listing', 
      required: true 
    },
    status: { 
      type: String, 
      enum: ['pending', 'completed'], 
      default: 'pending' 
    },
  },
  { timestamps: true }
);

export const Transaction = mongoose.model<ITransaction >('Transaction', transactionSchema);
