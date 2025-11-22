/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import fr from '@/public/locales/fr/common.json';
import en from '@/public/locales/en/common.json';

import { usePathname, useRouter } from 'next/navigation';

import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight, Users, CheckSquare, Sparkles, Zap, Bot, Phone, MessageSquare, BarChart3, Shield, Star, ArrowRight, Play, Globe } from 'lucide-react';


// Hook i18n
function useI18n() {
  const pathname = usePathname();
  const router = useRouter();
  const [locale, setLocaleState] = useState<'fr' | 'en'>('fr');

  const navigateToContact = () => {
    router.push(`/${locale}/contact`);
  };

  // 1) Déduire la langue depuis l'URL /fr/... ou /en/...
  useEffect(() => {
    if (!pathname) return;

    if (pathname.startsWith('/en')) {
      setLocaleState('en');
    } else if (pathname.startsWith('/fr')) {
      setLocaleState('fr');
    } else {
      // Pas de locale dans l'URL → fallback navigateur
      const browserLang = typeof navigator !== 'undefined'
        ? navigator.language.split('-')[0]
        : 'fr';

      const supportedLang = browserLang === 'en' ? 'en' : 'fr';
      setLocaleState(supportedLang);
    }
  }, [pathname]);

  // 2) Fonction pour changer la locale + URL
  const setLocale = (newLocale: 'fr' | 'en') => {
    if (!pathname) return;

    // On enlève la locale existante dans l'URL
    const pathWithoutLocale = pathname.replace(/^\/(fr|en)/, '') || '';

    // On push la nouvelle URL avec la locale
    router.push(`/${newLocale}${pathWithoutLocale || '/'}`);

    // On met aussi à jour le state local
    setLocaleState(newLocale);
  };

  const translations: Record<'fr' | 'en', any> = {
    fr,
    en,
  };

  return { t: translations[locale], locale, setLocale, navigateToContact };
}



