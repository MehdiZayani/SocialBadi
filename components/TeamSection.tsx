"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Github, Linkedin, ShieldCheck, Sparkles, Terminal, Mail, CheckCircle2 } from "lucide-react";
import SpotlightCard from "./react-bits/SpotlightCard";
import MagneticButton from "./react-bits/MagneticButton";

interface TeamMember {
  name: string;
  role: {
    fr: string;
    en: string;
  };
  specialty: {
    fr: string;
    en: string;
  };
  bio: {
    fr: string;
    en: string;
  };
  photo?: string;
  initials: string;
  accentBadge: string;
  badgeColor: string;
  techStack: string[];
  linkedin?: string;
  github?: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Mehdi Zayani",
    role: {
      fr: "Fondateur & CEO",
      en: "Founder & CEO"
    },
    specialty: {
      fr: "Vision Stratégique, Direction Produit & Architectures Digitales",
      en: "Strategic Vision, Product Strategy & Digital Architecture"
    },
    bio: {
      fr: "Pilote la stratégie, l'excellence opérationnelle et le développement des projets technologiques chez SocialBadi. Axé sur la création de valeur mesurable et le déploiement de solutions robustes.",
      en: "Directs company strategy, product engineering standards, and enterprise partnerships at SocialBadi. Focused on quantifiable business impact and high-velocity software delivery."
    },
    photo: "/team/mehdi-zayani.JPG",
    initials: "MZ",
    accentBadge: "Leadership",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    techStack: ["Product Strategy", "Next.js", "Enterprise SaaS", "Growth Operations", "Agile Sprints"],
    linkedin: "https://www.linkedin.com/company/socialbadi",
  },
  {
    name: "Yassine Rassas",
    role: {
      fr: "Head of AI",
      en: "Head of AI"
    },
    specialty: {
      fr: "Agents IA Autonomes, Chatbots Métier, RAG & LLM Workflows",
      en: "Autonomous AI Agents, Conversational Bots, RAG & LLM Pipelines"
    },
    bio: {
      fr: "Supervise la conception et le déploiement des architectures d'intelligence artificielle : chatbots conversationnels WhatsApp / Web, modèles RAG connectés à vos données et agents autonomes 24/7.",
      en: "Leads AI systems engineering: custom WhatsApp/Web chatbots, contextual RAG models connected to company knowledge bases, and autonomous 24/7 workflow agents."
    },
    photo: undefined,
    initials: "YR",
    accentBadge: "Artificial Intelligence",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    techStack: ["LLM Agents", "OpenAI / Claude API", "WhatsApp Bots", "LangChain", "Vector DB", "Python"],
    linkedin: "https://www.linkedin.com/company/socialbadi",
  },
  {
    name: "Mehdi Amemou",
    role: {
      fr: "Consultant Cyber Sécurité",
      en: "Cybersecurity Consultant"
    },
    specialty: {
      fr: "Audits de Sécurité, Pentesting, Hardening Cloud & Conformité",
      en: "Security Auditing, Penetration Testing, Cloud Hardening & Compliance"
    },
    bio: {
      fr: "Garantit la résilience technique et la sécurité des applications : protection des bases de données, conformité aux standards OWASP, audits préventifs et sécurisation des API contre les cybermenaces.",
      en: "Ensures technical resilience and rigorous application security: database protection, OWASP standard enforcement, preventive security audits, and hardened API perimeters."
    },
    photo: "/team/mehdi-amemou.jpg",
    initials: "MA",
    accentBadge: "Cybersecurity",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    techStack: ["OWASP Top 10", "Pentesting", "Zero Trust", "Cloud Hardening", "Data Protection", "OAuth 2.0"],
    linkedin: "https://www.linkedin.com/company/socialbadi",
  }
];

export default function TeamSection({ locale = "fr" }: { locale?: "fr" | "en" }) {
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});

  const handleImageError = (name: string) => {
    setImageErrorMap((prev) => ({ ...prev, [name]: true }));
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEAM_MEMBERS.map((member, idx) => {
          const hasImage = member.photo && !imageErrorMap[member.name];

          return (
            <SpotlightCard
              key={idx}
              spotlightColor="rgba(59, 130, 246, 0.1)"
              borderColor="rgba(59, 130, 246, 0.35)"
              className="p-6 sm:p-7 flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.06)] bg-white"
            >
              <div>
                {/* Header: Photo + Badge + Social */}
                <div className="flex items-start justify-between mb-5">
                  <div className="relative">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-100 border-2 border-slate-200 shadow-md relative group-hover:border-blue-400 transition-colors">
                      {hasImage ? (
                        <Image
                          src={member.photo!}
                          alt={member.name}
                          fill
                          className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                          onError={() => handleImageError(member.name)}
                          sizes="(max-width: 768px) 80px, 96px"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-mono font-bold text-2xl">
                          {member.initials}
                        </div>
                      )}
                    </div>

                    {/* Active verified beacon */}
                    <span
                      className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-sm"
                      title="Membre vérifié"
                    />
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${member.badgeColor}`}>
                      {member.accentBadge}
                    </span>

                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-300 transition-all shadow-sm"
                        title={`LinkedIn - ${member.name}`}
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Name & Role */}
                <div className="mb-3">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs font-mono text-blue-600 font-bold mt-0.5">
                    {member.role[locale]}
                  </p>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    {member.specialty[locale]}
                  </p>
                </div>

                {/* Bio */}
                <p className="text-xs text-slate-600 leading-relaxed mb-6 font-normal">
                  {member.bio[locale]}
                </p>
              </div>

              {/* Stack / Skills Badges */}
              <div className="pt-4 border-t border-slate-100">
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block mb-2 font-bold">
                  {locale === "fr" ? "Périmètre technique" : "Core Competencies"}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {member.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-slate-50 text-slate-700 border border-slate-200/80 group-hover:border-slate-300 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          );
        })}
      </div>

      {/* Engineering & Leadership Ethos Banner */}
      <div className="mt-8 p-6 sm:p-8 rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50/90 via-indigo-50/60 to-sky-50/90 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-slate-900">
              {locale === "fr" ? "Direction Impliquée & Sécurité à Chaque Étape" : "Direct Executive & Security Involvement"}
            </h4>
            <p className="text-xs text-slate-600 mt-0.5 max-w-2xl">
              {locale === "fr"
                ? "Chaque projet bénéficie d'un suivi direct par nos leads techniques en IA et cybersécurité. Pas d'intermédiaires, une communication transparente."
                : "Every deployment is personally supervised by our leadership, AI architects, and cybersecurity consultants. Zero overhead, pure accountability."}
            </p>
          </div>
        </div>

        <MagneticButton
          onClick={() => {
            const contactSection = document.getElementById("contact");
            contactSection?.scrollIntoView({ behavior: "smooth" });
          }}
          className="px-6 py-3 rounded-full bg-slate-900 text-white font-bold text-xs sm:text-sm hover:bg-slate-800 transition-all shadow-md shadow-slate-900/10 shrink-0"
        >
          {locale === "fr" ? "Échanger avec l'équipe →" : "Connect with the team →"}
        </MagneticButton>
      </div>
    </div>
  );
}
