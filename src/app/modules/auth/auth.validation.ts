import { z } from 'zod';

const registerUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
    phoneNumber: z.string(),
    password: z.string(),
    role: z.enum(['admin', 'user']).default('user'),
    status: z.enum(['active', 'block']).default('active'),
    isBlocked: z.boolean().default(false),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
});

export const AuthValidation = {
  registerUserValidationSchema,
  loginValidationSchema,
};
