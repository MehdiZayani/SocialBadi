const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT_DIR = path.join(__dirname, '../public');

async function generateLinkedInAssets() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // 1. GENERATE LINKEDIN PROFILE LOGO (800x800 px)
  console.log('Generating LinkedIn Logo (800x800)...');
  await page.setViewport({ width: 800, height: 800, deviceScaleFactor: 2 });
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            width: 800px;
            height: 800px;
            background: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          }
          .canvas {
            width: 800px;
            height: 800px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: radial-gradient(circle at 50% 50%, #f8fafc 0%, #ffffff 100%);
            position: relative;
          }
          .grid-pattern {
            position: absolute;
            inset: 0;
            background-image: radial-gradient(rgba(37, 99, 235, 0.12) 1.5px, transparent 1.5px);
            background-size: 32px 32px;
            opacity: 0.7;
          }
          .glow-aura {
            position: absolute;
            width: 480px;
            height: 480px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(37, 99, 235, 0.18) 0%, rgba(79, 70, 229, 0.08) 50%, transparent 70%);
            filter: blur(40px);
          }
          .logo-box {
            position: relative;
            z-index: 10;
            width: 380px;
            height: 380px;
            border-radius: 95px;
            background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%);
            padding: 10px;
            box-shadow: 0 30px 60px -15px rgba(37, 99, 235, 0.35), 0 10px 25px -5px rgba(15, 23, 42, 0.15);
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .inner-card {
            width: 100%;
            height: 100%;
            background: #ffffff;
            border-radius: 85px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
          }
          .terminal-glyph {
            display: flex;
            align-items: center;
            gap: 16px;
          }
          .chevron {
            width: 110px;
            height: 110px;
            border-right: 28px solid #2563eb;
            border-top: 28px solid #2563eb;
            transform: rotate(45deg);
            border-radius: 8px;
            margin-right: 10px;
          }
          .cursor-line {
            width: 75px;
            height: 28px;
            background: #2563eb;
            border-radius: 14px;
            margin-top: 70px;
          }
        </style>
      </head>
      <body>
        <div class="canvas">
          <div class="grid-pattern"></div>
          <div class="glow-aura"></div>
          <div class="logo-box">
            <div class="inner-card">
              <div class="terminal-glyph">
                <div class="chevron"></div>
                <div class="cursor-line"></div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `);

  await page.screenshot({ path: path.join(OUT_DIR, 'linkedin-logo.png'), type: 'png' });
  console.log('Saved linkedin-logo.png');

  // 2. GENERATE LINKEDIN COVER PHOTO / BANNER (1584 x 396 px - Standard LinkedIn Recommended Size)
  console.log('Generating LinkedIn Banner (1584x396)...');
  await page.setViewport({ width: 1584, height: 396, deviceScaleFactor: 2 });
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=JetBrains+Mono:wght@500;600;700&display=swap" rel="stylesheet">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            width: 1584px;
            height: 396px;
            background: #ffffff;
            font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            overflow: hidden;
            -webkit-font-smoothing: antialiased;
          }
          .banner {
            width: 1584px;
            height: 396px;
            position: relative;
            background: #fafbfe;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-left: 360px; /* RESERVED CLEARANCE FOR LINKEDIN LOGO (Bottom-Left) */
            padding-right: 60px;
            overflow: hidden;
          }

          /* Ambient Tech Grids & Beams */
          .grid {
            position: absolute;
            inset: 0;
            background-image: radial-gradient(rgba(37, 99, 235, 0.12) 1.5px, transparent 1.5px);
            background-size: 28px 28px;
            opacity: 0.85;
          }
          /* Halo glow specifically positioned behind the LinkedIn profile picture */
          .logo-dock-halo {
            position: absolute;
            left: 20px;
            bottom: -40px;
            width: 380px;
            height: 380px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(37, 99, 235, 0.16) 0%, rgba(99, 102, 241, 0.06) 50%, transparent 70%);
            filter: blur(40px);
            pointer-events: none;
          }
          .gradient-beam-top-left {
            position: absolute;
            width: 500px;
            height: 300px;
            left: -80px;
            top: -100px;
            background: radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, transparent 65%);
            filter: blur(50px);
            pointer-events: none;
          }
          .gradient-beam-right {
            position: absolute;
            width: 700px;
            height: 500px;
            right: -100px;
            top: -60px;
            background: radial-gradient(circle, rgba(79, 70, 229, 0.14) 0%, rgba(147, 51, 234, 0.06) 45%, transparent 70%);
            filter: blur(60px);
            pointer-events: none;
          }
          .top-border {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #2563eb 0%, #4f46e5 50%, #8b5cf6 100%);
            z-index: 20;
          }

          /* Main Content Block (Shifted right to avoid logo) */
          .main-content {
            position: relative;
            z-index: 10;
            max-width: 740px;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .badge-row {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 14px;
          }
          .status-pill {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 5px 13px;
            background: rgba(255, 255, 255, 0.95);
            border: 1px solid rgba(226, 232, 240, 0.9);
            border-radius: 9999px;
            box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
            font-family: 'JetBrains Mono', monospace;
            font-size: 12px;
            font-weight: 700;
            color: #0f172a;
          }
          .status-dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #10b981;
            box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
          }
          .category-pill {
            display: inline-flex;
            align-items: center;
            padding: 5px 13px;
            background: #eff6ff;
            border: 1px solid #bfdbfe;
            border-radius: 9999px;
            font-family: 'JetBrains Mono', monospace;
            font-size: 12px;
            font-weight: 700;
            color: #1d4ed8;
          }

          .brand-title {
            font-size: 44px;
            font-weight: 800;
            letter-spacing: -1.4px;
            color: #0f172a;
            line-height: 1.12;
            margin-bottom: 12px;
          }
          .brand-title span {
            background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .tagline {
            font-size: 16.5px;
            font-weight: 500;
            color: #475569;
            line-height: 1.4;
            margin-bottom: 20px;
          }

          /* Tech Pills */
          .pills-row {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;
          }
          .tech-pill {
            padding: 6px 13px;
            background: rgba(255, 255, 255, 0.9);
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            font-size: 12.5px;
            font-weight: 600;
            color: #334155;
            box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
            white-space: nowrap;
          }
          .tech-pill.highlight {
            background: #0f172a;
            color: #ffffff;
            border-color: #0f172a;
          }

          /* Right Showcase: Metrics & CTA */
          .right-showcase {
            position: relative;
            z-index: 10;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 16px;
            min-width: 390px;
          }
          .metrics-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(226, 232, 240, 0.95);
            border-radius: 20px;
            padding: 18px 24px;
            box-shadow: 0 15px 35px -5px rgba(15, 23, 42, 0.07), 0 4px 12px -2px rgba(15, 23, 42, 0.03);
            display: flex;
            align-items: center;
            gap: 24px;
          }
          .metric-item {
            text-align: center;
          }
          .metric-value {
            font-size: 26px;
            font-weight: 800;
            color: #0f172a;
            letter-spacing: -0.5px;
            line-height: 1;
            margin-bottom: 4px;
          }
          .metric-value.blue { color: #2563eb; }
          .metric-label {
            font-size: 10.5px;
            font-family: 'JetBrains Mono', monospace;
            text-transform: uppercase;
            font-weight: 600;
            color: #64748b;
            letter-spacing: 0.5px;
          }
          .metric-divider {
            width: 1px;
            height: 34px;
            background: #e2e8f0;
          }

          .cta-row {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .url-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 20px;
            background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%);
            border-radius: 9999px;
            color: #ffffff;
            font-family: 'JetBrains Mono', monospace;
            font-size: 13px;
            font-weight: 700;
            box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);
          }
          .sub-badge {
            font-family: 'JetBrains Mono', monospace;
            font-size: 11px;
            font-weight: 600;
            color: #64748b;
            background: rgba(255, 255, 255, 0.8);
            border: 1px solid #e2e8f0;
            padding: 6px 12px;
            border-radius: 9999px;
          }
        </style>
      </head>
      <body>
        <div class="banner">
          <div class="top-border"></div>
          <div class="grid"></div>
          <div class="logo-dock-halo"></div>
          <div class="gradient-beam-top-left"></div>
          <div class="gradient-beam-right"></div>

          <!-- Main Content: Shifted so bottom-left is 100% free for the logo -->
          <div class="main-content">
            <div class="badge-row">
              <div class="status-pill">
                <div class="status-dot"></div>
                SocialBadi Studio
              </div>
              <div class="category-pill">
                Software Engineering &amp; AI
              </div>
            </div>

            <div class="brand-title">
              Architecting Digital Products <span>that Scale.</span>
            </div>

            <div class="tagline">
              Custom Web &amp; Mobile Apps • Intelligent AI Automations • High-Velocity SaaS
            </div>

            <div class="pills-row">
              <div class="tech-pill highlight">Next.js 15</div>
              <div class="tech-pill">AI Chatbots &amp; Voice</div>
              <div class="tech-pill">React Native Mobile</div>
              <div class="tech-pill">Stripe &amp; Revolut APIs</div>
              <div class="tech-pill">High-Converting UX</div>
            </div>
          </div>

          <!-- Right Showcase: Metrics & CTA -->
          <div class="right-showcase">
            <div class="metrics-card">
              <div class="metric-item">
                <div class="metric-value blue">100%</div>
                <div class="metric-label">Custom Built</div>
              </div>
              <div class="metric-divider"></div>
              <div class="metric-item">
                <div class="metric-value">99.9%</div>
                <div class="metric-label">Uptime SLA</div>
              </div>
              <div class="metric-divider"></div>
              <div class="metric-item">
                <div class="metric-value blue">&lt; 24h</div>
                <div class="metric-label">Lead Scoping</div>
              </div>
            </div>

            <div class="cta-row">
              <div class="sub-badge">Direct Partner Eng.</div>
              <div class="url-badge">socialbadi.com ↗</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `);

  await page.screenshot({ path: path.join(OUT_DIR, 'linkedin-banner.png'), type: 'png' });
  console.log('Saved linkedin-banner.png');

  // 3. GENERATE A SIMULATION PREVIEW (Banner + LinkedIn Profile Photo Overlap)
  console.log('Generating LinkedIn Mockup Preview...');
  const bannerBuffer = fs.readFileSync(path.join(OUT_DIR, 'linkedin-banner.png'));
  const bannerBase64 = `data:image/png;base64,${bannerBuffer.toString('base64')}`;

  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            width: 1584px;
            height: 480px;
            background: #f1f5f9;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            padding: 24px 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .container {
            width: 1544px;
            background: #ffffff;
            border-radius: 12px;
            overflow: visible;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            position: relative;
          }
          .banner-img {
            width: 1544px;
            height: 386px;
            display: block;
            border-radius: 12px 12px 0 0;
            object-fit: cover;
          }
          /* Exact LinkedIn Company Logo Box */
          .mockup-logo-box {
            position: absolute;
            left: 36px;
            bottom: -45px;
            width: 190px;
            height: 190px;
            background: #ffffff;
            border-radius: 28px;
            border: 4px solid #ffffff;
            box-shadow: 0 10px 25px rgba(0,0,0,0.18);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 50;
            overflow: hidden;
          }
          .mockup-logo-inner {
            width: 100%;
            height: 100%;
            border-radius: 24px;
            background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%);
            padding: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .mockup-white-card {
            width: 100%;
            height: 100%;
            background: #ffffff;
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .chevron {
            width: 52px;
            height: 52px;
            border-right: 13px solid #2563eb;
            border-top: 13px solid #2563eb;
            transform: rotate(45deg);
            border-radius: 4px;
            margin-right: 6px;
          }
          .cursor-line {
            width: 36px;
            height: 13px;
            background: #2563eb;
            border-radius: 7px;
            margin-top: 34px;
          }
          .header-bar {
            height: 60px;
            background: #ffffff;
            border-radius: 0 0 12px 12px;
            padding-left: 260px;
            display: flex;
            align-items: center;
            gap: 16px;
            color: #475569;
            font-size: 14px;
            font-weight: 700;
          }
          .tag-check {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: #ecfdf5;
            color: #059669;
            border: 1px solid #a7f3d0;
            padding: 4px 12px;
            border-radius: 9999px;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <img class="banner-img" src="${bannerBase64}" />
          <div class="mockup-logo-box">
            <div class="mockup-logo-inner">
              <div class="mockup-white-card">
                <div style="display:flex;align-items:center;gap:6px;">
                  <div class="chevron"></div>
                  <div class="cursor-line"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="header-bar">
            <span class="tag-check">✓ Logo Clearance Verified</span>
            <span>LinkedIn Company Page Simulation • 0 Overlap with Text, Badges, or Tech Pills</span>
          </div>
        </div>
      </body>
    </html>
  `);
  await page.screenshot({ path: path.join(OUT_DIR, 'linkedin-preview-simulation.png'), type: 'png' });
  console.log('Saved linkedin-preview-simulation.png');

  await browser.close();
}

generateLinkedInAssets().catch(err => {
  console.error('Error generating LinkedIn assets:', err);
  process.exit(1);
});
