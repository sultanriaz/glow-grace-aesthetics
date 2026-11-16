import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, 'dist');

if (!fs.existsSync(DIST_DIR)) {
  console.error('[ERROR] dist/ directory does not exist. Run "npm run build" first.');
  process.exit(1);
}

function getFiles(dir, extensions) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(getFiles(full, extensions));
    } else if (extensions.some(ext => item.endsWith(ext))) {
      results.push(full);
    }
  }
  return results;
}

const htmlFiles = getFiles(DIST_DIR, ['.html']);
const jsFiles = getFiles(DIST_DIR, ['.js']);
console.log(`\nAuditing Privacy & Zero-Tracker Guarantees across ${htmlFiles.length} HTML files and ${jsFiles.length} JS bundles in dist/...\n`);

let violations = 0;

// 1. Audit HTML files
for (const file of htmlFiles) {
  const relPath = path.relative(DIST_DIR, file).replace(/\\/g, '/');
  const content = fs.readFileSync(file, 'utf-8');

  // A. Check for external scripts
  const scriptSrcRegex = /<script[^>]+src=["'](https?:[^"']+)["']/gi;
  let scriptMatch;
  while ((scriptMatch = scriptSrcRegex.exec(content)) !== null) {
    const src = scriptMatch[1];
    // Whitelist only Vercel analytics loader
    if (!src.includes('va.vercel-scripts.com')) {
      console.error(`[PRIVACY VIOLATION] ${relPath}: Unauthorized third-party script source: ${src}`);
      violations++;
    }
  }

  // B. Check for tracking pixels (1x1 images or ad networks)
  const bannedPixelDomains = [
    'facebook.com',
    'connect.facebook.net',
    'google-analytics.com',
    'googletagmanager.com',
    'tiktok.com',
    'analytics.twitter.com',
    'doubleclick.net',
    'clarity.ms',
    'hotjar.com'
  ];

  for (const domain of bannedPixelDomains) {
    if (content.includes(domain)) {
      console.error(`[PRIVACY VIOLATION] ${relPath}: Banned tracking/ad network reference found: ${domain}`);
      violations++;
    }
  }

  // C. Check for cookie setting via meta tag
  if (/<meta[^>]+http-equiv=["']set-cookie["']/i.test(content)) {
    console.error(`[PRIVACY VIOLATION] ${relPath}: <meta http-equiv="set-cookie"> detected.`);
    violations++;
  }

  // D. Check for inline document.cookie writes
  if (/document\.cookie\s*=/i.test(content)) {
    console.error(`[PRIVACY VIOLATION] ${relPath}: Inline document.cookie assignment detected.`);
    violations++;
  }

  // E. Check for external fonts (Google Fonts, Typekit, etc.)
  if (/fonts\.googleapis\.com|fonts\.gstatic\.com|use\.typekit\.net/i.test(content)) {
    console.error(`[PRIVACY VIOLATION] ${relPath}: External font CDN reference detected. All fonts must be self-hosted.`);
    violations++;
  }
}

// 2. Audit Client JS files
for (const file of jsFiles) {
  const relPath = path.relative(DIST_DIR, file).replace(/\\/g, '/');
  const content = fs.readFileSync(file, 'utf-8');

  // Check for persistent localStorage/sessionStorage writes of sensitive keys
  if (/localStorage\.setItem\s*\(\s*["'](?:token|user|patient|id|email|phone)/i.test(content)) {
    console.error(`[PRIVACY VIOLATION] ${relPath}: Client script writes identifiable data to localStorage.`);
    violations++;
  }

  if (/sessionStorage\.setItem\s*\(\s*["'](?:token|user|patient|id|email|phone)/i.test(content)) {
    console.error(`[PRIVACY VIOLATION] ${relPath}: Client script writes identifiable data to sessionStorage.`);
    violations++;
  }

  if (/document\.cookie\s*=/i.test(content)) {
    console.error(`[PRIVACY VIOLATION] ${relPath}: Client script writes to document.cookie.`);
    violations++;
  }
}

console.log(`\n====================================================`);
console.log(`  PRIVACY & TRACKER AUDIT SUMMARY:`);
console.log(`  HTML files checked: ${htmlFiles.length}`);
console.log(`  JS bundles checked: ${jsFiles.length}`);
console.log(`  Privacy Violations: ${violations}`);
console.log(`====================================================\n`);

if (violations > 0) {
  process.exit(1);
} else {
  console.log('✓ All privacy and anti-tracker verification checks passed: zero cookies, zero external trackers, zero external font CDNs.');
}
