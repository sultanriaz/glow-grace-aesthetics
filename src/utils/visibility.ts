import fs from 'node:fs';
import path from 'node:path';

interface ConsentedItem {
  data: {
    consentConfirmed?: boolean;
    [key: string]: unknown;
  };
}

/**
 * Checks whether the clinic has real, consented gallery items to publish.
 * Requires at least 1 verified, consented item.
 */
export function hasGallery(items?: ConsentedItem[]): boolean {
  if (items && Array.isArray(items)) {
    return items.some((item) => item.data?.consentConfirmed === true);
  }

  try {
    const galleryDir = path.join(process.cwd(), 'src', 'content', 'gallery');
    if (!fs.existsSync(galleryDir)) return false;
    const files = fs.readdirSync(galleryDir).filter((f) => f.endsWith('.md') || f.endsWith('.json'));
    if (files.length === 0) return false;

    return files.some((file) => {
      const content = fs.readFileSync(path.join(galleryDir, file), 'utf-8');
      return /consentConfirmed:\s*true/i.test(content);
    });
  } catch {
    return false;
  }
}

/**
 * Checks whether the clinic has enough real, consented testimonials to publish.
 * Quality bar: requires at least 3 verified, consented testimonials.
 */
export function hasTestimonials(items?: ConsentedItem[]): boolean {
  if (items && Array.isArray(items)) {
    const approved = items.filter((item) => item.data?.consentConfirmed === true);
    return approved.length >= 3;
  }

  try {
    const testimonialsDir = path.join(process.cwd(), 'src', 'content', 'testimonials');
    if (!fs.existsSync(testimonialsDir)) return false;
    const files = fs.readdirSync(testimonialsDir).filter((f) => f.endsWith('.md') || f.endsWith('.json'));
    if (files.length < 3) return false;

    let consentedCount = 0;
    for (const file of files) {
      const content = fs.readFileSync(path.join(testimonialsDir, file), 'utf-8');
      if (/consentConfirmed:\s*true/i.test(content)) {
        consentedCount++;
      }
    }
    return consentedCount >= 3;
  } catch {
    return false;
  }
}
