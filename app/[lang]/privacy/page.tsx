/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Shield, Lock, Eye, Database, UserCheck, Mail } from 'lucide-react';
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

export default function PrivacyPage() {
  const { t, locale } = useI18n();

  const privacyContent = {
    fr: {
      title: "Politique de Confidentialité",
      intro: "Chez SocialBadi, nous prenons très au sérieux la protection de vos données personnelles. Cette politique de confidentialité vous informe sur la manière dont nous collectons, utilisons et protégeons vos informations.",
      sections: [
        {
          icon: Database,
          title: "Données collectées",
          content: `Lorsque vous utilisez notre formulaire de contact, nous collectons :

• Nom et prénom
• Adresse email
• Nom de l'entreprise
• Message

Ces données sont collectées uniquement avec votre consentement explicite lors de la soumission du formulaire.`
        },
        {
          icon: Eye,
          title: "Utilisation des données",
          content: `Nous utilisons vos données personnelles uniquement pour :

• Répondre à vos demandes de contact
• Vous fournir des informations sur nos services
• Améliorer notre service client

Nous ne vendons, ne louons et ne partageons jamais vos données avec des tiers à des fins commerciales.`
        },
        {
          icon: Lock,
          title: "Sécurité des données",
          content: `Vos données sont stockées de manière sécurisée et protégées par :

• Chiffrement SSL/TLS pour toutes les transmissions
• Serveurs sécurisés hébergés par Vercel
• Accès restreint aux données (équipe autorisée uniquement)
• Sauvegardes régulières

Nous mettons en œuvre toutes les mesures techniques et organisationnelles nécessaires pour protéger vos données contre tout accès non autorisé, perte ou destruction.`
        },
        {
          icon: UserCheck,
          title: "Vos droits (RGPD)",
          content: `Conformément au RGPD, vous disposez des droits suivants :

• Droit d'accès : obtenir une copie de vos données
• Droit de rectification : corriger vos données inexactes
• Droit à l'effacement : supprimer vos données
• Droit à la limitation : limiter le traitement de vos données
• Droit à la portabilité : recevoir vos données dans un format structuré
• Droit d'opposition : vous opposer au traitement de vos données

Pour exercer ces droits, contactez-nous à : contact@socialbadi.com`
        },
        {
          icon: Shield,
          title: "Cookies",
          content: `Notre site n'utilise pas de cookies de tracking, de publicité ou d'analyse.

Nous utilisons uniquement des cookies techniques strictement nécessaires au bon fonctionnement du site (ex: préférence de langue).

Vous pouvez désactiver les cookies dans les paramètres de votre navigateur à tout moment.`
        },
        {
          icon: Mail,
          title: "Conservation des données",
          content: `Vos données sont conservées :

• Données de contact : 3 ans maximum après votre dernier contact
• Données de prospection : jusqu'à votre demande de suppression

Passé ces délais, vos données sont automatiquement supprimées de nos systèmes.`
        },
        {
          icon: Database,
          title: "Modifications de cette politique",
          content: `Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment.

Toute modification sera publiée sur cette page avec la date de mise à jour.

Nous vous encourageons à consulter régulièrement cette page pour rester informé de la manière dont nous protégeons vos données.`
        }
      ],
      contact: {
        title: "Contact",
        content: `Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits, contactez-nous :

Email : contact@socialbadi.com
LinkedIn : linkedin.com/company/socialbadi`
      }
    },
    en: {
      title: "Privacy Policy",
      intro: "At SocialBadi, we take the protection of your personal data very seriously. This privacy policy informs you about how we collect, use and protect your information.",
      sections: [
        {
          icon: Database,
          title: "Data Collected",
          content: `When you use our contact form, we collect:

• First and last name
• Email address
• Company name
• Message

This data is collected only with your explicit consent when submitting the form.`
        },
        {
          icon: Eye,
          title: "Use of Data",
          content: `We use your personal data only to:

• Respond to your contact requests
• Provide you with information about our services
• Improve our customer service

We never sell, rent or share your data with third parties for commercial purposes.`
        },
        {
          icon: Lock,
          title: "Data Security",
          content: `Your data is stored securely and protected by:

• SSL/TLS encryption for all transmissions
• Secure servers hosted by Vercel
• Restricted data access (authorized team only)
• Regular backups

We implement all necessary technical and organizational measures to protect your data against unauthorized access, loss or destruction.`
        },
        {
          icon: UserCheck,
          title: "Your Rights (GDPR)",
          content: `In accordance with GDPR, you have the following rights:

• Right of access: obtain a copy of your data
• Right of rectification: correct inaccurate data
• Right to erasure: delete your data
• Right to restriction: limit the processing of your data
• Right to portability: receive your data in a structured format
• Right to object: object to the processing of your data

To exercise these rights, contact us at: contact@socialbadi.com`
        },
        {
          icon: Shield,
          title: "Cookies",
          content: `Our site does not use tracking, advertising or analytics cookies.

We only use technical cookies strictly necessary for the proper functioning of the site (e.g., language preference).

You can disable cookies in your browser settings at any time.`
        },
        {
          icon: Mail,
          title: "Data Retention",
          content: `Your data is kept:

• Contact data: maximum 3 years after your last contact
• Prospecting data: until your deletion request

After these periods, your data is automatically deleted from our systems.`
        },
        {
          icon: Database,
          title: "Changes to This Policy",
          content: `We reserve the right to modify this privacy policy at any time.

Any changes will be posted on this page with the update date.

We encourage you to regularly consult this page to stay informed about how we protect your data.`
        }
      ],
      contact: {
        title: "Contact",
        content: `For any questions regarding this privacy policy or to exercise your rights, contact us:

Email: contact@socialbadi.com
LinkedIn: linkedin.com/company/socialbadi`
      }
    }
  };

  const content = privacyContent[locale];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar translations={t} locale={locale} />
      
      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mb-6">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {content.title}
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {content.intro}
            </p>
            <p className="text-gray-500 text-sm mt-4">
              {locale === 'fr' ? 'Dernière mise à jour : 22 novembre 2025' : 'Last updated: November 22, 2025'}
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {content.sections.map((section, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-3">
                  <section.icon className="w-6 h-6 text-blue-400" />
                  {section.title}
                </h2>
                <div className="text-gray-300 whitespace-pre-line leading-relaxed">
                  {section.content}
                </div>
              </div>
            ))}

            {/* Contact Section */}
            <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/30 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-3">
                <Mail className="w-6 h-6 text-blue-400" />
                {content.contact.title}
              </h2>
              <div className="text-gray-300 whitespace-pre-line leading-relaxed">
                {content.contact.content}
              </div>
            </div>
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
