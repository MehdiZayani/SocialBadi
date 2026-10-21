import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, ArrowLeft, Bot, Rocket, CheckCircle2 } from "lucide-react";
import { projectsData } from "@/lib/projectsData";
import ProjectsGallery from "@/components/ProjectsGallery";
import PartnersSlideshow from "@/components/PartnersSlideshow";
import Navbar from "@/components/Navbar";
import ModernFooter from "@/components/ModernFooter";
import CyberGrid from "@/components/react-bits/CyberGrid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const resolved = await params;
  const lang = resolved?.lang === "en" ? "en" : "fr";

  const isFr = lang === "fr";

  const title = isFr
    ? "Nos Réalisations & Portfolio Web, Mobile & IA | SocialBadi Studio"
    : "Production Works & Case Studies | Next.js, Mobile & AI | SocialBadi";

  const description = isFr
    ? "Découvrez les études de cas et réalisations de SocialBadi Studio : plateformes SaaS (BadiCRM), sites d'exception luxe (Lucci Design), Web Apps QR (Restaurant Zitouna) et BTP (Archi Renov Paris). Next.js 15, React Native, IA & automatisations."
    : "Explore production case studies by SocialBadi: SaaS platforms (BadiCRM), luxury artisan showcases (Lucci Design), QR Web Apps (Restaurant Zitouna), and general contractors (Archi Renov Paris). Next.js 15, React Native, AI & Automations.";

  const keywords = isFr
    ? [
        "portfolio développement web",
        "études de cas SaaS",
        "développement Next.js Paris",
        "application mobile React Native",
        "automatisation n8n",
        "chatbots IA WhatsApp",
        "SocialBadi projets",
        "BadiCRM",
        "Lucci Design",
        "agence web devis"
      ]
    : [
        "software engineering case studies",
        "SaaS development portfolio",
        "Next.js web apps",
        "React Native mobile apps",
        "workflow automation n8n",
        "AI WhatsApp chatbots",
        "SocialBadi clients",
        "digital product foundry"
      ];

  const canonicalUrl = `https://socialbadi.com/${lang}/projects`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        fr: "https://socialbadi.com/fr/projects",
        en: "https://socialbadi.com/en/projects",
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "SocialBadi Studio",
      locale: isFr ? "fr_FR" : "en_US",
      alternateLocale: isFr ? ["en_US"] : ["fr_FR"],
      type: "website",
      images: [
        {
          url: "https://socialbadi.com/projects/badi-crm.jpg",
          width: 1200,
          height: 630,
          alt: "SocialBadi - Portfolio & Réalisations",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://socialbadi.com/projects/badi-crm.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ lang?: string }>;
}) {
  const resolved = await params;
  const locale: "fr" | "en" = resolved?.lang === "en" ? "en" : "fr";

  // Build JSON-LD Structured Data for Googlebot & SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `https://socialbadi.com/${locale}/projects#webpage`,
        url: `https://socialbadi.com/${locale}/projects`,
        name: locale === "fr" ? "Nos Réalisations & Études de Cas" : "Selected Production Deployments",
        description: locale === "fr"
          ? "Portfolio complet de plateformes web, applications mobiles et automatisations créées par SocialBadi."
          : "Full portfolio of web platforms, mobile applications and automations built by SocialBadi.",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://socialbadi.com/#website",
          url: "https://socialbadi.com",
          name: "SocialBadi",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `https://socialbadi.com/${locale}/projects#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: locale === "fr" ? "Accueil" : "Home",
            item: `https://socialbadi.com/${locale}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: locale === "fr" ? "Réalisations" : "Projects",
            item: `https://socialbadi.com/${locale}/projects`,
          },
        ],
      },
      {
        "@type": "ItemList",
        name: locale === "fr" ? "Études de Cas & Projets Clients" : "Client Case Studies & Deployments",
        itemListElement: projectsData.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "CreativeWork",
            name: project.title,
            headline: project.tagline[locale],
            description: project.summary[locale],
            url: `https://socialbadi.com/${locale}/projects/${project.slug}`,
            image: `https://socialbadi.com${project.heroImage}`,
            creator: {
              "@type": "Organization",
              name: "SocialBadi",
              url: "https://socialbadi.com",
            },
            datePublished: project.year,
            keywords: project.techStack.join(", "),
          },
        })),
      },
    ],
  };

  return (
    <div className="relative min-h-screen bg-[#fcfcfd] text-slate-900 selection:bg-blue-600 selection:text-white font-sans antialiased">
      {/* JSON-LD Script for Googlebot indexing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Ambient Light Luminous Background */}
      <CyberGrid />

      {/* Global Navbar */}
      <Navbar locale={locale} />

      {/* Main Page Body */}
      <main className="pt-36 pb-20 sm:pt-44 sm:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb Navigation for SEO */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center space-x-2 text-xs font-mono text-slate-500">
            <li>
              <Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">
                {locale === "fr" ? "Accueil" : "Home"}
              </Link>
            </li>
            <li>/</li>
            <li className="text-slate-900 font-semibold" aria-current="page">
              {locale === "fr" ? "Réalisations" : "Projects"}
            </li>
          </ol>
        </nav>

        {/* Section Header */}
        <header className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-blue-700 font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{locale === "fr" ? "PORTFOLIO & ÉTUDES DE CAS TECHNIQUES" : "PORTFOLIO & TECHNICAL CASE STUDIES"}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
            {locale === "fr" ? (
              <>
                Des Produits Bâtis Pour{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Durer & Convertir
                </span>
              </>
            ) : (
              <>
                Production Deployments Built to{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Scale & Convert
                </span>
              </>
            )}
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            {locale === "fr"
              ? "Découvrez l'envers du décor de nos projets récents : choix des palettes visuelles, typographies d'art, architectures serveur Next.js et résultats d'acquisition mesurés."
              : "Discover the architectural blueprint of our latest deployments: design identity, typography choices, server runtimes, and real business metrics."}
          </p>
        </header>

        {/* Interactive Filterable Gallery with Schema Attributes */}
        <ProjectsGallery projects={projectsData} locale={locale} />

        {/* Client Logos Marquee */}
        <section aria-labelledby="partners-heading" className="pt-12 border-t border-slate-200">
          <div className="text-center mb-6">
            <h2 id="partners-heading" className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
              {locale === "fr" ? "Ils nous font confiance au quotidien" : "Trusted by industry leaders"}
            </h2>
          </div>
          <PartnersSlideshow locale={locale} />
        </section>
      </main>

      {/* Global Modern Light Footer */}
      <ModernFooter locale={locale} />
    </div>
  );
}
