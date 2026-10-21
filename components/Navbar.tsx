"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Terminal, Menu, X, ArrowRight } from "lucide-react";
import MagneticButton from "./react-bits/MagneticButton";

interface NavbarProps {
  locale?: "fr" | "en";
  setLocale?: (locale: "fr" | "en") => void;
  translations?: any;
  showCTA?: boolean;
}

export default function Navbar({ locale = "fr", setLocale, translations, showCTA = true }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: locale === "fr" ? "Expertise" : "Services", href: `/${locale}#services` },
    { label: locale === "fr" ? "Clients" : "Clients", href: `/${locale}#clients` },
    { label: locale === "fr" ? "Technologies" : "Tech Stack", href: `/${locale}#technologies` },
    { label: locale === "fr" ? "Équipe" : "Team", href: `/${locale}#team` },
    { label: locale === "fr" ? "Projets" : "Projects", href: `/${locale}/projects` },
    { label: locale === "fr" ? "Contact" : "Contact", href: `/${locale}#contact` },
  ];

  const handleToggleLang = (target: "fr" | "en") => {
    if (setLocale) {
      setLocale(target);
    } else if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      const cleanPath = currentPath.replace(/^\/(fr|en)/, "");
      window.location.href = `/${target}${cleanPath || ""}`;
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.includes("#")) {
      return; // Normal route navigation like /projects
    }

    if (typeof window !== "undefined") {
      const [targetPath, hash] = href.split("#");
      const currentPath = window.location.pathname;
      const isHome = currentPath === targetPath || (currentPath === `/${locale}` && targetPath === `/${locale}`) || currentPath === `/${locale}/`;

      if (isHome && hash) {
        e.preventDefault();
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        e.preventDefault();
        window.location.href = href;
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "py-3 bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)]"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2.5 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5 group-hover:scale-105 transition-transform shadow-md shadow-blue-500/20">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-blue-600" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                    SocialBadi
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-blue-50 text-blue-600 border border-blue-200 font-semibold">
                    STUDIO
                  </span>
                </div>
                <p className="text-[10px] font-mono text-slate-500 tracking-wider uppercase">
                  Software Engineering
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 px-4 py-1.5 rounded-full bg-white/90 border border-slate-200/90 shadow-sm backdrop-blur-md">
              {navLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-950 hover:bg-slate-100 rounded-full transition-all cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right Controls */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Language Switcher */}
              <div className="flex items-center p-1 rounded-full bg-white border border-slate-200 text-xs font-mono shadow-sm">
                <button
                  onClick={() => handleToggleLang("fr")}
                  className={`px-2.5 py-1 rounded-full transition-all font-semibold ${
                    locale === "fr"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  FR
                </button>
                <button
                  onClick={() => handleToggleLang("en")}
                  className={`px-2.5 py-1 rounded-full transition-all font-semibold ${
                    locale === "en"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Status beacon pill */}
              <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-mono text-emerald-700 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                <span>Q2-Q3 Sprints Open</span>
              </div>

              {/* Magnetic CTA */}
              <MagneticButton
                onClick={() => {
                  const contact = document.getElementById("contact");
                  const currentPath = typeof window !== "undefined" ? window.location.pathname : "";
                  const isHome = currentPath === `/${locale}` || currentPath === `/${locale}/`;
                  if (contact && isHome) {
                    contact.scrollIntoView({ behavior: "smooth" });
                  } else {
                    window.location.href = `/${locale}#contact`;
                  }
                }}
                className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  {locale === "fr" ? "Lancer un Projet" : "Start Project"}
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </MagneticButton>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="lg:hidden flex items-center space-x-2">
              <button
                onClick={() => handleToggleLang(locale === "fr" ? "en" : "fr")}
                className="px-2.5 py-1 text-xs font-mono font-semibold rounded-lg bg-white border border-slate-200 text-slate-700 shadow-sm"
              >
                {locale === "fr" ? "EN" : "FR"}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-white/95 backdrop-blur-2xl pt-24 px-6 flex flex-col justify-between pb-10 animate-fadeIn">
          <div className="space-y-4">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold">
              Navigation
            </div>
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleNavClick(e, link.href);
                }}
                className="block text-xl font-bold text-slate-800 hover:text-blue-600 transition-colors py-2 border-b border-slate-100 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-mono text-slate-500 font-semibold">
                {locale === "fr" ? "Langue" : "Language"}
              </span>
              <div className="flex gap-2 font-mono text-xs">
                <button
                  onClick={() => handleToggleLang("fr")}
                  className={`px-3 py-1 rounded font-semibold ${
                    locale === "fr" ? "bg-blue-600 text-white" : "text-slate-600"
                  }`}
                >
                  Français
                </button>
                <button
                  onClick={() => handleToggleLang("en")}
                  className={`px-3 py-1 rounded font-semibold ${
                    locale === "en" ? "bg-blue-600 text-white" : "text-slate-600"
                  }`}
                >
                  English
                </button>
              </div>
            </div>

            <a
              href={`/${locale}#contact`}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-xl shadow-blue-600/20"
            >
              <span>{locale === "fr" ? "Lancer un Projet" : "Start Project"}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}