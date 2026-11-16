import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, 'dist');

if (!fs.existsSync(DIST_DIR)) {
  console.error('[ERROR] dist/ directory not found. Please run "npm run build" first.');
  process.exit(1);
}

function getGzipSize(filePath) {
  const buffer = fs.readFileSync(filePath);
  return zlib.gzipSync(buffer).length;
}

function getAllFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(getAllFiles(full));
    } else {
      results.push(full);
    }
  }
  return results;
}

const allFiles = getAllFiles(DIST_DIR);
console.log(`\nAuditing Performance Budgets across ${allFiles.length} files in dist/...\n`);

let violations = 0;
let totalSizeBytes = 0;

// Budgets:
const MAX_HTML_GZIP_KB = 40;
const MAX_CSS_GZIP_KB = 30;
const MAX_JS_GZIP_KB = 15;
const MAX_IMAGE_KB = 200;
const MAX_TOTAL_DIST_MB = 10; // Generous ceiling for entire output directory

for (const file of allFiles) {
  const stat = fs.statSync(file);
  totalSizeBytes += stat.size;
  const relPath = path.relative(DIST_DIR, file).replace(/\\/g, '/');

  // 1. HTML Files: per-page gzipped <= 40 KB
  if (file.endsWith('.html')) {
    const gzipBytes = getGzipSize(file);
    const gzipKb = gzipBytes / 1024;
    if (gzipKb > MAX_HTML_GZIP_KB) {
      console.error(`[BUDGET BREACH] HTML ${relPath}: ${gzipKb.toFixed(2)} KB gzipped (Limit: ${MAX_HTML_GZIP_KB} KB)`);
      violations++;
    }
  }

  // 2. CSS Files: per-bundle gzipped <= 30 KB
  if (file.endsWith('.css')) {
    const gzipBytes = getGzipSize(file);
    const gzipKb = gzipBytes / 1024;
    if (gzipKb > MAX_CSS_GZIP_KB) {
      console.error(`[BUDGET BREACH] CSS ${relPath}: ${gzipKb.toFixed(2)} KB gzipped (Limit: ${MAX_CSS_GZIP_KB} KB)`);
      violations++;
    }
  }

  // 3. JS Files: per-bundle gzipped <= 15 KB
  if (file.endsWith('.js')) {
    const gzipBytes = getGzipSize(file);
    const gzipKb = gzipBytes / 1024;
    if (gzipKb > MAX_JS_GZIP_KB) {
      console.error(`[BUDGET BREACH] JS ${relPath}: ${gzipKb.toFixed(2)} KB gzipped (Limit: ${MAX_JS_GZIP_KB} KB)`);
      violations++;
    }
  }

  // 4. Images: <= 200 KB (except hero or favicon if needed <= 300 KB)
  if (/\.(jpg|jpeg|png|webp|avif)$/i.test(file)) {
    const sizeKb = stat.size / 1024;
    // Allow up to 250 KB for icons/hero, 200 KB for all generated OG and asset cards
    const limit = relPath.includes('favicon') ? 300 : MAX_IMAGE_KB;
    if (sizeKb > limit) {
      console.error(`[BUDGET BREACH] Image ${relPath}: ${sizeKb.toFixed(2)} KB (Limit: ${limit} KB)`);
      violations++;
    }
  }
}

const totalDistMb = totalSizeBytes / (1024 * 1024);

console.log(`====================================================`);
console.log(`  PERFORMANCE BUDGET AUDIT SUMMARY:`);
console.log(`  Total Files Audited: ${allFiles.length}`);
console.log(`  Total dist/ Size:    ${totalDistMb.toFixed(2)} MB (Limit: ${MAX_TOTAL_DIST_MB} MB)`);
console.log(`  Budget Breaches:     ${violations}`);
console.log(`====================================================\n`);

if (violations > 0 || totalDistMb > MAX_TOTAL_DIST_MB) {
  process.exit(1);
} else {
  console.log('✓ All performance budgets met successfully. Excellent lightweight profile.');
}