// Navbar Component
function Navbar({ t, locale, setLocale }: { t: any; locale: any; setLocale: any }) {
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

  const navItems = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.features, href: '#features' },
    { label: t.nav.solutions, href: '#solutions' },
    { label: t.nav.contact, href: '/contact' }
  ];
  const handleLocaleChange = (newLocale: any) => {
    setLocale(newLocale);

    // Redirection simple côté client
    if (typeof window !== 'undefined') {
      if (newLocale === 'en') {
        window.location.href = '/en';
      } else {
        window.location.href = '/fr';
      }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    } ${lastScrollY > 50 ? 'bg-black/95 backdrop-blur-md border-b border-white/10 shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="#home" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                SocialBadi
              </h1>
            </a>
          </div>

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

          <div className="hidden lg:flex items-center space-x-4">
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
            
            <a href={`/${locale}/contact`} className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 font-semibold text-sm flex items-center gap-2">
              {t.nav.cta}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

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

// Hero Section
function HeroSection({ t, locale }: { t: any; locale: string }) {
  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 bg-black overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAgMjBjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTIwLTIwYzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-8 animate-fadeIn">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300 font-medium">{t.hero.badge}</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight animate-fadeIn">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {t.hero.title1}
            </span>
            <br />
            <span className="text-white">{t.hero.title2}</span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto animate-fadeIn" style={{animationDelay: '0.2s'}}>
            {t.hero.subtitle} <span className="text-blue-400 font-semibold">{t.hero.action1}</span>, <span className="text-purple-400 font-semibold">{t.hero.action2}</span> et <span className="text-pink-400 font-semibold">{t.hero.action3}</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fadeIn" style={{animationDelay: '0.4s'}}>
            <a href={`/${locale}/contact`} className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 font-semibold flex items-center justify-center gap-2 text-lg">
              {t.hero.ctaPrimary}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <button className="group px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-full hover:bg-white/10 transition-all duration-300 font-semibold flex items-center justify-center gap-2 text-lg">
              <Play className="w-5 h-5" />
              {t.hero.ctaSecondary}
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16 animate-fadeIn" style={{animationDelay: '0.6s'}}>
            {[
              { number: '10K+', label: t.hero.stats.clients },
              { number: '99.9%', label: t.hero.stats.uptime },
              { number: '2M+', label: t.hero.stats.conversations },
              { number: '4.9/5', label: t.hero.stats.satisfaction }
            ].map((stat, index) => (
              <div key={index} className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-4 animate-fadeIn" style={{animationDelay: '0.8s'}}>
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-2 border-black flex items-center justify-center text-white font-bold text-sm">
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-400">
              {t.hero.socialProof} <span className="text-white font-semibold">10 000+ {t.hero.companies}</span> {t.hero.trust}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Intro Section
function IntroSection({ t }: { t: any }) {
  return (
    <div className="relative w-full flex justify-center py-20 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-block mb-8">
          <div className="w-32 h-32 md:w-48 md:h-48 relative mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
            <Bot className="w-full h-full text-blue-400 relative z-10" />
          </div>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
          {t.intro.title}
        </h2>
      </div>
    </div>
  );
}

// Features Section
function FeaturesSection({ t }: { t: any }) {
  const icons = [Phone, MessageSquare, BarChart3, CheckSquare, Shield, Zap];
  const colors = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-orange-500 to-red-500",
    "from-green-500 to-emerald-500",
    "from-indigo-500 to-blue-500",
    "from-yellow-500 to-orange-500"
  ];

  return (
    <section id="features" className="relative py-32 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
            <Star className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300 font-medium">{t.features.badge}</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {t.features.title}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t.features.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.features.items.map((feature: any, index: number) => {
            const Icon = icons[index];
            return (
              <div
                key={index}
                className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${colors[index]} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Solutions Section
function SolutionsSection({ t }: { t: any }) {
  const [selectedSolution, setSelectedSolution] = useState(0);
  const icons = [Users, BarChart3, CheckSquare, Zap];
  const colors = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-green-500 to-emerald-500",
    "from-orange-500 to-red-500"
  ];

  return (
    <section id="solutions" className="relative py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {t.solutions.title}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t.solutions.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {t.solutions.items.map((solution: any, index: number) => {
            const Icon = icons[index];
            return (
              <div
                key={index}
                onMouseEnter={() => setSelectedSolution(index)}
                className={`group p-8 border-2 rounded-3xl transition-all duration-500 cursor-pointer ${
                  selectedSolution === index
                    ? 'bg-white/10 border-white/30 scale-105 shadow-2xl shadow-blue-500/30'
                    : 'bg-white/5 border-white/10 hover:bg-white/8'
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${colors[index]} flex items-center justify-center mb-6 transform transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-4">{solution.title}</h3>
                <p className="text-gray-400 text-lg mb-6">{solution.description}</p>
                
                <ul className="space-y-3 mb-6">
                  {solution.features.map((feature: any, idx: number) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-300">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${colors[index]}`}></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button className="flex items-center gap-2 text-blue-400 font-semibold group-hover:gap-4 transition-all">
                  {t.solutions.learnMore}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Pricing Section
function PricingSection({ t, locale }: { t: any; locale: string }) {
  const colors = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-orange-500 to-red-500"
  ];

  return (
    <section id="pricing" className="relative py-32 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {t.pricing.title}
          </h2>
          <p className="text-xl text-gray-400">{t.pricing.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.pricing.plans.map((plan: any, index: number) => (
            <div
              key={index}
              className={`relative p-8 rounded-3xl border-2 transition-all duration-300 hover:scale-105 ${
                index === 1
                  ? 'bg-white/10 border-purple-500 shadow-2xl shadow-purple-500/30'
                  : 'bg-white/5 border-white/10'
              }`}
            >
              {index === 1 && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-sm font-semibold text-white">
                  {t.pricing.popular}
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-gray-400 mb-6">{plan.description}</p>
              
              <div className="mb-6">
                <span className="text-5xl font-bold text-white">{plan.price}</span>
                {plan.price !== "Sur mesure" && plan.price !== "Custom" && <span className="text-gray-400 ml-2">{t.pricing.perMonth}</span>}
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature: any, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-300">
                    <CheckSquare className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <a href={`/${locale}/contact`} className={`w-full py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center ${
                index === 1
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/50'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}>
                {t.pricing.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection({ t, locale }: { t: any; locale: string }) {
  return (
    <section id="contact" className="relative py-32 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {t.contact.title}
        </h2>
        <p className="text-xl text-gray-400 mb-12">
          {t.contact.subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a href={`/${locale}/contact`} className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 font-semibold text-lg flex items-center justify-center gap-2">
            {t.contact.ctaPrimary}
            <ArrowRight className="w-5 h-5" />
          </a>
          <button className="px-10 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full hover:bg-white/20 transition-all duration-300 font-semibold text-lg">
            {t.contact.ctaSecondary}
          </button>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer({ t, locale }: { t: any; locale: string }) {
  return (
    <footer className="bg-black text-white py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                SocialBadi
              </h2>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              {t.footer.description}
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/company/socialbadi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all duration-300"
                title="LinkedIn"
              >
                <span className="text-xs font-bold">in</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t.footer.product.title}</h3>
            <ul className="space-y-3">
              <li>
                <a href={`/${locale}#features`} className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t.nav.features}
                </a>
              </li>
              <li>
                <a href={`/${locale}#solutions`} className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t.nav.solutions}
                </a>
              </li>
              <li>
                <a href={`/${locale}#pricing`} className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t.nav.pricing}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t.footer.company.title}</h3>
            <ul className="space-y-3">
              <li>
                <a href={`/${locale}/contact`} className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t.nav.contact}
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/socialbadi" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t.footer.resources.title}</h3>
            <ul className="space-y-3">
              <li>
                <a href={`/${locale}`} className="text-gray-400 hover:text-white transition-colors text-sm">
                  {t.nav.home}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            {t.footer.copyright}
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href={`/${locale}/contact`} className="hover:text-white transition-colors">{t.footer.legal}</a>
            <a href={`/${locale}/contact`} className="hover:text-white transition-colors">{t.footer.privacy}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main App Component
export default function App() {
  const { t, locale, setLocale } = useI18n();

  return (
    <div className="bg-black min-h-screen">
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-10px) translateX(5px);
          }
          50% {
            transform: translateY(-20px) translateX(-5px);
          }
          75% {
            transform: translateY(-10px) translateX(5px);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: #000;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #7c3aed);
        }
      `}</style>
      
      <Navbar t={t} locale={locale} setLocale={setLocale} />
      <HeroSection t={t} locale={locale} />
      <IntroSection t={t} />
      <FeaturesSection t={t} />
      <SolutionsSection t={t} />
      <PricingSection t={t} locale={locale} />
      <ContactSection t={t} locale={locale} />
      <Footer t={t} locale={locale} />
    </div>
  );
}