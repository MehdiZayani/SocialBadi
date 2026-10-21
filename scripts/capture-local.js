const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT_DIR = path.join(__dirname, '../public/projects');

async function captureLocal() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });

  // 1. BadiCRM (http://localhost:3000/)
  try {
    console.log('Capturing BadiCRM on localhost:3000...');
    await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded', timeout: 10000 });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: path.join(OUT_DIR, 'badi-crm.jpg'), type: 'jpeg', quality: 90 });
    console.log('Successfully saved badi-crm.jpg');

    await page.evaluate(() => window.scrollBy({ top: 900, behavior: 'instant' }));
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(OUT_DIR, 'badi-crm-features.jpg'), type: 'jpeg', quality: 90 });
    console.log('Successfully saved badi-crm-features.jpg');
  } catch (err) {
    console.error('Error on BadiCRM:', err.message);
  }

  // 2. Olympe Thalasso (http://localhost:3002/)
  try {
    console.log('Capturing Olympe Thalasso on localhost:3002...');
    await page.goto('http://localhost:3002/', { waitUntil: 'domcontentloaded', timeout: 10000 });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: path.join(OUT_DIR, 'olympe-thalasso.jpg'), type: 'jpeg', quality: 90 });
    console.log('Successfully saved olympe-thalasso.jpg');

    await page.evaluate(() => window.scrollBy({ top: 850, behavior: 'instant' }));
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(OUT_DIR, 'olympe-soins.jpg'), type: 'jpeg', quality: 90 });
    console.log('Successfully saved olympe-soins.jpg');
  } catch (err) {
    console.error('Error on Olympe Thalasso:', err.message);
  }

  await browser.close();
  console.log('Local captures complete!');
}

captureLocal().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
