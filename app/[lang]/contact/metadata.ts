import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  
  const titles = {
    fr: 'Contact - SocialBadi | Transformez Votre Business avec l\'IA',
    en: 'Contact - SocialBadi | Transform Your Business with AI'
  };
  
  const descriptions = {
    fr: 'Contactez SocialBadi pour découvrir comment nos agents vocaux IA et chatbots intelligents peuvent transformer votre business. Réponse sous 24h.',
    en: 'Contact SocialBadi to discover how our AI voice agents and intelligent chatbots can transform your business. Response within 24 hours.'
  };

  return {
    title: titles[lang as keyof typeof titles] || titles.fr,
    description: descriptions[lang as keyof typeof descriptions] || descriptions.fr,
    openGraph: {
      title: titles[lang as keyof typeof titles] || titles.fr,
      description: descriptions[lang as keyof typeof descriptions] || descriptions.fr,
      type: 'website',
      locale: lang === 'en' ? 'en_US' : 'fr_FR',
    },
    alternates: {
      canonical: `https://socialbadi.com/${lang}/contact`,
      languages: {
        'fr': 'https://socialbadi.com/fr/contact',
        'en': 'https://socialbadi.com/en/contact',
      },
    },
  };
}
