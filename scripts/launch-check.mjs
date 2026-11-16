import { spawnSync } from 'node:child_process';

const STEPS = [
  { name: 'Astro Type & Diagnostics Check', command: 'npm', args: ['run', 'check'] },
  { name: 'Vitest Unit Tests', command: 'npm', args: ['test'] },
  { name: 'Medical Claims & Banned Terms Check', command: 'npm', args: ['run', 'check:claims'] },
  { name: 'Static Site Production Build', command: 'npm', args: ['run', 'build'] },
  { name: 'Link Integrity & Developer Number Isolation Check', command: 'npm', args: ['run', 'check:links'] },
  { name: 'Per-Page SEO Metadata Audit', command: 'npm', args: ['run', 'check:seo'] },
  { name: 'JSON-LD Structured Data Schema Audit', command: 'npm', args: ['run', 'check:schema'] },
  { name: 'Zero-Tracker & Zero-Cookie Privacy Audit', command: 'npm', args: ['run', 'check:privacy'] },
  { name: 'Security Headers & CSP Audit', command: 'npm', args: ['run', 'check:headers'] },
  { name: 'Performance & Bundle Size Budgets Check', command: 'npm', args: ['run', 'check:budgets'] },
  { name: 'Content Review Status Audit', command: 'node', args: ['scripts/review-status.mjs'] }
];

console.log('\n====================================================');
console.log('  GLOW & GRACE AESTHETICS — UNIFIED LAUNCH GATE');
console.log('  Running 11 Comprehensive Verification Stages...');
console.log('====================================================\n');

const startTime = Date.now();
let stepIndex = 1;

for (const step of STEPS) {
  process.stdout.write(`[Stage ${stepIndex}/${STEPS.length}] Running: ${step.name}... `);

  const fullCommand = `${step.command} ${step.args.join(' ')}`;
  const res = spawnSync(fullCommand, {
    stdio: 'pipe',
    shell: true,
    encoding: 'utf-8'
  });

  if (res.status !== 0) {
    console.log('FAILED ❌\n');
    console.error(`Error in stage "${step.name}":\n`);
    if (res.stdout) console.log(res.stdout);
    if (res.stderr) console.error(res.stderr);
    console.error('\nLaunch Gate Verification Failed! Fix the above errors before proceeding.');
    process.exit(1);
  }

  console.log('PASSED ✓');
  stepIndex++;
}

const totalDuration = ((Date.now() - startTime) / 1000).toFixed(1);

console.log('\n====================================================');
console.log('  🎉 ALL LAUNCH GATE CHECKS PASSED CLEANLY (11/11)!');
console.log(`  Total Execution Time: ${totalDuration}s`);
console.log('  Status: READY FOR PRODUCTION LAUNCH & HANDOVER');
console.log('====================================================\n');
