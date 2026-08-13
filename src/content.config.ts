import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    lastModified: z.coerce.date().optional(),
    category: z.string(),
    author: z.string(),
    image: z.string().optional(),
    readingTime: z.string().optional(),
    order: z.number().optional(),
    keywords: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    video: z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      uploadDate: z.string(),
    }).optional(),
  }),
});

export const collections = { blog };
