"use client";

import React, { useState } from "react";
import { 
  Globe, 
  Smartphone, 
  Bot, 
  Mail, 
  Workflow, 
  Database, 
  CreditCard, 
  Terminal, 
  Layers,
  Sparkles,
  Zap,
  Shield,
  MessageSquare,
  CheckCircle2
} from "lucide-react";
import SpotlightCard from "./react-bits/SpotlightCard";

interface TechItem {
  name: string;
  category: "all" | "web-mobile" | "ai-chatbots" | "newsletters" | "automation-cloud";
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  concreteUse: {
    fr: string;
    en: string;
  };
  details: {
    fr: string;
    en: string;
  };
  tags: string[];
}

const STACK_ITEMS: TechItem[] = [
  // Chatbots & IA
  {
    name: "Chatbots IA & Agents 24/7",
    category: "ai-chatbots",
    icon: Bot,
    iconBg: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600",
    concreteUse: {
      fr: "Support client & qualification automatique de leads",
      en: "Automated customer support & inbound lead qualification"
    },
    details: {
      fr: "Intégration sur votre site, WhatsApp & Instagram avec connexion directe à votre CRM.",
      en: "Live web widget, WhatsApp & Instagram channels synced in real-time with your CRM."
    },
    tags: ["OpenAI", "Claude", "WhatsApp API", "RAG"]
  },
  {
    name: "Newsletters & E-mail Automations",
    category: "newsletters",
    icon: Mail,
    iconBg: "bg-amber-50 border-amber-200",
    iconColor: "text-amber-600",
    concreteUse: {
      fr: "Délivrabilité maximale, onboarding & séquences de vente",
      en: "High inbox deliverability, onboarding flows & sales drips"
    },
    details: {
      fr: "Templates réactifs sur-mesure, Resend / Brevo, segmentation fine et relances automatiques.",
      en: "Custom responsive email designs, Resend / Brevo setups and behavioral triggers."
    },
    tags: ["Resend", "Brevo", "Loops", "DKIM/SPF"]
  },
  {
    name: "Next.js 15 & React 19",
    category: "web-mobile",
    icon: Globe,
    iconBg: "bg-indigo-50 border-indigo-200",
    iconColor: "text-indigo-600",
    concreteUse: {
      fr: "Applications web & plateformes SaaS haute performance",
      en: "High-performance web applications & SaaS dashboards"
    },
    details: {
      fr: "Architecture moderne App Router, SEO technique irréprochable et chargement instantané.",
      en: "App Router architecture, bulletproof technical SEO and instant edge loading."
    },
    tags: ["Next.js", "TypeScript", "Tailwind", "Vercel"]
  },
  {
    name: "Applications Mobiles (iOS & Android)",
    category: "web-mobile",
    icon: Smartphone,
    iconBg: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-600",
    concreteUse: {
      fr: "Apps natives téléchargeables sur l'App Store & Play Store",
      en: "Production native apps published on App Store & Google Play"
    },
    details: {
      fr: "React Native & Flutter : fluidité 120Hz, notifications push, biométrie et mode hors-ligne.",
      en: "React Native & Flutter: 120Hz gestures, targeted push, biometrics and offline sync."
    },
    tags: ["React Native", "Expo", "Flutter", "Push APNs"]
  },
  {
    name: "Automatisations n8n & Make",
    category: "automation-cloud",
    icon: Workflow,
    iconBg: "bg-cyan-50 border-cyan-200",
    iconColor: "text-cyan-600",
    concreteUse: {
      fr: "Élimination des tâches manuelles et synchronisation d'outils",
      en: "Manual workload elimination & bi-directional tool sync"
    },
    details: {
      fr: "Liaison entre vos formulaires, CRM, Google Sheets, Slack, facturation et alertes SMS.",
      en: "Seamless glue between web forms, CRM, Google Sheets, Slack, billing and SMS alerts."
    },
    tags: ["n8n", "Make", "Webhooks", "Zapier"]
  },
  {
    name: "Paiements Stripe & Facturation",
    category: "automation-cloud",
    icon: CreditCard,
    iconBg: "bg-emerald-50 border-emerald-200",
    iconColor: "text-emerald-600",
    concreteUse: {
      fr: "Abonnements récurrents, portails clients & facturation",
      en: "Recurring subscriptions, customer portals & invoicing"
    },
    details: {
      fr: "Gestion des cartes bancaires, prélèvements SEPA, relances d'impayés et portail client sécurisé.",
      en: "Credit card & SEPA handling, failed payment recovery and secure billing portals."
    },
    tags: ["Stripe Checkout", "Billing", "Webhooks", "SCA"]
  },
  {
    name: "Scripts Python & Scraping de Données",
    category: "automation-cloud",
    icon: Terminal,
    iconBg: "bg-sky-50 border-sky-200",
    iconColor: "text-sky-600",
    concreteUse: {
      fr: "Extraction de données ciblées, enrichissement & bots",
      en: "Targeted data scraping, lead enrichment & background bots"
    },
    details: {
      fr: "Robots d'extraction légaux, nettoyage de bases de données et traitement automatique de fichiers.",
      en: "Automated web scrapers, data cleaning pipelines and bulk file transformations."
    },
    tags: ["Python", "FastAPI", "Pandas", "Scrapy"]
  },
  {
    name: "Bases de Données PostgreSQL & Supabase",
    category: "automation-cloud",
    icon: Database,
    iconBg: "bg-rose-50 border-rose-200",
    iconColor: "text-rose-600",
    concreteUse: {
      fr: "Stockage sécurisé, temps réel & sécurité des données",
      en: "Secure ACID storage, real-time sync & enterprise security"
    },
    details: {
      fr: "Bases relationnelles rapides avec sauvegardes automatiques et gestion stricte des droits (RLS).",
      en: "Fast relational schemas with automated backups and strict Row Level Security (RLS)."
    },
    tags: ["PostgreSQL", "Supabase", "Prisma", "Redis"]
  }
];

