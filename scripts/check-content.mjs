import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const CLINIC_FILE = path.join(ROOT_DIR, 'src', 'data', 'clinic.ts');
const SERVICES_DIR = path.join(ROOT_DIR, 'src', 'content', 'services');

console.log('====================================================');
console.log('  GLOW & GRACE AESTHETICS - CONTENT AUDIT REPORT');
console.log('====================================================\n');

// 1. Scan for TODOs in clinic.ts
console.log('1. OUTSTANDING TODOs IN src/data/clinic.ts:');
if (fs.existsSync(CLINIC_FILE)) {
  const content = fs.readFileSync(CLINIC_FILE, 'utf-8');
  const lines = content.split('\n');
  let todoCount = 0;
  lines.forEach((line, idx) => {
    if (line.includes('TODO(client):')) {
      todoCount++;
      console.log(`   Line ${idx + 1}: ${line.trim()}`);
    }
  });
  if (todoCount === 0) {
    console.log('   No TODOs found in clinic.ts.');
  } else {
    console.log(`   Total TODOs needing client confirmation: ${todoCount}`);
  }
} else {
  console.log('   Warning: src/data/clinic.ts not found!');
}

console.log('\n----------------------------------------------------');

// 2. Scan for services with source: "added"
console.log('2. SERVICES WITH SOURCE "added" (Client confirmation needed):');
const serviceFiles = fs.readdirSync(SERVICES_DIR).filter(f => f.endsWith('.md'));
const addedServices = [];
const clinicListServices = [];

serviceFiles.forEach((file) => {
  const fullPath = path.join(SERVICES_DIR, file);
  const content = fs.readFileSync(fullPath, 'utf-8');
  const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
  const sourceMatch = content.match(/source:\s*["']([^"']+)["']/);
  const categoryMatch = content.match(/category:\s*["']([^"']+)["']/);

  const title = titleMatch ? titleMatch[1] : file;
  const source = sourceMatch ? sourceMatch[1] : 'unknown';
  const category = categoryMatch ? categoryMatch[1] : 'unknown';

  if (source === 'added') {
    addedServices.push({ file, title, category });
  } else {
    clinicListServices.push({ file, title, category });
  }
});

console.log(`   Found ${addedServices.length} added services:`);
addedServices.forEach((s, i) => {
  console.log(`   ${i + 1}. [${s.category.toUpperCase()}] ${s.title} (${s.file})`);
});

console.log(`\n   Found ${clinicListServices.length} direct clinic-list services.`);
console.log(`   Total services registered: ${serviceFiles.length}`);

console.log('\n====================================================');
