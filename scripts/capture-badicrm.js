const puppeteer = require('puppeteer-core');
const path = require('path');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT_DIR = path.join(__dirname, '../public/projects');

async function captureBadiCRM() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });

  console.log('Navigating to https://www.badicrm.com/ ...');
  await page.goto('https://www.badicrm.com/', { waitUntil: 'networkidle2', timeout: 25000 });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(OUT_DIR, 'badi-crm.jpg'), type: 'jpeg', quality: 90 });
  console.log('Saved badi-crm.jpg');

  await page.evaluate(() => window.scrollBy({ top: 900, behavior: 'instant' }));
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUT_DIR, 'badi-crm-features.jpg'), type: 'jpeg', quality: 90 });
  console.log('Saved badi-crm-features.jpg');

  await browser.close();
}

captureBadiCRM().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
