// lib/i18n.ts
import fs from 'fs';
import path from 'path';

export function getTranslations(lang: string) {
  const filePath = path.join(process.cwd(), 'public', 'locales', lang, 'common.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}