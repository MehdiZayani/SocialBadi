const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT_DIR = path.join(__dirname, '../public/ads');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

function getBase64Image(filePath) {
  try {
    if (!fs.existsSync(filePath)) return '';
    const ext = path.extname(filePath).replace('.', '').toLowerCase();
    const mime = ext === 'svg' ? 'image/svg+xml' : ext === 'webp' ? 'image/webp' : ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'image/png';
    const data = fs.readFileSync(filePath);
    return `data:${mime};base64,${data.toString('base64')}`;
  } catch (err) {
    console.error(`Failed to read image at ${filePath}:`, err.message);
    return '';
  }
}

// Client Logos
const logosDir = path.join(__dirname, '../public/logos');
const badiCrmLogo = getBase64Image(path.join(logosDir, 'badi-crm.png'));
const lucciLogo = getBase64Image(path.join(logosDir, 'lucci-design.png'));
const merakiLogo = getBase64Image(path.join(logosDir, 'Meraki-Club.webp'));
const olympeLogo = getBase64Image(path.join(logosDir, 'olympe-thalasso.jpg'));
const archiLogo = getBase64Image(path.join(logosDir, 'archi-renov.png'));
const zitounaLogo = getBase64Image(path.join(logosDir, 'zitouna.png'));

// Exact SocialBadi Brand SVG Logo from public/icon.svg
const socialBadiSvgLogo = `
<svg viewBox="0 0 100 100" fill="none" style="width: 100%; height: 100%; display: block;">
  <defs>
    <linearGradient id="sbGradient" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#2563eb" />
      <stop offset="100%" stop-color="#4f46e5" />
    </linearGradient>
    <filter id="sbShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#1e40af" flood-opacity="0.35" />
    </filter>
    <linearGradient id="innerGlow" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#f8fafc" />
    </linearGradient>
  </defs>
  <rect x="6" y="6" width="88" height="88" rx="24" fill="url(#sbGradient)" filter="url(#sbShadow)" />
  <rect x="11" y="11" width="78" height="78" rx="19" fill="url(#innerGlow)" />
  <polyline points="31,34 49,50 31,66" stroke="#2563eb" stroke-width="8.5" stroke-linecap="round" stroke-linejoin="round" />
  <line x1="55" y1="66" x2="71" y2="66" stroke="#2563eb" stroke-width="8.5" stroke-linecap="round" />
</svg>
`;

