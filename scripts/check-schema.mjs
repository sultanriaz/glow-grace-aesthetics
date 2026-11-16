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
console.log(`\nAuditing Structured Data (JSON-LD) across ${allHtmlFiles.length} HTML pages in dist/...\n`);

let errors = 0;
let validatedSchemas = 0;

for (const filePath of allHtmlFiles) {
  const relPath = path.relative(DIST_DIR, filePath).replace(/\\/g, '/');

  // Skip 404 page and developer page (developer page has no JSON-LD by design)
  if (relPath === '404.html' || relPath === 'developer/index.html') {
    continue;
  }

  const html = fs.readFileSync(filePath, 'utf-8');
  const schemaRegex = /<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi;
  let match;
  let foundSchemaOnPage = false;

  while ((match = schemaRegex.exec(html)) !== null) {
    foundSchemaOnPage = true;
    const rawJson = match[1].trim();

    let parsed;
    try {
      parsed = JSON.parse(rawJson);
    } catch (err) {
      console.error(`[SCHEMA ERROR] ${relPath}: Invalid JSON syntax in ld+json block:`, err.message);
      errors++;
      continue;
    }

    const schemas = Array.isArray(parsed) ? parsed : [parsed];

    for (const schema of schemas) {
      validatedSchemas++;

      // Validate @context
      if (!schema['@context'] || !schema['@context'].includes('schema.org')) {
        console.error(`[SCHEMA ERROR] ${relPath}: Missing or invalid @context: ${schema['@context']}`);
        errors++;
      }

      // Validate @type
      if (!schema['@type']) {
        console.error(`[SCHEMA ERROR] ${relPath}: Missing @type in schema.`);
        errors++;
      }

      // Type-specific validation
      const type = schema['@type'];
      if (type === 'FAQPage') {
        if (!schema.mainEntity || !Array.isArray(schema.mainEntity) || schema.mainEntity.length === 0) {
          console.error(`[SCHEMA ERROR] ${relPath}: FAQPage missing mainEntity question array.`);
          errors++;
        }
      } else if (type === 'BreadcrumbList') {
        if (!schema.itemListElement || !Array.isArray(schema.itemListElement) || schema.itemListElement.length === 0) {
          console.error(`[SCHEMA ERROR] ${relPath}: BreadcrumbList missing itemListElement array.`);
          errors++;
        }
      } else if (type === 'Article' || type === 'BlogPosting') {
        if (!schema.headline && !schema.name) {
          console.error(`[SCHEMA ERROR] ${relPath}: Article schema missing headline or name.`);
          errors++;
        }
        if (!schema.datePublished) {
          console.error(`[SCHEMA ERROR] ${relPath}: Article schema missing datePublished.`);
          errors++;
        }
      } else if (type === 'Service' || type === 'MedicalProcedure' || type === 'MedicalBusiness' || type === 'LocalBusiness') {
        if (!schema.name) {
          console.error(`[SCHEMA ERROR] ${relPath}: ${type} schema missing name.`);
          errors++;
        }
      }
    }
  }

  // Legal pages don't strictly require JSON-LD, but all other clinic pages should have at least one schema
  const isLegalPage = relPath.startsWith('privacy') || relPath.startsWith('terms') || relPath.startsWith('medical-disclaimer');
  if (!foundSchemaOnPage && !isLegalPage) {
    console.warn(`[SCHEMA WARN] ${relPath}: No application/ld+json block found.`);
  }
}

console.log(`\n====================================================`);
console.log(`  STRUCTURED DATA (JSON-LD) AUDIT SUMMARY:`);
console.log(`  Total Schemas Validated: ${validatedSchemas}`);
console.log(`  Schema Errors Found:     ${errors}`);
console.log(`====================================================\n`);

if (errors > 0) {
  process.exit(1);
} else {
  console.log('✓ All structured data (JSON-LD) checks passed successfully.');
}
