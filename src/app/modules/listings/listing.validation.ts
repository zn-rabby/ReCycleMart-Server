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
      .array(z.string().url('Each image must be a valid URL'), {
        required_error: 'At least one image is required',
      })
      .nonempty('At least one image is required'),

    category: z.string({
      required_error: 'Category is required',
    }),

    location: z.string({
      required_error: 'Location is required',
    }),


    userID: z.string().min(1, 'User ID cannot be empty').optional(),

    status: z
      .enum(['available', 'sold', 'pending', 'hidden'])
      .default('available'),

    views: z.number().optional(),

    negotiable: z.boolean().optional(),

    contactMethod: z.enum(['phone', 'email', 'chat']).optional(),
  }),
});

// Update Listing Validation Schema (all optional)
const updateListingValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Listing title cannot be empty').optional(),

    description: z.string().min(1, 'Listing description cannot be empty').optional(),

    price: z.number().min(0, 'Price cannot be negative').optional(),

    condition: z.enum(['new', 'used', 'refurbished']).optional(),

    images: z.array(z.string().url('Each image must be a valid URL')).optional(),

    category: z.string().optional(),

    location: z.string().optional(),


    userID: z.string().min(1, 'User ID cannot be empty').optional(),

    status: z.enum(['available', 'sold', 'pending', 'hidden']).optional(),

    views: z.number().optional(),

    negotiable: z.boolean().optional(),

    contactMethod: z.enum(['phone', 'email', 'chat']).optional(),
  }),
});

export const listingValidation = {
  createListingValidationSchema,
  updateListingValidationSchema,
};
