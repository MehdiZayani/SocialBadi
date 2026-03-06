import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  
  const titles = {
    fr: 'Agents Vocaux IA & Chatbots Intelligents | SocialBadi',
    en: 'AI Voice Agents & Intelligent Chatbots | SocialBadi'
  };
  
  const descriptions = {
    fr: 'Solutions d\'automatisation IA pour entreprises : agents vocaux, chatbots intelligents, qualification de leads. Disponible 24/7 en plusieurs langues. Transformez votre service client.',
    en: 'AI automation solutions for businesses: voice agents, intelligent chatbots, lead qualification. Available 24/7 in multiple languages. Transform your customer service.'
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
      canonical: `https://socialbadi.com/${lang}`,
      languages: {
        'fr': 'https://socialbadi.com/fr',
        'en': 'https://socialbadi.com/en',
      },
    },
  };
}
