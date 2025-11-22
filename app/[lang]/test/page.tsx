"use client";
import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import { Menu, X, ChevronRight, Users, CheckSquare, Lock, Sparkles, Zap, Bot } from 'lucide-react';
import Link from 'next/link';

// Simulated Image Component (replace with Next.js Image in production)
const Image = ({ src, alt, fill, priority, className, style }) => (
  <img 
    src={typeof src === 'string' ? src : '/api/placeholder/400/300'} 
    alt={alt} 
    className={className}
    style={fill ? { position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', ...style } : style}
  />
);

// Mock GSAP for demo purposes
const gsap = {
  registerPlugin: () => {},
  timeline: (config) => ({
    from: () => ({ to: () => ({}) }),
    to: () => ({}),
    kill: () => {}
  }),
  from: () => {},
  to: () => ({}),
  ScrollTrigger: {
    create: () => {},
    killAll: () => {},
    refresh: () => {}
  }
};

// Navbar Component
function Navbar({ translations = {} }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentLang, setCurrentLang] = useState('fr');

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
    { label: translations.products || 'Products', href: '#products' },
    { label: translations.markets || 'Markets', href: '#markets' },
    { label: translations.contact || 'Contact', href: '#contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/10 transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              SocialBadi
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 font-semibold text-sm">
              Get Started
            </button>
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
            <div className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-colors duration-200 px-4 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <button className="mx-4 mt-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-sm">
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// Hero Section
function HeroSection({ translations = {} }) {
  return (
    <section className="relative min-h-screen pt-32 pb-20 bg-black overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAgMjBjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTIwLTIwYzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300 font-medium">AI-Powered Solutions</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {translations.sectionhome?.title || "Transform Your Business with AI Agents"}
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            {translations.sectionhome?.subtitle || "Create intelligent voice agents available 24/7 to answer questions, schedule appointments, and drive conversions"}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/contact" className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 font-semibold flex items-center justify-center gap-2">
              {translations.contactus || "Get Started"}
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-full hover:bg-white/10 transition-all duration-300 font-semibold">
              Watch Demo
            </button>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <p className="text-sm text-gray-300">{translations.sectionhome?.text1 || "Expert Team"}</p>
            </div>

            <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <CheckSquare className="w-6 h-6 text-purple-400" />
              </div>
              <p className="text-sm text-gray-300">{translations.sectionhome?.text2 || "Proven Results"}</p>
            </div>

            <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
              <div className="p-2 bg-pink-500/20 rounded-lg">
                <Lock className="w-6 h-6 text-pink-400" />
              </div>
              <p className="text-sm text-gray-300">{translations.sectionhome?.text3 || "Secure & Private"}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Intro Section
function IntroSection({ translations = {} }) {
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
          {translations?.sectionhome?.intro?.title || "AI That Works For You"}
        </h2>
      </div>
    </div>
  );
}

// Description Section
function DescriptionSection({ translations = {} }) {
  const phrases = [
    translations?.sectionhome?.description?.text1 || "Automate customer interactions",
    translations?.sectionhome?.description?.text2 || "Qualify leads instantly",
    translations?.sectionhome?.description?.text3 || "Book appointments 24/7",
    translations?.sectionhome?.description?.text4 || "Scale without limits",
    translations?.sectionhome?.description?.text5 || "Powered by advanced AI"
  ];

  return (
    <div className="relative bg-black py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {phrases.map((phrase, index) => (
            <div
              key={index}
              className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 animate-fadeIn"
              style={{ animationDelay: `${index * 0.2}s`, animationFillMode: 'forwards' }}
            >
              {phrase}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Projects Section
function ProjectsSection({ translations = {} }) {
  const [selectedProject, setSelectedProject] = useState(0);

  const projects = [
    {
      title: "Voice AI Agents",
      description: "Natural conversations that convert",
      image: "/api/placeholder/600/400",
      icon: <Zap className="w-6 h-6" />
    },
    {
      title: "Smart Chatbots",
      description: "24/7 customer engagement",
      image: "/api/placeholder/600/400",
      icon: <Bot className="w-6 h-6" />
    },
    {
      title: "Lead Qualification",
      description: "Instant lead scoring and routing",
      image: "/api/placeholder/600/400",
      icon: <Users className="w-6 h-6" />
    },
    {
      title: "Appointment Booking",
      description: "Automated scheduling system",
      image: "/api/placeholder/600/400",
      icon: <CheckSquare className="w-6 h-6" />
    }
  ];

  return (
    <div className="relative bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Our Solutions
          </h2>
          <p className="text-gray-400 text-lg">Powerful AI tools to grow your business</p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Image Display */}
          <div className="relative h-64 md:h-96 lg:h-[500px] rounded-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
            <img
              src={projects[selectedProject].image}
              alt={projects[selectedProject].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute bottom-8 left-8 z-20">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-500/20 backdrop-blur-sm rounded-lg">
                  {projects[selectedProject].icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold">{projects[selectedProject].title}</h3>
              <p className="text-gray-300">{projects[selectedProject].description}</p>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Voice Agents</h3>
              <p className="text-gray-300">
                Create Voice Agents for your business available 24/7 to answer questions, schedule appointments, or complete purchases.
              </p>
            </div>
            <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">AI-Powered Growth</h3>
              <p className="text-gray-300">
                Meet your AI-powered growth partner—always on, always converting. Our hyper-responsive chatbot engages visitors with human-like conversations.
              </p>
            </div>
          </div>
        </div>

        {/* Project List */}
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div
              key={index}
              onMouseEnter={() => setSelectedProject(index)}
              onClick={() => setSelectedProject(index)}
              className={`group cursor-pointer p-6 border-b border-white/10 hover:bg-white/5 transition-all duration-300 ${
                selectedProject === index ? 'bg-white/5' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg transition-colors ${
                    selectedProject === index ? 'bg-blue-500/20' : 'bg-white/5'
                  }`}>
                    {project.icon}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold uppercase group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{project.description}</p>
                  </div>
                </div>
                <ChevronRight className={`w-6 h-6 transition-transform ${
                  selectedProject === index ? 'rotate-90 text-blue-400' : 'text-gray-400'
                }`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Footer Component
function Footer({ translations = {} }) {
  const footerLinks = {
    company: ['About', 'Features', 'Works', 'Career'],
    help: ['Customer Support', 'Delivery Details', 'Terms & Conditions', 'Privacy Policy'],
    resources: ['Free eBooks', 'Development Tutorial', 'How to - Blog', 'YouTube Playlist']
  };

  return (
    <footer className="bg-black text-white py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-4">
              SocialBadi
            </h2>
            <p className="text-gray-400 mb-6">
              Transform your business with AI-powered agents that work 24/7 to engage customers and drive growth.
            </p>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 font-semibold text-sm flex items-center gap-2">
              <span>Start Live Chat</span>
            </button>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-4 capitalize">{category}</h3>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © Copyright 2025, All Rights Reserved by Badi Corp.
          </p>
          <div className="flex gap-4">
            {['twitter', 'facebook', 'instagram', 'github'].map((social) => (
              <a
                key={social}
                href="#"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all duration-300"
              >
                <span className="text-xs">{social[0].toUpperCase()}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main App Component
export default function App() {
  const translations = {
    products: "Products",
    markets: "Markets",
    contact: "Contact",
    contactus: "Contact Us",
    sectionhome: {
      title: "Transform Your Business with AI Agents",
      subtitle: "Create intelligent voice agents available 24/7",
      text1: "Expert Team",
      text2: "Proven Results",
      text3: "Secure & Private",
      intro: {
        title: "AI That Works For You"
      },
      description: {
        text1: "Automate customer interactions",
        text2: "Qualify leads instantly",
        text3: "Book appointments 24/7",
        text4: "Scale without limits",
        text5: "Powered by advanced AI"
      }
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-200px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
      `}</style>
      <Navbar translations={translations} />
      <HeroSection translations={translations} />
      <IntroSection translations={translations} />
      <DescriptionSection translations={translations} />
      <ProjectsSection translations={translations} />
      <Footer translations={translations} />
    </div>
  );
}