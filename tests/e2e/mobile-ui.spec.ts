import { test, expect } from '@playwright/test';

const testRoutes = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about/' },
  { name: 'developer', path: '/developer/' },
  { name: 'services', path: '/services/' },
  { name: 'hydrafacial', path: '/services/hydrafacial/' },
  { name: 'book-appointment', path: '/book-appointment/' },
  { name: 'contact', path: '/contact/' },
  { name: 'faq', path: '/faq/' }
];

test.describe('Mobile Viewport & UI/UX Audit', () => {
  for (const route of testRoutes) {
    test(`Route ${route.path} has zero horizontal overflow and visible controls`, async ({ page, isMobile }, testInfo) => {
      await page.goto(route.path);
      await page.waitForLoadState('domcontentloaded');

      // 1. Verify zero horizontal overflow
      const viewport = page.viewportSize();
      const winWidth = viewport ? viewport.width : 375;
      
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const bodyScrollWidth = await page.evaluate(() => document.body.scrollWidth);

      expect(scrollWidth, `Document scrollWidth on ${route.path}`).toBeLessThanOrEqual(winWidth + 1);
      expect(bodyScrollWidth, `Body scrollWidth on ${route.path}`).toBeLessThanOrEqual(winWidth + 1);

      // 2. On mobile, verify the hamburger menu button is strictly inside viewport
      if (isMobile) {
        const toggle = page.locator('#mobile-nav-toggle');
        await expect(toggle).toBeVisible();
        const box = await toggle.boundingBox();
        expect(box).not.toBeNull();
        if (box) {
          expect(box.x + box.width, `Hamburger button right edge on ${route.path}`).toBeLessThanOrEqual(winWidth);
          expect(box.x, `Hamburger button left edge on ${route.path}`).toBeGreaterThanOrEqual(0);
        }

        // Test opening the drawer
        if (route.name === 'home') {
          await toggle.click();
          const drawer = page.locator('#mobile-nav-drawer');
          await expect(drawer).toBeVisible();
          await page.screenshot({ path: `test-screenshots/${testInfo.project.name}-drawer.png` });
          
          // Verify close button
          const closeBtn = page.locator('#mobile-nav-close');
          await expect(closeBtn).toBeVisible();
          await closeBtn.click();
          await page.waitForTimeout(300);
        }

        // Capture screenshot of fold
        await page.screenshot({ path: `test-screenshots/${testInfo.project.name}-${route.name}.png` });
      }
    });
  }
});
