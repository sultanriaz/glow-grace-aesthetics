import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const ACCESSIBILITY_PAGES = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about/' },
  { name: 'Services Hub', path: '/services/' },
  { name: 'Service Detail (Hair Transplant)', path: '/services/hair-transplant/' },
  { name: 'Category (Hair Care)', path: '/services/category/hair/' },
  { name: 'FAQ', path: '/faq/' },
  { name: 'Book Appointment', path: '/book-appointment/' },
  { name: 'Contact & Location', path: '/contact/' },
  { name: 'Blog Hub', path: '/blog/' },
  { name: 'Blog Post (Melasma)', path: '/blog/melasma-causes-triggers-and-care/' },
  { name: 'Privacy Policy', path: '/privacy/' },
  { name: 'Developer Page', path: '/developer/' }
];

for (const p of ACCESSIBILITY_PAGES) {
  test(`Accessibility Audit: ${p.name} has zero critical or serious WCAG violations`, async ({ page }) => {
    await page.goto(p.path, { waitUntil: 'domcontentloaded' });

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();

    // Filter for serious and critical violations
    const seriousOrCritical = accessibilityScanResults.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical'
    );

    if (seriousOrCritical.length > 0) {
      console.error(`Accessibility violations on ${p.path}:`, JSON.stringify(seriousOrCritical, null, 2));
    }

    expect(seriousOrCritical).toEqual([]);
  });
}