async function generateAds() {
  console.log('🚀 Generating High-Converting Meta Ads (Authentic SocialBadi Logo, BIGGER Client Logos, Big "SITE WEB", 0 Emojis)...');

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // =========================================================================
  // 1. FORMAT CARRÉ (1080x1080 px) - FEED FACEBOOK & INSTAGRAM
  // =========================================================================
  console.log('🎨 Generating Format Carré (1080x1080 px)...');
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
            background: #070913;
            color: #ffffff;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 40px 48px 36px 48px;
          }

          /* Ambient Glow & Mesh */
          .glow-top {
            position: absolute;
            top: -120px;
            right: -80px;
            width: 720px;
            height: 720px;
            background: radial-gradient(circle, rgba(37, 99, 235, 0.42) 0%, rgba(99, 102, 241, 0.16) 45%, transparent 70%);
            filter: blur(85px);
            pointer-events: none;
          }
          .glow-bottom {
            position: absolute;
            bottom: -140px;
            left: -80px;
            width: 700px;
            height: 700px;
            background: radial-gradient(circle, rgba(14, 165, 233, 0.32) 0%, rgba(37, 99, 235, 0.15) 50%, transparent 70%);
            filter: blur(85px);
            pointer-events: none;
          }
          .grid-pattern {
            position: absolute;
            inset: 0;
            background-image: 
              linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
            background-size: 36px 36px;
            mask-image: radial-gradient(circle at 50% 45%, black 45%, transparent 88%);
            -webkit-mask-image: radial-gradient(circle at 50% 45%, black 45%, transparent 88%);
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
          .brand-wrap {
            display: flex;
            align-items: center;
            gap: 14px;
          }
          .brand-logo-frame {
            width: 48px;
            height: 48px;
            flex-shrink: 0;
          }
          .brand-name-row {
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .brand-name {
            font-size: 26px;
            font-weight: 900;
            letter-spacing: -0.03em;
            color: #ffffff;
            line-height: 1;
          }
          .brand-pill {
            background: rgba(37, 99, 235, 0.2);
            border: 1px solid rgba(59, 130, 246, 0.4);
            color: #60a5fa;
            font-size: 10px;
            font-weight: 800;
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
            padding: 2px 7px;
            border-radius: 5px;
            letter-spacing: 0.05em;
          }
          .brand-sub {
            font-size: 11px;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            color: #94a3b8;
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
            font-weight: 700;
            margin-top: 3px;
          }
          .live-badge {
            display: flex;
            align-items: center;
            gap: 9px;
            background: rgba(16, 185, 129, 0.12);
            border: 1px solid rgba(16, 185, 129, 0.35);
            padding: 7px 18px;
            border-radius: 9999px;
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 0.08em;
            color: #34d399;
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          }
          .pulse-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #10b981;
            box-shadow: 0 0 10px #10b981;
          }

          /* Hero Hook & Giant "SITE WEB" */
          .hero-section {
            position: relative;
            z-index: 10;
            margin-top: 4px;
          }
          .hero-kicker {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-size: 12px;
            font-weight: 800;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            color: #38bdf8;
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
            background: rgba(56, 189, 248, 0.1);
            border: 1px solid rgba(56, 189, 248, 0.25);
            padding: 5px 14px;
            border-radius: 6px;
            margin-bottom: 10px;
          }
          .hero-title {
            font-size: 74px;
            font-weight: 950;
            line-height: 0.98;
            letter-spacing: -0.045em;
            color: #ffffff;
          }
          .highlight-site-web {
            background: linear-gradient(135deg, #38bdf8 0%, #60a5fa 40%, #a855f7 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            display: inline-block;
            text-shadow: 0 0 45px rgba(59, 130, 246, 0.45);
          }
          .hero-desc {
            margin-top: 10px;
            font-size: 18px;
            line-height: 1.36;
            color: #cbd5e1;
            max-width: 950px;
            font-weight: 450;
          }

          /* Value Metrics Strip (0 emojis) */
          .metrics-strip {
            position: relative;
            z-index: 10;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 14px;
            margin-top: 6px;
          }
          .metric-card {
            background: rgba(15, 23, 42, 0.65);
            border: 1px solid rgba(255, 255, 255, 0.12);
            backdrop-filter: blur(14px);
            border-radius: 14px;
            padding: 12px 18px;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .metric-top {
            display: flex;
            align-items: baseline;
            gap: 8px;
          }
          .metric-val {
            font-size: 26px;
            font-weight: 950;
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
            line-height: 1;
            color: #38bdf8;
          }
          .metric-val.emerald { color: #34d399; }
          .metric-val.purple { color: #c084fc; }
          .metric-label {
            font-size: 11px;
            font-weight: 800;
            color: #ffffff;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          }
          .metric-desc {
            font-size: 11.5px;
            color: #94a3b8;
            margin-top: 2px;
          }

          /* Client Logos Proof Section - EN GRAND */
          .proof-container {
            position: relative;
            z-index: 10;
            background: rgba(15, 23, 42, 0.55);
            border: 1px solid rgba(255, 255, 255, 0.14);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            padding: 18px 22px;
            margin-top: 8px;
          }
          .proof-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 12px;
          }
          .proof-header-left {
            display: flex;
            flex-direction: column;
            gap: 2px;
          }
          .proof-tag {
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: #93c5fd;
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          }
          .proof-sub {
            font-size: 14px;
            font-weight: 700;
            color: #f8fafc;
          }
          .proof-stat {
            background: rgba(37, 99, 235, 0.15);
            border: 1px solid rgba(37, 99, 235, 0.35);
            padding: 5px 14px;
            border-radius: 9999px;
            font-size: 11px;
            font-weight: 800;
            color: #60a5fa;
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          }

          /* BIG LOGOS GRID (3x2) - INCREASED SIZE */
          .logos-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
          }
          .logo-card {
            background: #ffffff;
            border-radius: 16px;
            height: 116px; /* Increased from 96px */
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 8px 18px 14px 18px;
            box-shadow: 0 10px 25px -6px rgba(0, 0, 0, 0.45);
            position: relative;
            overflow: hidden;
          }
          .logo-img-wrap {
            flex: 1;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .logo-card img {
            max-height: 72px; /* Increased from 54px */
            max-width: 250px;
            width: auto;
            object-fit: contain;
          }
          .logo-caption {
            position: absolute;
            bottom: 3px;
            right: 10px;
            font-size: 9px;
            font-weight: 800;
            color: #94a3b8;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          }

          /* Bottom CTA Bar */
          .cta-bar {
            position: relative;
            z-index: 10;
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%);
            border: 1px solid rgba(59, 130, 246, 0.35);
            border-radius: 16px;
            padding: 15px 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-shadow: 0 12px 30px -10px rgba(0, 0, 0, 0.6), 0 0 25px rgba(37, 99, 235, 0.2);
          }
          .cta-info h3 {
            font-size: 19px;
            font-weight: 900;
            color: #ffffff;
            letter-spacing: -0.02em;
          }
          .cta-info p {
            font-size: 13px;
            color: #94a3b8;
            margin-top: 3px;
          }
          .cta-btn {
            background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%);
            color: #ffffff;
            font-size: 16px;
            font-weight: 850;
            padding: 14px 28px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 10px;
            letter-spacing: -0.01em;
            box-shadow: 0 8px 24px rgba(37, 99, 235, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.2);
            white-space: nowrap;
          }
          .cta-btn span.arrow {
            font-size: 20px;
            line-height: 1;
            font-weight: 900;
          }
        </style>
      </head>
      <body>
        <div class="glow-top"></div>
        <div class="glow-bottom"></div>
        <div class="grid-pattern"></div>

        <!-- 1. Header with Exact Authentic SocialBadi Logo -->
        <header class="header">
          <div class="brand-wrap">
            <div class="brand-logo-frame">
              ${socialBadiSvgLogo}
            </div>
            <div>
              <div class="brand-name-row">
                <span class="brand-name">SocialBadi</span>
                <span class="brand-pill">STUDIO</span>
              </div>
              <div class="brand-sub">CRÉATION DE SITE WEB SUR-MESURE</div>
            </div>
          </div>
          <div class="live-badge">
            <div class="pulse-dot"></div>
            DISPONIBLE CE MOIS-CI
          </div>
        </header>

        <!-- 2. Hero Section: Sells SITE WEB in Grand -->
        <section class="hero-section">
          <div class="hero-kicker">[ CRÉATION SUR-MESURE & HAUTE PERFORMANCE ]</div>
          <h1 class="hero-title">
            VOTRE <span class="highlight-site-web">SITE WEB</span><br />
            TAILLÉ POUR VENDRE
          </h1>
          <p class="hero-desc">
            Ne perdez plus vos visiteurs avec un site lent ou générique. Nous concevons votre plateforme web sur-mesure, ultra-rapide et optimisée pour transformer chaque visiteur en client qualifié.
          </p>
        </section>

        <!-- 3. Key Selling Points (Zero emojis) -->
        <section class="metrics-strip">
          <div class="metric-card">
            <div class="metric-top">
              <span class="metric-val">&lt; 0.4s</span>
              <span class="metric-label">VITESSE</span>
            </div>
            <div class="metric-desc">Chargement instantané sans rebond</div>
          </div>
          <div class="metric-card">
            <div class="metric-top">
              <span class="metric-val emerald">100/100</span>
              <span class="metric-label">SEO GOOGLE</span>
            </div>
            <div class="metric-desc">Positionnement n°1 sur vos mots-clés</div>
          </div>
          <div class="metric-card">
            <div class="metric-top">
              <span class="metric-val purple">+320%</span>
              <span class="metric-label">CONVERSION</span>
            </div>
            <div class="metric-desc">Formulaires & parcours optimisés</div>
          </div>
        </section>

        <!-- 4. Client Proof: BIGGER LOGOS -->
        <section class="proof-container">
          <div class="proof-header">
            <div class="proof-header-left">
              <div class="proof-tag">[ CLIENTS & PARTENAIRES ]</div>
              <div class="proof-sub">Ils ont accéléré leur croissance avec nos sites web</div>
            </div>
            <div class="proof-stat">CONFIANCE & RÉSULTATS</div>
          </div>
          <div class="logos-grid">
            <div class="logo-card">
              <div class="logo-img-wrap">
                <img src="${badiCrmLogo}" alt="BadiCRM" style="max-height: 68px; max-width: 245px;" />
              </div>
              <span class="logo-caption">SaaS CRM</span>
            </div>
            <div class="logo-card">
              <div class="logo-img-wrap">
                <img src="${lucciLogo}" alt="Lucci Design" style="max-height: 80px; max-width: 220px;" />
              </div>
              <span class="logo-caption">Mobilier Design</span>
            </div>
            <div class="logo-card">
              <div class="logo-img-wrap">
                <img src="${merakiLogo}" alt="Meraki Club" style="max-height: 64px; max-width: 250px; transform: scale(1.35); transform-origin: center;" />
              </div>
              <span class="logo-caption">Sport & Wellness</span>
            </div>
            <div class="logo-card">
              <div class="logo-img-wrap">
                <img src="${olympeLogo}" alt="Olympe Thalasso" style="max-height: 76px; max-width: 240px;" />
              </div>
              <span class="logo-caption">Spa & Thalasso</span>
            </div>
            <div class="logo-card">
              <div class="logo-img-wrap">
                <img src="${archiLogo}" alt="Archi Renov" style="max-height: 78px; max-width: 230px; transform: scale(1.15);" />
              </div>
              <span class="logo-caption">Architecture</span>
            </div>
            <div class="logo-card">
              <div class="logo-img-wrap">
                <img src="${zitounaLogo}" alt="Zitouna" style="max-height: 78px; max-width: 230px; transform: scale(1.15);" />
              </div>
              <span class="logo-caption">Restauration</span>
            </div>
          </div>
        </section>

        <!-- 5. Bottom High-Converting CTA Bar -->
        <footer class="cta-bar">
          <div class="cta-info">
            <h3>Prêt à digitaliser et scaler votre entreprise ?</h3>
            <p>Audit technique offert de votre présence web • Réponse garantie sous 24h</p>
          </div>
          <div class="cta-btn">
            Démarrer Votre Projet
            <span class="arrow">→</span>
          </div>
        </footer>
      </body>
    </html>
  `, { waitUntil: 'domcontentloaded' });

  await new Promise(r => setTimeout(r, 600));

  const squarePath = path.join(OUT_DIR, 'socialbadi-ad-carré-1080x1080.png');
  await page.screenshot({ path: squarePath, type: 'png' });
  console.log(`✅ Saved: ${squarePath}`);

  // Also save as socialbadi-ad-feed-1080x1080.png for backwards compatibility
  fs.copyFileSync(squarePath, path.join(OUT_DIR, 'socialbadi-ad-feed-1080x1080.png'));


  // =========================================================================
  // 2. FORMAT STORY (1080x1920 px) - INSTAGRAM & FACEBOOK STORIES / REELS
  // =========================================================================
  console.log('🎨 Generating Format Story (1080x1920 px)...');
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
            background: #070913;
            color: #ffffff;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 95px 56px 115px 56px; /* Instagram Story Safe Zones */
          }

          /* Ambient Glows */
          .glow-top {
            position: absolute;
            top: -150px;
            right: -100px;
            width: 850px;
            height: 850px;
            background: radial-gradient(circle, rgba(37, 99, 235, 0.45) 0%, rgba(99, 102, 241, 0.18) 45%, transparent 70%);
            filter: blur(100px);
            pointer-events: none;
          }
          .glow-center {
            position: absolute;
            top: 40%;
            left: -120px;
            width: 750px;
            height: 750px;
            background: radial-gradient(circle, rgba(14, 165, 233, 0.3) 0%, rgba(37, 99, 235, 0.12) 50%, transparent 70%);
            filter: blur(95px);
            pointer-events: none;
          }
          .glow-bottom {
            position: absolute;
            bottom: -150px;
            right: -100px;
            width: 850px;
            height: 850px;
            background: radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(59, 130, 246, 0.15) 50%, transparent 70%);
            filter: blur(100px);
            pointer-events: none;
          }
          .grid-pattern {
            position: absolute;
            inset: 0;
            background-image: 
              linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
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
          .brand-wrap {
            display: flex;
            align-items: center;
            gap: 16px;
          }
          .brand-logo-frame {
            width: 56px;
            height: 56px;
            flex-shrink: 0;
          }
          .brand-name-row {
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .brand-name {
            font-size: 30px;
            font-weight: 950;
            letter-spacing: -0.03em;
            color: #ffffff;
            line-height: 1;
          }
          .brand-pill {
            background: rgba(37, 99, 235, 0.2);
            border: 1px solid rgba(59, 130, 246, 0.4);
            color: #60a5fa;
            font-size: 11px;
            font-weight: 800;
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
            padding: 2px 8px;
            border-radius: 6px;
            letter-spacing: 0.06em;
          }
          .brand-sub {
            font-size: 12px;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            color: #94a3b8;
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
            font-weight: 700;
            margin-top: 4px;
          }
          .live-badge {
            display: flex;
            align-items: center;
            gap: 10px;
            background: rgba(16, 185, 129, 0.12);
            border: 1px solid rgba(16, 185, 129, 0.35);
            padding: 9px 20px;
            border-radius: 9999px;
            font-size: 12px;
            font-weight: 800;
            letter-spacing: 0.1em;
            color: #34d399;
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          }
          .pulse-dot {
            width: 9px;
            height: 9px;
            border-radius: 50%;
            background: #10b981;
            box-shadow: 0 0 10px #10b981;
          }

          /* Hero Section: Giant "SITE WEB" */
          .hero-section {
            position: relative;
            z-index: 10;
            margin-top: 18px;
          }
          .hero-kicker {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-size: 13px;
            font-weight: 800;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            color: #38bdf8;
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
            background: rgba(56, 189, 248, 0.1);
            border: 1px solid rgba(56, 189, 248, 0.25);
            padding: 7px 18px;
            border-radius: 8px;
            margin-bottom: 14px;
          }
          .hero-title {
            font-size: 92px;
            font-weight: 950;
            line-height: 0.98;
            letter-spacing: -0.045em;
            color: #ffffff;
          }
          .highlight-site-web {
            background: linear-gradient(135deg, #38bdf8 0%, #60a5fa 40%, #c084fc 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            display: inline-block;
            text-shadow: 0 0 50px rgba(59, 130, 246, 0.5);
          }
          .hero-desc {
            margin-top: 16px;
            font-size: 23px;
            line-height: 1.38;
            color: #cbd5e1;
            max-width: 950px;
            font-weight: 450;
          }

          /* Features / Guarantees Grid (0 Emojis) */
          .features-grid {
            position: relative;
            z-index: 10;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
            margin-top: 20px;
          }
          .feature-box {
            background: rgba(15, 23, 42, 0.65);
            border: 1px solid rgba(255, 255, 255, 0.12);
            backdrop-filter: blur(16px);
            border-radius: 18px;
            padding: 18px 22px;
          }
          .feature-tag {
            font-size: 11px;
            font-weight: 800;
            letter-spacing: 0.16em;
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
            color: #38bdf8;
            text-transform: uppercase;
            margin-bottom: 5px;
          }
          .feature-tag.emerald { color: #34d399; }
          .feature-tag.purple { color: #c084fc; }
          .feature-tag.amber { color: #f59e0b; }
          .feature-title {
            font-size: 19px;
            font-weight: 850;
            color: #ffffff;
            letter-spacing: -0.02em;
          }
          .feature-text {
            font-size: 13.5px;
            color: #94a3b8;
            margin-top: 3px;
            line-height: 1.35;
          }

          /* BIG CLIENT LOGOS SHOWCASE - INCREASED HEIGHT */
          .proof-wrapper {
            position: relative;
            z-index: 10;
            background: rgba(15, 23, 42, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.14);
            backdrop-filter: blur(20px);
            border-radius: 24px;
            padding: 24px 26px 22px 26px;
            margin-top: 20px;
          }
          .proof-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 18px;
          }
          .proof-header-left {
            display: flex;
            flex-direction: column;
            gap: 3px;
          }
          .proof-tag {
            font-size: 13px;
            font-weight: 800;
            letter-spacing: 0.2em;
            text-transform: uppercase;
            color: #93c5fd;
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          }
          .proof-sub {
            font-size: 18px;
            font-weight: 800;
            color: #f8fafc;
          }
          .proof-badge {
            background: rgba(37, 99, 235, 0.18);
            border: 1px solid rgba(37, 99, 235, 0.4);
            padding: 7px 18px;
            border-radius: 9999px;
            font-size: 12px;
            font-weight: 800;
            color: #60a5fa;
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          }

          /* 6 BIG LOGO CARDS (2 cols x 3 rows) - INCREASED TO 134px HEIGHT */
          .logos-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
          }
          .logo-card {
            background: #ffffff;
            border-radius: 18px;
            height: 134px; /* Increased from 114px */
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 10px 24px 16px 24px;
            box-shadow: 0 12px 26px -6px rgba(0, 0, 0, 0.45);
            position: relative;
            overflow: hidden;
          }
          .logo-img-wrap {
            flex: 1;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .logo-card img {
            max-height: 82px; /* Increased from 62px */
            max-width: 350px;
            width: auto;
            object-fit: contain;
          }
          .logo-caption {
            position: absolute;
            bottom: 4px;
            right: 12px;
            font-size: 9.5px;
            font-weight: 800;
            color: #94a3b8;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          }

          /* Story Bottom CTA */
          .cta-container {
            position: relative;
            z-index: 10;
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%);
            border: 2px solid rgba(59, 130, 246, 0.45);
            border-radius: 22px;
            padding: 24px 30px;
            margin-top: 20px;
            display: flex;
            flex-direction: column;
            gap: 16px;
            box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.7), 0 0 35px rgba(37, 99, 235, 0.3);
          }
          .cta-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .cta-title {
            font-size: 24px;
            font-weight: 900;
            color: #ffffff;
            letter-spacing: -0.02em;
          }
          .cta-sub {
            font-size: 15px;
            color: #94a3b8;
            margin-top: 3px;
          }
          .cta-btn-big {
            background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%);
            color: #ffffff;
            font-size: 22px;
            font-weight: 900;
            padding: 18px 32px;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 14px;
            letter-spacing: -0.02em;
            box-shadow: 0 10px 30px rgba(37, 99, 235, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.25);
          }
          .cta-btn-big span.arrow {
            font-size: 26px;
            line-height: 1;
            font-weight: 900;
          }
          .cta-footer-note {
            text-align: center;
            font-size: 13px;
            color: #64748b;
            font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
            letter-spacing: 0.1em;
          }
        </style>
      </head>
      <body>
        <div class="glow-top"></div>
        <div class="glow-center"></div>
        <div class="glow-bottom"></div>
        <div class="grid-pattern"></div>

        <!-- 1. Header with Exact Authentic SocialBadi Logo -->
        <header class="header">
          <div class="brand-wrap">
            <div class="brand-logo-frame">
              ${socialBadiSvgLogo}
            </div>
            <div>
              <div class="brand-name-row">
                <span class="brand-name">SocialBadi</span>
                <span class="brand-pill">STUDIO</span>
              </div>
              <div class="brand-sub">AGENCE DIGITALE & CRÉATION WEB</div>
            </div>
          </div>
          <div class="live-badge">
            <div class="pulse-dot"></div>
            DISPONIBLE CE MOIS-CI
          </div>
        </header>

        <!-- 2. Hero Section: Sells SITE WEB in Grand -->
        <section class="hero-section">
          <div class="hero-kicker">[ CONCEPTION & DÉVELOPPEMENT SUR-MESURE ]</div>
          <h1 class="hero-title">
            VOTRE FUTUR<br />
            <span class="highlight-site-web">SITE WEB</span><br />
            QUI VEND VRAIMENT.
          </h1>
          <p class="hero-desc">
            Ne laissez plus vos visiteurs quitter votre page sans acheter. Nous créons des sites web haut de gamme taillés pour dominer Google et convertir votre trafic en chiffre d'affaires.
          </p>
        </section>

        <!-- 3. Key Guarantees Grid (Zero emojis) -->
        <section class="features-grid">
          <div class="feature-box">
            <div class="feature-tag">[ VITESSE ÉCLAIR ]</div>
            <div class="feature-title">&lt; 0.4s de chargement</div>
            <div class="feature-text">Zéro temps d'attente pour capturer chaque visiteur mobile & desktop.</div>
          </div>
          <div class="feature-box">
            <div class="feature-tag emerald">[ SEO GOOGLE ]</div>
            <div class="feature-title">Score 100/100 garanti</div>
            <div class="feature-text">Positionnement sur la 1ère page pour générer des prospects continus.</div>
          </div>
          <div class="feature-box">
            <div class="feature-tag purple">[ DESIGN ÉLITE ]</div>
            <div class="feature-title">100% sur-mesure</div>
            <div class="feature-text">Une identité premium unique qui dépasse tous vos concurrents.</div>
          </div>
          <div class="feature-box">
            <div class="feature-tag amber">[ RÉSULTATS ]</div>
            <div class="feature-title">+320% de conversion</div>
            <div class="feature-text">Architecture orientée vente et formulaires à fort engagement.</div>
          </div>
        </section>

        <!-- 4. Big Proof: REAL CLIENT LOGOS (BIGGER) -->
        <section class="proof-wrapper">
          <div class="proof-header">
            <div class="proof-header-left">
              <div class="proof-tag">[ CLIENTS & PARTENAIRES ]</div>
              <div class="proof-sub">Ils ont confié leur site web à SocialBadi</div>
            </div>
            <div class="proof-badge">20+ PROJETS LIVRÉS</div>
          </div>
          <div class="logos-grid">
            <div class="logo-card">
              <div class="logo-img-wrap">
                <img src="${badiCrmLogo}" alt="BadiCRM" style="max-height: 80px; max-width: 340px;" />
              </div>
              <span class="logo-caption">SaaS CRM</span>
            </div>
            <div class="logo-card">
              <div class="logo-img-wrap">
                <img src="${lucciLogo}" alt="Lucci Design" style="max-height: 94px; max-width: 320px;" />
              </div>
              <span class="logo-caption">Mobilier Design</span>
            </div>
            <div class="logo-card">
              <div class="logo-img-wrap">
                <img src="${merakiLogo}" alt="Meraki Club" style="max-height: 74px; max-width: 350px; transform: scale(1.35); transform-origin: center;" />
              </div>
              <span class="logo-caption">Sport & Wellness</span>
            </div>
            <div class="logo-card">
              <div class="logo-img-wrap">
                <img src="${olympeLogo}" alt="Olympe Thalasso" style="max-height: 90px; max-width: 330px;" />
              </div>
              <span class="logo-caption">Spa & Thalasso</span>
            </div>
            <div class="logo-card">
              <div class="logo-img-wrap">
                <img src="${archiLogo}" alt="Archi Renov" style="max-height: 92px; max-width: 320px; transform: scale(1.15);" />
              </div>
              <span class="logo-caption">Architecture</span>
            </div>
            <div class="logo-card">
              <div class="logo-img-wrap">
                <img src="${zitounaLogo}" alt="Zitouna" style="max-height: 92px; max-width: 320px; transform: scale(1.15);" />
              </div>
              <span class="logo-caption">Restauration</span>
            </div>
          </div>
        </section>

        <!-- 5. Story Bottom CTA (Swipe-Up / Link Friendly) -->
        <footer class="cta-container">
          <div class="cta-top">
            <div>
              <div class="cta-title">Passez au niveau supérieur</div>
              <div class="cta-sub">Audit technique offert • Réponse sous 24h</div>
            </div>
          </div>
          <div class="cta-btn-big">
            Démarrer Mon Projet Web
            <span class="arrow">→</span>
          </div>
          <div class="cta-footer-note">SOCIALBADI.COM • STUDIO DE DÉVELOPPEMENT WEB</div>
        </footer>
      </body>
    </html>
  `, { waitUntil: 'domcontentloaded' });

  await new Promise(r => setTimeout(r, 600));

  const storyPath = path.join(OUT_DIR, 'socialbadi-ad-story-1080x1920.png');
  await page.screenshot({ path: storyPath, type: 'png' });
  console.log(`✅ Saved: ${storyPath}`);

  // Also save as socialbadi-ad-story-9x16-1080x1920.png for backwards compatibility
  fs.copyFileSync(storyPath, path.join(OUT_DIR, 'socialbadi-ad-story-9x16-1080x1920.png'));

  await browser.close();
  console.log('🎉 Ad generation complete! Exactly 2 formats generated: Carré (1:1) and Story (9:16).');
}

generateAds().catch(err => {
  console.error('Fatal error during ad generation:', err);
  process.exit(1);
});
