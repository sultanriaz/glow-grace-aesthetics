import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const SERVICES_DIR = path.join(ROOT_DIR, 'src', 'content', 'services');
const BLOG_DIR = path.join(ROOT_DIR, 'src', 'content', 'blog');

function parseFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const lines = match[1].split('\n');
  const data = {};
  for (const line of lines) {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      let val = line.slice(colonIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      data[key] = val;
    }
  }
  return data;
}

function checkReviewStatus() {
  console.log('\n====================================================');
  console.log('  GLOW & GRACE AESTHETICS - CONTENT REVIEW STATUS');
  console.log('====================================================\n');

  // 1. Audit Services
  const serviceFiles = fs.readdirSync(SERVICES_DIR).filter(f => f.endsWith('.md'));
  let servicesDraft = 0;
  let servicesApproved = 0;

  console.log(`Auditing ${serviceFiles.length} Aesthetic Service Documents:`);
  console.log('----------------------------------------------------');
  for (const file of serviceFiles) {
    const filePath = path.join(SERVICES_DIR, file);
    const data = parseFrontmatter(filePath);
    const status = data.reviewStatus || 'draft';
    const title = data.shortTitle || data.title || file;
    const cat = (data.category || 'general').padEnd(12, ' ');
    
    if (status === 'approved') {
      servicesApproved++;
      console.log(`  [APPROVED] [${cat}] ${title}`);
    } else {
      servicesDraft++;
      console.log(`  [DRAFT]    [${cat}] ${title}`);
    }
  }

  // 2. Audit Blog Posts
  const blogFiles = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));
  let blogDraft = 0;
  let blogApproved = 0;

  console.log(`\nAuditing ${blogFiles.length} Educational Blog Articles:`);
  console.log('----------------------------------------------------');
  for (const file of blogFiles) {
    const filePath = path.join(BLOG_DIR, file);
    const data = parseFrontmatter(filePath);
    const status = data.reviewStatus || 'draft';
    const title = data.title || file;

    if (status === 'approved') {
      blogApproved++;
      console.log(`  [APPROVED] ${title}`);
    } else {
      blogDraft++;
      console.log(`  [DRAFT]    ${title}`);
    }
  }

  console.log('\n====================================================');
  console.log('  REVIEW STATUS AUDIT SUMMARY:');
  console.log(`  Services Total:   ${serviceFiles.length} (${servicesApproved} approved, ${servicesDraft} draft awaiting clinic sign-off)`);
  console.log(`  Blog Posts Total: ${blogFiles.length} (${blogApproved} approved, ${blogDraft} draft awaiting clinic sign-off)`);
  console.log('====================================================');

  if (servicesDraft > 0 || blogDraft > 0) {
    console.log('\nNote: As specified in clinical governance protocols, all placeholder/draft content');
    console.log('remains safely marked as "draft" until the clinic doctor conducts formal sign-off.');
    console.log('See CONTENT_REVIEW.md for clinical sign-off instructions.\n');
  } else {
    console.log('\nAll clinical services and blog articles have been formally approved!\n');
  }
}

checkReviewStatus();
