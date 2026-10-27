import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://socialbadi.com'),
  title: {
    default: "SocialBadi - Studio d'Ingénierie Logicielle, Web, Mobile & IA",
    template: "%s | SocialBadi Studio"
  },
  description: "Studio d'ingénierie digitale & expériences sur-mesure. Nous concevons des applications web d'exception, des applications mobiles intuitives et des automatisations intelligentes conçues pour votre réussite.",
  keywords: [
    'SocialBadi',
    'SocialBadi studio',
    'application web sur-mesure',
    'ingénierie logicielle',
    'développement web',
    'application mobile iOS Android',
    'automatisation des processus',
    'agents IA',
    'chatbots entreprise',
    'Next.js studio',
    'Paris',
    'Tunisie'
  ],
  authors: [{ name: 'SocialBadi Studio', url: 'https://socialbadi.com' }],
  creator: 'SocialBadi Studio',
  publisher: 'SocialBadi Studio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    alternateLocale: ['en_US'],
    url: 'https://socialbadi.com',
    siteName: 'SocialBadi Studio',
    title: "SocialBadi - Studio d'Ingénierie Logicielle, Web, Mobile & IA",
    description: "Studio d'ingénierie digitale sur-mesure : applications web d'exception, plateformes mobiles et solutions IA.",
    images: [{
      url: 'https://socialbadi.com/og-image.png',
      width: 1200,
      height: 630,
      alt: "SocialBadi - Studio d'Ingénierie Logicielle, Web, Mobile & IA",
      type: 'image/png',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "SocialBadi - Studio d'Ingénierie Logicielle, Web, Mobile & IA",
    description: "Studio d'ingénierie digitale sur-mesure : applications web d'exception, plateformes mobiles et solutions IA.",
    images: ['https://socialbadi.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '48x48 32x32 16x16' }
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
  },
};

export default async function RootLayout(
  props: {
    children: React.ReactNode;
    params?: Promise<{ lang?: string }>;
  }
) {
  const resolvedParams = props.params ? await props.params : undefined;
  const lang = resolvedParams?.lang || 'fr';
  const { children } = props;

  return (
    <html lang={lang}>
      <head>
        {/* Google Search Favicon standards (multiples of 48px) */}
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="144x144" href="/favicon-144x144.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="SocialBadi" />
        <meta name="application-name" content="SocialBadi" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        
        {/* Structured Data: WebSite (Google Site Names) + Organization (Brand Logo & Knowledge Graph) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                '@id': 'https://socialbadi.com/#website',
                url: 'https://socialbadi.com',
                name: 'SocialBadi',
                alternateName: [
                  'SocialBadi Studio',
                  'SocialBadi.studio',
                  'Social Badi',
                  'SocialBadi Engineering'
                ],
                description: "Studio d'ingénierie logicielle, applications web sur-mesure, développement mobile et solutions IA.",
                publisher: {
                  '@id': 'https://socialbadi.com/#organization'
                },
                inLanguage: ['fr', 'en']
              },
              {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                '@id': 'https://socialbadi.com/#organization',
                name: 'SocialBadi',
                legalName: 'SocialBadi Studio & Engineering',
                alternateName: ['SocialBadi Studio', 'SocialBadi.studio', 'Social Badi'],
                url: 'https://socialbadi.com',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://socialbadi.com/logo.png',
                  contentUrl: 'https://socialbadi.com/logo.png',
                  width: 512,
                  height: 512,
                  caption: 'SocialBadi Logo'
                },
                image: 'https://socialbadi.com/logo.png',
                description: "Studio d'ingénierie logicielle & digitale : applications web d'exception, applications mobiles et solutions IA.",
                email: 'contact@socialbadi.com',
                telephone: '+216-93-304-304',
                contactPoint: [
                  {
                    '@type': 'ContactPoint',
                    telephone: '+216-93-304-304',
                    contactType: 'sales',
                    email: 'sales@socialbadi.com',
                    availableLanguage: ['French', 'English']
                  },
                  {
                    '@type': 'ContactPoint',
                    telephone: '+216-93-304-304',
                    contactType: 'customer service',
                    email: 'contact@socialbadi.com',
                    availableLanguage: ['French', 'English']
                  }
                ],
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Sousse',
                  addressCountry: 'TN'
                },
                sameAs: [
                  'https://www.linkedin.com/company/socialbadi'
                ]
              }
            ])
          }}
        />
      </body>
    </html>
  );
}