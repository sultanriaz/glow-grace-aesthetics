import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const ALLOWLIST_PATH = path.join(ROOT_DIR, 'scripts', 'claims-allowlist.json');

const allowlistData = fs.existsSync(ALLOWLIST_PATH)
  ? JSON.parse(fs.readFileSync(ALLOWLIST_PATH, 'utf-8'))
  : { allowedSnippets: [], allowedFiles: [] };

const BANNED_PATTERNS = [
  { name: 'guarantee', regex: /\bguarantee[a-z]*\b/i },
  { name: '100%', regex: /100\s*%/i },
  { name: 'painless', regex: /\bpainless\b/i },
  { name: 'pain-free', regex: /\bpain[- ]free\b/i },
  { name: 'risk-free', regex: /\brisk[- ]free\b/i },
  { name: 'no side effects', regex: /\b(?:no|zero)\s+side[- ]effects?\b/i },
  { name: 'permanent', regex: /\bpermanent(?:ly)?\b/i },
  { name: 'miracle', regex: /\bmiracle\b/i },
  { name: 'instant', regex: /\binstant(?:ly)?\b/i },
  { name: 'cure', regex: /\bcure[sd]?\b|\bcuring\b/i },
  { name: 'best in', regex: /\bbest\s+in\b/i },
  { name: '#1 or number 1', regex: /#1\b|\bnumber\s+(?:one|1)\b|\bno\.\s*1\b/i },
  { name: 'no downtime', regex: /\bno\s+downtime\b/i },
  { name: 'safe and effective', regex: /\bsafe\s+and\s+effective\b/i },
  { name: 'clinically proven', regex: /\bclinically\s+proven\b/i },
  { name: 'proven', regex: /\bproven\b/i },
  { name: 'FDA / approved by', regex: /\bFDA\b|\bapproved\s+by\b/i }
];

const SCAN_DIRS = [
  path.join(ROOT_DIR, 'src', 'content'),
  path.join(ROOT_DIR, 'src', 'data'),
  path.join(ROOT_DIR, 'src', 'pages'),
  path.join(ROOT_DIR, 'src', 'components')
];

function getFiles(dir, exts = ['.md', '.ts', '.astro']) {
  if (!fs.existsSync(dir)) return [];
  let results = [];
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(getFiles(full, exts));
    } else if (exts.some(ext => item.endsWith(ext))) {
      results.push(full);
    }
  }
  return results;
}

let files = [];
for (const dir of SCAN_DIRS) {
  files = files.concat(getFiles(dir));
}

let failures = 0;

for (const file of files) {
  const relFile = path.relative(ROOT_DIR, file).replace(/\\/g, '/');
  if (allowlistData.allowedFiles && allowlistData.allowedFiles.includes(relFile)) {
    continue;
  }

  let content = fs.readFileSync(file, 'utf-8');
  if (file.endsWith('.astro')) {
    // Strip <style> and <script> tags and their contents
    content = content.replace(/<(style|script)[\s\S]*?<\/\1>/gi, (match) => {
      // replace with empty lines so line numbers match
      return match.split('\n').map(() => '').join('\n');
    });
  }
  const lines = content.split('\n');

  lines.forEach((line, lineIdx) => {
    // Check if line contains any allowed snippet
    let isAllowed = false;
    for (const snippet of allowlistData.allowedSnippets || []) {
      if (line.includes(snippet)) {
        isAllowed = true;
        break;
      }
    }
    if (isAllowed) return;

    for (const pattern of BANNED_PATTERNS) {
      if (pattern.regex.test(line)) {
        console.error(`[CLAIM VIOLATION] Pattern '${pattern.name}' in ${relFile}:${lineIdx + 1}`);
        console.error(`  > ${line.trim()}`);
        failures++;
      }
    }
  });
}

if (failures > 0) {
  console.error(`\nFound ${failures} unapproved medical/promotional claim violation(s).`);
  process.exit(1);
} else {
  console.log('✓ All scanned files passed medical claims check. No banned words found.');
}
