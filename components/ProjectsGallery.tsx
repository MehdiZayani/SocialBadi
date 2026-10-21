"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Sparkles, 
  ExternalLink, 
  Eye, 
  ChevronRight, 
  ArrowUpRight, 
  ArrowRight,
  Palette,
  CheckCircle2,
  Layers
} from "lucide-react";
import { ProjectCaseStudy } from "@/lib/projectsData";
import ProjectCaseStudyModal from "@/components/ProjectCaseStudyModal";
import SpotlightCard from "@/components/react-bits/SpotlightCard";

interface ProjectsGalleryProps {
  projects: ProjectCaseStudy[];
  locale: "fr" | "en";
}

export default function ProjectsGallery({
  projects,
  locale = "fr",
}: ProjectsGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ProjectCaseStudy | null>(null);

  const filters = [
    { key: "all", label: locale === "fr" ? "Tous les projets" : "All Projects" },
    { key: "saas", label: locale === "fr" ? "SaaS & CRM IA" : "SaaS & AI CRM" },
    { key: "webapp", label: locale === "fr" ? "Applications Web & Portails" : "Web Apps & Portals" },
    { key: "showcase", label: locale === "fr" ? "Sites Vitrines & Luxe" : "Luxury Showcases" },
    { key: "construction", label: locale === "fr" ? "BTP & Architecture" : "Construction & BTP" },
  ];

  const filteredProjects = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.categoryKey === activeFilter);

  return (
    <div className="w-full">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-14">
        {filters.map((f) => {
          const isActive = activeFilter === f.key;
          return (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-slate-900 text-white shadow-md shadow-slate-900/10 scale-105"
                  : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 shadow-sm"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {filteredProjects.map((project, pIdx) => (
          <article
            key={project.id}
            itemScope
            itemType="https://schema.org/CreativeWork"
            className="flex flex-col"
          >
            <SpotlightCard
              spotlightColor="rgba(59, 130, 246, 0.12)"
              borderColor="rgba(59, 130, 246, 0.35)"
              className="flex flex-col justify-between h-full group bg-white border border-slate-200/90 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.06)] hover:shadow-[0_16px_36px_-6px_rgba(59,130,246,0.14)]"
            >
              <div>
                {/* Browser-like window header */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-200 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 font-medium truncate max-w-[150px]">
                    {project.domain}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Production live" />
                </div>

                {/* Hero Thumbnail */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 border-b border-slate-100">
                  <Image
                    src={project.heroImage}
                    alt={`${project.title} - ${project.category[locale]} par SocialBadi`}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    priority={pIdx < 3}
                    itemProp="image"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60" />
                  <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold bg-white/95 backdrop-blur-md text-slate-900 shadow-sm">
                    {project.category[locale]}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-50 p-1 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0 shadow-sm">
                      <Image
                        src={project.logo}
                        alt={`Logo ${project.client}`}
                        width={28}
                        height={28}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <div>
                      <h2
                        itemProp="name"
                        className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors"
                      >
                        <Link href={`/${locale}/projects/${project.slug}`}>
                          {project.title}
                        </Link>
                      </h2>
                      <p className="text-xs text-slate-500 font-medium">
                        {project.client} • {project.year}
                      </p>
                    </div>
                  </div>

                  <p
                    itemProp="description"
                    className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5 line-clamp-3"
                  >
                    {project.summary[locale]}
                  </p>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.techStack.slice(0, 4).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-50 text-slate-700 border border-slate-200 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Color palette preview */}
                  <div className="flex items-center gap-2 pt-3 border-t border-slate-100 mb-6">
                    <span className="text-[11px] text-slate-500 font-semibold font-mono">
                      {locale === "fr" ? "Design Palette :" : "Color Identity:"}
                    </span>
                    <div className="flex gap-1.5">
                      {project.colorPalette.map((c, cIdx) => (
                        <div
                          key={cIdx}
                          className="w-4 h-4 rounded-full border border-slate-300 shadow-xs"
                          style={{ backgroundColor: c.hex }}
                          title={`${c.name} (${c.hex})`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex items-center gap-2.5">
                <button
                  onClick={() => setSelectedCaseStudy(project)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all text-center shadow-sm cursor-pointer"
                >
                  {locale === "fr" ? "Étude de Cas Complète" : "View Full Case Study"}
                </button>

                <Link
                  href={`/${locale}/projects/${project.slug}`}
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200 transition-all"
                  title={locale === "fr" ? "Page dédiée du projet" : "Dedicated project page"}
                >
                  <Eye className="w-4 h-4" />
                </Link>

                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-200 transition-all shadow-sm"
                  title={locale === "fr" ? "Visiter le site en ligne" : "Visit live site"}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </SpotlightCard>
          </article>
        ))}
      </div>

      {/* Case Study Modal */}
      {selectedCaseStudy && (
        <ProjectCaseStudyModal
          project={selectedCaseStudy}
          locale={locale}
          onClose={() => setSelectedCaseStudy(null)}
        />
      )}
    </div>
  );
}
