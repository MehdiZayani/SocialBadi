"use client";
import Navbar from '@/components/Navbar';
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Mail, 
  Phone, 
  Send, 
  CheckCircle, 
  Clock, 
  MessageSquare,
  Calendar,
  User,
  Building,
  ArrowRight,
  Sparkles,
  Bot,
  ChevronDown
} from 'lucide-react';

// Translations
const translations = {
  fr: {
    nav: {
      home: "Accueil",
      features: "Fonctionnalités",
      solutions: "Solutions",
      pricing: "Tarifs",
      contact: "Contact",
      backHome: "← Retour à l'accueil"
    },
    contact: {
      badge: "Parlons-en",
      title: "Contactez-nous",
      subtitle: "Prêt à transformer votre business avec l'IA ? Nous sommes là pour vous aider. Remplissez le formulaire ci-dessous ou contactez-nous directement.",
      emailTitle: "Email",
      emailContent: "contact@socialbadi.com",
      phoneTitle: "Téléphone",
      phoneContent: "+33 7 69 84 80 31",
      formTitle: "Envoyez-nous un message",
      formSubtitle: "Remplissez le formulaire et nous vous répondrons dans les 24 heures",
      firstName: "Prénom",
      lastName: "Nom",
      email: "Email",
      phone: "Téléphone",
      company: "Entreprise",
      service: "Service intéressé",
      selectService: "Sélectionnez un service",
      services: {
        voiceAi: "Agents Vocaux IA",
        chatbot: "Chatbots Intelligents",
        leadQualification: "Qualification de Leads",
        appointmentBooking: "Prise de Rendez-vous",
        custom: "Solution Sur Mesure"
      },
      budget: "Budget",
      selectBudget: "Sélectionnez votre budget",
      budgetRanges: {
        range1: "5 000€ - 10 000€",
        range2: "10 000€ - 25 000€",
        range3: "25 000€ - 50 000€",
        range4: "50 000€+"
      },
      message: "Message",
      messagePlaceholder: "Parlez-nous de votre projet et de vos besoins...",
      sending: "Envoi en cours...",
      sendMessage: "Envoyer le message",
      successTitle: "Message envoyé avec succès !",
      successSubtitle: "Nous vous répondrons dans les 24 heures.",
      whyChoose: "Pourquoi nous choisir ?",
      support247: "Support 24/7",
      support247Desc: "Assistance disponible 24h/24 pour vos agents IA",
      provenResults: "Résultats prouvés",
      provenResultsDesc: "Historique de mises en œuvre réussies",
      quickResponse: "Réponse rapide",
      quickResponseDesc: "Nous répondons à toutes les demandes dans les 24h",
      scheduleDemo: "Planifier une démo",
      scheduleDemoDesc: "Voyez nos agents IA en action. Réservez une démo personnalisée avec notre équipe.",
      bookDemo: "Réserver une démo",
      followUs: "Suivez-nous",
      location: "Notre localisation",
      locationAddress: "Sousse, Gouvernorat de Sousse, Tunisie",
      faqTitle: "Questions fréquentes",
      faqSubtitle: "Réponses rapides aux questions courantes",
      faqs: [
        {
          q: "Combien de temps prend l'implémentation ?",
          a: "Généralement 2 à 4 semaines selon la complexité et les exigences."
        },
        {
          q: "Quel type de support proposez-vous ?",
          a: "Support technique 24/7, mises à jour régulières et gestion de compte dédiée."
        },
        {
          q: "Puis-je intégrer avec mes systèmes existants ?",
          a: "Oui, nos agents IA s'intègrent parfaitement avec la plupart des CRM et outils métier."
        },
        {
          q: "Quelles langues supportent vos agents IA ?",
          a: "Nous supportons plus de 50 langues dont le français, l'anglais, l'arabe et plus."
        }
      ]
    },
    footer: {
      description: "Transformez votre business avec des agents IA qui travaillent 24/7 pour engager vos clients et accélérer votre croissance.",
      copyright: "© 2025 SocialBadi. Tous droits réservés par Badi Corp.",
      legal: "Mentions légales",
      privacy: "Politique de confidentialité",
      cookies: "Cookies",
      product: {
        title: "Produit",
        links: ["Fonctionnalités", "Tarifs", "Intégrations", "API"]
      },
      company: {
        title: "Entreprise",
        links: ["À propos", "Carrières", "Blog", "Presse"]
      },
      resources: {
        title: "Ressources",
        links: ["Documentation", "Guides", "Webinaires", "Support"]
      }
    }
  },
  en: {
    nav: {
      home: "Home",
      features: "Features",
      solutions: "Solutions",
      pricing: "Pricing",
      contact: "Contact",
      backHome: "← Back to Home"
    },
    contact: {
      badge: "Let's Talk",
      title: "Get In Touch",
      subtitle: "Ready to transform your business with AI? We're here to help. Fill out the form below or reach out directly.",
      emailTitle: "Email Us",
      emailContent: "contact@socialbadi.com",
      phoneTitle: "Call Us",
      phoneContent: "+33 7 69 84 80 31",
      formTitle: "Send us a message",
      formSubtitle: "Fill out the form and we'll get back to you within 24 hours",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      phone: "Phone Number",
      company: "Company Name",
      service: "Service Interested In",
      selectService: "Select a service",
      services: {
        voiceAi: "Voice AI Agents",
        chatbot: "Smart Chatbots",
        leadQualification: "Lead Qualification",
        appointmentBooking: "Appointment Booking",
        custom: "Custom Solution"
      },
      budget: "Budget Range",
      selectBudget: "Select budget range",
      budgetRanges: {
        range1: "$5,000 - $10,000",
        range2: "$10,000 - $25,000",
        range3: "$25,000 - $50,000",
        range4: "$50,000+"
      },
      message: "Message",
      messagePlaceholder: "Tell us about your project and requirements...",
      sending: "Sending...",
      sendMessage: "Send Message",
      successTitle: "Message Sent Successfully!",
      successSubtitle: "We'll get back to you within 24 hours.",
      whyChoose: "Why Choose Us?",
      support247: "24/7 Support",
      support247Desc: "Round-the-clock assistance for your AI agents",
      provenResults: "Proven Results",
      provenResultsDesc: "Track record of successful implementations",
      quickResponse: "Quick Response",
      quickResponseDesc: "We respond to all inquiries within 24 hours",
      scheduleDemo: "Schedule a Demo",
      scheduleDemoDesc: "See our AI agents in action. Book a personalized demo with our team.",
      bookDemo: "Book Demo Call",
      followUs: "Follow Us",
      location: "Our Location",
      locationAddress: "Sousse, Sousse Governorate, Tunisia",
      faqTitle: "Frequently Asked Questions",
      faqSubtitle: "Quick answers to common questions",
      faqs: [
        {
          q: "How long does implementation take?",
          a: "Typically 2-4 weeks depending on complexity and requirements."
        },
        {
          q: "What kind of support do you provide?",
          a: "24/7 technical support, regular updates, and dedicated account management."
        },
        {
          q: "Can I integrate with my existing systems?",
          a: "Yes, our AI agents integrate seamlessly with most CRM and business tools."
        },
        {
          q: "What languages do your AI agents support?",
          a: "We support 50+ languages including English, French, Arabic, and more."
        }
      ]
    },
    footer: {
      description: "Transform your business with AI agents working 24/7 to engage your customers and accelerate your growth.",
      copyright: "© 2025 SocialBadi. All rights reserved by Badi Corp.",
      legal: "Legal",
      privacy: "Privacy Policy",
      cookies: "Cookies",
      product: {
        title: "Product",
        links: ["Features", "Pricing", "Integrations", "API"]
      },
      company: {
        title: "Company",
        links: ["About", "Careers", "Blog", "Press"]
      },
      resources: {
        title: "Resources",
        links: ["Documentation", "Guides", "Webinars", "Support"]
      }
    }
  }
};

