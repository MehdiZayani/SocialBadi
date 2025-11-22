/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Scale, FileText } from 'lucide-react';
import Navbar from '@/components/Navbar';
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
      title: "Mentions Légales",
      sections: [
        {
          title: "Éditeur du site",
          content: `Le site SocialBadi est édité par SocialBadi, société en cours de constitution.

Siège social : À définir
Email : contact@socialbadi.com
Directeur de publication : Mehdi Zayani`
        },
        {
          title: "Hébergement",
          content: `Le site est hébergé par Vercel Inc.
340 S Lemon Ave #4133
Walnut, CA 91789
États-Unis`
        },
        {
          title: "Propriété intellectuelle",
          content: `L'ensemble du contenu de ce site (textes, images, vidéos, logo, identité visuelle) est la propriété exclusive de SocialBadi, sauf mention contraire.

Toute reproduction, distribution, modification, adaptation, retransmission ou publication de ces différents éléments est strictement interdite sans l'accord exprès par écrit de SocialBadi.`
        },
        {
          title: "Données personnelles",
          content: `Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles.

Pour exercer ce droit, contactez-nous à : contact@socialbadi.com

Pour plus d'informations, consultez notre Politique de Confidentialité.`
        },
        {
          title: "Cookies",
          content: `Ce site n'utilise pas de cookies de tracking ou de publicité. Seuls les cookies essentiels au bon fonctionnement du site peuvent être utilisés.`
        },
        {
          title: "Responsabilité",
          content: `SocialBadi s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, SocialBadi ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition sur ce site.

SocialBadi ne pourra être tenue responsable des dommages directs ou indirects qui pourraient résulter de l'accès au site ou de l'utilisation du site et/ou des informations qui y sont contenues.`
        }
      ]
    },
    en: {
      title: "Legal Notice",
      sections: [
        {
          title: "Website Publisher",
          content: `The SocialBadi website is published by SocialBadi, a company in the process of formation.

Registered office: To be defined
Email: contact@socialbadi.com
Publication Director: Mehdi Zayani`
        },
        {
          title: "Hosting",
          content: `The website is hosted by Vercel Inc.
340 S Lemon Ave #4133
Walnut, CA 91789
United States`
        },
        {
          title: "Intellectual Property",
          content: `All content on this site (text, images, videos, logo, visual identity) is the exclusive property of SocialBadi, unless otherwise stated.

Any reproduction, distribution, modification, adaptation, retransmission or publication of these elements is strictly prohibited without the express written consent of SocialBadi.`
        },
        {
          title: "Personal Data",
          content: `In accordance with the General Data Protection Regulation (GDPR), you have the right to access, rectify and delete your personal data.

To exercise this right, contact us at: contact@socialbadi.com

For more information, see our Privacy Policy.`
        },
        {
          title: "Cookies",
          content: `This site does not use tracking or advertising cookies. Only cookies essential for the proper functioning of the site may be used.`
        },
        {
          title: "Liability",
          content: `SocialBadi strives to ensure the accuracy and updating of information published on this site. However, SocialBadi cannot guarantee the accuracy, precision or completeness of the information made available on this site.

SocialBadi cannot be held responsible for direct or indirect damages that may result from access to the site or use of the site and/or information contained therein.`
        }
      ]
    }
  };

  const content = legalContent[locale];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar translations={t} locale={locale} />
      
      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-6">
              <Scale className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {content.title}
            </h1>
            <p className="text-gray-400 text-lg">
              {locale === 'fr' ? 'Dernière mise à jour : 22 novembre 2025' : 'Last updated: November 22, 2025'}
            </p>
          </div>

          {/* Content */}
          <div className="space-y-12">
            {content.sections.map((section, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-3">
                  <FileText className="w-6 h-6 text-blue-400" />
                  {section.title}
                </h2>
                <div className="text-gray-300 whitespace-pre-line leading-relaxed">
                  {section.content}
                </div>
              </div>
            ))}
          </div>

          {/* Back to home */}
          <div className="mt-16 text-center">
            <a 
              href={`/${locale}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 font-semibold"
            >
              {locale === 'fr' ? "Retour à l'accueil" : 'Back to Home'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
