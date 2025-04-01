import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    category: z
      .string({ required_error: 'Category is required!' })
      .min(3, 'Category must be at least 3 characters long'),

    image: z
      .string({ required_error: 'Image URL is required!' })
      .url('Invalid image URL format'),

    title: z
      .string({ required_error: 'Title is required!' })
      .min(5, 'Title must be at least 5 characters long'),

    content: z
      .string({ required_error: 'Content is required!' })
      .min(10, 'Content must be at least 10 characters long'),

    introduction: z
      .string({ required_error: 'Introduction is required!' })
      .min(10, 'Introduction must be at least 10 characters long'),

    tags: z
      .array(z.string())
      .min(1, 'At least one tag should be provided')
      .optional(),
    sPublished: z.boolean().default(true),

    author: z
      .string({ required_error: 'Author name is required!' })
      .min(2, 'Author name must be at least 2 characters long'),
  }),
});
const updateBlogValidationSchema = z.object({
  body: z.object({
    category: z
      .string()
      .min(3, 'Category must be at least 3 characters long')
      .optional(),

    image: z.string().url('Invalid image URL format').optional(),

    title: z
      .string()
      .min(5, 'Title must be at least 5 characters long')
      .optional(),

    content: z
      .string()
      .min(10, 'Content must be at least 10 characters long')
      .optional(),

    introduction: z
      .string()
      .min(10, 'Introduction must be at least 10 characters long')
      .optional(),

    tags: z
      .array(z.string())
      .min(1, 'At least one tag should be provided')
      .optional(),

    sPublished: z.boolean().default(true).optional(),

    author: z
      .string()
      .min(2, 'Author name must be at least 2 characters long')
      .optional(),
  }),
});

export const BlogValidation = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
