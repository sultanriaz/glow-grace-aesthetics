import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';
import sharp from 'sharp';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TARGET_DIR = path.join(process.cwd(), 'src', 'assets', 'developer');

if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

async function capture() {
  console.log('Copying developer photo...');
  const userPhoto = 'C:/Users/Dell/.gemini/antigravity/brain/41245fdf-7d34-4063-9dbe-b0a30beefa47/.user_uploaded/media_1794816442082_85704fd8.jpg';
  if (fs.existsSync(userPhoto)) {
    await sharp(userPhoto)
      .resize({ width: 600, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(path.join(TARGET_DIR, 'developer.webp'));
    console.log('Saved src/assets/developer/developer.webp');
  }

  console.log('Launching headless Chrome to capture portfolio preview...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  try {
    await page.goto('https://portfolio-cms-ten-beige.vercel.app/', { waitUntil: 'networkidle2', timeout: 30000 });
    const rawPng = await page.screenshot({ type: 'png' });

    // Optimize to WebP <= 120 KB
    const outputPath = path.join(TARGET_DIR, 'portfolio-preview.webp');
    let quality = 80;
    let webpBuffer = await sharp(rawPng).resize({ width: 1200 }).webp({ quality }).toBuffer();

    while (webpBuffer.length > 120 * 1024 && quality > 40) {
      quality -= 10;
      webpBuffer = await sharp(rawPng).resize({ width: 1200 }).webp({ quality }).toBuffer();
    }

    fs.writeFileSync(outputPath, webpBuffer);
    console.log(`Saved ${outputPath} (size: ${Math.round(webpBuffer.length / 1024)} KB, quality: ${quality})`);
  } catch (err) {
    console.error('Failed to capture portfolio preview:', err.message);
  } finally {
    await browser.close();
  }
}

capture().catch(console.error);
