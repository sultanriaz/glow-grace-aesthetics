import fs from 'node:fs';
import path from 'node:path';
import QRCode from 'qrcode';

const ROOT_DIR = process.cwd();
const MARKETING_DIR = path.join(ROOT_DIR, 'marketing');

if (!fs.existsSync(MARKETING_DIR)) {
  fs.mkdirSync(MARKETING_DIR, { recursive: true });
}

const siteUrl = process.env.SITE_URL || 'https://glow-grace-aesthetics.vercel.app/';
const waUrl = 'https://wa.me/923134151471?text=Assalam%20o%20Alaikum!%20I%20would%20like%20to%20book%20an%20appointment%20at%20Glow%20%26%20Grace%20Aesthetics.';
const directionsUrl = 'https://www.google.com/maps/dir/?api=1&destination=30.0566,70.6348';

const QR_ITEMS = [
  {
    name: 'Website',
    url: siteUrl,
    svgFile: 'qr-website.svg',
    pngFile: 'qr-website.png'
  },
  {
    name: 'WhatsApp Booking',
    url: waUrl,
    svgFile: 'qr-whatsapp.svg',
    pngFile: 'qr-whatsapp.png'
  },
  {
    name: 'Google Maps Directions',
    url: directionsUrl,
    svgFile: 'qr-directions.svg',
    pngFile: 'qr-directions.png'
  }
];

const QR_OPTIONS_PNG = {
  width: 1024,
  margin: 2,
  color: {
    dark: '#03422F', // Clinic deep emerald green
    light: '#FAF8F5' // Clinic warm cream
  },
  errorCorrectionLevel: 'H'
};

const QR_OPTIONS_SVG = {
  type: 'svg',
  margin: 2,
  color: {
    dark: '#03422F',
    light: '#FAF8F5'
  },
  errorCorrectionLevel: 'H'
};

async function generateQrCodes() {
  console.log('Generating high-resolution print-ready QR codes in marketing/...\n');

  for (const item of QR_ITEMS) {
    const svgPath = path.join(MARKETING_DIR, item.svgFile);
    const pngPath = path.join(MARKETING_DIR, item.pngFile);

    // 1. Generate SVG
    await /** @type {Promise<any>} */ (QRCode.toFile(svgPath, item.url, QR_OPTIONS_SVG));
    console.log(`  ✓ Generated SVG: marketing/${item.svgFile}`);

    // 2. Generate PNG 1024x1024
    await /** @type {Promise<any>} */ (QRCode.toFile(pngPath, item.url, QR_OPTIONS_PNG));
    console.log(`  ✓ Generated PNG (1024x1024): marketing/${item.pngFile}`);
  }

  console.log('\nAll QR codes successfully generated in marketing/ directory.');
}

generateQrCodes().catch((err) => {
  console.error('Fatal error generating QR codes:', err);
  process.exit(1);
});
