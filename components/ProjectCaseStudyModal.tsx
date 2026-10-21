"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ExternalLink, Palette, Type, Target, Image as ImageIcon } from "lucide-react";
import { ProjectCaseStudy } from "@/lib/projectsData";

interface ProjectCaseStudyModalProps {
  project: ProjectCaseStudy | null;
  locale: "fr" | "en";
  onClose: () => void;
}

export default function ProjectCaseStudyModal({
  project,
  locale = "fr",
  onClose,
}: ProjectCaseStudyModalProps) {
  const [activeTab, setActiveTab] = useState<"colors" | "typography" | "overview" | "gallery">("colors");
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);

  if (!project) return null;

  const currentGalleryImg = selectedGalleryImg || project.heroImage;

  const tabs = [
    { key: "colors", label: locale === "fr" ? "Couleurs & Identité" : "Colors & Identity", icon: Palette },
    { key: "typography", label: locale === "fr" ? "Typographie & Polices" : "Typography & Fonts", icon: Type },
    { key: "overview", label: locale === "fr" ? "Défi, Solution & Stack" : "Challenge & Stack", icon: Target },
    { key: "gallery", label: locale === "fr" ? "Galerie du Projet" : "Project Gallery", icon: ImageIcon },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-slate-900/60 backdrop-blur-md animate-fadeIn overflow-y-auto">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container in Light Theme */}
      <div className="relative w-full max-w-5xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-10 my-auto max-h-[92vh] flex flex-col text-slate-900">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white p-1.5 border border-slate-200 flex items-center justify-center overflow-hidden shadow-sm">
              <Image
                src={project.logo}
                alt={project.title}
                width={32}
                height={32}
                className="object-contain w-full h-full"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">{project.title}</h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  {project.category[locale]}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {project.client} • {project.location} • {project.year}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20"
            >
              <span>{locale === "fr" ? "Visiter le site live" : "Visit Live Site"}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors border border-slate-200 shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50/50 px-6 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;

            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center gap-2 py-3.5 px-4 border-b-2 font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
                  isActive
                    ? "border-blue-600 text-blue-600 bg-blue-50/60"
                    : "border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1">
          {/* TAB 1: COLORS & IDENTITY */}
          {activeTab === "colors" && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-pink-500" />
                  {locale === "fr" ? "Choix des Couleurs & Psychologie Visuelle" : "Color Palette & Visual Psychology"}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {locale === "fr"
                    ? `Voici la justification stratégique des teintes sélectionnées pour ${project.title}, conçues pour créer une adhésion immédiate avec la cible et maximiser les conversions.`
                    : `Strategic breakdown of the color choices for ${project.title}, engineered to resonate with the target audience and maximize conversion rate.`}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {project.colorPalette.map((color, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all space-y-4 shadow-sm"
                  >
                    {/* Swatch */}
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl shadow border border-slate-300 flex-shrink-0"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div>
                        <h5 className="text-sm font-bold text-slate-900">{color.name}</h5>
                        <code className="text-xs text-blue-600 font-mono font-bold">{color.hex}</code>
                      </div>
                    </div>

                    {/* Usage */}
                    <div className="pt-2 border-t border-slate-200">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                        {locale === "fr" ? "Utilisation :" : "Usage:"}
                      </span>
                      <p className="text-xs text-slate-700 font-medium">{color.usage[locale]}</p>
                    </div>

                    {/* Rationale */}
                    <div className="pt-2 border-t border-slate-200">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                        {locale === "fr" ? "Pourquoi ce choix :" : "Rationale:"}
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed">{color.rationale[locale]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: TYPOGRAPHY */}
          {activeTab === "typography" && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <Type className="w-5 h-5 text-blue-600" />
                  {locale === "fr" ? "Typographie & Hiérarchie des Textes" : "Typography & Text Hierarchy"}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {locale === "fr"
                    ? `Les polices de caractères ont été sélectionnées pour refléter le positionnement de marque de ${project.title} tout en assurant un confort de lecture sans friction.`
                    : `Font pairings selected to elevate the brand standing of ${project.title} while ensuring frictionless reading flow.`}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.typography.map((font, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all space-y-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-lg font-bold text-slate-900">{font.fontName}</h5>
                        <span className="text-xs text-blue-600 font-semibold">{font.type}</span>
                      </div>
                      <span className="text-2xl font-serif text-slate-400 italic">Aa</span>
                    </div>

                    <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                      <div className="text-base text-slate-900 font-bold">
                        {locale === "fr" ? "Exemple de rendu typographique" : "Typography Sample Preview"}
                      </div>
                      <div className="text-xs text-slate-500 font-mono">
                        ABCDEFGHIJKLMNOPQRSTUVWXYZ • abcdefghijklmnopqrstuvwxyz • 0123456789
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                        {locale === "fr" ? "Rôle dans l'interface :" : "Interface Role:"}
                      </span>
                      <p className="text-xs text-slate-700 font-medium">{font.usage[locale]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-3">
                  <h5 className="text-base font-bold text-amber-900">
                    {locale === "fr" ? "Le Défi Technique & Métier" : "The Architectural Challenge"}
                  </h5>
                  <p className="text-xs text-amber-800 leading-relaxed font-medium">
                    {project.challenge[locale]}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-3">
                  <h5 className="text-base font-bold text-emerald-900">
                    {locale === "fr" ? "La Solution Développée" : "The Engineered Solution"}
                  </h5>
                  <p className="text-xs text-emerald-800 leading-relaxed font-medium">
                    {project.solution[locale]}
                  </p>
                </div>
              </div>

              {/* Stack */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <h5 className="text-sm font-bold text-slate-900 mb-3">
                  {locale === "fr" ? "Stack Technique Utilisée :" : "Technical Stack Implemented:"}
                </h5>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-white text-slate-800 border border-slate-200 shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: GALLERY */}
          {activeTab === "gallery" && (
            <div className="space-y-6">
              <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-sm">
                <Image
                  src={currentGalleryImg}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {[project.heroImage, ...(project.gallery || [])].map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedGalleryImg(img)}
                    className={`relative h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      currentGalleryImg === img
                        ? "border-blue-600 scale-105 shadow-md"
                        : "border-slate-200 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt="Thumbnail" fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
