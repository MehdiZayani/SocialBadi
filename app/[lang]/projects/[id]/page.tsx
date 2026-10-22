import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle2, 
  Palette, 
  Type, 
  Target, 
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Check
} from "lucide-react";
import { projectsData, getProjectBySlug } from "@/lib/projectsData";
import PartnersSlideshow from "@/components/PartnersSlideshow";
import Navbar from "@/components/Navbar";
import ModernFooter from "@/components/ModernFooter";
import CyberGrid from "@/components/react-bits/CyberGrid";
import SpotlightCard from "@/components/react-bits/SpotlightCard";

export function generateStaticParams() {
  const params: { lang: string; id: string }[] = [];
  ["fr", "en"].forEach((lang) => {
    projectsData.forEach((project) => {
      params.push({ lang, id: project.slug });
    });
  });
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}): Promise<Metadata> {
  const { lang, id } = await params;
  const locale: "fr" | "en" = lang === "en" ? "en" : "fr";
  const project = getProjectBySlug(id);

  if (!project) {
    return {
      title: "Projet non trouvé | SocialBadi",
      robots: { index: false, follow: false },
    };
  }

  const isFr = locale === "fr";
  const title = isFr
    ? `${project.title} - ${project.category.fr} | Étude de Cas SocialBadi`
    : `${project.title} - ${project.category.en} | SocialBadi Case Study`;

  const description = `${project.summary[locale]} Découverte de l'architecture, de la palette de couleurs, des choix typographiques et des performances obtenues.`;
  const canonicalUrl = `https://socialbadi.com/${locale}/projects/${project.slug}`;

  return {
    title,
    description,
    keywords: [
      project.title,
      project.category[locale],
      ...project.techStack,
      "SocialBadi étude de cas",
      "portfolio développement web",
      "agence Next.js"
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        fr: `https://socialbadi.com/fr/projects/${project.slug}`,
        en: `https://socialbadi.com/en/projects/${project.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "SocialBadi Studio",
      locale: isFr ? "fr_FR" : "en_US",
      type: "article",
      images: [
        {
          url: `https://socialbadi.com${project.heroImage}`,
          width: 1200,
          height: 630,
          alt: `${project.title} - Réalisation SocialBadi`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`https://socialbadi.com${project.heroImage}`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  const locale: "fr" | "en" = lang === "en" ? "en" : "fr";
  const project = getProjectBySlug(id);

  if (!project) {
    notFound();
  }

  // If accessed by old/short id instead of canonical slug, permanently redirect
  if (id !== project.slug) {
    redirect(`/${locale}/projects/${project.slug}`);
  }

  // JSON-LD structured data for Googlebot
  const jsonLd = {
    "@context": "https://schema.org",
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
    keywords: project.techStack.join(", "),
    datePublished: project.year,
    mainEntityOfPage: `https://socialbadi.com/${locale}/projects/${project.slug}`,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
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
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `https://socialbadi.com/${locale}/projects/${project.slug}`,
      },
    ],
  };

  return (
    <div className="relative min-h-screen bg-[#fcfcfd] text-slate-900 selection:bg-blue-600 selection:text-white font-sans antialiased">
      {/* Structured schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Luminous Ambient Background */}
      <CyberGrid />

      {/* Global Navbar */}
      <Navbar locale={locale} />

      {/* Main Container */}
      <main className="pt-36 pb-20 sm:pt-44 sm:pb-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center space-x-2 text-xs font-mono text-slate-500">
            <li>
              <Link href={`/${locale}`} className="hover:text-blue-600 transition-colors">
                {locale === "fr" ? "Accueil" : "Home"}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href={`/${locale}/projects`} className="hover:text-blue-600 transition-colors">
                {locale === "fr" ? "Réalisations" : "Projects"}
              </Link>
            </li>
            <li>/</li>
            <li className="text-slate-900 font-semibold" aria-current="page">
              {project.title}
            </li>
          </ol>
        </nav>

        {/* Project Intro Header */}
        <header className="text-center max-w-4xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-200 rounded-full mb-6 text-xs font-mono text-blue-700 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
            <span>{project.category[locale]}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 mb-4 tracking-tight">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto italic mb-8">
            "{project.tagline[locale]}"
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-500 pt-6 border-t border-slate-200">
            <div>
              <span className="text-slate-400 block uppercase">{locale === "fr" ? "Client" : "Client"}</span>
              <span className="font-bold text-slate-900 text-sm">{project.client}</span>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div>
              <span className="text-slate-400 block uppercase">{locale === "fr" ? "Année" : "Year"}</span>
              <span className="font-bold text-slate-900 text-sm">{project.year}</span>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div>
              <span className="text-slate-400 block uppercase">{locale === "fr" ? "Localisation" : "Location"}</span>
              <span className="font-bold text-slate-900 text-sm">{project.location}</span>
            </div>
          </div>
        </header>

        {/* Hero Visual Mockup */}
        <div className="rounded-3xl overflow-hidden border border-slate-200/90 bg-white shadow-xl mb-16">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
            </div>
            <div className="px-4 py-1 rounded-full bg-white border border-slate-200 text-xs font-mono text-slate-600 flex items-center gap-2 shadow-xs">
              <span className="text-emerald-500">🔒</span>
              <span>https://{project.domain}</span>
            </div>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>{locale === "fr" ? "Ouvrir" : "Open"}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="relative aspect-[16/10] w-full bg-slate-100">
            <Image
              src={project.heroImage}
              alt={`${project.title} aperçu interface`}
              fill
              className="object-cover object-top"
              priority
            />
          </div>
        </div>

        {/* Challenge vs Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 rounded-3xl bg-amber-50/50 border border-amber-200 space-y-4">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-lg">
              <Target className="w-5 h-5" />
              <h2>{locale === "fr" ? "Le Défi Technique & Métier" : "The Architectural Challenge"}</h2>
            </div>
            <p className="text-amber-950 text-sm sm:text-base leading-relaxed font-medium">
              {project.challenge[locale]}
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-emerald-50/50 border border-emerald-200 space-y-4">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-lg">
              <CheckCircle2 className="w-5 h-5" />
              <h2>{locale === "fr" ? "La Solution Déployée" : "The Engineered Solution"}</h2>
            </div>
            <p className="text-emerald-950 text-sm sm:text-base leading-relaxed font-medium">
              {project.solution[locale]}
            </p>
          </div>
        </div>

        {/* SECTION: COLOR PALETTE & RATIONALE */}
        <section className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-sm mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-pink-50 border border-pink-200 flex items-center justify-center text-pink-600">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {locale === "fr" ? "Stratégie des Couleurs & Psychologie" : "Color Palette & Brand Strategy"}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                {locale === "fr" ? "Justification des teintes sélectionnées pour ce produit" : "Strategic color selection rationale"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.colorPalette.map((color, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 shadow-xs">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl shadow border border-slate-300 flex-shrink-0"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{color.name}</h3>
                    <code className="text-xs text-blue-600 font-mono font-bold">{color.hex}</code>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    {locale === "fr" ? "Utilisation :" : "Usage:"}
                  </span>
                  <p className="text-xs text-slate-700 font-medium">{color.usage[locale]}</p>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    {locale === "fr" ? "Pourquoi ce choix :" : "Rationale:"}
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">{color.rationale[locale]}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: TYPOGRAPHY */}
        <section className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-sm mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Type className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {locale === "fr" ? "Typographie & Polices Sélectionnées" : "Typography & Hierarchy"}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                {locale === "fr" ? "Structure des polices assurant autorité et lisibilité" : "Font pairings ensuring optimal readability"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.typography.map((font, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{font.fontName}</h3>
                    <span className="text-xs text-blue-600 font-semibold">{font.type}</span>
                  </div>
                  <span className="text-2xl font-serif text-slate-400 italic">Aa</span>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                  <div className="text-base text-slate-900 font-bold">
                    {locale === "fr" ? "Exemple de rendu typographique" : "Typography Preview"}
                  </div>
                  <div className="text-xs text-slate-500 font-mono">
                    ABCDEFGHIJKLMNOPQRSTUVWXYZ • abcdefghijklmnopqrstuvwxyz • 0123456789
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    {locale === "fr" ? "Rôle dans le projet :" : "Role in project:"}
                  </span>
                  <p className="text-xs text-slate-700 font-medium">{font.usage[locale]}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: TECH STACK & METRICS */}
        <div className="p-8 sm:p-12 rounded-3xl bg-blue-50/70 border border-blue-200 shadow-sm mb-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              {locale === "fr" ? "Stack Technique du Projet" : "Technical Stack"}
            </h2>
            <div className="flex flex-wrap gap-2 pt-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-white text-slate-800 border border-slate-200 shadow-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25 flex items-center gap-2 shrink-0 transition-all"
          >
            <span>{locale === "fr" ? "Visiter le site en ligne" : "Visit Live Site"}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Back Link */}
        <div className="text-center mb-16">
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{locale === "fr" ? "Retour à toutes les réalisations" : "Back to all case studies"}</span>
          </Link>
        </div>

        {/* Partners Slideshow */}
        <section aria-labelledby="clients-slideshow-heading" className="pt-12 border-t border-slate-200">
          <div className="text-center mb-6">
            <h2 id="clients-slideshow-heading" className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
              {locale === "fr" ? "Autres plateformes développées" : "Other platforms engineered"}
            </h2>
          </div>
          <PartnersSlideshow locale={locale} />
        </section>
      </main>

      {/* Global Footer */}
      <ModernFooter locale={locale} />
    </div>
  );
}
