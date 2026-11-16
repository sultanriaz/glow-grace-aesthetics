import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const ROOT_DIR = process.cwd();
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const BRAND_DIR = path.join(ROOT_DIR, 'src', 'assets', 'brand');

if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

// Check if a real custom logo exists
const possibleLogos = ['logo.svg', 'logo.png', 'logo.webp', 'logo.jpg'];
let sourceLogoPath = null;

for (const filename of possibleLogos) {
  const fullPath = path.join(BRAND_DIR, filename);
  if (fs.existsSync(fullPath)) {
    sourceLogoPath = fullPath;
    break;
  }
}

// Base Mark SVG with transparent background
const baseMarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="512" height="512">
  <path d="M 68 20 C 40 10, 10 32, 12 60 C 14 84, 42 94, 68 88 C 76 86, 82 80, 84 72 C 84 70, 80 69, 79 72 C 73 80, 48 88, 24 76 C 14 70, 15 36, 44 22 C 58 16, 74 22, 78 28 C 79 30, 82 28, 80 25 C 77 22, 73 20, 68 20 Z" fill="#03422F"/>
  <path d="M 46 74 C 54 74, 62 70, 66 63 C 62 67, 54 69, 46 68 C 42 67, 39 69, 41 71 C 42 73, 44 74, 46 74 Z" fill="#E1BC8A"/>
  <path d="M 32 64 C 36 50, 48 42, 62 38 C 52 46, 46 56, 42 66 C 39 68, 32 68, 32 64 Z" fill="#309E79"/>
  <path d="M 44 58 C 48 46, 58 40, 70 36 C 60 44, 56 52, 52 62 C 48 64, 44 62, 44 58 Z" fill="#1F7A5A" opacity="0.9"/>
  <path d="M 52 38 C 50 30, 54 22, 57 18 C 60 23, 62 30, 56 38 Z" fill="#309E79"/>
  <path d="M 50 35 C 44 31, 38 27, 40 22 C 45 23, 50 28, 52 34 Z" fill="#1F7A5A"/>
  <path d="M 56 35 C 62 31, 68 28, 68 23 C 64 24, 58 29, 54 34 Z" fill="#309E79"/>
  <path d="M 78 40 C 76 38, 76 35, 79 34 C 82 33, 83 36, 81 38 C 84 39, 83 42, 80 42 C 78 42, 77 41, 78 40 Z" fill="#DB9657"/>
</svg>`;

// Maskable icon SVG (with cream background padding)
const maskableMarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="512" height="512">
  <rect width="100" height="100" fill="#FAF7F2"/>
  <g transform="translate(10, 10) scale(0.8)">
    <path d="M 68 20 C 40 10, 10 32, 12 60 C 14 84, 42 94, 68 88 C 76 86, 82 80, 84 72 C 84 70, 80 69, 79 72 C 73 80, 48 88, 24 76 C 14 70, 15 36, 44 22 C 58 16, 74 22, 78 28 C 79 30, 82 28, 80 25 C 77 22, 73 20, 68 20 Z" fill="#03422F"/>
    <path d="M 46 74 C 54 74, 62 70, 66 63 C 62 67, 54 69, 46 68 C 42 67, 39 69, 41 71 C 42 73, 44 74, 46 74 Z" fill="#E1BC8A"/>
    <path d="M 32 64 C 36 50, 48 42, 62 38 C 52 46, 46 56, 42 66 C 39 68, 32 68, 32 64 Z" fill="#309E79"/>
    <path d="M 44 58 C 48 46, 58 40, 70 36 C 60 44, 56 52, 52 62 C 48 64, 44 62, 44 58 Z" fill="#1F7A5A" opacity="0.9"/>
    <path d="M 52 38 C 50 30, 54 22, 57 18 C 60 23, 62 30, 56 38 Z" fill="#309E79"/>
    <path d="M 50 35 C 44 31, 38 27, 40 22 C 45 23, 50 28, 52 34 Z" fill="#1F7A5A"/>
    <path d="M 56 35 C 62 31, 68 28, 68 23 C 64 24, 58 29, 54 34 Z" fill="#309E79"/>
    <path d="M 78 40 C 76 38, 76 35, 79 34 C 82 33, 83 36, 81 38 C 84 39, 83 42, 80 42 C 78 42, 77 41, 78 40 Z" fill="#DB9657"/>
  </g>
</svg>`;

