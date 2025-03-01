import { z } from 'zod';

// Create Listing Validation Schema
const createListingValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Listing title is required',
      })
      .min(1, 'Listing title cannot be empty'),

    description: z
      .string({
        required_error: 'Listing description is required',
      })
      .min(1, 'Listing description cannot be empty'),

    price: z
      .number({
        required_error: 'Listing price is required',
      })
      .min(0, 'Price cannot be negative'),

    condition: z.enum(['new', 'used', 'refurbished'], {
      required_error: 'Condition is required',
    }),

    images: z
      .string({
        required_error: 'Image URL is required',
      })
      .url('Image must be a valid URL'),

    userID: z
      .string({
        required_error: 'User ID is required',
      })
      .min(1, 'User ID cannot be empty'),

    status: z.enum(['available', 'sold']).default('available'),
  }),
});

// Update Listing Validation Schema (all optional)
const updateListingValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Listing title cannot be empty').optional(),

    description: z
      .string()
      .min(1, 'Listing description cannot be empty')
      .optional(),

    price: z.number().min(0, 'Price cannot be negative').optional(),

    condition: z.enum(['new', 'used', 'refurbished']).optional(),

    images: z.string().url('Image must be a valid URL').optional(),

    userID: z.string().min(1, 'User ID cannot be empty').optional(),

    status: z.enum(['available', 'sold']).optional(),
  }),
});

export const listingValidation = {
  createListingValidationSchema,
  updateListingValidationSchema,
};
