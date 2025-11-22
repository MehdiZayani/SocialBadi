"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Bot, ArrowRight } from 'lucide-react';

interface NavbarProps {
  locale?: 'fr' | 'en';
  setLocale?: (locale: 'fr' | 'en') => void;
  translations?: {
    nav: {
      home: string;
      features: string;
      solutions: string;
      pricing: string;
      contact: string;
      cta?: string;
    };
  };
  showCTA?: boolean;
}

const defaultTranslations = {
  fr: {
    nav: {
      home: "Accueil",
      features: "Fonctionnalités",
      solutions: "Solutions",
      pricing: "Tarifs",
      contact: "Contact",
      cta: "Commencer"
    }
  },
  en: {
    nav: {
      home: "Home",
      features: "Features",
      solutions: "Solutions",
      pricing: "Pricing",
      contact: "Contact",
      cta: "Get Started"
    }
  }
};

export default function Navbar({ locale = 'fr', setLocale, translations, showCTA = true }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const currentTranslations = translations || defaultTranslations[locale];

  const navItems = [
    { label: currentTranslations.nav.home, href: `/${locale}` },
    { label: currentTranslations.nav.features, href: `/${locale}#features` },
    { label: currentTranslations.nav.solutions, href: `/${locale}#solutions` },
    { label: currentTranslations.nav.pricing, href: `/${locale}/pricing` },
    { label: currentTranslations.nav.contact, href: `/${locale}/contact` }
  ];

  const handleLocaleChange = (newLocale: 'fr' | 'en') => {
    if (setLocale) {
      setLocale(newLocale);
    } else {
      // Fallback: reload with new locale
      if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname;
        const pathWithoutLocale = currentPath.replace(/^\/(fr|en)/, '');
        window.location.href = `/${newLocale}${pathWithoutLocale || '/'}`;
      }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    } ${lastScrollY > 50 ? 'bg-black/95 backdrop-blur-md border-b border-white/10 shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href={`/${locale}`} className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                SocialBadi
              </h1>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-full border border-white/10">
              <Globe className="w-4 h-4 text-gray-400" />
              <button
                onClick={() => handleLocaleChange('fr')}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  locale === 'fr' ? 'text-blue-400' : 'text-gray-400 hover:text-white'
                }`}
              >
                FR
              </button>
              <div className="w-px h-4 bg-white/10"></div>
              <button
                onClick={() => handleLocaleChange('en')}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  locale === 'en' ? 'text-blue-400' : 'text-gray-400 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            {/* CTA Button */}
            {showCTA && currentTranslations.nav.cta && (
              <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 font-semibold text-sm flex items-center gap-2">
                {currentTranslations.nav.cta}
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/10">
            <div className="flex flex-col space-y-2">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              
              {/* Mobile Language Selector */}
              <div className="flex gap-2 px-4 pt-2">
                <button
                  onClick={() => handleLocaleChange('fr')}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    locale === 'fr' ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-400'
                  }`}
                >
                  Français
                </button>
                <button
                  onClick={() => handleLocaleChange('en')}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    locale === 'en' ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-400'
                  }`}
                >
                  English
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}