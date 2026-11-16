import { clinic } from '../data/clinic';

export const FALLBACK_SITE_URL = 'https://glow-grace-aesthetics.vercel.app';

export function getSiteUrl(): string {
  const envUrl = import.meta.env.SITE_URL || (typeof process !== 'undefined' ? process.env.SITE_URL : undefined);
  if (envUrl && typeof envUrl === 'string' && envUrl.trim().length > 0) {
    return envUrl.trim().replace(/\/+$/, '');
  }
  return FALLBACK_SITE_URL;
}

export function getCanonicalUrl(path: string = '/'): string {
  const base = getSiteUrl();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  // Ensure trailing slash for directory structure if not a file with extension
  const hasExt = /\.[a-z0-9]+$/i.test(cleanPath);
  const formattedPath = hasExt ? cleanPath : cleanPath.endsWith('/') ? cleanPath : `${cleanPath}/`;
  return `${base}${formattedPath}`;
}

export function getOgImageUrl(path: string = '/og-default.jpg'): string {
  const base = getSiteUrl();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

export interface SeoProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  ogImageAlt?: string;
  noindex?: boolean;
}

export const defaultSeo: Required<SeoProps> = {
  title: `${clinic.shortName} | Hair, Skin & Aesthetics Clinic DG Khan`,
  description: `Safe, certified aesthetic treatments in Dera Ghazi Khan. Expert hair transplant, PRP, laser hair removal, HydraFacial & skin care at Glow & Grace Aesthetics.`,
  canonical: FALLBACK_SITE_URL + '/',
  ogType: 'website',
  ogImage: `${FALLBACK_SITE_URL}/og-default.jpg`,
  ogImageAlt: `${clinic.name} - Hair, Body, Skin Care & Aesthetics in Dera Ghazi Khan`,
  noindex: false
};
