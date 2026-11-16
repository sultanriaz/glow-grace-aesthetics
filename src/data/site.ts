export interface SiteConfig {
  analyticsProvider: string;
  hosting: string;
  forms: string;
  mapProvider: string;
  cookies: string;
}

export const siteConfig: SiteConfig = {
  analyticsProvider: process.env.PUBLIC_ANALYTICS_PROVIDER || 'none',
  hosting: 'Vercel',
  forms: 'WhatsApp only (nothing stored)',
  mapProvider: 'Google Maps (loads only after the visitor clicks)',
  cookies: 'none'
};
