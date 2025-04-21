import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'fr','de']; // Langues supportées

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Vérifie si la première partie du chemin est une langue supportée
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirige vers la langue par défaut (par exemple 'fr')
  const defaultLocale = 'fr';
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)'],
};