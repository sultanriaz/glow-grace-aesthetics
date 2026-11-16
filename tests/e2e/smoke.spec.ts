import { test, expect } from '@playwright/test';

const ROUTES_TO_TEST = [
  { path: '/', titlePart: 'Glow & Grace' },
  { path: '/about/', titlePart: 'About' },
  { path: '/services/', titlePart: 'Services' },
  { path: '/services/hair-transplant/', titlePart: 'Hair Transplant' },
  { path: '/services/category/hair/', titlePart: 'Hair Care' },
  { path: '/faq/', titlePart: 'Frequently Asked Questions' },
  { path: '/book-appointment/', titlePart: 'Appointment' },
  { path: '/contact/', titlePart: 'Contact' },
  { path: '/blog/', titlePart: 'Blog' },
  { path: '/blog/melasma-causes-triggers-and-care/', titlePart: 'Melasma' },
  { path: '/privacy/', titlePart: 'Privacy Policy' },
  { path: '/terms/', titlePart: 'Terms of Use' },
  { path: '/medical-disclaimer/', titlePart: 'Medical Disclaimer' },
  { path: '/developer/', titlePart: 'Sultan Mehmood' },
];

for (const route of ROUTES_TO_TEST) {
  test(`Smoke test: route "${route.path}" loads cleanly with 200 and no errors`, async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    const response = await page.goto(route.path, { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(200);

    const title = await page.title();
    expect(title).toContain(route.titlePart);

    // Assert zero console errors
    expect(consoleErrors).toEqual([]);
  });
}
