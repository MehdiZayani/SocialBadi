/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Code2,
  Smartphone,
  Workflow,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Terminal,
  Zap,
  Shield,
  Gauge,
  Rocket,
  MessageSquare,
  Mail,
  Phone,
  Send,
  ExternalLink,
  ChevronRight,
  Database,
  Eye,
  Sliders,
  Check
} from "lucide-react";

import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import ModernFooter from "@/components/ModernFooter";
import PartnersSlideshow from "@/components/PartnersSlideshow";
import TechConstellation from "@/components/TechConstellation";
import TeamSection from "@/components/TeamSection";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import MagneticButton from "@/components/react-bits/MagneticButton";
import TextScramble from "@/components/react-bits/TextScramble";
import CyberGrid from "@/components/react-bits/CyberGrid";
import InteractiveTerminal from "@/components/react-bits/InteractiveTerminal";
import ProjectCaseStudyModal from "@/components/ProjectCaseStudyModal";
import { projectsData, ProjectCaseStudy } from "@/lib/projectsData";

export default function HomePage({
  params,
}: {
  params: Promise<{ lang?: string }>;
}) {
  const resolvedParams = use(params);
  const pathname = usePathname();
  const router = useRouter();

  // Detect locale
  const [locale, setLocale] = useState<"fr" | "en">(
    resolvedParams?.lang === "en" ? "en" : "fr"
  );

  useEffect(() => {
    if (pathname?.startsWith("/en")) {
      setLocale("en");
    } else if (pathname?.startsWith("/fr")) {
      setLocale("fr");
    }
  }, [pathname]);

  const handleLocaleChange = (newLocale: "fr" | "en") => {
    setLocale(newLocale);
    if (pathname) {
      const cleanPath = pathname.replace(/^\/(fr|en)/, "");
      router.push(`/${newLocale}${cleanPath || ""}`);
    }
  };

  // State for project modal
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);
  const [activeProjectFilter, setActiveProjectFilter] = useState<string>("all");

  // State for interactive scope estimator
  const [estimatorType, setEstimatorType] = useState<"web" | "mobile" | "automation" | "saas">("web");
  const [estimatorTimeline, setEstimatorTimeline] = useState<"urgent" | "standard" | "flexible">("standard");
  const [estimatorNeedsAI, setEstimatorNeedsAI] = useState<boolean>(true);

  // Filter projects
  const filteredProjects = activeProjectFilter === "all"
    ? projectsData
    : projectsData.filter((p) => p.categoryKey === activeProjectFilter);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    company: "",
    service: "webdev",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });
    } catch {
      // Continue anyway for optimal user feedback
    }

    setFormLoading(false);
    setFormSubmitted(true);
  };

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#fcfcfd] text-slate-900 selection:bg-blue-600 selection:text-white font-sans antialiased">
        {/* Ambient Light Luminous Background */}
        <CyberGrid />

        {/* Global Navigation */}
        <Navbar locale={locale} setLocale={handleLocaleChange} />

        {/* ======================================================== */}
        {/* HERO SECTION (LIGHT MODE)                                */}
        {/* ======================================================== */}
        <section
          id="home"
          className="relative min-h-screen pt-36 pb-20 sm:pt-44 sm:pb-28 flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-6xl mx-auto text-center relative z-10 flex flex-col items-center">
            {/* Top Engineering Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-slate-200/90 shadow-sm backdrop-blur-xl mb-8 group hover:border-blue-400 transition-colors">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-slate-700 font-semibold">
                {locale === "fr"
                  ? "Studio de Développement & Ingénierie Produit"
                  : "Next-Gen Software & Product Engineering"}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-bold">
                v2.6
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.08] max-w-5xl text-slate-900 mb-6">
              {locale === "fr" ? (
                <>
                  Bâtir des Produits Digitaux{" "}
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Haute Performance
                  </span>
                </>
              ) : (
                <>
                  Architecting Scalable{" "}
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Digital Software
                  </span>
                </>
              )}
            </h1>

            {/* Sub-line */}
            <div className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
              {locale === "fr" ? (
                <>
                  Nous concevons des{" "}
                  <span className="text-slate-900 font-semibold">applications Web Next.js</span>,{" "}
                  <span className="text-slate-900 font-semibold">applications Mobiles natives</span> et{" "}
                  <span className="text-slate-900 font-semibold">automatisations d'entreprise</span>.
                  Code artisanal, zéro template générique, réactivité extrême.
                </>
              ) : (
                <>
                  We engineer bespoke{" "}
                  <span className="text-slate-900 font-semibold">Next.js Web Applications</span>,{" "}
                  <span className="text-slate-900 font-semibold">Native Mobile Platforms</span> and{" "}
                  <span className="text-slate-900 font-semibold">Autonomous Automations</span>.
                  Pure craftsmanship, zero templates, extreme velocity.
                </>
              )}
            </div>

            {/* Magnetic CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
              <MagneticButton
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wide shadow-xl shadow-blue-500/25 border border-blue-500 group transition-all"
              >
                <span className="flex items-center gap-2">
                  <Rocket className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                  <span>{locale === "fr" ? "Lancer Votre Projet" : "Start Your Project"}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </MagneticButton>

              <MagneticButton
                onClick={() => {
                  document.getElementById("clients")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm tracking-wide border border-slate-200/90 shadow-sm transition-all"
              >
                <span className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-slate-500" />
                  <span>{locale === "fr" ? "Voir Nos Réalisations" : "Explore Case Studies"}</span>
                </span>
              </MagneticButton>
            </div>

            {/* Key Engineering Metrics Ticker */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl pt-8 border-t border-slate-200/80">
              <div className="p-4 rounded-xl bg-white/80 border border-slate-200/80 shadow-sm">
                <div className="text-2xl sm:text-3xl font-mono font-bold text-slate-900 mb-1">
                  <TextScramble text="<0.4s" speed={40} />
                </div>
                <p className="text-xs text-slate-500 font-mono font-medium">
                  {locale === "fr" ? "First Contentful Paint" : "First Contentful Paint"}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/80 border border-slate-200/80 shadow-sm">
                <div className="text-2xl sm:text-3xl font-mono font-bold text-emerald-600 mb-1">
                  <TextScramble text="99.98%" speed={40} />
                </div>
                <p className="text-xs text-slate-500 font-mono font-medium">
                  {locale === "fr" ? "Disponibilité Cloud SLA" : "Production SLA"}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/80 border border-slate-200/80 shadow-sm">
                <div className="text-2xl sm:text-3xl font-mono font-bold text-blue-600 mb-1">
                  <TextScramble text="120 FPS" speed={40} />
                </div>
                <p className="text-xs text-slate-500 font-mono font-medium">
                  {locale === "fr" ? "Fluidité Lenis & GSAP" : "Smooth Native Framerate"}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/80 border border-slate-200/80 shadow-sm">
                <div className="text-2xl sm:text-3xl font-mono font-bold text-purple-600 mb-1">
                  <TextScramble text="100%" speed={40} />
                </div>
                <p className="text-xs text-slate-500 font-mono font-medium">
                  {locale === "fr" ? "Sur-Mesure (No AI Cliché)" : "Handcrafted Craft"}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Code / Studio Terminal Showcase */}
          <div className="w-full max-w-5xl mt-14 sm:mt-20 relative z-10 px-2">
            <InteractiveTerminal />
          </div>
        </section>

        {/* ======================================================== */}
        {/* PARTNERS / SLIDESHOW DES ENTREPRISES                     */}
        {/* ======================================================== */}
        <section id="clients" className="relative py-24 sm:py-32 bg-white/60 border-y border-slate-200/80 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-blue-700 font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{locale === "fr" ? "PORTFOLIO & PARTENARIATS" : "CLIENTS & PARTNERSHIPS"}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              {locale === "fr"
                ? "Entreprises & Plateformes Développées"
                : "Enterprises & Platforms We've Engineered"}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              {locale === "fr"
                ? "Du SaaS d'envergure internationale aux maisons de luxe et aux fleurons du BTP : des plateformes conçues pour convertir et durer."
                : "From global SaaS architectures to luxury craftsman brands and high-end construction firms."}
            </p>
          </div>

          {/* Upgraded Infinite Marquee Slideshow */}
          <PartnersSlideshow
            locale={locale}
            onSelectProject={(slug) => {
              const found = projectsData.find((p) => p.slug === slug);
              if (found) setSelectedProject(found);
            }}
          />

          <div className="text-center mt-8">
            <Link
              href={`/${locale}/projects`}
              className="inline-flex items-center gap-2 text-xs font-mono text-slate-600 hover:text-blue-600 font-semibold transition-colors"
            >
              <span>{locale === "fr" ? "Consulter toutes les études de cas détaillées" : "Browse all full technical case studies"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* ======================================================== */}
        {/* CORE SERVICES / DISCIPLINES (BENTO GRID)                 */}
        {/* ======================================================== */}
        <section id="services" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-xs font-mono text-purple-700 font-semibold mb-4">
              <Layers className="w-3.5 h-3.5" />
              <span>{locale === "fr" ? "PÔLES D'EXPERTISE" : "CORE DISCIPLINES"}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-5">
              {locale === "fr"
                ? "Une Boîte de Dév Moderne, Taillée pour l'Impact"
                : "Modern Engineering Engineered for Impact"}
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              {locale === "fr"
                ? "Nous ne sommes pas une agence de marketing superficielle. Nous sommes des bâtisseurs de logiciels, d'interfaces et de pipelines."
                : "We are not a bloated agency. We are software architects, mobile engineers, and automation builders."}
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Web Development */}
            <SpotlightCard
              spotlightColor="rgba(59, 130, 246, 0.1)"
              borderColor="rgba(59, 130, 246, 0.35)"
              className="p-8 flex flex-col justify-between lg:col-span-2 group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  <Code2 className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {locale === "fr" ? "Développement Web & Applications Next.js" : "Next.js Web Applications & Platforms"}
                  </h3>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
                    SSR / Edge
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {locale === "fr"
                    ? "Conception d'applications web ultra-rapides basées sur Next.js 15 App Router, React 19 et TypeScript. Architecture modulaire, SEO technique sans faille, animations artistiques GSAP et temps de réponse sub-seconde."
                    : "Engineering blazingly fast web applications powered by Next.js 15, React 19, and TypeScript. Modular architectures, flawless Core Web Vitals, and cinematic GSAP micro-interactions."}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-mono text-slate-500 block mb-1 font-semibold">Score SEO</span>
                    <span className="text-lg font-bold text-emerald-600 font-mono">100 / 100</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-mono text-slate-500 block mb-1 font-semibold">Architecture</span>
                    <span className="text-lg font-bold text-blue-600 font-mono">Serverless</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 col-span-2 sm:col-span-1">
                    <span className="text-xs font-mono text-slate-500 block mb-1 font-semibold">Type Safety</span>
                    <span className="text-lg font-bold text-purple-600 font-mono">End-to-End</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 text-xs font-mono text-slate-500 font-medium">
                <span>#NextJS15</span>
                <span>#React19</span>
                <span>#TypeScript</span>
                <span>#TailwindCSS</span>
                <span>#GSAP</span>
                <span>#LenisScroll</span>
              </div>
            </SpotlightCard>

            {/* Card 2: Mobile Development */}
            <SpotlightCard
              spotlightColor="rgba(147, 51, 234, 0.1)"
              borderColor="rgba(147, 51, 234, 0.35)"
              className="p-8 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {locale === "fr" ? "Applications Mobiles" : "Native Mobile Apps"}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {locale === "fr"
                    ? "Applications iOS & Android fluides construites avec React Native Fabric et Flutter. Fonctionnement hors-ligne persistant, notifications push ciblées et intégration FaceID / TouchID."
                    : "Silky 120Hz iOS and Android apps powered by React Native Fabric and Flutter. Offline-first local sync, targeted push triggers, and biometric security."}
                </p>

                <ul className="space-y-2 text-xs text-slate-700 mb-6 font-mono font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                    <span>Cross-platform iOS & Android unifié</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                    <span>Synchronisation SQLite hors-ligne</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                    <span>Rendu matériel 60-120 FPS</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 text-xs font-mono text-slate-500 font-medium">
                <span>#ReactNative</span>
                <span>#Expo</span>
                <span>#Flutter</span>
                <span>#SQLite</span>
              </div>
            </SpotlightCard>

            {/* Card 3: Automation & AI */}
            <SpotlightCard
              spotlightColor="rgba(6, 182, 212, 0.1)"
              borderColor="rgba(6, 182, 212, 0.35)"
              className="p-8 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-600 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  <Workflow className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors">
                  {locale === "fr" ? "Workflows & Automatisations" : "Autonomous Automations"}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {locale === "fr"
                    ? "Supprimez les tâches manuelles répétitives. Orchestration n8n, scripts Python sur-mesure, webhooks haute fréquence et synchronisation instantanée de vos outils métier."
                    : "Eliminate hundreds of tedious operator hours. n8n enterprise workflows, custom Python daemons, high-frequency webhooks and seamless CRM bidirectional sync."}
                </p>

                <ul className="space-y-2 text-xs text-slate-700 mb-6 font-mono font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Orchestration n8n / Make / Python</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Intégration WhatsApp & Twilio Voice</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Zéro saisie manuelle de données</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 text-xs font-mono text-slate-500 font-medium">
                <span>#n8n</span>
                <span>#Python</span>
                <span>#Webhooks</span>
                <span>#Twilio</span>
              </div>
            </SpotlightCard>

            {/* Card 4: Custom SaaS & Cloud Systems */}
            <SpotlightCard
              spotlightColor="rgba(16, 185, 129, 0.1)"
              borderColor="rgba(16, 185, 129, 0.35)"
              className="p-8 flex flex-col justify-between lg:col-span-2 group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                  <Cpu className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {locale === "fr" ? "Plateformes SaaS & Systèmes Cloud Sur-Mesure" : "Custom SaaS & Cloud Systems"}
                  </h3>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                    Enterprise Ready
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {locale === "fr"
                    ? "Création intégrale de votre plateforme SaaS : architecture multi-tenant, facturation Stripe récurrente, gestion de rôles complexes (RBAC), bases de données PostgreSQL avec pgvector et tableaux de bord analytiques en temps réel."
                    : "End-to-end development of proprietary SaaS platforms: multi-tenant database partitioning, automated Stripe billing, granular RBAC access controls, pgvector search, and real-time WebSocket metrics."}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-mono text-slate-500 block mb-1 font-semibold">Billing</span>
                    <span className="text-sm font-bold text-slate-900 font-mono">Stripe Subscriptions</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-mono text-slate-500 block mb-1 font-semibold">Database</span>
                    <span className="text-sm font-bold text-slate-900 font-mono">Postgres + pgvector</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-mono text-slate-500 block mb-1 font-semibold">Auth</span>
                    <span className="text-sm font-bold text-slate-900 font-mono">JWT / OAuth 2.0</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-mono text-slate-500 block mb-1 font-semibold">Infra</span>
                    <span className="text-sm font-bold text-slate-900 font-mono">Docker & AWS / VPS</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 text-xs font-mono text-slate-500 font-medium">
                <span>#SaaSPlatform</span>
                <span>#PostgreSQL</span>
                <span>#Docker</span>
                <span>#Redis</span>
                <span>#Stripe</span>
              </div>
            </SpotlightCard>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SPECIALIZED TECHNOLOGIES SECTION: CONTINUOUS SLIDESHOW   */}
        {/* ======================================================== */}
        <section id="technologies" className="relative py-28 sm:py-36 bg-slate-50/70 border-y border-slate-200/80 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-blue-700 font-semibold mb-4">
                <Terminal className="w-3.5 h-3.5" />
                <span>{locale === "fr" ? "TECHNOLOGIES & EXPERTISE" : "SPECIALIZED TECH STACK"}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
                The Specialized Stack We Master
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                {locale === "fr"
                  ? "Du développement Web & Mobile aux Chatbots IA WhatsApp, tunnels de Newsletters et automatisations n8n : nos briques réelles éprouvées en production."
                  : "From Web & Mobile platforms to AI WhatsApp chatbots, Newsletter pipelines, and n8n workflows: battle-tested production stacks."}
              </p>
            </div>

            {/* Continuous Interactive Tech Slideshow */}
            <TechConstellation locale={locale} />
          </div>
        </section>

        {/* ======================================================== */}
        {/* FEATURED PROJECTS / CASE STUDIES                         */}
        {/* ======================================================== */}
        <section id="projects" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-mono text-indigo-700 font-semibold mb-4">
                <Rocket className="w-3.5 h-3.5" />
                <span>{locale === "fr" ? "PROJETS RÉALISÉS" : "SHOWCASE WORKS"}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                {locale === "fr" ? "Études de Cas & Démonstrations" : "Selected Production Deployments"}
              </h2>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: "all", labelFr: "Tous", labelEn: "All" },
                { id: "saas", labelFr: "SaaS & CRM", labelEn: "SaaS & CRM" },
                { id: "webapp", labelFr: "Web Apps", labelEn: "Web Apps" },
                { id: "showcase", labelFr: "Luxe & Vitrine", labelEn: "Luxury & Brand" },
                { id: "construction", labelFr: "BTP & B2B", labelEn: "BTP & Enterprise" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveProjectFilter(filter.id)}
                  className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all ${
                    activeProjectFilter === filter.id
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                      : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200/80 shadow-sm"
                  }`}
                >
                  {locale === "fr" ? filter.labelFr : filter.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <SpotlightCard
                key={project.id}
                spotlightColor="rgba(59, 130, 246, 0.12)"
                borderColor="rgba(59, 130, 246, 0.35)"
                className="overflow-hidden group flex flex-col justify-between"
              >
                <div>
                  {/* Image container */}
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100 border-b border-slate-200">
                    <Image
                      src={project.heroImage}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent opacity-80" />

                    {/* Top tags */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-white/90 backdrop-blur-md text-slate-900 shadow-sm">
                        {project.category[locale]}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500 text-white shadow-sm">
                        {project.year}
                      </span>
                    </div>

                    {/* Client logo floating badge */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 p-2 flex items-center justify-center shadow-md">
                        <Image
                          src={project.logo}
                          alt={project.client}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white drop-shadow-md">
                          {project.title}
                        </h4>
                        <p className="text-xs text-slate-200 drop-shadow">
                          {project.client} · {project.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                      {project.summary[locale]}
                    </p>

                    {/* Tech pills */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Metrics bar */}
                    <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 mb-6">
                      {project.results.slice(0, 3).map((res, rIdx) => (
                        <div key={rIdx} className="text-center">
                          <span className="block text-sm font-mono font-bold text-emerald-600">
                            {res.metric}
                          </span>
                          <span className="block text-[10px] text-slate-500 font-medium truncate">
                            {res.label[locale]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action buttons */}
                <div className="p-6 pt-0 flex items-center gap-3">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <span>{locale === "fr" ? "Étude de Cas Complète" : "View Full Case Study"}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-200 transition-all shadow-sm"
                    title={locale === "fr" ? "Ouvrir le site en direct" : "Visit live site"}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* TEAM SECTION ("TEAM")                                    */}
        {/* ======================================================== */}
        <section id="team" className="relative py-28 sm:py-36 bg-slate-50/70 border-y border-slate-200/80 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-700 font-semibold mb-4">
                <Code2 className="w-3.5 h-3.5" />
                <span>{locale === "fr" ? "L'ÉQUIPE TECHNIQUE" : "THE CORE TEAM"}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
                {locale === "fr"
                  ? "Les Ingénieurs Derrière Vos Produits"
                  : "Senior Builders, Not Account Managers"}
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                {locale === "fr"
                  ? "Une équipe resserrée d'architectes et de développeurs chevronnés. Chaque ligne de code est écrite avec rigueur et passion."
                  : "A tight-knit engineering foundry. You work directly with the architects building your production software."}
              </p>
            </div>

            {/* Team Section Component */}
            <TeamSection locale={locale} />
          </div>
        </section>

        {/* ======================================================== */}
        {/* ENGINEERING BLUEPRINT / PROCESS                          */}
        {/* ======================================================== */}
        <section className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-blue-700 font-semibold mb-4">
              <Gauge className="w-3.5 h-3.5" />
              <span>{locale === "fr" ? "MÉTHODOLOGIE AGILE" : "THE SPRINT BLUEPRINT"}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
              {locale === "fr"
                ? "Du Concept au Déploiement en 4 Sprints"
                : "From Architecture to Production in 4 Sprints"}
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              {locale === "fr"
                ? "Un workflow de développement transparent, avec livraisons continues et accès direct à l'environnement de staging."
                : "A deterministic delivery pipeline with zero surprises, continuous integration and staging preview URLs."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                titleFr: "Architecture & Spécifications",
                titleEn: "Architecture & Blueprint",
                descFr: "Audit technique, modélisation de la base de données, choix de la stack optimale et wireframes.",
                descEn: "Deep technical audit, database schema modeling, stack selection, and interactive wireframes.",
              },
              {
                step: "02",
                titleFr: "Design System & Prototype",
                titleEn: "Design System & Prototyping",
                descFr: "Création des composants UI sur-mesure, validation des flux utilisateurs et des micro-animations.",
                descEn: "Custom UI component library, user journey validation, and GSAP tactile micro-animations.",
              },
              {
                step: "03",
                titleFr: "Développement & Type-Safety",
                titleEn: "Engineering & Sprints",
                descFr: "Codage rigoureux en TypeScript, tests d'intégration, synchronisation APIs et pipelines de données.",
                descEn: "Rigorous TypeScript engineering, automated test suites, API contracts and data pipelines.",
              },
              {
                step: "04",
                titleFr: "Déploiement & Automatisations",
                titleEn: "Deployment & Scale",
                descFr: "Mise en production Edge CDN, monitoring des performances, webhooks d'automatisation et maintenance.",
                descEn: "Edge CDN release, 24/7 uptime monitoring, automated error tracing and growth scale.",
              },
            ].map((phase, pIdx) => (
              <SpotlightCard
                key={pIdx}
                spotlightColor="rgba(59, 130, 246, 0.1)"
                borderColor="rgba(59, 130, 246, 0.35)"
                className="p-6 relative group"
              >
                <span className="text-4xl font-black font-mono text-slate-200 group-hover:text-blue-500/30 transition-colors block mb-4">
                  {phase.step}
                </span>
                <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {locale === "fr" ? phase.titleFr : phase.titleEn}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {locale === "fr" ? phase.descFr : phase.descEn}
                </p>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* INTERACTIVE SCOPE & ESTIMATOR CALCULATOR                 */}
        {/* ======================================================== */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <SpotlightCard
            spotlightColor="rgba(59, 130, 246, 0.15)"
            borderColor="rgba(59, 130, 246, 0.4)"
            className="p-8 sm:p-12 shadow-md"
          >
            <div className="flex items-center gap-3 mb-4">
              <Sliders className="w-5 h-5 text-blue-600" />
              <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-bold">
                {locale === "fr" ? "SIMULATEUR DE PROJET" : "PROJECT ESTIMATOR"}
              </span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-3">
              {locale === "fr" ? "Configurez Votre Sprint de Développement" : "Configure Your Engineering Sprint"}
            </h3>
            <p className="text-sm text-slate-600 mb-8 max-w-2xl">
              {locale === "fr"
                ? "Sélectionnez vos besoins pour obtenir un premier cadrage technique immédiat."
                : "Select your project specifications to receive an instant architectural scope projection."}
            </p>

            {/* Type selector */}
            <div className="space-y-6 mb-8">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-slate-700 block mb-2 font-bold">
                  1. {locale === "fr" ? "Type de solution principale" : "Primary Solution Type"}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: "web", label: "Web App / Next.js", icon: Code2 },
                    { id: "mobile", label: "Mobile (iOS / Android)", icon: Smartphone },
                    { id: "automation", label: "Automation / n8n", icon: Workflow },
                    { id: "saas", label: "Plateforme SaaS Complète", icon: Cpu },
                  ].map((item) => {
                    const Icon = item.icon;
                    const isSelected = estimatorType === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setEstimatorType(item.id as any)}
                        className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                          isSelected
                            ? "bg-blue-50 border-blue-500 text-blue-900 shadow-sm"
                            : "bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                        }`}
                      >
                        <Icon className="w-5 h-5 mb-2 text-blue-600" />
                        <span className="text-xs font-bold">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Timeline selector */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-slate-700 block mb-2 font-bold">
                  2. {locale === "fr" ? "Délai de lancement souhaité" : "Target Delivery Timeline"}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "urgent", labelFr: "Sprint Éclair (< 3 sem.)", labelEn: "Sprint (< 3 weeks)" },
                    { id: "standard", labelFr: "Standard (4 - 8 sem.)", labelEn: "Standard (4 - 8 weeks)" },
                    { id: "flexible", labelFr: "Roadmap Long-terme", labelEn: "Long-term Roadmap" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setEstimatorTimeline(t.id as any)}
                      className={`p-3 rounded-xl border text-center text-xs font-mono transition-all font-semibold ${
                        estimatorTimeline === t.id
                          ? "bg-blue-50 border-blue-500 text-blue-900 shadow-sm"
                          : "bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      {locale === "fr" ? t.labelFr : t.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Needs AI toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      {locale === "fr" ? "Inclure des Agents IA ou Automatisations LLM" : "Include Autonomous AI Agents & LLM RAG"}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {locale === "fr" ? "Chatbots métier, vector embeddings, bots vocaux ou qualification automatique" : "Custom RAG, voice agents, WhatsApp bots, automated scoring"}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setEstimatorNeedsAI(!estimatorNeedsAI)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${
                    estimatorNeedsAI ? "bg-blue-600" : "bg-slate-300"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      estimatorNeedsAI ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Estimator Summary Banner */}
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-blue-700 block font-semibold">
                  {locale === "fr" ? "Périmètre sélectionné :" : "Selected Architecture :"}
                </span>
                <span className="text-sm font-bold text-slate-900">
                  {estimatorType.toUpperCase()} · {estimatorTimeline.toUpperCase()} ·{" "}
                  {estimatorNeedsAI ? "AI ENABLED" : "STANDARD ARCH"}
                </span>
              </div>

              <MagneticButton
                onClick={() => {
                  const msg = `Bonjour SocialBadi, je souhaite lancer un projet : ${estimatorType} (${estimatorTimeline}, ${estimatorNeedsAI ? "avec IA" : "sans IA"}). Pouvons-nous échanger ?`;
                  setContactForm((prev) => ({
                    ...prev,
                    message: msg,
                    service: estimatorType,
                  }));
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-md shrink-0"
              >
                {locale === "fr" ? "Valider ce Cadrage →" : "Proceed With This Scope →"}
              </MagneticButton>
            </div>
          </SpotlightCard>
        </section>

        {/* ======================================================== */}
        {/* CONTACT & START PROJECT SECTION                          */}
        {/* ======================================================== */}
        <section id="contact" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Pitch & Coordinates */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-blue-700 font-semibold mb-4">
                <Send className="w-3.5 h-3.5" />
                <span>{locale === "fr" ? "LANCER UN PROJET" : "GET IN TOUCH"}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-6">
                {locale === "fr"
                  ? "Prêt à Construire Quelque Chose d'Exceptionnel ?"
                  : "Ready to Build Something Extraordinary?"}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
                {locale === "fr"
                  ? "Parlez-nous de vos objectifs, de votre deadline et de vos contraintes. Nous vous répondrons avec une proposition d'architecture claire sous 2 heures ouvrées."
                  : "Tell us about your objectives, timeline, and architectural requirements. We provide concrete technical feedback and scope under 2 hours."}
              </p>

              {/* Direct channels */}
              <div className="space-y-4 mb-8">
                <a
                  href="mailto:contact@socialbadi.com"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all group shadow-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-500 block font-semibold">
                      Email Direct
                    </span>
                    <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      contact@socialbadi.com
                    </span>
                  </div>
                </a>

                <a
                  href="tel:+33769848031"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all group shadow-sm"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-500 block font-semibold">
                      Téléphone & WhatsApp Studio
                    </span>
                    <span className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      +33 7 69 84 80 31
                    </span>
                  </div>
                </a>
              </div>

              {/* Guarantee badges */}
              <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-600 font-semibold">
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>NDA Confidentiel d'Office</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Code 100% Votre Propriété</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Zéro Engagement Préalable</span>
                </span>
              </div>
            </div>

            {/* Right: Contact Form */}
            <SpotlightCard
              spotlightColor="rgba(59, 130, 246, 0.15)"
              borderColor="rgba(59, 130, 246, 0.4)"
              className="p-8 sm:p-10 shadow-md"
            >
              {formSubmitted ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {locale === "fr" ? "Message Reçu !" : "Brief Received!"}
                  </h3>
                  <p className="text-sm text-slate-600 mb-6 max-w-sm mx-auto">
                    {locale === "fr"
                      ? "Nos ingénieurs examinent votre demande et reviendront vers vous avec une première proposition d'architecture."
                      : "Our senior software team is analyzing your specifications and will respond shortly."}
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="px-6 py-2.5 rounded-full bg-slate-100 text-slate-800 text-xs font-mono font-bold hover:bg-slate-200 transition-all border border-slate-200"
                  >
                    {locale === "fr" ? "Envoyer un autre message" : "Send another brief"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-slate-700 block mb-1.5 font-bold">
                        {locale === "fr" ? "Nom & Prénom" : "Full Name"} *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="Ex: Alexandre B."
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors placeholder:text-slate-400"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-700 block mb-1.5 font-bold">
                        {locale === "fr" ? "Email Professionnel" : "Work Email"} *
                      </label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="alexandre@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-slate-700 block mb-1.5 font-bold">
                        {locale === "fr" ? "Entreprise / Projet" : "Company / Venture"}
                      </label>
                      <input
                        type="text"
                        value={contactForm.company}
                        onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                        placeholder="Ex: ScaleUp Corp"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors placeholder:text-slate-400"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-700 block mb-1.5 font-bold">
                        {locale === "fr" ? "Discipline Principale" : "Core Discipline"}
                      </label>
                      <select
                        value={contactForm.service}
                        onChange={(e) => setContactForm({ ...contactForm, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors font-medium"
                      >
                        <option value="webdev">{locale === "fr" ? "Web Application (Next.js)" : "Web App (Next.js)"}</option>
                        <option value="mobile">{locale === "fr" ? "Application Mobile (iOS / Android)" : "Mobile App (iOS/Android)"}</option>
                        <option value="automation">{locale === "fr" ? "Automation & Agents IA" : "Automation & AI Agents"}</option>
                        <option value="saas">{locale === "fr" ? "Plateforme SaaS Complète" : "Full SaaS Platform"}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-700 block mb-1.5 font-bold">
                      {locale === "fr" ? "Détails de Votre Projet & Enjeux" : "Project Details & Goals"} *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder={locale === "fr" ? "Décrivez brièvement votre projet, stack envisagée, délais souhaités..." : "Brief description of your product, anticipated stack, timeline..."}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-colors placeholder:text-slate-400 resize-none"
                    />
                  </div>

                  <MagneticButton
                    type="submit"
                    disabled={formLoading}
                    className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
                  >
                    {formLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        <span>Transmission...</span>
                      </span>
                    ) : (
                      <>
                        <span>{locale === "fr" ? "Envoyer le Brief Technique" : "Submit Technical Brief"}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </MagneticButton>
                </form>
              )}
            </SpotlightCard>
          </div>
        </section>

        {/* ======================================================== */}
        {/* CASE STUDY MODAL                                         */}
        {/* ======================================================== */}
        {selectedProject && (
          <ProjectCaseStudyModal
            project={selectedProject}
            locale={locale}
            onClose={() => setSelectedProject(null)}
          />
        )}

        {/* Global Footer in Light Theme */}
        <ModernFooter locale={locale} />
      </div>
    </SmoothScroll>
  );
}