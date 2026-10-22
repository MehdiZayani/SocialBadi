"use client";

import React from "react";
import Image from "next/image";

export interface PartnerBrand {
  id: string;
  name: string;
  slug?: string;
  logo: string;
  url?: string;
}

export const PARTNER_LOGOS: PartnerBrand[] = [
  {
    id: "badi-crm",
    name: "BadiCRM",
    slug: "badi-crm",
    logo: "/logos/badi-crm.png",
    url: "https://www.badicrm.com/",
  },
  {
    id: "lucci-design",
    name: "Lucci Design",
    slug: "lucci-design",
    logo: "/logos/lucci-design.png",
    url: "https://luccidesign.tn/",
  },
  {
    id: "meraki-club",
    name: "Meraki Club",
    slug: "meraki-club",
    logo: "/logos/Meraki-Club.webp",
  },
  {
    id: "olympe-thalasso",
    name: "Olympe Thalasso",
    slug: "olympe-thalasso",
    logo: "/logos/olympe-thalasso.jpg",
  },
  {
    id: "zitouna",
    name: "Restaurant Zitouna",
    slug: "zitouna-menu",
    logo: "/logos/zitouna.png",
    url: "https://zitounamenu.vercel.app/",
  },
  {
    id: "archi-renov",
    name: "Archi Renov Paris",
    slug: "archi-renov",
    logo: "/logos/archi-renov.png",
    url: "https://archi-renov.com/",
  },
];

interface PartnersSlideshowProps {
  locale?: "fr" | "en";
  onSelectProject?: (slug: string) => void;
}

export default function PartnersSlideshow({
  onSelectProject,
}: PartnersSlideshowProps) {
  // Multiply list for continuous infinite loop marquee
  const marqueeItems = [
    ...PARTNER_LOGOS,
    ...PARTNER_LOGOS,
    ...PARTNER_LOGOS,
    ...PARTNER_LOGOS,
  ];

  return (
    <div className="relative w-full overflow-hidden py-4 sm:py-8">
      {/* Soft gradient edge masks - compact on mobile so logos remain visible */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-20 md:w-36 z-20 bg-gradient-to-r from-[#fcfcfd] via-[#fcfcfd]/90 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-20 md:w-36 z-20 bg-gradient-to-l from-[#fcfcfd] via-[#fcfcfd]/90 to-transparent" />

      {/* Infinite scrolling track with optimized mobile spacing */}
      <div className="flex w-max items-center animate-marquee hover:[animation-play-state:paused]">
        {marqueeItems.map((partner, index) => (
          <div
            key={`${partner.id}-${index}`}
            onClick={() => {
              if (partner.slug && onSelectProject) {
                onSelectProject(partner.slug);
              } else if (partner.url) {
                window.open(partner.url, "_blank");
              }
            }}
            className="px-3 sm:px-6 md:px-9 flex items-center justify-center cursor-pointer group shrink-0"
            title={partner.name}
          >
            <div className="relative h-11 sm:h-16 md:h-20 w-28 sm:w-40 md:w-52 flex items-center justify-center">
              <Image
                src={partner.logo}
                alt={partner.name}
                width={220}
                height={80}
                sizes="(max-width: 640px) 140px, (max-width: 1024px) 180px, 220px"
                className="max-h-full max-w-full object-contain filter opacity-85 hover:opacity-100 group-hover:scale-105 transition-all duration-300 rounded-md"
                priority={index < 6}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
