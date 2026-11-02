import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(), description: z.string(), date: z.coerce.date(),
    category: z.enum(['企業 AI', '工程筆記', '值班日常']),
    tags: z.array(z.string()), minutes: z.number(), order: z.number(),
    cover: z.object({ src: z.string(), alt: z.string(), width: z.number(), height: z.number(), caption: z.string().optional() }).optional(),
    draft: z.boolean().default(false),
  }),
});
export const collections = { posts };

