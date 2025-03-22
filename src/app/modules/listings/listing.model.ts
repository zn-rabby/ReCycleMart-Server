import mongoose, { Schema } from 'mongoose';
import { IListing } from './listing.interface';

const listingSchema = new Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    condition: {
      type: String,
      enum: ['new', 'used', 'refurbished'],
      required: true,
    },
    images: { type: [String], required: true }, // array of image URLs
    category: {
      type: String,
      enum: ['electronics', 'clothing', 'gadgets', 'sports'],
      required: true,
    },
    location: { type: String, required: true },
    userID: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    ratingCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    stock: {
      type: Number,
      required: [true, 'Product stock is required'],
      min: 0,
    },
    status: {
      type: String,
      enum: ['available', 'sold', 'pending', 'hidden'],
      default: 'available',
    },
    negotiable: { type: Boolean, default: false },
    contactMethod: {
      type: String,
      enum: ['phone', 'email', 'chat'],
      default: 'chat',
    },
  },
  { timestamps: true },
);

export const Listing = mongoose.model<IListing>('Listing', listingSchema);
