import { z } from 'zod';

export const articleSchema = z.object({
  title: z.string().nonempty('Please enter a title').min(4, 'Title must be at least 4 characters').max(20, 'Title must be at most 20 characters'),
  content: z
    .string()
    .nonempty('Please enter content')
    .min(20, 'Content must be at least 20 characters')
    .max(255, 'Content must be at most 255 characters'),
});

export type ArticleSchema = typeof articleSchema;