// Hook i18n
function useI18n() {
  const pathname = usePathname();
  const router = useRouter();
  const [locale, setLocaleState] = useState<'fr' | 'en'>('fr');

  useEffect(() => {
    if (!pathname) return;

    if (pathname.startsWith('/en')) {
      setLocaleState('en');
    } else if (pathname.startsWith('/fr')) {
      setLocaleState('fr');
    } else {
      const browserLang = typeof navigator !== 'undefined'
        ? navigator.language.split('-')[0]
        : 'fr';
      const supportedLang = browserLang === 'en' ? 'en' : 'fr';
      setLocaleState(supportedLang);
    }
  }, [pathname]);

  const setLocale = (newLocale: 'fr' | 'en') => {
    if (!pathname) return;
    const pathWithoutLocale = pathname.replace(/^\/(fr|en)/, '') || '';
    router.push(`/${newLocale}${pathWithoutLocale || '/'}`);
    setLocaleState(newLocale);
  };

  return { t: translations[locale as 'fr' | 'en'], locale, setLocale };
}



// Contact Form Component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ContactForm({ t }: { t: any }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
    budget: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            company: '',
            service: '',
            message: '',
            budget: ''
          });
        }, 3000);
      } else {
        console.error('Error submitting form:', data.error);
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-8 text-center">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{t.contact.successTitle}</h3>
        <p className="text-gray-300">{t.contact.successSubtitle}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {t.contact.firstName} *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
              placeholder="John"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {t.contact.lastName} *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
              placeholder="Doe"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {t.contact.email} *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
              placeholder="john@company.com"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {t.contact.phone}
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {t.contact.company}
          </label>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
              placeholder="Your Company"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {t.contact.service} *
          </label>
          <div className="relative">
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all appearance-none cursor-pointer"
            >
              <option value="" className="bg-gray-900">{t.contact.selectService}</option>
              <option value="voice-ai" className="bg-gray-900">{t.contact.services.voiceAi}</option>
              <option value="chatbot" className="bg-gray-900">{t.contact.services.chatbot}</option>
              <option value="lead-qualification" className="bg-gray-900">{t.contact.services.leadQualification}</option>
              <option value="appointment-booking" className="bg-gray-900">{t.contact.services.appointmentBooking}</option>
              <option value="custom" className="bg-gray-900">{t.contact.services.custom}</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {t.contact.budget}
        </label>
        <select
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all appearance-none cursor-pointer"
        >
          <option value="" className="bg-gray-900">{t.contact.selectBudget}</option>
          <option value="5k-10k" className="bg-gray-900">{t.contact.budgetRanges.range1}</option>
          <option value="10k-25k" className="bg-gray-900">{t.contact.budgetRanges.range2}</option>
          <option value="25k-50k" className="bg-gray-900">{t.contact.budgetRanges.range3}</option>
          <option value="50k+" className="bg-gray-900">{t.contact.budgetRanges.range4}</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {t.contact.message} *
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all resize-none"
          placeholder={t.contact.messagePlaceholder}
        ></textarea>
      </div>

      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            {t.contact.sending}
          </>
        ) : (
          <>
            {t.contact.sendMessage}
            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>
    </div>
  );
}

