const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT_DIR = path.join(__dirname, '../public/ads');

// Ensure output directory exists
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

function getBase64Image(filePath) {
  try {
    const ext = path.extname(filePath).replace('.', '');
    const mime = ext === 'svg' ? 'image/svg+xml' : ext === 'webp' ? 'image/webp' : ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'image/png';
    const data = fs.readFileSync(filePath);
    return `data:${mime};base64,${data.toString('base64')}`;
  } catch (err) {
    console.error(`Failed to read image at ${filePath}:`, err.message);
    return '';
  }
}

// Load company logos
const logosDir = path.join(__dirname, '../public/logos');
const badiCrmLogo = getBase64Image(path.join(logosDir, 'badi-crm.png'));
const lucciLogo = getBase64Image(path.join(logosDir, 'lucci-design.png'));
const merakiLogo = getBase64Image(path.join(logosDir, 'Meraki-Club.webp'));
const olympeLogo = getBase64Image(path.join(logosDir, 'olympe-thalasso.jpg'));
const archiLogo = getBase64Image(path.join(logosDir, 'archi-renov.png'));
const zitounaLogo = getBase64Image(path.join(logosDir, 'zitouna.png'));
const iconSvg = getBase64Image(path.join(__dirname, '../public/icon.svg'));

async function generateAds() {
  console.log('🚀 Starting Meta Ads Image Generator for SocialBadi...');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // =========================================================================
  // 1. FORMAT CARRE 1:1 (1080x1080 px) - Feed Instagram & Facebook
  // =========================================================================
  console.log('🎨 Generating Format 1:1 Square (1080x1080 px)...');
  await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 2 });
  await page.setContent(`
    <!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta charset="utf-8" />
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            width: 1080px;
            height: 1080px;
            background: #060913;
            color: #ffffff;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 56px 64px;
          }
          /* Background ambient mesh */
          .glow-top-right {
            position: absolute;
            top: -120px;
            right: -80px;
            width: 750px;
            height: 750px;
            background: radial-gradient(circle, rgba(37, 99, 235, 0.4) 0%, rgba(79, 70, 229, 0.18) 45%, transparent 70%);
            filter: blur(80px);
            pointer-events: none;
          }
          .glow-bottom-left {
            position: absolute;
            bottom: -150px;
            left: -80px;
            width: 700px;
            height: 700px;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, rgba(37, 99, 235, 0.1) 50%, transparent 70%);
            filter: blur(80px);
            pointer-events: none;
          }
          .grid-pattern {
            position: absolute;
            inset: 0;
            background-image: 
              linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
            background-size: 36px 36px;
            mask-image: radial-gradient(circle at 50% 40%, black 40%, transparent 85%);
            -webkit-mask-image: radial-gradient(circle at 50% 40%, black 40%, transparent 85%);
            pointer-events: none;
          }

          /* Header */
          .header {
            position: relative;
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .brand {
            display: flex;
            align-items: center;
            gap: 16px;
          }
          .brand-logo {
            width: 58px;
            height: 58px;
            border-radius: 16px;
            background: linear-gradient(135deg, #2563eb, #4f46e5);
            padding: 3px;
            box-shadow: 0 10px 25px rgba(37, 99, 235, 0.4);
          }
          .brand-logo-inner {
            width: 100%;
            height: 100%;
            background: #ffffff;
            border-radius: 13px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .brand-logo-inner img {
            width: 38px;
            height: 38px;
            object-fit: contain;
          }
          .brand-name {
            font-size: 32px;
            font-weight: 800;
            letter-spacing: -0.03em;
            color: #ffffff;
          }
          .brand-name span {
            color: #3b82f6;
            font-weight: 600;
          }
          .top-pill {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(37, 99, 235, 0.15);
            border: 1px solid rgba(59, 130, 246, 0.35);
            padding: 8px 18px;
            border-radius: 9999px;
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: #93c5fd;
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          }
          .pulse-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #10b981;
            box-shadow: 0 0 10px #10b981;
          }

          /* Main Hero Section */
          .hero-body {
            position: relative;
            z-index: 10;
            margin: 20px 0;
          }
          .main-headline {
            font-size: 56px;
            font-weight: 900;
            line-height: 1.12;
            letter-spacing: -0.04em;
            color: #ffffff;
            max-width: 950px;
          }
          .main-headline .gradient-text {
            background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 60%, #c084fc 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            display: inline;
          }
          .subtitle {
            margin-top: 18px;
            font-size: 20px;
            line-height: 1.45;
            color: #94a3b8;
            max-width: 880px;
            font-weight: 400;
          }

          /* Benefits Grid */
          .benefits-row {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
            margin-top: 32px;
          }
          .benefit-card {
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(16px);
            border-radius: 20px;
            padding: 20px 22px;
            display: flex;
            flex-direction: column;
            gap: 6px;
          }
          .benefit-stat {
            font-size: 28px;
            font-weight: 900;
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
            color: #60a5fa;
            letter-spacing: -0.02em;
          }
          .benefit-stat.emerald { color: #34d399; }
          .benefit-stat.purple { color: #c084fc; }
          .benefit-title {
            font-size: 15px;
            font-weight: 700;
            color: #f1f5f9;
          }
          .benefit-desc {
            font-size: 12px;
            color: #94a3b8;
            line-height: 1.35;
          }

          /* Proof / Partner Logos Bar */
          .proof-section {
            position: relative;
            z-index: 10;
            background: rgba(15, 23, 42, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.12);
            backdrop-filter: blur(20px);
            border-radius: 24px;
            padding: 22px 28px;
          }
          .proof-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 14px;
          }
          .proof-label {
            font-size: 11px;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
            color: #94a3b8;
            font-weight: 700;
          }
          .proof-highlight {
            font-size: 12px;
            color: #34d399;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 6px;
          }
          .logos-grid {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
          }
          .logo-item {
            background: #ffffff;
            border-radius: 12px;
            padding: 8px 16px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.25);
            flex: 1;
          }
          .logo-item img {
            max-height: 32px;
            max-width: 100%;
            object-fit: contain;
          }

          /* Bottom CTA Bar */
          .cta-bar {
            position: relative;
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-top: 10px;
          }
          .cta-left {
            display: flex;
            flex-direction: column;
            gap: 3px;
          }
          .cta-title {
            font-size: 18px;
            font-weight: 800;
            color: #ffffff;
          }
          .cta-sub {
            font-size: 13px;
            color: #94a3b8;
          }
          .cta-button {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            border: 1px solid #3b82f6;
            padding: 16px 32px;
            border-radius: 9999px;
            font-size: 16px;
            font-weight: 800;
            color: #ffffff;
            box-shadow: 0 10px 25px rgba(37, 99, 235, 0.45);
          }
          .cta-arrow {
            font-size: 18px;
          }
        </style>
      </head>
      <body>
        <div class="glow-top-right"></div>
        <div class="glow-bottom-left"></div>
        <div class="grid-pattern"></div>

        <!-- Header -->
        <div class="header">
          <div class="brand">
            <div class="brand-logo">
              <div class="brand-logo-inner">
                <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
                  <polyline points="28,30 52,50 28,70" stroke="#2563eb" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" />
                  <line x1="60" y1="70" x2="80" y2="70" stroke="#2563eb" stroke-width="12" stroke-linecap="round" />
                </svg>
              </div>
            </div>
            <div class="brand-name">SocialBadi<span>.studio</span></div>
          </div>
          <div class="top-pill">
            <span class="pulse-dot"></span>
            Studio de Développement Web & IA
          </div>
        </div>

        <!-- Main Headline -->
        <div class="hero-body">
          <h1 class="main-headline">
            Votre Entreprise Mérite un <span class="gradient-text">Site Web d'Élite</span> Conçu Pour Convertir.
          </h1>
          <p class="subtitle">
            Zéro modèle générique. Nous bâtissons des plateformes web & mobiles ultra-rapides, élégantes et taillées pour propulser votre chiffre d'affaires.
          </p>

          <!-- 3 Value Pillars -->
          <div class="benefits-row">
            <div class="benefit-card">
              <div class="benefit-stat">&lt; 0.4s</div>
              <div class="benefit-title">Vitesse Instantanée</div>
              <div class="benefit-desc">Score SEO & performance maximal pour devancer vos concurrents sur Google.</div>
            </div>
            <div class="benefit-card">
              <div class="benefit-stat emerald">100%</div>
              <div class="benefit-title">Conçu Sur-Mesure</div>
              <div class="benefit-desc">Design d'auteur et interfaces premium qui valorisent votre image de marque.</div>
            </div>
            <div class="benefit-card">
              <div class="benefit-stat purple">+300%</div>
              <div class="benefit-title">Conversion & Leads</div>
              <div class="benefit-desc">Capture intelligente, qualification de prospects et parcours client sans friction.</div>
            </div>
          </div>
        </div>

        <!-- Client Logos Social Proof Dock -->
        <div class="proof-section">
          <div class="proof-header">
            <span class="proof-label">Ils nous font confiance pour leurs plateformes :</span>
            <span class="proof-highlight">● 20+ Projets en Production</span>
          </div>
          <div class="logos-grid">
            <div class="logo-item"><img src="${badiCrmLogo}" alt="BadiCRM" /></div>
            <div class="logo-item"><img src="${lucciLogo}" alt="Lucci Design" /></div>
            <div class="logo-item"><img src="${merakiLogo}" alt="Meraki Club" /></div>
            <div class="logo-item"><img src="${olympeLogo}" alt="Olympe Thalasso" /></div>
            <div class="logo-item"><img src="${archiLogo}" alt="Archi Renov" /></div>
          </div>
        </div>

        <!-- Bottom Action CTA -->
        <div class="cta-bar">
          <div class="cta-left">
            <div class="cta-title">Prêt à digitaliser votre activité avec les meilleurs standards ?</div>
            <div class="cta-sub">Audit technique & cadrage de projet offert en 24h · socialbadi.com</div>
          </div>
          <div class="cta-button">
            <span>Démarrer un Projet</span>
            <span class="cta-arrow">→</span>
          </div>
        </div>
      </body>
    </html>
  `);

  const squarePath = path.join(OUT_DIR, 'socialbadi-ad-feed-1080x1080.png');
  await page.screenshot({ path: squarePath, type: 'png' });
  console.log(`✅ Saved Square Ad (1080x1080): ${squarePath}`);

  // =========================================================================
  // 2. FORMAT PORTRAIT 4:5 (1080x1350 px) - Le plus performant sur Instagram Feed
  // =========================================================================
  console.log('🎨 Generating Format 4:5 Portrait (1080x1350 px)...');
  await page.setViewport({ width: 1080, height: 1350, deviceScaleFactor: 2 });
  await page.setContent(`
    <!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta charset="utf-8" />
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            width: 1080px;
            height: 1350px;
            background: #060913;
            color: #ffffff;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 64px 68px;
          }
          .glow-top {
            position: absolute;
            top: -150px;
            right: -80px;
            width: 800px;
            height: 800px;
            background: radial-gradient(circle, rgba(37, 99, 235, 0.42) 0%, rgba(79, 70, 229, 0.2) 45%, transparent 70%);
            filter: blur(90px);
            pointer-events: none;
          }
          .glow-bottom {
            position: absolute;
            bottom: -150px;
            left: -100px;
            width: 750px;
            height: 750px;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, rgba(37, 99, 235, 0.12) 50%, transparent 70%);
            filter: blur(90px);
            pointer-events: none;
          }
          .grid-pattern {
            position: absolute;
            inset: 0;
            background-image: 
              linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
            background-size: 38px 38px;
            mask-image: radial-gradient(circle at 50% 45%, black 45%, transparent 90%);
            -webkit-mask-image: radial-gradient(circle at 50% 45%, black 45%, transparent 90%);
            pointer-events: none;
          }

          /* Header */
          .header {
            position: relative;
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .brand {
            display: flex;
            align-items: center;
            gap: 16px;
          }
          .brand-logo {
            width: 64px;
            height: 64px;
            border-radius: 18px;
            background: linear-gradient(135deg, #2563eb, #4f46e5);
            padding: 3px;
            box-shadow: 0 10px 25px rgba(37, 99, 235, 0.4);
          }
          .brand-logo-inner {
            width: 100%;
            height: 100%;
            background: #ffffff;
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .brand-name {
            font-size: 36px;
            font-weight: 800;
            letter-spacing: -0.03em;
            color: #ffffff;
          }
          .brand-name span { color: #3b82f6; }
          .top-pill {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(37, 99, 235, 0.18);
            border: 1px solid rgba(59, 130, 246, 0.4);
            padding: 10px 22px;
            border-radius: 9999px;
            font-size: 14px;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: #93c5fd;
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          }
          .pulse-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #10b981;
            box-shadow: 0 0 10px #10b981;
          }

          /* Main Hero */
          .hero-body {
            position: relative;
            z-index: 10;
            margin: 28px 0;
          }
          .badge-category {
            display: inline-block;
            font-size: 15px;
            font-weight: 800;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            color: #60a5fa;
            margin-bottom: 16px;
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          }
          .main-headline {
            font-size: 64px;
            font-weight: 900;
            line-height: 1.1;
            letter-spacing: -0.04em;
            color: #ffffff;
            max-width: 950px;
          }
          .main-headline .gradient-text {
            background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #c084fc 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            display: inline;
          }
          .subtitle {
            margin-top: 22px;
            font-size: 22px;
            line-height: 1.5;
            color: #94a3b8;
            max-width: 880px;
          }

          /* 4 Feature Badges */
          .features-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
            margin-top: 36px;
          }
          .feature-box {
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.12);
            backdrop-filter: blur(18px);
            border-radius: 20px;
            padding: 22px 24px;
            display: flex;
            align-items: flex-start;
            gap: 16px;
          }
          .feature-icon-badge {
            width: 44px;
            height: 44px;
            border-radius: 12px;
            background: rgba(37, 99, 235, 0.2);
            border: 1px solid rgba(59, 130, 246, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            shrink: 0;
          }
          .feature-text-title {
            font-size: 17px;
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 4px;
          }
          .feature-text-desc {
            font-size: 13px;
            color: #94a3b8;
            line-height: 1.35;
          }

          /* Client Logos Social Proof Section */
          .proof-box {
            position: relative;
            z-index: 10;
            background: rgba(15, 23, 42, 0.75);
            border: 1px solid rgba(255, 255, 255, 0.14);
            backdrop-filter: blur(20px);
            border-radius: 26px;
            padding: 26px 30px;
            margin-top: 10px;
          }
          .proof-title-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 18px;
          }
          .proof-title {
            font-size: 13px;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
            color: #cbd5e1;
            font-weight: 800;
          }
          .proof-tag {
            font-size: 13px;
            color: #34d399;
            font-weight: 800;
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          }
          .logos-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 14px;
          }
          .logo-pill {
            background: #ffffff;
            border-radius: 14px;
            padding: 10px 18px;
            height: 52px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 1;
            box-shadow: 0 4px 14px rgba(0,0,0,0.3);
          }
          .logo-pill img {
            max-height: 34px;
            max-width: 100%;
            object-fit: contain;
          }

          /* Bottom CTA Banner */
          .cta-wrap {
            position: relative;
            z-index: 10;
            background: linear-gradient(135deg, rgba(37, 99, 235, 0.25), rgba(79, 70, 229, 0.25));
            border: 1px solid rgba(59, 130, 246, 0.4);
            border-radius: 28px;
            padding: 24px 32px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .cta-info h3 {
            font-size: 20px;
            font-weight: 900;
            color: #ffffff;
            margin-bottom: 4px;
          }
          .cta-info p {
            font-size: 14px;
            color: #cbd5e1;
          }
          .btn-gradient {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            border: 1px solid #60a5fa;
            padding: 18px 36px;
            border-radius: 9999px;
            font-size: 17px;
            font-weight: 800;
            color: #ffffff;
            box-shadow: 0 10px 25px rgba(37, 99, 235, 0.5);
            letter-spacing: -0.01em;
          }
        </style>
      </head>
      <body>
        <div class="glow-top"></div>
        <div class="glow-bottom"></div>
        <div class="grid-pattern"></div>

        <!-- Header -->
        <div class="header">
          <div class="brand">
            <div class="brand-logo">
              <div class="brand-logo-inner">
                <svg width="32" height="32" viewBox="0 0 100 100" fill="none">
                  <polyline points="28,30 52,50 28,70" stroke="#2563eb" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" />
                  <line x1="60" y1="70" x2="80" y2="70" stroke="#2563eb" stroke-width="12" stroke-linecap="round" />
                </svg>
              </div>
            </div>
            <div class="brand-name">SocialBadi<span>.studio</span></div>
          </div>
          <div class="top-pill">
            <span class="pulse-dot"></span>
            Développement & Ingénierie
          </div>
        </div>

        <!-- Hero Headline -->
        <div class="hero-body">
          <div class="badge-category">⚡ HAUTE PERFORMANCE & EXPÉRIENCE SUR-MESURE</div>
          <h1 class="main-headline">
            Vous Cherchez des Développeurs d'Élite pour <span class="gradient-text">Votre Prochain Site Web ?</span>
          </h1>
          <p class="subtitle">
            Du site vitrine haute couture à l'application web complexe : nous concevons des outils digitaux ultra-rapides, élégants et optimisés pour générer du business.
          </p>

          <!-- 4 Pillars -->
          <div class="features-grid">
            <div class="feature-box">
              <div class="feature-icon-badge">⚡</div>
              <div>
                <div class="feature-text-title">&lt; 0.4s & SEO 100/100</div>
                <div class="feature-text-desc">Temps de chargement instantané pour une rétention et un référencement parfaits.</div>
              </div>
            </div>
            <div class="feature-box">
              <div class="feature-icon-badge">💎</div>
              <div>
                <div class="feature-text-title">100% Code Sur-Mesure</div>
                <div class="feature-text-desc">Zéro template standardisé. Une identité unique taillée pour votre marque.</div>
              </div>
            </div>
            <div class="feature-box">
              <div class="feature-icon-badge">📱</div>
              <div>
                <div class="feature-text-title">Mobile-First & 120 FPS</div>
                <div class="feature-text-desc">Navigation ultra-fluide au pixel près sur iPhone, iPad et Android.</div>
              </div>
            </div>
            <div class="feature-box">
              <div class="feature-icon-badge">🤖</div>
              <div>
                <div class="feature-text-title">IA & Capture Automatique</div>
                <div class="feature-text-desc">Qualification en temps réel de vos prospects pour ne perdre aucun lead.</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Social Proof with Real Client Logos -->
        <div class="proof-box">
          <div class="proof-title-bar">
            <span class="proof-title">Entreprises accompagnées par SocialBadi :</span>
            <span class="proof-tag">✓ 20+ Systèmes en Production</span>
          </div>
          <div class="logos-row">
            <div class="logo-pill"><img src="${badiCrmLogo}" alt="BadiCRM" /></div>
            <div class="logo-pill"><img src="${lucciLogo}" alt="Lucci Design" /></div>
            <div class="logo-pill"><img src="${merakiLogo}" alt="Meraki Club" /></div>
            <div class="logo-pill"><img src="${olympeLogo}" alt="Olympe Thalasso" /></div>
            <div class="logo-pill"><img src="${archiLogo}" alt="Archi Renov" /></div>
            <div class="logo-pill"><img src="${zitounaLogo}" alt="Zitouna" /></div>
          </div>
        </div>

        <!-- CTA Box -->
        <div class="cta-wrap">
          <div class="cta-info">
            <h3>Discutons de votre projet dès aujourd'hui</h3>
            <p>Devis précis et cadrage d'architecture offerts sous 24h · socialbadi.com</p>
          </div>
          <div class="btn-gradient">
            <span>Obtenir Mon Devis</span>
            <span>→</span>
          </div>
        </div>
      </body>
    </html>
  `);

  const portraitPath = path.join(OUT_DIR, 'socialbadi-ad-instagram-4x5-1080x1350.png');
  await page.screenshot({ path: portraitPath, type: 'png' });
  console.log(`✅ Saved Portrait 4:5 Ad (1080x1350): ${portraitPath}`);

  // =========================================================================
  // 3. FORMAT STORY & REELS 9:16 (1080x1920 px) - Plein Écran
  // =========================================================================
  console.log('🎨 Generating Format 9:16 Story/Reels (1080x1920 px)...');
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 2 });
  await page.setContent(`
    <!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta charset="utf-8" />
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            width: 1080px;
            height: 1920px;
            background: #060913;
            color: #ffffff;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 120px 72px 100px 72px; /* Margins for Instagram UI overlays */
          }
          .glow-top {
            position: absolute;
            top: -150px;
            right: -100px;
            width: 900px;
            height: 900px;
            background: radial-gradient(circle, rgba(37, 99, 235, 0.45) 0%, rgba(79, 70, 229, 0.22) 45%, transparent 70%);
            filter: blur(100px);
            pointer-events: none;
          }
          .glow-bottom {
            position: absolute;
            bottom: -200px;
            left: -100px;
            width: 850px;
            height: 850px;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.35) 0%, rgba(37, 99, 235, 0.15) 50%, transparent 70%);
            filter: blur(100px);
            pointer-events: none;
          }
          .grid-pattern {
            position: absolute;
            inset: 0;
            background-image: 
              linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
            background-size: 40px 40px;
            mask-image: radial-gradient(circle at 50% 50%, black 50%, transparent 90%);
            -webkit-mask-image: radial-gradient(circle at 50% 50%, black 50%, transparent 90%);
            pointer-events: none;
          }

          /* Header */
          .header {
            position: relative;
            z-index: 10;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .brand {
            display: flex;
            align-items: center;
            gap: 18px;
          }
          .brand-logo {
            width: 72px;
            height: 72px;
            border-radius: 20px;
            background: linear-gradient(135deg, #2563eb, #4f46e5);
            padding: 4px;
            box-shadow: 0 10px 30px rgba(37, 99, 235, 0.4);
          }
          .brand-logo-inner {
            width: 100%;
            height: 100%;
            background: #ffffff;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .brand-name {
            font-size: 40px;
            font-weight: 800;
            letter-spacing: -0.03em;
            color: #ffffff;
          }
          .brand-name span { color: #3b82f6; }
          .top-pill {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(37, 99, 235, 0.2);
            border: 1px solid rgba(59, 130, 246, 0.45);
            padding: 12px 24px;
            border-radius: 9999px;
            font-size: 15px;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: #93c5fd;
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          }
          .pulse-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #10b981;
            box-shadow: 0 0 10px #10b981;
          }

          /* Hero */
          .hero {
            position: relative;
            z-index: 10;
            margin: 40px 0;
          }
          .kicker {
            font-size: 16px;
            font-weight: 800;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: #60a5fa;
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
            margin-bottom: 20px;
          }
          .headline {
            font-size: 72px;
            font-weight: 900;
            line-height: 1.1;
            letter-spacing: -0.04em;
            color: #ffffff;
          }
          .headline .gradient-text {
            background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #c084fc 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            display: inline;
          }
          .sub {
            margin-top: 28px;
            font-size: 24px;
            line-height: 1.5;
            color: #94a3b8;
          }

          /* Feature Stack */
          .features-stack {
            display: flex;
            flex-direction: column;
            gap: 18px;
            margin-top: 48px;
          }
          .feature-item {
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.12);
            backdrop-filter: blur(20px);
            border-radius: 24px;
            padding: 24px 28px;
            display: flex;
            align-items: center;
            gap: 20px;
          }
          .feature-icon {
            width: 56px;
            height: 56px;
            border-radius: 16px;
            background: rgba(37, 99, 235, 0.2);
            border: 1px solid rgba(59, 130, 246, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 26px;
            shrink: 0;
          }
          .feature-content h4 {
            font-size: 20px;
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 4px;
          }
          .feature-content p {
            font-size: 14px;
            color: #94a3b8;
            line-height: 1.35;
          }

          /* Social Proof Logos Card */
          .proof-card {
            position: relative;
            z-index: 10;
            background: rgba(15, 23, 42, 0.8);
            border: 1px solid rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(24px);
            border-radius: 28px;
            padding: 30px;
          }
          .proof-tag-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
          }
          .proof-tag-bar span {
            font-size: 14px;
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.14em;
            color: #cbd5e1;
          }
          .proof-tag-bar span.live {
            color: #34d399;
          }
          .logos-grid-story {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 14px;
          }
          .logo-box-story {
            background: #ffffff;
            border-radius: 14px;
            height: 58px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 8px 16px;
            box-shadow: 0 4px 14px rgba(0,0,0,0.3);
          }
          .logo-box-story img {
            max-height: 38px;
            max-width: 100%;
            object-fit: contain;
          }

          /* Story CTA Swipe Up Box */
          .story-cta {
            position: relative;
            z-index: 10;
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            border: 2px solid rgba(255, 255, 255, 0.25);
            border-radius: 32px;
            padding: 30px;
            text-align: center;
            box-shadow: 0 15px 40px rgba(37, 99, 235, 0.5);
          }
          .story-cta h2 {
            font-size: 26px;
            font-weight: 900;
            color: #ffffff;
            margin-bottom: 8px;
          }
          .story-cta p {
            font-size: 16px;
            color: #e0e7ff;
            font-weight: 500;
          }
          .story-cta-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            margin-top: 16px;
            background: #ffffff;
            color: #1d4ed8;
            font-weight: 800;
            font-size: 16px;
            padding: 12px 30px;
            border-radius: 9999px;
            box-shadow: 0 4px 16px rgba(0,0,0,0.15);
          }
        </style>
      </head>
      <body>
        <div class="glow-top"></div>
        <div class="glow-bottom"></div>
        <div class="grid-pattern"></div>

        <!-- Header -->
        <div class="header">
          <div class="brand">
            <div class="brand-logo">
              <div class="brand-logo-inner">
                <svg width="36" height="36" viewBox="0 0 100 100" fill="none">
                  <polyline points="28,30 52,50 28,70" stroke="#2563eb" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" />
                  <line x1="60" y1="70" x2="80" y2="70" stroke="#2563eb" stroke-width="12" stroke-linecap="round" />
                </svg>
              </div>
            </div>
            <div class="brand-name">SocialBadi<span>.studio</span></div>
          </div>
          <div class="top-pill">
            <span class="pulse-dot"></span>
            Web & Mobile Studio
          </div>
        </div>

        <!-- Main Headline -->
        <div class="hero">
          <div class="kicker">STUDIO D'INGÉNIERIE LOGICIELLE</div>
          <h1 class="headline">
            Propulsez Votre Entreprise avec un <span class="gradient-text">Site Web d'Exception</span>
          </h1>
          <p class="sub">
            Nous transformons vos visiteurs en clients fidèles avec des architectures web rapides, sur-mesure et à fort taux de conversion.
          </p>

          <!-- 3 Vertical Features -->
          <div class="features-stack">
            <div class="feature-item">
              <div class="feature-icon">⚡</div>
              <div class="feature-content">
                <h4>Affichage Instantané &lt; 0.4s</h4>
                <p>Score Google 100/100 · Zéro latence · Expérience 120 FPS</p>
              </div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">💎</div>
              <div class="feature-content">
                <h4>Design Haute Couture Sur-Mesure</h4>
                <p>Création graphique exclusive sans aucun modèle pré-conçu</p>
              </div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">🤖</div>
              <div class="feature-content">
                <h4>Automatisations & Qualification IA</h4>
                <p>Capture directe de prospects dans votre CRM en temps réel</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Client Logos -->
        <div class="proof-card">
          <div class="proof-tag-bar">
            <span>Clients & Plateformes en Prod :</span>
            <span class="live">● +20 Déploiements</span>
          </div>
          <div class="logos-grid-story">
            <div class="logo-box-story"><img src="${badiCrmLogo}" alt="BadiCRM" /></div>
            <div class="logo-box-story"><img src="${lucciLogo}" alt="Lucci Design" /></div>
            <div class="logo-box-story"><img src="${merakiLogo}" alt="Meraki Club" /></div>
            <div class="logo-box-story"><img src="${olympeLogo}" alt="Olympe Thalasso" /></div>
            <div class="logo-box-story"><img src="${archiLogo}" alt="Archi Renov" /></div>
            <div class="logo-box-story"><img src="${zitounaLogo}" alt="Zitouna" /></div>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="story-cta">
          <h2>Lancez Votre Projet avec Nous</h2>
          <p>Audit technique & devis personnalisé offerts en 24h</p>
          <div class="story-cta-badge">
            <span>Visiter socialbadi.com</span>
            <span>→</span>
          </div>
        </div>
      </body>
    </html>
  `);

  const storyPath = path.join(OUT_DIR, 'socialbadi-ad-story-9x16-1080x1920.png');
  await page.screenshot({ path: storyPath, type: 'png' });
  console.log(`✅ Saved Story 9:16 Ad (1080x1920): ${storyPath}`);

  await browser.close();
  console.log('🎉 All 3 Meta/Instagram Ads assets generated successfully in public/ads/ !');
}

generateAds().catch((err) => {
  console.error('❌ Error generating ads:', err);
  process.exit(1);
});
