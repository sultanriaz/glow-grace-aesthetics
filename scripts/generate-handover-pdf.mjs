import fs from 'node:fs';
import path from 'node:path';
import { chromium } from '@playwright/test';

const ROOT_DIR = process.cwd();
const HANDOVER_MD_PATH = path.join(ROOT_DIR, 'docs', 'HANDOVER.md');
const PDF_OUTPUT_PATH = path.join(ROOT_DIR, 'docs', 'Client-Handover.pdf');

function markdownToHtml(md) {
  const lines = md.split('\n');
  const htmlLines = [];
  let inTable = false;
  let tableHeaderParsed = false;
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trimEnd();

    // Check if in table
    if (line.trim().startsWith('|')) {
      if (!inTable) {
        if (inList) {
          htmlLines.push('</ul>');
          inList = false;
        }
        inTable = true;
        tableHeaderParsed = false;
        htmlLines.push('<div class="table-container"><table>');
      }

      // Check if separator line
      if (/^\|(\s*:?-+:?\s*\|)+$/.test(line.trim())) {
        tableHeaderParsed = true;
        continue;
      }

      const cells = line
        .trim()
        .replace(/^\|/, '')
        .replace(/\|$/, '')
        .split('|')
        .map(c => c.trim());

      if (!tableHeaderParsed) {
        htmlLines.push('<thead><tr>');
        for (const cell of cells) {
          htmlLines.push(`<th>${formatInline(cell)}</th>`);
        }
        htmlLines.push('</tr></thead><tbody>');
      } else {
        htmlLines.push('<tr>');
        for (const cell of cells) {
          htmlLines.push(`<td>${formatInline(cell)}</td>`);
        }
        htmlLines.push('</tr>');
      }
      continue;
    } else if (inTable) {
      htmlLines.push('</tbody></table></div>');
      inTable = false;
    }

    // Unordered lists
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      if (!inList) {
        inList = true;
        htmlLines.push('<ul>');
      }
      const itemContent = line.trim().replace(/^[-*]\s+/, '');
      htmlLines.push(`<li>${formatInline(itemContent)}</li>`);
      continue;
    } else if (inList) {
      htmlLines.push('</ul>');
      inList = false;
    }

    // Numbered lists
    if (/^\d+\.\s+/.test(line.trim())) {
      const itemContent = line.trim().replace(/^\d+\.\s+/, '');
      htmlLines.push(`<div class="numbered-item">${formatInline(itemContent)}</div>`);
      continue;
    }

    // Horizontal rule
    if (/^---/.test(line.trim())) {
      htmlLines.push('<hr />');
      continue;
    }

    // Headings
    if (line.startsWith('# ')) {
      htmlLines.push(`<h1>${formatInline(line.replace('# ', ''))}</h1>`);
      continue;
    }
    if (line.startsWith('## ')) {
      htmlLines.push(`<h2>${formatInline(line.replace('## ', ''))}</h2>`);
      continue;
    }
    if (line.startsWith('### ')) {
      htmlLines.push(`<h3>${formatInline(line.replace('### ', ''))}</h3>`);
      continue;
    }

    // Empty lines
    if (line.trim() === '') {
      continue;
    }

    // Paragraph
    htmlLines.push(`<p>${formatInline(line)}</p>`);
  }

  if (inTable) {
    htmlLines.push('</tbody></table></div>');
  }
  if (inList) {
    htmlLines.push('</ul>');
  }

  return htmlLines.join('\n');
}

function formatInline(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
}

async function generatePdf() {
  console.log('Reading docs/HANDOVER.md and compiling executive printable document...');
  const mdContent = fs.readFileSync(HANDOVER_MD_PATH, 'utf-8');
  const bodyHtml = markdownToHtml(mdContent);

  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Glow &amp; Grace Aesthetics — Handover Document</title>
<style>
  @page {
    size: A4;
    margin: 20mm 15mm 20mm 15mm;
  }
  * {
    box-sizing: border-box;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #1A1A1A;
    background: #FFFFFF;
    line-height: 1.5;
    font-size: 11pt;
    margin: 0;
    padding: 0;
  }
  h1 {
    font-family: "Georgia", "Times New Roman", serif;
    color: #03422F;
    font-size: 24pt;
    font-weight: 700;
    margin-top: 0;
    margin-bottom: 8px;
    border-bottom: 2px solid #C69A5C;
    padding-bottom: 6px;
  }
  h2 {
    font-family: "Georgia", "Times New Roman", serif;
    color: #03422F;
    font-size: 15pt;
    font-weight: 700;
    margin-top: 18pt;
    margin-bottom: 6pt;
    border-bottom: 1px solid #E5E7EB;
    padding-bottom: 3pt;
    page-break-after: avoid;
  }
  h3 {
    font-size: 12pt;
    font-weight: 600;
    color: #046A4E;
    margin-top: 12pt;
    margin-bottom: 4pt;
    page-break-after: avoid;
  }
  p {
    margin-top: 0;
    margin-bottom: 8pt;
  }
  .table-container {
    width: 100%;
    margin: 10pt 0 14pt 0;
    page-break-inside: avoid;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 9.5pt;
  }
  th {
    background-color: #03422F;
    color: #FFFFFF;
    text-align: left;
    padding: 6pt 8pt;
    font-weight: 600;
  }
  td {
    padding: 5pt 8pt;
    border-bottom: 1px solid #E5E7EB;
    vertical-align: top;
  }
  tr:nth-child(even) td {
    background-color: #F9FAFB;
  }
  code {
    font-family: "Courier New", Courier, monospace;
    background-color: #F3F4F6;
    padding: 1pt 3pt;
    border-radius: 3px;
    font-size: 9pt;
    color: #8A6A3B;
  }
  hr {
    border: none;
    border-top: 1px solid #E5E7EB;
    margin: 16pt 0;
  }
  ul {
    margin-top: 0;
    margin-bottom: 8pt;
    padding-left: 18pt;
  }
  li {
    margin-bottom: 3pt;
  }
  .numbered-item {
    margin-bottom: 5pt;
    padding-left: 4pt;
  }
  a {
    color: #046A4E;
    text-decoration: none;
  }
</style>
</head>
<body>
  ${bodyHtml}
</body>
</html>`;

  console.log('Launching headless browser to generate PDF...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.setContent(fullHtml, { waitUntil: 'domcontentloaded' });

  await page.pdf({
    path: PDF_OUTPUT_PATH,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '18mm',
      bottom: '18mm',
      left: '15mm',
      right: '15mm'
    },
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: `
      <div style="font-family: -apple-system, sans-serif; font-size: 8pt; color: #888; width: 100%; text-align: right; padding-right: 15mm;">
        Glow &amp; Grace Aesthetics &bull; Executive Handover Document &bull; Page <span class="pageNumber"></span> of <span class="totalPages"></span>
      </div>
    `
  });

  await browser.close();

  const stats = fs.statSync(PDF_OUTPUT_PATH);
  console.log(`✓ Handover PDF generated successfully at docs/Client-Handover.pdf (${(stats.size / 1024).toFixed(1)} KB)`);
}

generatePdf().catch((err) => {
  console.error('Fatal error generating Handover PDF:', err);
  process.exit(1);
});
