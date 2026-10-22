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
    name: "Assistants IA & Qualification 24/7",
    category: "ai-chatbots",
    icon: Bot,
    iconBg: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600",
    concreteUse: {
      fr: "Réponses immédiates & qualification automatique de vos prospects",
      en: "Instant customer support & automated inbound lead qualification"
    },
    details: {
      fr: "Intégration directe sur votre site web, WhatsApp et réseaux sociaux pour ne plus perdre aucun prospect.",
      en: "Seamlessly deployed on your website, WhatsApp, and social channels, syncing hot leads directly with your CRM."
    },
    tags: ["Disponibilité 24/7", "WhatsApp", "Qualification", "Conversion"]
  },
  {
    name: "Campagnes E-mail & Fidélisation",
    category: "newsletters",
    icon: Mail,
    iconBg: "bg-amber-50 border-amber-200",
    iconColor: "text-amber-600",
    concreteUse: {
      fr: "Délivrabilité maximale, accueil client & séquences de vente",
      en: "High inbox deliverability, onboarding flows & sales drips"
    },
    details: {
      fr: "Designs élégants adaptés à tous les écrans, segmentation intelligente et relances automatiques.",
      en: "Tailored responsive email layouts, behavioral segmentation, and automated re-engagement triggers."
    },
    tags: ["Délivrabilité", "Séquences Vente", "Fidélisation", "Sur-Mesure"]
  },
  {
    name: "Applications Web & Plateformes Sur-Mesure",
    category: "web-mobile",
    icon: Globe,
    iconBg: "bg-indigo-50 border-indigo-200",
    iconColor: "text-indigo-600",
    concreteUse: {
      fr: "Expériences web rapides et plateformes métier performantes",
      en: "High-performance web applications & custom business platforms"
    },
    details: {
      fr: "Interfaces fluides, vitesse d'affichage instantanée et optimisation pour convertir vos visiteurs en clients.",
      en: "Fluid user interfaces, instant load speeds, and architectures engineered to maximize client conversion."
    },
    tags: ["Sur-Mesure", "Haute Vitesse", "SEO Optimal", "Conversion"]
  },
  {
    name: "Expériences Mobiles Dédiées (iOS & Android)",
    category: "web-mobile",
    icon: Smartphone,
    iconBg: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-600",
    concreteUse: {
      fr: "Applications intuitives téléchargeables sur l'App Store & Play Store",
      en: "Refined native mobile apps published on the App Store & Google Play"
    },
    details: {
      fr: "Navigation soignée, notifications ciblées, accès sécurisé et fonctionnement fluide même sans réseau.",
      en: "Refined navigation, timely push notifications, biometric security, and full offline usability."
    },
    tags: ["iOS & Android", "Notifications", "Ergonomie", "Fidélité"]
  },
  {
    name: "Automatisations & Synchronisation Métier",
    category: "automation-cloud",
    icon: Workflow,
    iconBg: "bg-cyan-50 border-cyan-200",
    iconColor: "text-cyan-600",
    concreteUse: {
      fr: "Élimination des tâches manuelles et interconnexion de vos logiciels",
      en: "Manual workload elimination & bi-directional tool sync"
    },
    details: {
      fr: "Liaison fluide entre vos formulaires, votre CRM, vos tableaux de bord, votre facturation et vos alertes.",
      en: "Automated glue connecting your forms, CRM, dashboards, billing, and team alerts with zero friction."
    },
    tags: ["Gain de Temps", "Zéro Erreur", "Synchronisation", "Productivité"]
  },
  {
    name: "Paiements Sécurisés & Facturation en Ligne",
    category: "automation-cloud",
    icon: CreditCard,
    iconBg: "bg-emerald-50 border-emerald-200",
    iconColor: "text-emerald-600",
    concreteUse: {
      fr: "Abonnements récurrents, portails clients & encaissement sans friction",
      en: "Recurring subscriptions, customer portals & frictionless billing"
    },
    details: {
      fr: "Paiements par cartes bancaires et virements, relances d'impayés automatiques et reçus conformes.",
      en: "Worldwide credit cards, recurring direct debits, smart retry recovery, and compliant digital invoices."
    },
    tags: ["Paiement Sécurisé", "Abonnements", "Automatisé", "Sérénité"]
  },
  {
    name: "Traitement Intelligent & Extraction de Données",
    category: "automation-cloud",
    icon: Terminal,
    iconBg: "bg-sky-50 border-sky-200",
    iconColor: "text-sky-600",
    concreteUse: {
      fr: "Veille concurrentielle, enrichissement de données & alertes",
      en: "Competitive intelligence, lead enrichment & automated alerts"
    },
    details: {
      fr: "Collecte structurée d'informations, nettoyage automatique de fichiers et enrichissement de vos contacts.",
      en: "Structured data aggregation, automated spreadsheet enrichment, and intelligent alert bots."
    },
    tags: ["Données Fiables", "Veille Stratégique", "Gain de Temps", "Enrichissement"]
  },
  {
    name: "Espaces Membres & Données Sécurisées",
    category: "automation-cloud",
    icon: Database,
    iconBg: "bg-rose-50 border-rose-200",
    iconColor: "text-rose-600",
    concreteUse: {
      fr: "Espaces privés protégés, synchronisation en direct & confidentialité",
      en: "Private client vaults, real-time sync & enterprise data security"
    },
    details: {
      fr: "Protection rigoureuse des données clients, sauvegardes automatiques et gestion stricte des droits d'accès.",
      en: "Rigorous customer privacy, automated daily backups, and granular role-based access controls."
    },
    tags: ["Haute Sécurité", "Temps Réel", "Confidentialité", "Évolutivité"]
  }
];

export default function TechConstellation({ locale = "fr" }: { locale?: "fr" | "en" }) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", labelFr: "Toutes nos solutions", labelEn: "All Solutions" },
    { id: "web-mobile", labelFr: "Web & Mobile Sur-Mesure", labelEn: "Custom Web & Mobile" },
    { id: "ai-chatbots", labelFr: "Assistants IA & Qualification", labelEn: "AI Assistants & Leads" },
    { id: "newsletters", labelFr: "E-mails & Fidélisation", labelEn: "Email & Retention" },
    { id: "automation-cloud", labelFr: "Processus & Paiements", labelEn: "Automations & Payments" },
  ];

  const filtered = activeCategory === "all"
    ? STACK_ITEMS
    : STACK_ITEMS.filter((item) => item.category === activeCategory);

  // Divide into two groups for two smooth synchronized marquee tracks
  const half = Math.ceil(filtered.length / 2);
  const track1 = filtered.slice(0, half);
  const track2 = filtered.slice(half);

  const infiniteTrack1 = [...track1, ...track1];
  const infiniteTrack2 = [...track2, ...track2];

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
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {tech.name}
                      </h3>
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
                  <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
                    {locale === "fr" ? "En production" : "In production"}
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
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {tech.name}
                      </h3>
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
                  <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
                    {locale === "fr" ? "En production" : "In production"}
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
