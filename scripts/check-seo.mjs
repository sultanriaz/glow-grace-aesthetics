import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, 'dist');

if (!fs.existsSync(DIST_DIR)) {
  console.error('[ERROR] dist/ directory does not exist. Run "npm run build" first.');
  process.exit(1);
}

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(getHtmlFiles(full));
    } else if (item.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

const allHtmlFiles = getHtmlFiles(DIST_DIR);
console.log(`\nAuditing SEO metadata across ${allHtmlFiles.length} HTML pages in dist/...\n`);

let errors = 0;
let warnings = 0;
const seenTitles = new Map();
const seenDescriptions = new Map();

for (const filePath of allHtmlFiles) {
  const relPath = path.relative(DIST_DIR, filePath).replace(/\\/g, '/');

  // Skip 404 page and developer page from strict indexable SEO rules
  if (relPath === '404.html' || relPath === 'developer/index.html') {
    continue;
  }

  const html = fs.readFileSync(filePath, 'utf-8');

  // 1. Language attribute
  const langMatch = html.match(/<html[^>]*lang=["']([^"']+)["']/i);
  if (!langMatch || !langMatch[1].startsWith('en')) {
    console.error(`[SEO ERROR] ${relPath}: Missing or non-English html lang attribute.`);
    errors++;
  }

  // 2. Title tag
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  if (!titleMatch) {
    console.error(`[SEO ERROR] ${relPath}: Missing <title> tag.`);
    errors++;
  } else {
    const title = titleMatch[1].trim();
    if (title.length < 25 || title.length > 70) {
      console.warn(`[SEO WARN] ${relPath}: Title length (${title.length}) outside ideal range 30-65 chars: "${title}"`);
      warnings++;
    }
    if (seenTitles.has(title)) {
      console.error(`[SEO ERROR] ${relPath}: Duplicate title with ${seenTitles.get(title)}: "${title}"`);
      errors++;
    } else {
      seenTitles.set(title, relPath);
    }
  }

  // 3. Meta description
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
  if (!descMatch) {
    console.error(`[SEO ERROR] ${relPath}: Missing meta description tag.`);
    errors++;
  } else {
    const desc = descMatch[1].trim();
    if (desc.length < 60 || desc.length > 175) {
      console.warn(`[SEO WARN] ${relPath}: Description length (${desc.length}) outside ideal range 70-160 chars: "${desc}"`);
      warnings++;
    }
    if (seenDescriptions.has(desc)) {
      console.warn(`[SEO WARN] ${relPath}: Duplicate description with ${seenDescriptions.get(desc)}`);
      warnings++;
    } else {
      seenDescriptions.set(desc, relPath);
    }
  }

  // 4. Canonical URL
  const canonMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
  if (!canonMatch) {
    console.error(`[SEO ERROR] ${relPath}: Missing canonical link tag.`);
    errors++;
  } else {
    const canonUrl = canonMatch[1].trim();
    const expectedRoute = relPath.replace(/index\.html$/, '').replace(/\.html$/, '');
    if (!canonUrl.endsWith('/' + expectedRoute) && !(expectedRoute === '' && canonUrl.endsWith('/'))) {
      console.error(`[SEO ERROR] ${relPath}: Canonical URL "${canonUrl}" does not match page route "${expectedRoute}".`);
      errors++;
    }
  }

  // 5. OpenGraph Image & Twitter Card
  const ogImgMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i);
  if (!ogImgMatch) {
    console.error(`[SEO ERROR] ${relPath}: Missing og:image meta tag.`);
    errors++;
  } else {
    const ogImgUrl = ogImgMatch[1].trim();
    const urlObj = new URL(ogImgUrl, 'http://localhost');
    const localOgFile = path.join(DIST_DIR, urlObj.pathname);
    if (!fs.existsSync(localOgFile)) {
      console.error(`[SEO ERROR] ${relPath}: og:image file not found at ${localOgFile} (URL: ${ogImgUrl})`);
      errors++;
    }
  }

  const twitterCardMatch = html.match(/<meta[^>]*name=["']twitter:card["'][^>]*content=["']summary_large_image["']/i);
  if (!twitterCardMatch) {
    console.error(`[SEO ERROR] ${relPath}: Missing or invalid twitter:card meta tag.`);
    errors++;
  }
}

console.log(`\n====================================================`);
console.log(`  SEO AUDIT SUMMARY:`);
console.log(`  Total Audited Pages: ${allHtmlFiles.length}`);
console.log(`  Errors:   ${errors}`);
console.log(`  Warnings: ${warnings}`);
console.log(`====================================================\n`);

if (errors > 0) {
  process.exit(1);
} else {
  console.log('✓ All SEO audit checks passed successfully.');
}
