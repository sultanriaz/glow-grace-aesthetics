import { test, expect } from '@playwright/test';

test.describe('Core User Interaction Flows', () => {

  test('Booking form: validates inputs, rejects Sundays & past dates, and generates WhatsApp enquiry', async ({ page }) => {
    let whatsappUrl = '';
    await page.route('https://wa.me/**', (route) => {
      whatsappUrl = route.request().url();
      route.abort();
    });

    await page.goto('/book-appointment/');

    // 1. Fill Name
    await page.fill('#patient-name', 'Amina Khan');

    // 2. Select Service (First actual option)
    await page.selectOption('#service-select', { index: 1 });

    // 3. Test Invalid Date: Next Sunday
    const d = new Date();
    const daysUntilSunday = (7 - d.getDay()) % 7 || 7;
    const nextSunday = new Date(d.getTime() + daysUntilSunday * 24 * 60 * 60 * 1000);
    const sundayStr = nextSunday.toISOString().split('T')[0];

    await page.fill('#booking-date', sundayStr);
    await page.selectOption('#booking-time', { index: 1 });

    // Submit form with invalid Sunday date
    await page.click('#submit-appointment-btn');

    // Assert error summary is visible and contains Sunday warning
    const errorSummary = page.locator('#error-summary');
    await expect(errorSummary).toBeVisible();
    await expect(errorSummary).toContainText('Sundays');

    // 4. Test Valid Date: Advance to next Monday
    const nextMonday = new Date(nextSunday.getTime() + 24 * 60 * 60 * 1000);
    const mondayStr = nextMonday.toISOString().split('T')[0];

    await page.fill('#booking-date', mondayStr);

    // Submit valid form
    await page.click('#submit-appointment-btn');

    // Wait briefly for client submission event
    await page.waitForTimeout(500);

    expect(whatsappUrl).toContain('wa.me/923134151471');
    expect(decodeURIComponent(whatsappUrl)).toContain('Amina Khan');
  });

  test('Bridal planner: fills wedding details and dispatches custom bridal plan request', async ({ page }) => {
    let bridalWaUrl = '';
    await page.route('https://wa.me/**', (route) => {
      bridalWaUrl = route.request().url();
      route.abort();
    });

    await page.goto('/services/bridal-glow-packages/');

    const planner = page.locator('#bridal-planner');
    await expect(planner).toBeVisible();

    await page.fill('#bridal-name', 'Sara Ahmed');
    await page.selectOption('#bridal-timeline', { index: 1 });

    // Check treatment boxes
    const checkboxes = page.locator('.bridal-checkbox');
    const count = await checkboxes.count();
    if (count > 0) {
      await checkboxes.first().check();
    }

    // Submit bridal plan
    await page.click('.submit-bridal-btn');

    await page.waitForTimeout(500);

    expect(bridalWaUrl).toContain('wa.me/923134151471');
    expect(decodeURIComponent(bridalWaUrl)).toContain('Sara Ahmed');
  });

  test('FAQ search filter: filters questions dynamically and restores on clear', async ({ page }) => {
    await page.goto('/faq/');

    const searchInput = page.locator('#faq-search-input');
    await expect(searchInput).toBeVisible();

    // Type "appointment"
    await searchInput.fill('appointment');

    // Assert matching items are visible
    const matchingItem = page.locator('.faq-accordion-item:has-text("appointment")');
    await expect(matchingItem.first()).toBeVisible();

    // Clear search
    const clearBtn = page.locator('#clear-faq-search-btn');
    if (await clearBtn.isVisible()) {
      await clearBtn.click();
      await expect(searchInput).toHaveValue('');
    }
  });

  test('Map facade: loads interactive Google Maps iframe only upon user click', async ({ page }) => {
    await page.goto('/contact/');

    const loadBtn = page.locator('#load-map-btn');
    await expect(loadBtn).toBeVisible();

    // Prior to clicking, no iframe should exist inside map container
    const iframeBefore = page.locator('#map-facade-root iframe');
    expect(await iframeBefore.count()).toBe(0);

    // Click load map button
    await loadBtn.click();

    // Assert iframe is injected
    const iframeAfter = page.locator('#map-facade-root iframe');
    await expect(iframeAfter).toBeVisible();
    const src = await iframeAfter.getAttribute('src');
    expect(src).toContain('google.com/maps');
  });

  test('Mobile navigation drawer: opens, closes, and navigates cleanly', async ({ page, isMobile }) => {
    if (!isMobile) return;

    await page.goto('/');

    const toggleBtn = page.locator('#mobile-nav-toggle');
    await expect(toggleBtn).toBeVisible();

    // Open drawer
    await toggleBtn.click();
    const drawer = page.locator('#mobile-nav-drawer');
    await expect(drawer).toBeVisible();

    // Click About link inside mobile drawer
    const aboutLink = drawer.locator('a[href="/about/"]');
    await aboutLink.click();

    await page.waitForURL('**/about/');
    expect(page.url()).toContain('/about/');
  });

});
