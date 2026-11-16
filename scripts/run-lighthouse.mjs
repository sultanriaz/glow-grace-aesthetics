import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const ROOT_DIR = process.cwd();
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const PORT = 4321;

// MIME types
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
  '.webmanifest': 'application/manifest+json'
};

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let reqPath = req.url.split('?')[0];
      if (reqPath.endsWith('/')) {
        reqPath += 'index.html';
      } else if (!path.extname(reqPath)) {
        reqPath += '/index.html';
      }

      const filePath = path.join(DIST_DIR, reqPath);
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': contentType });
        fs.createReadStream(filePath).pipe(res);
      } else {
        const notFoundPath = path.join(DIST_DIR, '404.html');
        if (fs.existsSync(notFoundPath)) {
          res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
          fs.createReadStream(notFoundPath).pipe(res);
        } else {
          res.writeHead(404);
          res.end('Not found');
        }
      }
    });

    server.listen(PORT, () => {
      resolve(server);
    });
  });
}

const PAGES_TO_TEST = [
  { name: 'Home', url: `http://localhost:${PORT}/` },
  { name: 'Services Hub', url: `http://localhost:${PORT}/services/` },
  { name: 'Service Detail (HydraFacial)', url: `http://localhost:${PORT}/services/hydrafacial/` },
  { name: 'Contact', url: `http://localhost:${PORT}/contact/` }
];

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function runAudit() {
  const server = await startServer();
  console.log('Static server started on port 4321.');
  console.log('Running mobile Lighthouse audits (Simulated 4G, Mobile device)...\n');

  const results = [];

  for (const page of PAGES_TO_TEST) {
    console.log(`Auditing ${page.name}...`);
    const outputPath = path.join(ROOT_DIR, `lighthouse-${page.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.json`);

    const args = [
      'lighthouse',
      page.url,
      '--output=json',
      `--output-path=${outputPath}`,
      '--chrome-flags="--headless=new --no-sandbox --disable-gpu"',
      '--form-factor=mobile',
      '--screenEmulation.mobile=true',
      '--throttling-method=simulate',
      '--only-categories=performance,accessibility,best-practices,seo',
      '--quiet'
    ];

    try {
      // Use npx on windows
      const npxCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
      await execFileAsync(npxCmd, args, {
        shell: true,
        env: { ...process.env, CHROME_PATH }
      });

      if (fs.existsSync(outputPath)) {
        const report = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));
        const perf = Math.round((report.categories.performance?.score || 0) * 100);
        const a11y = Math.round((report.categories.accessibility?.score || 0) * 100);
        const bp = Math.round((report.categories['best-practices']?.score || 0) * 100);
        const seo = Math.round((report.categories.seo?.score || 0) * 100);

        const lcp = (report.audits['largest-contentful-paint']?.numericValue || 0) / 1000;
        const cls = report.audits['cumulative-layout-shift']?.numericValue || 0;
        const totalByteWeight = (report.audits['total-byte-weight']?.numericValue || 0) / 1024;

        // Print failed audits if any
        for (const [k, v] of Object.entries(report.categories)) {
          if (v.score !== 1) {
            console.log(`  [${page.name}] Category ${k} is ${Math.round(v.score * 100)}%:`);
            v.auditRefs.forEach((ref) => {
              const audit = report.audits[ref.id];
              if (audit && audit.score !== null && audit.score < 1) {
                console.log(`    - ${ref.id} (${audit.score}): ${audit.title} -> ${audit.explanation || audit.description?.slice(0, 80)}`);
              }
            });
          }
        }

        results.push({
          page: page.name,
          performance: perf,
          accessibility: a11y,
          bestPractices: bp,
          seo: seo,
          lcp: `${lcp.toFixed(2)} s`,
          cls: cls.toFixed(3),
          transferSize: `${totalByteWeight.toFixed(1)} KB`
        });

        // Clean up json report
        fs.unlinkSync(outputPath);
      }
    } catch (err) {
      console.error(`Error running Lighthouse on ${page.name}:`, err.message);
    }
  }

  server.close();

  console.log('\n========================================================================================');
  console.log('                          LIGHTHOUSE MOBILE RESULTS TABLE                               ');
  console.log('========================================================================================');
  console.table(results);
  console.log('Target Budgets: Performance >= 95, Accessibility = 100, Best Practices >= 95, SEO = 100');
  console.log('Target Metrics: LCP < 2.5 s, CLS < 0.05, Home Initial Transfer < 500 KB');
  console.log('========================================================================================\n');
}

runAudit().catch((e) => {
  console.error(e);
  process.exit(1);
});
