import mongoose, { Schema } from "mongoose";


const listingSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        condition: { type: String, enum: ['new', 'used', 'refurbished'], required: true },
        images: { type: String, required: true },
        userID: { type: String, required: true },
        status: { type: String, enum: ['available', 'sold'], default: 'available' }
    },
    { timestamps: true }
)

export const Listing = mongoose.model("Listing",listingSchema)