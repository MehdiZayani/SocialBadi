const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT_DIR = path.join(__dirname, '../public/projects');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function capture() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });

  // 1. BadiCRM - Hero & Features (from localhost:3000 or badicrm.com)
  try {
    console.log('Capturing BadiCRM...');
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2', timeout: 15000 });
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(OUT_DIR, 'badi-crm.jpg'), type: 'jpeg', quality: 90 });
    console.log('Saved badi-crm.jpg');

    // Scroll to features or pipeline section
    await page.evaluate(() => {
      window.scrollBy({ top: 900, behavior: 'instant' });
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(OUT_DIR, 'badi-crm-features.jpg'), type: 'jpeg', quality: 90 });
    console.log('Saved badi-crm-features.jpg');
  } catch (err) {
    console.error('Error on BadiCRM:', err.message);
  }

  // 2. Lucci Design (https://luccidesign.tn/)
  try {
    console.log('Capturing Lucci Design...');
    await page.goto('https://luccidesign.tn/', { waitUntil: 'networkidle2', timeout: 20000 });
    await new Promise(r => setTimeout(r, 1500));
    // Close modal if any
    await page.evaluate(() => {
      const closeBtn = document.querySelector('.modal-close, button[aria-label="Close"], .close');
      if (closeBtn) closeBtn.click();
    });
    await page.screenshot({ path: path.join(OUT_DIR, 'lucci-design.jpg'), type: 'jpeg', quality: 90 });
    console.log('Saved lucci-design.jpg');

    // Scroll down for cuisine
    await page.evaluate(() => {
      window.scrollBy({ top: 800, behavior: 'instant' });
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(OUT_DIR, 'lucci-cuisine.jpg'), type: 'jpeg', quality: 90 });
    console.log('Saved lucci-cuisine.jpg');

    // Scroll down for dressing
    await page.evaluate(() => {
      window.scrollBy({ top: 800, behavior: 'instant' });
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(OUT_DIR, 'lucci-dressing.jpg'), type: 'jpeg', quality: 90 });
    console.log('Saved lucci-dressing.jpg');
  } catch (err) {
    console.error('Error on Lucci Design:', err.message);
  }

  // 3. Restaurant Zitouna Menu (https://zitounamenu.vercel.app/)
  try {
    console.log('Capturing Zitouna Menu...');
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
    await page.goto('https://zitounamenu.vercel.app/', { waitUntil: 'networkidle2', timeout: 15000 });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(OUT_DIR, 'zitouna-menu.jpg'), type: 'jpeg', quality: 90 });
    console.log('Saved zitouna-menu.jpg');
  } catch (err) {
    console.error('Error on Zitouna Menu:', err.message);
  }

  // 4. Archi Renov Paris (https://archi-renov.com/)
  try {
    console.log('Capturing Archi Renov...');
    await page.goto('https://archi-renov.com/', { waitUntil: 'networkidle2', timeout: 20000 });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(OUT_DIR, 'archi-renov.jpg'), type: 'jpeg', quality: 90 });
    console.log('Saved archi-renov.jpg');

    // Scroll down to réalisations
    await page.evaluate(() => {
      window.scrollBy({ top: 900, behavior: 'instant' });
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(OUT_DIR, 'archi-realisations.jpg'), type: 'jpeg', quality: 90 });
    console.log('Saved archi-realisations.jpg');
  } catch (err) {
    console.error('Error on Archi Renov:', err.message);
  }

  // 5. Olympe Thalasso (http://localhost:3002/)
  try {
    console.log('Capturing Olympe Thalasso...');
    await page.goto('http://localhost:3002/', { waitUntil: 'networkidle2', timeout: 15000 });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(OUT_DIR, 'olympe-thalasso.jpg'), type: 'jpeg', quality: 90 });
    console.log('Saved olympe-thalasso.jpg');

    // Scroll down to centres
    await page.evaluate(() => {
      window.scrollBy({ top: 850, behavior: 'instant' });
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(OUT_DIR, 'olympe-soins.jpg'), type: 'jpeg', quality: 90 });
    console.log('Saved olympe-soins.jpg');
  } catch (err) {
    console.error('Error on Olympe Thalasso:', err.message);
  }

  console.log('All real site captures finished!');
  await browser.close();
}

capture().catch(err => {
  console.error('Fatal error during capture:', err);
  process.exit(1);
});
