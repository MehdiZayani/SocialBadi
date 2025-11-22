import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  
  const titles = {
    fr: 'Tarifs - Solutions IA pour Entreprises | SocialBadi',
    en: 'Pricing - AI Solutions for Business | SocialBadi'
  };
  
  const descriptions = {
    fr: 'Découvrez nos plans tarifaires flexibles pour agents vocaux IA et chatbots. Solutions adaptées à toutes les tailles d\'entreprise. Essai gratuit de 14 jours.',
    en: 'Discover our flexible pricing plans for AI voice agents and chatbots. Solutions for all business sizes. 14-day free trial.'
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
      canonical: `https://socialbadi.com/${lang}/pricing`,
      languages: {
        'fr': 'https://socialbadi.com/fr/pricing',
        'en': 'https://socialbadi.com/en/pricing',
      },
    },
  };
}
