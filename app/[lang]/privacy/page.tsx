/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Shield, Lock, Eye, Database, UserCheck, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
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

export default function PrivacyPage() {
  const { t, locale } = useI18n();

  const privacyContent = {
    fr: {
      badge: "Confidentialité & RGPD",
      title: "Politique de Confidentialité",
      intro: "Chez SocialBadi, nous appliquons les standards de sécurité les plus stricts pour la protection de vos données personnelles et professionnelles.",
      lastUpdated: "Dernière mise à jour : Février 2025",
      sections: [
        {
          icon: Database,
          title: "1. Données collectées",
          content: `Lorsque vous utilisez notre formulaire de contact ou échangez avec nos équipes, nous recueillons :

• Nom complet et coordonnées professionnelles
• Adresse email vérifiée
• Nom de l'entreprise et secteur d'activité
• Descriptif du projet et besoins techniques

Ces informations sont collectées exclusivement avec votre consentement libre, spécifique et éclairé.`
        },
        {
          icon: Eye,
          title: "2. Finalités du traitement",
          content: `Vos données sont traitées pour des objectifs précis et légitimes :

• Étude technique et cadrage de vos projets digitaux
• Établissement de propositions d'ingénierie et devis personnalisés
• Communication directe liée à l'exécution des prestations
• Support et accompagnement technique dédié

Nous ne commercialisons, ne louons et ne cédons aucune donnée à des tiers publicitaires.`
        },
        {
          icon: Lock,
          title: "3. Sécurité & Infrastructure",
          content: `L'ensemble de nos architectures applique le principe du Security-by-Design :

• Chiffrement de bout en bout SSL / TLS 1.3
• Infrastructure cloud sécurisée (Vercel Enterprise, serveurs certifiés ISO 27001)
• Cloisonnement strict des environnements de développement et de production
• Sauvegardes automatisées quotidiennes et audits de vulnérabilité réguliers.`
        },
        {
          icon: UserCheck,
          title: "4. Vos droits fondamentaux (RGPD)",
          content: `Conformément au Règlement Général sur la Protection des Données, vous disposez des droits suivants :

• Droit d'accès et de communication de vos données
• Droit de rectification ou d'effacement (« droit à l'oubli »)
• Droit à la limitation du traitement et droit d'opposition
• Droit à la portabilité de vos données dans un format interopérable

Pour exercer ces droits, vous pouvez contacter notre délégué à la protection des données : contact@socialbadi.com`
        },
        {
          icon: Shield,
          title: "5. Politique relative aux Cookies",
          content: `Notre site n'utilise aucun traceur invasif, ni cookie de ciblage publicitaire tiers.

Nous utilisons uniquement des cookies techniques strictement indispensables au bon fonctionnement de la plateforme (sauvegarde de la langue d'affichage et session utilisateur sécurisée).`
        },
        {
          icon: Mail,
          title: "6. Durée de conservation",
          content: `Les données relatives à une demande de devis ou de cadrage sont conservées pendant un maximum de 3 ans après le dernier échange actif. À l'issue de cette période, les données sont définitivement purgées de nos bases sécurisées.`
        }
      ],
      contact: {
        title: "Contact & Délégué aux Données",
        desc: "Pour toute interrogation concernant notre politique de confidentialité ou l'exercice de vos droits :",
        email: "contact@socialbadi.com",
        phone: "+33 7 69 84 80 31",
        address: "SocialBadi Studio — Paris / Tunis"
      }
    },
    en: {
      badge: "Privacy & GDPR",
      title: "Privacy Policy",
      intro: "At SocialBadi, we uphold the highest security standards to safeguard your personal and enterprise data with complete transparency.",
      lastUpdated: "Last updated: February 2025",
      sections: [
        {
          icon: Database,
          title: "1. Data Collected",
          content: `When contacting our team or submitting project inquiries, we collect:

• Full name and professional contact details
• Verified business email address
• Company name and industry vertical
• Project specifications and technical requirements

This information is strictly collected with your explicit, informed consent.`
        },
        {
          icon: Eye,
          title: "2. Purpose of Processing",
          content: `Your data is processed strictly for legitimate operational purposes:

• Technical scoping and project architecture assessment
• Formulation of customized proposals and engineering estimates
• Direct communication regarding ongoing deliverables
• Dedicated technical support and onboarding

We never sell, rent, or monetize your information with third-party advertisers.`
        },
        {
          icon: Lock,
          title: "3. Security & Cloud Infrastructure",
          content: `All platforms and pipelines follow strict Security-by-Design protocols:

• Full end-to-end SSL / TLS 1.3 encryption across all network layers
• High-security cloud infrastructure (ISO 27001 certified data centers)
• Strict isolation between development, staging, and production environments
• Automated daily redundant snapshots and continuous vulnerability testing.`
        },
        {
          icon: UserCheck,
          title: "4. Your Rights (GDPR & Compliance)",
          content: `In compliance with the General Data Protection Regulation, you maintain:

• Right of access to your personal records
• Right to rectification or immediate erasure ('Right to be Forgotten')
• Right to restriction of processing and objection
• Right to data portability in standard JSON / CSV format

To exercise any of these privileges, contact: contact@socialbadi.com`
        },
        {
          icon: Shield,
          title: "5. Cookie Governance",
          content: `Our web application operates without invasive third-party ad tracking or behavioral analytics beacons.

Only essential technical cookies necessary for session state and locale preferences are deployed.`
        },
        {
          icon: Mail,
          title: "6. Data Retention Schedule",
          content: `Inquiry and scoping records are maintained for a maximum of 3 years following the most recent active correspondence, after which they are permanently expunged.`
        }
      ],
      contact: {
        title: "Privacy Officer & Contact",
        desc: "For questions regarding our privacy framework or to request data access:",
        email: "contact@socialbadi.com",
        phone: "+33 7 69 84 80 31",
        address: "SocialBadi Studio — Paris / Tunis"
      }
    }
  };

  const content = privacyContent[locale];

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
            <Shield className="w-3.5 h-3.5 text-blue-600" />
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

        {/* Policy Sections Grid */}
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
                {locale === 'fr' ? "Une question relative à vos données ?" : "Questions regarding your personal data?"}
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