// Contact Info Card
function ContactInfoCard({ icon: Icon, title, content, href }: { icon: React.ElementType; title: string; content: string; href: string }) {
  return (
    <a
      href={href}
      className="group p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg group-hover:scale-110 transition-transform">
          <Icon className="w-6 h-6 text-blue-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{content}</p>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
      </div>
    </a>
  );
}

// Feature Card
function FeatureCard({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-blue-500/50 transition-all duration-300 group">
      <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg w-fit mb-4 group-hover:scale-110 transition-transform">
        <Icon className="w-6 h-6 text-blue-400" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}

// Footer
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

// Main Contact Page Component
export default function ContactPage() {
  const { t, locale, setLocale } = useI18n();

  return (
    <div className="min-h-screen bg-black">
      <Navbar translations={t} locale={locale as 'fr' | 'en'} setLocale={setLocale} />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAgMjBjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTIwLTIwYzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300 font-medium">{t.contact.badge}</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {t.contact.title}
              </span>
            </h1>
            
            <p className="text-lg text-gray-300">
              {t.contact.subtitle}
            </p>
          </div>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <ContactInfoCard
              icon={Mail}
              title={t.contact.emailTitle}
              content={t.contact.emailContent}
              href="mailto:contact@socialbadi.com"
            />
            <ContactInfoCard
              icon={Phone}
              title={t.contact.phoneTitle}
              content={t.contact.phoneContent}
              href="tel:+33769848031"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form - Takes 2 columns */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">{t.contact.formTitle}</h2>
                  <p className="text-gray-400">{t.contact.formSubtitle}</p>
                </div>
                <ContactForm t={t} />
              </div>
            </div>

            {/* Sidebar - Takes 1 column */}
            <div className="space-y-6">
              {/* Why Choose Us */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">{t.contact.whyChoose}</h3>
                <div className="space-y-4">
                  <FeatureCard
                    icon={Clock}
                    title={t.contact.support247}
                    description={t.contact.support247Desc}
                  />
                  <FeatureCard
                    icon={CheckCircle}
                    title={t.contact.provenResults}
                    description={t.contact.provenResultsDesc}
                  />
                  <FeatureCard
                    icon={MessageSquare}
                    title={t.contact.quickResponse}
                    description={t.contact.quickResponseDesc}
                  />
                </div>
              </div>

              {/* Schedule a Demo */}
              <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6">
                <Calendar className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{t.contact.scheduleDemo}</h3>
                <p className="text-gray-300 text-sm mb-4">
                  {t.contact.scheduleDemoDesc}
                </p>
                <button className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg transition-all duration-300 font-semibold text-sm">
                  {t.contact.bookDemo}
                </button>
              </div>

              {/* Social Links */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">{t.contact.followUs}</h3>
                <div className="flex gap-3">
                  {['T', 'L', 'G', 'Y'].map((social, index) => (
                    <a
                      key={index}
                      href="#"
                      className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 border border-white/10 rounded-lg transition-all duration-300 group"
                    >
                      <span className="text-xs font-bold text-gray-400 group-hover:text-white transition-colors">{social}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.contact.faqTitle}
            </h2>
            <p className="text-gray-400">{t.contact.faqSubtitle}</p>
          </div>
          <div className="space-y-4">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {t.contact.faqs.map((faq: any, index: number) => (
              <details
                key={index}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all"
              >
                <summary className="px-6 py-4 cursor-pointer text-white font-semibold flex items-center justify-between">
                  {faq.q}
                  <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 pb-4 text-gray-400">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer t={t} locale={locale} />
    </div>
  );
}