import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, 'dist');

if (!fs.existsSync(DIST_DIR)) {
  console.error('Error: dist/ directory not found. Please run "npm run build" first.');
  process.exit(1);
}

console.log('====================================================');
console.log('  GLOW & GRACE AESTHETICS - LINK INTEGRITY AUDIT');
console.log('====================================================\n');

// Recursively find all html files in dist/
function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const htmlFiles = getAllHtmlFiles(DIST_DIR);
console.log(`Found ${htmlFiles.length} HTML pages in dist/ to audit.\n`);

let hasError = false;
let totalLinksChecked = 0;

const CLINIC_WA_NUMBER = '923134151471';
const DEVELOPER_WA_NUMBER = '923229781129';

for (const htmlPath of htmlFiles) {
  const relativeHtml = path.relative(DIST_DIR, htmlPath).replace(/\\/g, '/');
  const isDeveloperPage = relativeHtml.startsWith('developer');
  const content = fs.readFileSync(htmlPath, 'utf-8');

  // Check 1: Developer number MUST ONLY appear on /developer/
  if (!isDeveloperPage && content.includes(DEVELOPER_WA_NUMBER)) {
    console.error(`[FAIL] Developer phone number (${DEVELOPER_WA_NUMBER}) found outside /developer/ page in: ${relativeHtml}`);
    hasError = true;
  }

  // Extract all href values
  const hrefMatches = content.matchAll(/href=["']([^"']+)["']/g);

  for (const match of hrefMatches) {
    const href = match[1];
    totalLinksChecked++;

    // Check WhatsApp link numbers
    if (href.startsWith('https://wa.me/')) {
      const isClinicLink = href.includes(CLINIC_WA_NUMBER);
      const isDevLink = href.includes(DEVELOPER_WA_NUMBER);

      if (isDeveloperPage) {
        if (!isDevLink && !isClinicLink) {
          console.error(`[FAIL] Unrecognized WhatsApp link on /developer/ page: ${href}`);
          hasError = true;
        }
      } else {
        if (!isClinicLink) {
          console.error(`[FAIL] Non-developer page ${relativeHtml} has WhatsApp link that is not clinic number: ${href}`);
          hasError = true;
        }
      }
    }

    // Check tel: links
    if (href.startsWith('tel:')) {
      if (!href.includes('+923134151471') && !href.includes('03134151471') && !href.includes('0313-4151471')) {
        console.error(`[FAIL] Phone link does not match clinic phone in ${relativeHtml}: ${href}`);
        hasError = true;
      }
    }

    // Check internal links
    if (href.startsWith('/') && !href.startsWith('//')) {
      // Clean query and hash
      const cleanPath = href.split('?')[0].split('#')[0];
      if (cleanPath === '') continue;

      let targetPath;
      if (cleanPath.endsWith('/')) {
        targetPath = path.join(DIST_DIR, cleanPath.slice(1), 'index.html');
      } else if (path.extname(cleanPath)) {
        targetPath = path.join(DIST_DIR, cleanPath.slice(1));
      } else {
        targetPath = path.join(DIST_DIR, cleanPath.slice(1), 'index.html');
      }

      if (!fs.existsSync(targetPath)) {
        console.error(`[FAIL] Broken internal link in ${relativeHtml}: ${href} (Resolved to: ${targetPath})`);
        hasError = true;
      }
    }
  }
}

console.log(`Audited ${totalLinksChecked} links across all HTML pages.`);

if (hasError) {
  console.error('\n[RESULT] Link audit failed with errors!');
  process.exit(1);
} else {
  console.log('\n[SUCCESS] All link integrity checks passed perfectly:');
  console.log('  - All internal links resolve cleanly.');
  console.log('  - Clinic WhatsApp and tel links use 923134151471.');
  console.log('  - Developer WhatsApp number (923229781129) is strictly isolated to /developer/.');
  console.log('====================================================');
}
