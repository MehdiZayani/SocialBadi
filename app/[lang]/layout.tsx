import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  
  const titles = {
    fr: "SocialBadi - Studio d'Ingénierie Logicielle, Web, Mobile & IA",
    en: "SocialBadi - Custom Web Applications, Mobile & AI Studio",
  };
  
  const descriptions = {
    fr: "Studio d'ingénierie digitale sur-mesure : applications web d'exception, expériences mobiles intuitives, assistants IA et automatisations métier taillées pour scaler.",
    en: "Bespoke digital engineering studio: custom web applications & platforms tailored to your needs, intuitive mobile experiences, and intelligent business automations.",
  };

  return {
    title: titles[lang as keyof typeof titles] || titles.fr,
    description: descriptions[lang as keyof typeof descriptions] || descriptions.fr,
    openGraph: {
      title: titles[lang as keyof typeof titles] || titles.fr,
      description: descriptions[lang as keyof typeof descriptions] || descriptions.fr,
      type: "website",
      locale: lang === "en" ? "en_US" : "fr_FR",
      url: `https://socialbadi.com/${lang}`,
    },
    alternates: {
      canonical: `https://socialbadi.com/${lang}`,
      languages: {
        fr: "https://socialbadi.com/fr",
        en: "https://socialbadi.com/en",
        "x-default": "https://socialbadi.com/fr",
      },
    },
  };
}

export default function LangLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
