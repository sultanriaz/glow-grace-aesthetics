import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const VERCEL_JSON_PATH = path.join(ROOT_DIR, 'vercel.json');

if (!fs.existsSync(VERCEL_JSON_PATH)) {
  console.error('[ERROR] vercel.json does not exist.');
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(VERCEL_JSON_PATH, 'utf-8'));
const headersConfig = config.headers || [];

const rootHeaderRule = headersConfig.find(h => h.source === '/(.*)');

if (!rootHeaderRule) {
  console.error('[ERROR] No header rule found for source "/(.*)" in vercel.json.');
  process.exit(1);
}

const headerMap = {};
for (const h of rootHeaderRule.headers || []) {
  headerMap[h.key.toLowerCase()] = h.value;
}

let errors = 0;

// Required headers and directive checks
const REQUIRED_HEADERS = [
  {
    key: 'content-security-policy',
    expectedDirectives: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com",
      "frame-src 'self' https://www.google.com https://maps.google.com",
      "frame-ancestors 'none'",
      "form-action 'self' https://wa.me",
      "base-uri 'self'",
      "object-src 'none'"
    ]
  },
  {
    key: 'strict-transport-security',
    expectedSnippet: 'max-age=63072000'
  },
  {
    key: 'x-content-type-options',
    expectedValue: 'nosniff'
  },
  {
    key: 'x-frame-options',
    expectedValue: 'DENY'
  },
  {
    key: 'referrer-policy',
    expectedValue: 'strict-origin-when-cross-origin'
  },
  {
    key: 'permissions-policy',
    expectedDirectives: [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'payment=()',
      'usb=()'
    ]
  }
];

console.log('\nAuditing response headers in vercel.json...\n');

for (const req of REQUIRED_HEADERS) {
  const val = headerMap[req.key];
  if (!val) {
    console.error(`[HEADER ERROR] Missing required header: ${req.key}`);
    errors++;
    continue;
  }

  if (req.expectedValue && val !== req.expectedValue) {
    console.error(`[HEADER ERROR] Header "${req.key}" expected "${req.expectedValue}", got "${val}"`);
    errors++;
  }

  if (req.expectedSnippet && !val.includes(req.expectedSnippet)) {
    console.error(`[HEADER ERROR] Header "${req.key}" missing expected directive snippet "${req.expectedSnippet}"`);
    errors++;
  }

  if (req.expectedDirectives) {
    for (const directive of req.expectedDirectives) {
      if (!val.includes(directive)) {
        console.error(`[HEADER ERROR] Header "${req.key}" missing expected directive: "${directive}"`);
        errors++;
      }
    }
  }

  console.log(`  ✓ Header "${req.key}" passed validation.`);
}

console.log(`\n====================================================`);
console.log(`  SECURITY HEADERS AUDIT SUMMARY:`);
console.log(`  Total Headers Audited: ${REQUIRED_HEADERS.length}`);
console.log(`  Header Errors:         ${errors}`);
console.log(`====================================================\n`);

if (errors > 0) {
  process.exit(1);
} else {
  console.log('✓ All security headers and CSP directives verified perfectly.');
}
