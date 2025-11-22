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
    default: 'SocialBadi - AI-Powered Business Solutions | Voice AI & Chatbots',
    template: '%s | SocialBadi'
  },
  description: 'Transform your business with AI-powered voice agents, intelligent chatbots, and automated customer engagement solutions. Available 24/7 in multiple languages.',
  keywords: ['AI voice agents', 'chatbots', 'business automation', 'AI solutions', 'customer engagement', 'lead qualification', 'appointment booking', 'AI technology'],
  authors: [{ name: 'SocialBadi' }],
  creator: 'SocialBadi',
  publisher: 'SocialBadi',
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
    siteName: 'SocialBadi',
    title: 'SocialBadi - AI-Powered Business Solutions',
    description: 'Transform your business with AI-powered voice agents, intelligent chatbots, and automated customer engagement solutions.',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'SocialBadi - AI Business Solutions',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SocialBadi - AI-Powered Business Solutions',
    description: 'Transform your business with AI-powered voice agents and intelligent chatbots.',
    images: ['/og-image.png'],
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
      { url: '/favicon.ico' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default async function RootLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
  }
) {
  const params = await props.params;

  const {
    lang
  } = params;

  const {
    children
  } = props;

  return (
    <html lang={lang}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512x512.png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="canonical" href="https://socialbadi.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'SocialBadi',
              description: 'AI-powered business solutions including voice agents and chatbots',
              url: 'https://socialbadi.com',
              logo: 'https://socialbadi.com/logo.png',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+33-7-69-84-80-31',
                contactType: 'customer service',
                email: 'contact@socialbadi.com',
                availableLanguage: ['French', 'English']
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Sousse',
                addressCountry: 'TN'
              },
              sameAs: [
                'https://linkedin.com/company/socialbadi',
                'https://twitter.com/socialbadi'
              ]
            })
          }}
        />
      </body>
    </html>
  );
}