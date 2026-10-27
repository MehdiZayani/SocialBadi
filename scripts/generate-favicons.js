const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PUBLIC_DIR = path.join(__dirname, '../public');
const APP_DIR = path.join(__dirname, '../app');

// Helper to create a valid Windows ICO file from PNG buffers
function createIco(pngBuffersWithSize) {
  const numImages = pngBuffersWithSize.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  let offset = headerSize + dirEntrySize * numImages;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // 1 = ICO
  header.writeUInt16LE(numImages, 4);

  const dirEntries = [];
  const imageBuffers = [];

  for (const { buffer, size } of pngBuffersWithSize) {
    const entry = Buffer.alloc(dirEntrySize);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // Width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // Height
    entry.writeUInt8(0, 2); // Color palette
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(buffer.length, 8); // Size of image data
    entry.writeUInt32LE(offset, 12); // Offset to image data

    dirEntries.push(entry);
    imageBuffers.push(buffer);
    offset += buffer.length;
  }

  return Buffer.concat([header, ...dirEntries, ...imageBuffers]);
}

async function generateFavicons() {
  console.log('Launching headless Chrome...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const svgContent = fs.readFileSync(path.join(PUBLIC_DIR, 'icon.svg'), 'utf-8');

  // List of sizes to generate
  // Google explicitly requires multiples of 48px: 48, 96, 144, 192, etc.
  const sizes = [
    { size: 16, filename: 'favicon-16x16.png' },
    { size: 32, filename: 'favicon-32x32.png' },
    { size: 48, filename: 'favicon-48x48.png' },
    { size: 96, filename: 'favicon-96x96.png' },
    { size: 128, filename: 'favicon.png' }, // Legacy compatibility
    { size: 144, filename: 'favicon-144x144.png' },
    { size: 180, filename: 'apple-touch-icon.png' },
    { size: 192, filename: 'icon-192.png' },
    { size: 192, filename: 'favicon-192x192.png' },
    { size: 512, filename: 'icon-512.png' },
    { size: 512, filename: 'logo.png' } // Schema.org Organization logo
  ];

  const page = await browser.newPage();
  const icoBuffers = [];

  for (const { size, filename } of sizes) {
    console.log(`Rendering ${filename} (${size}x${size})...`);
    await page.setViewport({ width: size, height: size, deviceScaleFactor: 1 });
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            html, body {
              width: ${size}px;
              height: ${size}px;
              background: transparent;
              display: flex;
              align-items: center;
              justify-content: center;
              overflow: hidden;
            }
            svg {
              width: ${size}px;
              height: ${size}px;
              display: block;
            }
          </style>
        </head>
        <body>
          ${svgContent}
        </body>
      </html>
    `);

    const pngBuffer = await page.screenshot({ type: 'png', omitBackground: true });
    fs.writeFileSync(path.join(PUBLIC_DIR, filename), pngBuffer);

    // Save 16, 32, 48 for multi-resolution ICO file
    if ([16, 32, 48].includes(size) && !icoBuffers.some(b => b.size === size)) {
      icoBuffers.push({ buffer: pngBuffer, size });
    }
  }

  // Generate valid multi-size favicon.ico
  console.log('Generating multi-resolution favicon.ico (16x16, 32x32, 48x48)...');
  const icoFile = createIco(icoBuffers);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.ico'), icoFile);
  fs.writeFileSync(path.join(PUBLIC_DIR, 'logo.ico'), icoFile);

  // Also write Next.js convention files in app/
  fs.writeFileSync(path.join(APP_DIR, 'favicon.ico'), icoFile);
  fs.copyFileSync(path.join(PUBLIC_DIR, 'apple-touch-icon.png'), path.join(APP_DIR, 'apple-icon.png'));
  fs.copyFileSync(path.join(PUBLIC_DIR, 'icon-512.png'), path.join(APP_DIR, 'icon.png'));

  await browser.close();
  console.log('All favicons, icons, and logo assets generated successfully!');
}

generateFavicons().catch(err => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
