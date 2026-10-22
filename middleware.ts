import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['fr', 'en']; // Supported languages
const defaultLocale = 'fr';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files, API routes, and special Next.js paths
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') // Files with extensions (images, fonts, etc.)
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If pathname already has a locale, continue
  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Redirect permanently (308) to default locale so search engines understand the canonical structure
  const newUrl = request.nextUrl.clone();
  newUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(newUrl, 308);
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};