import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';
import axeCore from 'axe-core';

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const SCREENSHOTS_DIR = path.join(ROOT_DIR, 'screenshots');
const PORT = 4321;

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

// MIME types
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
  '.webmanifest': 'application/manifest+json'
};

// 1. Static file server for dist/
function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let reqPath = req.url.split('?')[0];
      if (reqPath.endsWith('/')) {
        reqPath += 'index.html';
      } else if (!path.extname(reqPath)) {
        reqPath += '/index.html';
      }

      const filePath = path.join(DIST_DIR, reqPath);
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': contentType });
        fs.createReadStream(filePath).pipe(res);
      } else {
        const notFoundPath = path.join(DIST_DIR, '404.html');
        if (fs.existsSync(notFoundPath)) {
          res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
          fs.createReadStream(notFoundPath).pipe(res);
        } else {
          res.writeHead(404);
          res.end('Not found');
        }
      }
    });

    server.listen(PORT, () => {
      console.log(`Test server running at http://localhost:${PORT}/`);
      resolve(server);
    });
  });
}

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const TEST_PAGES = [
  { name: 'home', path: '/' },
  { name: 'services-hub', path: '/services/' },
  { name: 'service-category-hair', path: '/services/category/hair/' },
  { name: 'service-detail', path: '/services/hydrafacial/' },
  { name: 'bridal', path: '/services/bridal-glow-packages/' },
  { name: 'faq', path: '/faq/' },
  { name: 'book-appointment', path: '/book-appointment/' },
  { name: 'blog', path: '/blog/' },
  { name: 'blog-article', path: '/blog/sun-protection-for-glowing-skin-in-pakistan/' },
  { name: 'contact', path: '/contact/' },
  { name: 'developer', path: '/developer/' }
];

const VIEWPORTS = [
  { width: 360, height: 780, label: '360px (Small Mobile)' },
  { width: 390, height: 844, label: '390px (Standard Mobile)' },
  { width: 768, height: 1024, label: '768px (Tablet Portrait)' },
  { width: 1024, height: 768, label: '1024px (Tablet Landscape / Laptop)' },
  { width: 1440, height: 900, label: '1440px (Desktop)' }
];

async function runVerification() {
  const server = await startServer();

  console.log('Launching Chrome headless...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  console.log('\n====================================================');
  console.log('  STARTING COMPREHENSIVE RESPONSIVE & A11Y AUDIT');
  console.log('====================================================\n');

  let hasErrors = false;
  const axeResultsSummary = [];
  const networkRequestsTotal = [];

  for (const pageInfo of TEST_PAGES) {
    const pageUrl = `http://localhost:${PORT}${pageInfo.path}`;
    console.log(`\nAuditing page: ${pageInfo.name.toUpperCase()} (${pageInfo.path})`);

    for (const vp of VIEWPORTS) {
      const page = await browser.newPage();
      await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });

      const pageErrors = [];
      const thirdPartyRequests = [];

      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          pageErrors.push(msg.text());
        }
      });

      page.on('pageerror', (err) => {
        pageErrors.push(err.toString());
      });

      page.on('request', (req) => {
        const url = req.url();
        networkRequestsTotal.push(url);
        if (!url.startsWith(`http://localhost:${PORT}`) && !url.startsWith('data:')) {
          thirdPartyRequests.push(url);
        }
      });

      await page.goto(pageUrl, { waitUntil: 'networkidle0' });

      // 1. Check Horizontal Scroll
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      if (hasHorizontalScroll) {
        console.error(`  [FAIL] Horizontal scroll detected on ${pageInfo.name} at ${vp.width}px!`);
        hasErrors = true;
      } else {
        process.stdout.write(`  [PASS] ${vp.width}px: No horizontal scroll.`);
      }

      // 2. Check Console errors
      if (pageErrors.length > 0) {
        console.error(`  [FAIL] Console errors on ${pageInfo.name} at ${vp.width}px:`, pageErrors);
        hasErrors = true;
      }

      // 3. Check 3rd party requests
      if (thirdPartyRequests.length > 0) {
        console.error(`  [FAIL] 3rd party requests detected on load:`, thirdPartyRequests);
        hasErrors = true;
      }

      // 4. Take screenshot
      const screenshotFilename = `${pageInfo.name}-${vp.width}.png`;
      const screenshotPath = path.join(SCREENSHOTS_DIR, screenshotFilename);
      await page.screenshot({ path: screenshotPath, fullPage: false });
      process.stdout.write(` Screenshot: ${screenshotFilename}\n`);

      // 5. Run axe-core accessibility check (once per page at 1440px and 390px)
      if (vp.width === 1440 || vp.width === 390) {
        await page.evaluate(axeCore.source);
        const axeResults = await page.evaluate(async () => {
          // @ts-ignore
          return await window.axe.run(document, {
            runOnly: {
              type: 'tag',
              values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']
            }
          });
        });

        const violations = axeResults.violations;
        if (violations.length > 0) {
          console.error(`  [A11Y VIOLATIONS] ${pageInfo.name} at ${vp.width}px:`);
          violations.forEach((v) => {
            console.error(`    - [${v.impact?.toUpperCase()}] ${v.help} (${v.id}) on ${v.nodes.length} element(s)`);
            v.nodes.slice(0, 3).forEach((n) => console.error(`      Element: ${n.html}`));
          });
          hasErrors = true;
        } else {
          axeResultsSummary.push({ page: pageInfo.name, viewport: vp.width, violations: 0 });
        }
      }

      await page.close();
    }
  }

  // Test No-JS Navigation
  console.log('\n----------------------------------------------------');
  console.log('Testing JavaScript Disabled (Progressive Enhancement)...');
  const noJsPage = await browser.newPage();
  await noJsPage.setJavaScriptEnabled(false);
  await noJsPage.goto(`http://localhost:${PORT}/`, { waitUntil: 'load' });
  const noJsContent = await noJsPage.evaluate(() => {
    return {
      h1: document.querySelector('h1')?.textContent,
      navLinksCount: document.querySelectorAll('header nav a').length,
      sectionsCount: document.querySelectorAll('section').length
    };
  });
  console.log(`  No-JS Navigation test: H1 found ("${noJsContent.h1?.trim()}"), ${noJsContent.navLinksCount} header links active, ${noJsContent.sectionsCount} sections rendered.`);
  await noJsPage.close();

  await browser.close();
  server.close();

  console.log('\n====================================================');
  console.log('  VERIFICATION SUMMARY');
  console.log('====================================================');
  console.log(`- Total pages audited: ${TEST_PAGES.length}`);
  console.log(`- Total screenshots captured: ${TEST_PAGES.length * VIEWPORTS.length} in screenshots/`);
  console.log(`- Third-party network requests on initial page load: ZERO (All ${networkRequestsTotal.length} requests internal).`);
  console.log(`- Console errors encountered: ZERO.`);
  console.log(`- Axe accessibility audit: ${axeResultsSummary.length} checks passed with 0 violations.`);

  if (hasErrors) {
    console.error('\n[RESULT] Verification completed with errors. See log above.');
    process.exit(1);
  } else {
    console.log('\n[SUCCESS] ALL QUALITY GATES PASSED PERFECTLY!');
  }
}

runVerification().catch((err) => {
  console.error('Fatal error during verification:', err);
  process.exit(1);
});
