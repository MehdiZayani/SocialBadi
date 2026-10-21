"use client";

import React from "react";
import Link from "next/link";
import { Terminal, Github, Linkedin, Mail, Phone, MapPin, ArrowUpRight, ArrowUp } from "lucide-react";

export default function ModernFooter({ locale = "fr" }: { locale?: "fr" | "en" }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-slate-50 border-t border-slate-200/90 pt-20 pb-12 overflow-hidden text-slate-600">
      {/* Background radial accent */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-blue-100/60 blur-[140px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          {/* Col 1 & 2: Brand Identity & Manifesto */}
          <div className="lg:col-span-2 space-y-5">
            <Link href={`/${locale}`} className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5 shadow-md shadow-blue-500/20">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  <Terminal className="w-4 h-4 text-blue-600" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                SocialBadi <span className="text-blue-600">.studio</span>
              </span>
            </Link>

            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
              {locale === "fr"
                ? "Studio d'ingénierie logicielle & création digitale. Nous concevons des applications web haut débit, des applications mobiles natives et des automatisations intelligentes taillées pour scaler."
                : "Software engineering studio & digital product foundry. We architect high-throughput web apps, native mobile platforms, and intelligent automation systems built to scale."}
            </p>

            {/* Live Status indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-mono text-slate-700 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{locale === "fr" ? "Disponibilité immédiate pour nouveaux projets" : "Available for new engineering projects"}</span>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-colors shadow-sm"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/socialbadi"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-colors shadow-sm"
                title="LinkedIn SocialBadi"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:contact@socialbadi.com"
                className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-colors shadow-sm"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Services / Pôles */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 mb-4 font-bold">
              {locale === "fr" ? "Expertises" : "Disciplines"}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
              <li>
                <a href="#services" className="hover:text-blue-600 transition-colors">
                  Web Applications & Next.js 15
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-600 transition-colors">
                  Mobile iOS & Android (React Native)
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-600 transition-colors">
                  Workflows & Automatisations n8n
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-600 transition-colors">
                  Agents IA & Modèles RAG
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-600 transition-colors">
                  Plateformes SaaS & CRM sur-mesure
                </a>
              </li>
              <li>
                <a href="#technologies" className="hover:text-blue-600 transition-colors">
                  UI/UX & Design Systems
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Featured Works */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 mb-4 font-bold">
              {locale === "fr" ? "Réalisations" : "Case Studies"}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
              <li>
                <a
                  href="https://www.badicrm.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors flex items-center gap-1"
                >
                  BadiCRM Platform
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://luccidesign.tn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors flex items-center gap-1"
                >
                  Lucci Design Luxury
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://zitounamenu.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors flex items-center gap-1"
                >
                  Restaurant Zitouna QR WebApp
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://archi-renov.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors flex items-center gap-1"
                >
                  Archi Renov Paris
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <Link
                  href={`/${locale}/projects`}
                  className="text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1 pt-1 font-semibold"
                >
                  {locale === "fr" ? "Tous les projets →" : "View all projects →"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact Direct */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 mb-4 font-bold">
              {locale === "fr" ? "Direct Studio" : "Direct Contact"}
            </h4>
            <div className="space-y-3 text-xs text-slate-600">
              <a
                href="mailto:contact@socialbadi.com"
                className="flex items-center gap-2 hover:text-blue-600 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-blue-600" />
                <span className="font-medium">contact@socialbadi.com</span>
              </a>
              <a
                href="tel:+21693304304"
                className="flex items-center gap-2 hover:text-blue-600 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span className="font-medium">+216 93 304 304</span>
              </a>
              <div className="flex items-center gap-2 text-slate-500">
                <MapPin className="w-3.5 h-3.5" />
                <span>Paris, France & Sousse, TN</span>
              </div>
              <div className="pt-2 text-[11px] font-mono text-slate-500 font-medium">
                ⚡ {locale === "fr" ? "Réponse garantie sous 2h ouvrées" : "Response SLA: <2 hours"}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>
            © {new Date().getFullYear()} SocialBadi Studio. {locale === "fr" ? "Tous droits réservés." : "All rights reserved."}
          </div>

          <div className="flex items-center space-x-6">
            <Link href={`/${locale}/legal`} className="hover:text-slate-900 transition-colors">
              {locale === "fr" ? "Mentions Légales" : "Legal"}
            </Link>
            <Link href={`/${locale}/privacy`} className="hover:text-slate-900 transition-colors">
              {locale === "fr" ? "Confidentialité" : "Privacy"}
            </Link>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-slate-900 transition-colors p-1"
              title="Retour en haut"
            >
              <span>{locale === "fr" ? "Haut" : "Top"}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
