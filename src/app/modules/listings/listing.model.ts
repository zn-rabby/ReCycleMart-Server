import mongoose, { Schema } from 'mongoose';
import { IListing } from './listing.interface';

const listingSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    condition: {
      type: String,
      enum: ['new', 'used', 'refurbished'],
      required: true,
    },
    images: { type: [String], required: true }, // array of image URLs
    category: { type: String, required: true },
    location: { type: String, required: true },
    userID: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['available', 'sold', 'pending', 'hidden'],
      default: 'available',
    },
    views: { type: Number, default: 0 },
    negotiable: { type: Boolean, default: false },
    contactMethod: {
      type: String,
      enum: ['phone', 'email', 'chat'],
      default: 'chat',
    },
  },
  { timestamps: true }
);

export const Listing = mongoose.model<IListing>('Listing', listingSchema);
