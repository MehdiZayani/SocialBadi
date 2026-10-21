const puppeteer = require('puppeteer-core');

async function renderLogo() {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 240, height: 80, deviceScaleFactor: 3 });
  
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            margin: 0;
            padding: 0;
            background: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
          .logo-container {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            padding: 10px;
          }
          .icon-box {
            width: 44px;
            height: 44px;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 20px rgba(99, 102, 241, 0.5);
          }
          .icon-box svg {
            width: 24px;
            height: 24px;
            fill: #ffffff;
          }
          .logo-text {
            font-size: 22px;
            font-weight: 800;
            letter-spacing: -0.5px;
            color: #ffffff;
          }
          .logo-text span {
            background: linear-gradient(135deg, #818cf8 0%, #c084fc 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        </style>
      </head>
      <body>
        <div class="logo-container">
          <div class="icon-box">
            <svg viewBox="0 0 24 24">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
          </div>
          <div class="logo-text">Badi<span>CRM</span></div>
        </div>
      </body>
    </html>
  `);
  
  const el = await page.$('.logo-container');
  if (el) {
    await el.screenshot({ path: 'public/logos/badi-crm.png', omitBackground: true });
    console.log('Saved public/logos/badi-crm.png');
  }
  await browser.close();
}
renderLogo();
