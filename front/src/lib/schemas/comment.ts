import { z } from 'zod';

export const commentSchema = z.object({
  content: z.string().min(20, 'Content must be at least 20 characters').max(255, 'Content must be at most 255 characters'),
});
