const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT_DIR = path.join(__dirname, '../public/projects');

async function captureMeraki() {
  console.log('Launching Chrome to capture live Meraki Club...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });

  // 1. Homepage
  try {
    console.log('Capturing https://www.merakiclub.fr/ ...');
    await page.goto('https://www.merakiclub.fr/', { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: path.join(OUT_DIR, 'meraki-club.jpg'), type: 'jpeg', quality: 92 });
    console.log('Successfully saved real meraki-club.jpg');
  } catch (err) {
    console.error('Error on Homepage:', err.message);
  }

  // 2. Dashboard
  try {
    console.log('Capturing https://www.merakiclub.fr/dashboard ...');
    await page.goto('https://www.merakiclub.fr/dashboard', { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: path.join(OUT_DIR, 'meraki-club-dashboard.jpg'), type: 'jpeg', quality: 92 });
    console.log('Successfully saved real meraki-club-dashboard.jpg');
  } catch (err) {
    console.error('Error on Dashboard:', err.message);
  }

  // 3. Packages / Offres
  try {
    console.log('Capturing https://www.merakiclub.fr/packages ...');
    await page.goto('https://www.merakiclub.fr/packages', { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: path.join(OUT_DIR, 'meraki-club-packages.jpg'), type: 'jpeg', quality: 92 });
    console.log('Successfully saved real meraki-club-packages.jpg');
  } catch (err) {
    console.error('Error on Packages:', err.message);
  }

  await browser.close();
  console.log('All real Meraki Club screenshots captured successfully!');
}

captureMeraki().catch(err => {
  console.error('Fatal error during Meraki capture:', err);
  process.exit(1);
});
