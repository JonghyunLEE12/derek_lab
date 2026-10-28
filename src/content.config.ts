import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string().trim().min(1)),
    category: z.string(),
  }),
});

const insights = defineCollection({
  loader: glob({ base: './src/content/insights', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string().trim().min(1)),
    source: z.object({
      title: z.string(),
      url: z.url(),
      author: z.string().optional(),
      type: z.enum(['youtube', 'article', 'talk', 'book']),
    }),
  }),
});

export const collections = { blog, insights };