// OG Default Social Share Image SVG (1200x630, cream background, lockup centered)
const ogImageSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <radialGradient id="og-glow" cx="50%" cy="40%" r="55%">
      <stop offset="0%" stop-color="#EAF4EF" stop-opacity="0.9"/>
      <stop offset="70%" stop-color="#FAF7F2" stop-opacity="1"/>
    </radialGradient>
    <style>
      .og-title { font-family: 'Georgia', serif; font-size: 76px; font-weight: 700; fill: #03422F; letter-spacing: -1px; }
      .og-tagline { font-family: 'sans-serif'; font-size: 20px; font-weight: 600; fill: #1F7A5A; letter-spacing: 5px; text-transform: uppercase; }
      .og-location { font-family: 'sans-serif'; font-size: 22px; font-weight: 500; fill: #8A6A3B; letter-spacing: 2px; }
      .og-hairline { stroke: #E1BC8A; stroke-width: 1.5; }
    </style>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="#FAF7F2"/>
  <circle cx="600" cy="280" r="380" fill="url(#og-glow)"/>

  <!-- Outer frame border -->
  <rect x="28" y="28" width="1144" height="574" rx="16" fill="none" stroke="#F3E7D6" stroke-width="2"/>
  <rect x="36" y="36" width="1128" height="558" rx="12" fill="none" stroke="#E1BC8A" stroke-width="1"/>

  <!-- Centered Mark Group -->
  <g transform="translate(540, 100) scale(1.2)">
    <path d="M 68 20 C 40 10, 10 32, 12 60 C 14 84, 42 94, 68 88 C 76 86, 82 80, 84 72 C 84 70, 80 69, 79 72 C 73 80, 48 88, 24 76 C 14 70, 15 36, 44 22 C 58 16, 74 22, 78 28 C 79 30, 82 28, 80 25 C 77 22, 73 20, 68 20 Z" fill="#03422F"/>
    <path d="M 46 74 C 54 74, 62 70, 66 63 C 62 67, 54 69, 46 68 C 42 67, 39 69, 41 71 C 42 73, 44 74, 46 74 Z" fill="#E1BC8A"/>
    <path d="M 32 64 C 36 50, 48 42, 62 38 C 52 46, 46 56, 42 66 C 39 68, 32 68, 32 64 Z" fill="#309E79"/>
    <path d="M 44 58 C 48 46, 58 40, 70 36 C 60 44, 56 52, 52 62 C 48 64, 44 62, 44 58 Z" fill="#1F7A5A" opacity="0.9"/>
    <path d="M 52 38 C 50 30, 54 22, 57 18 C 60 23, 62 30, 56 38 Z" fill="#309E79"/>
    <path d="M 50 35 C 44 31, 38 27, 40 22 C 45 23, 50 28, 52 34 Z" fill="#1F7A5A"/>
    <path d="M 56 35 C 62 31, 68 28, 68 23 C 64 24, 58 29, 54 34 Z" fill="#309E79"/>
    <path d="M 78 40 C 76 38, 76 35, 79 34 C 82 33, 83 36, 81 38 C 84 39, 83 42, 80 42 C 78 42, 77 41, 78 40 Z" fill="#DB9657"/>
  </g>

  <!-- Title & Tagline -->
  <text x="600" y="300" text-anchor="middle" class="og-title">Glow &amp; Grace</text>
  <text x="600" y="348" text-anchor="middle" class="og-tagline">HAIR, BODY, SKIN CARE &amp; AESTHETICS</text>

  <line x1="420" y1="382" x2="780" y2="382" class="og-hairline"/>

  <!-- Location info -->
  <text x="600" y="425" text-anchor="middle" class="og-location">YCDO Ghazi National Hospital • Multan Road, DG Khan</text>
  <text x="600" y="465" text-anchor="middle" style="font-family: sans-serif; font-size: 18px; fill: #4A5D55;">Mon – Sat: 10:00 AM – 10:00 PM | Appointments: 0313-4151471</text>
</svg>`;

async function generateAssets() {
  console.log('Generating brand icons, favicons, manifest and OG image...');

  // 1. Write favicon.svg
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.svg'), baseMarkSvg, 'utf-8');
  console.log('  Created public/favicon.svg');

  // Input buffer for sharp: custom logo or SVG buffer
  const inputBuffer = sourceLogoPath ? fs.readFileSync(sourceLogoPath) : Buffer.from(baseMarkSvg);

  // 2. Generate 192x192 PNG
  await sharp(inputBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'icon-192.png'));
  console.log('  Created public/icon-192.png');

  // 3. Generate 512x512 PNG
  await sharp(inputBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'icon-512.png'));
  console.log('  Created public/icon-512.png');

  // 4. Generate 512x512 maskable PNG
  await sharp(Buffer.from(maskableMarkSvg))
    .resize(512, 512)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'icon-512-maskable.png'));
  console.log('  Created public/icon-512-maskable.png');

  // 5. Generate apple-touch-icon.png (180x180 with solid cream background)
  await sharp(Buffer.from(maskableMarkSvg))
    .resize(180, 180)
    .png()
    .toFile(path.join(PUBLIC_DIR, 'apple-touch-icon.png'));
  console.log('  Created public/apple-touch-icon.png');

  // 6. Generate favicon.ico using png-to-ico
  const tempFaviconPng = path.join(PUBLIC_DIR, 'temp-favicon-32.png');
  await sharp(inputBuffer).resize(32, 32).png().toFile(tempFaviconPng);
  const icoBuffer = await pngToIco(tempFaviconPng);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.ico'), icoBuffer);
  fs.unlinkSync(tempFaviconPng);
  console.log('  Created public/favicon.ico');

  // 7. Generate og-default.jpg (1200x630, JPEG)
  await sharp(Buffer.from(ogImageSvg))
    .jpeg({ quality: 90 })
    .toFile(path.join(PUBLIC_DIR, 'og-default.jpg'));
  console.log('  Created public/og-default.jpg');

  // 8. Generate public/site.webmanifest
  const manifest = {
    name: "Glow & Grace Aesthetics",
    short_name: "Glow & Grace",
    description: "Hair, Body, Skin Care & Aesthetics Clinic in Dera Ghazi Khan, Pakistan",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF7F2",
    theme_color: "#03422F",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    ]
  };

  fs.writeFileSync(path.join(PUBLIC_DIR, 'site.webmanifest'), JSON.stringify(manifest, null, 2), 'utf-8');
  console.log('  Created public/site.webmanifest');

  // 9. Generate public/robots.txt
  const siteUrl = process.env.SITE_URL || 'https://glow-grace-aesthetics.vercel.app';
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /developer/
Disallow: /404/

Sitemap: ${siteUrl}/sitemap-index.xml
`;
  fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), robotsTxt, 'utf-8');
  console.log('  Created public/robots.txt');

  console.log('All icons, manifest, and SEO assets generated successfully.');
}

generateAssets().catch((err) => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