export default function TechConstellation({ locale = "fr" }: { locale?: "fr" | "en" }) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", labelFr: "Tout ce qu'on développe", labelEn: "All Services & Stack" },
    { id: "ai-chatbots", labelFr: "Chatbots IA & WhatsApp", labelEn: "AI Chatbots & WhatsApp" },
    { id: "newsletters", labelFr: "Newsletters & E-mails", labelEn: "Newsletters & Email" },
    { id: "web-mobile", labelFr: "Web & Mobile Apps", labelEn: "Web & Mobile" },
    { id: "automation-cloud", labelFr: "Automatisations & Stripe", labelEn: "Automations & Stripe" },
  ];

  const filtered = activeCategory === "all"
    ? STACK_ITEMS
    : STACK_ITEMS.filter((item) => item.category === activeCategory);

  // Divide into two groups for two smooth synchronized marquee tracks
  const half = Math.ceil(filtered.length / 2);
  const track1 = filtered.slice(0, half);
  const track2 = filtered.slice(half);

  const infiniteTrack1 = [...track1, ...track1, ...track1, ...track1];
  const infiniteTrack2 = [...track2, ...track2, ...track2, ...track2];

  return (
    <div className="w-full relative overflow-hidden py-4">
      {/* Category Filter Pills - Clean & Professional */}
      <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-slate-900 text-white shadow-md shadow-slate-900/10"
                  : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 shadow-sm"
              }`}
            >
              {locale === "fr" ? cat.labelFr : cat.labelEn}
            </button>
          );
        })}
      </div>

      {/* Edge gradient masks for continuous soft fade */}
      <div className="pointer-events-none absolute left-0 top-16 bottom-0 w-20 sm:w-40 z-20 bg-gradient-to-r from-[#fcfcfd] via-[#fcfcfd]/90 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-16 bottom-0 w-20 sm:w-40 z-20 bg-gradient-to-l from-[#fcfcfd] via-[#fcfcfd]/90 to-transparent" />

      {/* SLIDESHOW TRACK 1: Left to Right */}
      <div className="flex w-max space-x-5 animate-marquee mb-5">
        {infiniteTrack1.map((tech, idx) => {
          const Icon = tech.icon;
          return (
            <div key={`t1-${idx}`} className="w-[320px] sm:w-[380px] shrink-0">
              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)] hover:shadow-[0_12px_32px_-6px_rgba(15,23,42,0.1)] hover:border-slate-300 transition-all duration-200 h-full flex flex-col justify-between group">
                <div>
                  {/* Header: Clean Vector Icon + Concrete Usage */}
                  <div className="flex items-start gap-3.5 mb-3">
                    <div className={`w-11 h-11 rounded-xl ${tech.iconBg} border flex items-center justify-center shrink-0 shadow-sm`}>
                      <Icon className={`w-5 h-5 ${tech.iconColor}`} />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {tech.name}
                      </h4>
                      <p className="text-xs font-semibold text-blue-600 mt-0.5">
                        {tech.concreteUse[locale]}
                      </p>
                    </div>
                  </div>

                  {/* Practical Details */}
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {tech.details[locale]}
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {tech.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-50 text-slate-600 border border-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    En prod
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* SLIDESHOW TRACK 2: Right to Left (Reverse) */}
      <div className="flex w-max space-x-5 animate-marquee-reverse">
        {infiniteTrack2.map((tech, idx) => {
          const Icon = tech.icon;
          return (
            <div key={`t2-${idx}`} className="w-[320px] sm:w-[380px] shrink-0">
              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)] hover:shadow-[0_12px_32px_-6px_rgba(15,23,42,0.1)] hover:border-slate-300 transition-all duration-200 h-full flex flex-col justify-between group">
                <div>
                  <div className="flex items-start gap-3.5 mb-3">
                    <div className={`w-11 h-11 rounded-xl ${tech.iconBg} border flex items-center justify-center shrink-0 shadow-sm`}>
                      <Icon className={`w-5 h-5 ${tech.iconColor}`} />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {tech.name}
                      </h4>
                      <p className="text-xs font-semibold text-blue-600 mt-0.5">
                        {tech.concreteUse[locale]}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {tech.details[locale]}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {tech.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-50 text-slate-600 border border-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                    En prod
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-6 text-xs text-slate-500 font-medium">
        ⚡ {locale === "fr" ? "Survolez pour mettre en pause · Tout est développé sur-mesure et testé en conditions réelles" : "Hover to pause · All systems are custom-engineered and battle-tested"}
      </div>
    </div>
  );
}
