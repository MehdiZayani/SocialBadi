const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

async function generateFavicon() {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 64, height: 64, deviceScaleFactor: 2 });

  const svgContent = fs.readFileSync(path.join(__dirname, '../public/icon.svg'), 'utf8');

  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { margin: 0; padding: 0; background: transparent; display: flex; align-items: center; justify-content: center; width: 64px; height: 64px; }
          svg { width: 64px; height: 64px; }
        </style>
      </head>
      <body>
        ${svgContent}
      </body>
    </html>
  `);

  const pngBuffer = await page.screenshot({ omitBackground: true, type: 'png' });
  fs.writeFileSync(path.join(__dirname, '../public/favicon.png'), pngBuffer);
  // Also save as favicon.ico (most modern browsers accept PNG bytes inside .ico or as favicon)
  fs.writeFileSync(path.join(__dirname, '../public/favicon.ico'), pngBuffer);
  fs.writeFileSync(path.join(__dirname, '../public/logo.ico'), pngBuffer);

  console.log('Successfully generated public/favicon.png, public/favicon.ico, public/logo.ico');
  await browser.close();
}

generateFavicon().catch(err => {
  console.error('Error generating favicon:', err);
  process.exit(1);
});
