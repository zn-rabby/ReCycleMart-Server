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
      enum: {
        values: [
          'mobiles',
          'electronics',
          'vehicles',
          'property',
          'home',
          'pets',
          'cloths',
          'sports',
        ],
        message: '{VALUE} is not a valid category',
      },
    },

    location: { type: String, required: true },
    userID: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['available', 'sold'],
      default: 'available',
    },
    ratingCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    contactNumber: {
      type: String,
      trim: true,
    },
    stock: {
      type: Number,
      required: [true, 'Product stock is required'],
      min: 0,
    },

    brand: {
      type: String,
      trim: true,
    },
    negotiable: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Listing = mongoose.model<IListing>('Listing', listingSchema);
