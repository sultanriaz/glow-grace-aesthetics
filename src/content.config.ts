import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['hair', 'skin', 'facial', 'laser', 'regenerative', 'body']),
    tagline: z.string().max(80),
    summary: z.string().max(165),
    icon: z.string(),
    benefits: z.array(z.string()).min(4),
    idealFor: z.array(z.string()).min(3),
    tags: z.array(z.string()),
    order: z.number(),
    featured: z.boolean(),
    source: z.enum(['clinic-list', 'added']),
    seoTitle: z.string().max(75).optional(),
    seoDescription: z.string().max(165).optional(),
    // Part 2 Extensions
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string()
    })).default([]),
    whatToExpect: z.array(z.string()).default([]),
    aftercare: z.array(z.string()).default([]),
    considerations: z.array(z.string()).default([]),
    relatedServices: z.array(z.string()).default([]),
    relatedPosts: z.array(z.string()).default([]),
    reviewStatus: z.enum(['draft', 'doctor-approved']).default('draft'),
    startingFrom: z.number().nullable().default(null),
    extras: z.enum(['bridal']).optional()
  })
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.string(),
    updatedAt: z.string().optional(),
    tags: z.array(z.string()),
    relatedServices: z.array(z.string()).default([]),
    reviewStatus: z.enum(['draft', 'doctor-approved']).default('draft'),
    reviewedBy: z.string().nullable().default(null),
    draft: z.boolean().default(false)
  })
});

const gallery = defineCollection({
  loader: glob({ pattern: '**/*.{md,json}', base: './src/content/gallery' }),
  schema: z.object({
    title: z.string(),
    kind: z.enum(['clinic', 'equipment', 'result']),
    service: z.string().optional(),
    image: z.string().optional(),
    alt: z.string().optional(),
    caption: z.string().optional(),
    beforeImage: z.string().optional(),
    afterImage: z.string().optional(),
    consentConfirmed: z.boolean().default(false),
    order: z.number().default(99)
  }).refine((data) => {
    if (data.kind === 'result') {
      return data.consentConfirmed === true && !!data.beforeImage && !!data.afterImage;
    }
    return true;
  }, {
    message: "Results in gallery require consentConfirmed: true and both beforeImage and afterImage."
  })
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.{md,json}', base: './src/content/testimonials' }),
  schema: z.object({
    displayName: z.string(),
    service: z.string(),
    quote: z.string().max(280),
    source: z.string().default('In-clinic Feedback'),
    receivedAt: z.string(),
    consentConfirmed: z.boolean().default(false)
  })
});

export const collections = { services, blog, gallery, testimonials };
