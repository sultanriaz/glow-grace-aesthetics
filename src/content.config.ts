import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['hair', 'skin', 'facial', 'laser', 'regenerative', 'body']),
    tagline: z.string().max(70),
    summary: z.string().max(155),
    icon: z.string(),
    benefits: z.array(z.string()).min(4),
    idealFor: z.array(z.string()).min(3),
    tags: z.array(z.string()),
    order: z.number(),
    featured: z.boolean(),
    source: z.enum(['clinic-list', 'added']),
    seoTitle: z.string().max(65).optional(),
    seoDescription: z.string().max(160).optional()
  })
});

export const collections = { services };
