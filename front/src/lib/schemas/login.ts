import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().nonempty('Please enter your email'),
  password: z.string().nonempty('Please enter your password'),
});

export type LoginSchema = typeof loginSchema;
