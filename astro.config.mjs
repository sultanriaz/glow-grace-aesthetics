import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { hasGallery } from './src/utils/visibility';

const site = process.env.SITE_URL || 'https://glow-grace-aesthetics.vercel.app';

// https://astro.build/config
export default defineConfig({
  site,
  trailingSlash: 'always',
  build: {
    format: 'directory'
  },
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/developer') &&
        !page.includes('/404') &&
        (page.includes('/gallery') ? hasGallery() : true)
    })
  ]
});
