import { z } from 'zod';

export const registerSchema = z
  .object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(4, 'Password must be at least 4 characters long').max(64, 'Password must be at most 64 characters long'),
    passwordConfirmation: z.string().nonempty('Please confirm your password by entering it again'),
    firstName: z.string().min(2, 'First name must be at least 2 characters long').max(64, 'First name must be at most 64 characters long'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters long').max(64, 'Last name must be at most 64 characters long'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  });

export type RegisterSchema = typeof registerSchema;
