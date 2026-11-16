import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { clinic } from '../data/clinic';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  let posts: any[] = [];
  try {
    posts = await getCollection('blog');
  } catch {
    posts = [];
  }

  const publishedPosts = posts
    .filter((p) => !p.data.draft)
    .sort((a, b) => new Date(b.data.publishedAt).getTime() - new Date(a.data.publishedAt).getTime());

  return rss({
    title: `${clinic.name} | Medical Aesthetics Blog`,
    description: `Evidence-based educational guides on skincare, hair restoration, and aesthetic treatments in Dera Ghazi Khan, Pakistan.`,
    site: context.site || 'https://glow-grace-aesthetics.vercel.app',
    items: publishedPosts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.publishedAt),
      description: post.data.description,
      link: `/blog/${post.id.replace(/\.md$/, '')}/`,
      categories: post.data.tags
    })),
    customData: `<language>en-pk</language>`
  });
}
