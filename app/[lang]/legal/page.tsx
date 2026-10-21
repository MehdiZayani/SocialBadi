/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Scale, FileText, Building2, Server, ShieldCheck, ArrowLeft, Mail, Phone } from 'lucide-react';
import Navbar from '@/components/Navbar';
import ModernFooter from '@/components/ModernFooter';
import CyberGrid from '@/components/react-bits/CyberGrid';
import fr from '@/public/locales/fr/common.json';
import en from '@/public/locales/en/common.json';

function useI18n() {
  const params = useParams();
  const [locale, setLocaleState] = useState<'fr' | 'en'>('fr');

  useEffect(() => {
    const lang = params?.lang as string;
    if (lang === 'en' || lang === 'fr') {
      setLocaleState(lang);
    }
  }, [params]);

  const translations: Record<'fr' | 'en', any> = {
    fr,
    en,
  };

  return { t: translations[locale], locale };
}

export default function LegalPage() {
  const { t, locale } = useI18n();

  const legalContent = {
    fr: {
      badge: "Cadre Réglementaire",
      title: "Mentions Légales",
      intro: "Informations légales et réglementaires relatives à l'exploitation de la plateforme et aux services d'ingénierie logicielle fournis par SocialBadi.",
      lastUpdated: "Dernière mise à jour : Février 2025",
      sections: [
        {
          icon: Building2,
          title: "1. Éditeur de la Plateforme",
          content: `Le site SocialBadi (accessible à l'adresse socialbadi.com) est édité par le Studio SocialBadi :

• Dénomination : SocialBadi Studio & Engineering
• Fondateur & Directeur de Publication : Mehdi Zayani (CEO)
• Head of AI : Yassine Rassas
• Consultant Cyber Sécurité : Mehdi Amemou
• Email de contact : contact@socialbadi.com
• Téléphone : +216 93 304 304`
        },
        {
          icon: Server,
          title: "2. Hébergement & Infrastructure Cloud",
          content: `L'infrastructure applicative et l'hébergement du site sont assurés par :

• Hébergeur : Vercel Inc.
• Adresse : 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis
• Certification : ISO 27001, SOC 2 Type II
• Réseau de distribution : Global Edge Network CDN (Europe / International)`
        },
        {
          icon: ShieldCheck,
          title: "3. Propriété Intellectuelle & Droits d'Auteur",
          content: `L'intégralité du contenu présent sur cette plateforme (code source, architectures, interfaces, textes, identité visuelle, animations et éléments graphiques) constitue une œuvre de l'esprit protégée par le Code de la Propriété Intellectuelle et les conventions internationales.

Toute reproduction, représentation, extraction, modification ou exploitation commerciale totale ou partielle sans accord écrit préalable de SocialBadi est formellement prohibée.`
        },
        {
          icon: FileText,
          title: "4. Protection des Données Personnelles (RGPD)",
          content: `Conformément aux dispositions du Règlement Général sur la Protection des Données (RGPD 2016/679), les utilisateurs disposent d'un droit permanent d'accès, de rectification, de portabilité et de suppression de leurs informations personnelles.

Pour exercer ces prérogatives ou obtenir des précisions sur vos droits, vous pouvez consulter notre Politique de Confidentialité ou écrire à : contact@socialbadi.com`
        },
        {
          icon: Scale,
          title: "5. Limitation de Responsabilité",
          content: `SocialBadi s'engage à assurer la plus haute disponibilité et exactitude des informations diffusées sur ce site. Néanmoins, SocialBadi ne saurait être tenu responsable d'éventuelles interruptions techniques, latences de réseau ou dommages indirects liés à l'usage de la plateforme.`
        }
      ],
      contact: {
        title: "Contact Juridique",
        desc: "Pour toute notification légale ou demande officielle, contactez notre équipe :",
        email: "contact@socialbadi.com",
        phone: "+216 93 304 304"
      }
    },
    en: {
      badge: "Regulatory Notice",
      title: "Legal Notice",
      intro: "Statutory information regarding the operation of the SocialBadi engineering studio and digital production platform.",
      lastUpdated: "Last updated: February 2025",
      sections: [
        {
          icon: Building2,
          title: "1. Platform Publisher",
          content: `The SocialBadi website (accessible at socialbadi.com) is operated by SocialBadi Studio:

• Entity : SocialBadi Studio & Engineering
• Founder & Publication Director : Mehdi Zayani (CEO)
• Head of AI : Yassine Rassas
• Cybersecurity Consultant : Mehdi Amemou
• Official Inquiries : contact@socialbadi.com
• Phone : +216 93 304 304`
        },
        {
          icon: Server,
          title: "2. Cloud Hosting & Infrastructure",
          content: `The software deployment and edge hosting services are powered by:

• Cloud Host : Vercel Inc.
• Address : 340 S Lemon Ave #4133, Walnut, CA 91789, USA
• Compliance : ISO 27001, SOC 2 Type II certified data centers
• CDN Delivery : Low-latency Global Edge CDN network`
        },
        {
          icon: ShieldCheck,
          title: "3. Intellectual Property Rights",
          content: `All assets, source architectures, dynamic components, brand marks, and documentation published on this domain are proprietary intellectual property of SocialBadi.

Unauthorized reproduction, distribution, decompilation, or commercial dissemination without explicit prior written authorization is strictly prohibited.`
        },
        {
          icon: FileText,
          title: "4. Data Privacy & GDPR Compliance",
          content: `In accordance with the European Union General Data Protection Regulation (GDPR), users have full rights of access, correction, data portability, and deletion.

For detailed privacy disclosures or data requests, refer to our Privacy Policy or email: contact@socialbadi.com`
        },
        {
          icon: Scale,
          title: "5. Limitation of Liability",
          content: `SocialBadi maintains high availability standards for all digital services. However, SocialBadi accepts no liability for temporary server interruptions, upstream carrier disruptions, or indirect damages stemming from website usage.`
        }
      ],
      contact: {
        title: "Legal Inquiries",
        desc: "For formal notices or compliance documentation, reach out to our legal desk:",
        email: "contact@socialbadi.com",
        phone: "+216 93 304 304"
      }
    }
  };

  const content = legalContent[locale];

  return (
    <div className="min-h-screen bg-[#fcfcfd] text-slate-900 relative selection:bg-blue-500/20 selection:text-blue-900">
      <CyberGrid />
      <Navbar translations={t} locale={locale} />

      <main className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-10">
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-slate-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{locale === 'fr' ? "Retour à l'accueil" : "Back to Home"}</span>
          </Link>
        </div>

        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono font-semibold text-blue-700 mb-4 shadow-sm">
            <Scale className="w-3.5 h-3.5 text-blue-600" />
            <span>{content.badge}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-5">
            {content.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {content.intro}
          </p>

          <p className="text-xs font-mono text-slate-600 mt-4">
            {content.lastUpdated}
          </p>
        </div>

        {/* Legal Sections Grid */}
        <div className="space-y-6 mb-12">
          {content.sections.map((section, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white/90 border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)] hover:border-blue-400/50 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-sm">
                  <section.icon className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  {section.title}
                </h2>
              </div>

              <div className="text-sm text-slate-600 whitespace-pre-line leading-relaxed pl-0 sm:pl-13">
                {section.content}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-blue-50 via-indigo-50/50 to-white border border-blue-200 shadow-md mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 block mb-1">
                {content.contact.title}
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                {locale === 'fr' ? "Demande d'information juridique ?" : "Formal legal correspondence?"}
              </h3>
              <p className="text-sm text-slate-600 max-w-xl">
                {content.contact.desc}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`mailto:${content.contact.email}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-md"
              >
                <Mail className="w-4 h-4" />
                <span>{content.contact.email}</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <ModernFooter locale={locale} />
    </div>
  );
}
