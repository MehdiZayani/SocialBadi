export interface ProjectCaseStudy {
  id: string;
  slug: string;
  title: string;
  category: {
    fr: string;
    en: string;
  };
  categoryKey: 'showcase' | 'webapp' | 'construction' | 'saas';
  tagline: {
    fr: string;
    en: string;
  };
  client: string;
  year: string;
  location: string;
  url: string;
  domain: string;
  logo: string;
  heroImage: string;
  gallery: string[];
  summary: {
    fr: string;
    en: string;
  };
  challenge: {
    fr: string;
    en: string;
  };
  solution: {
    fr: string;
    en: string;
  };
  colorPalette: {
    name: string;
    hex: string;
    usage: {
      fr: string;
      en: string;
    };
    rationale: {
      fr: string;
      en: string;
    };
  }[];
  typography: {
    fontName: string;
    type: string;
    usage: {
      fr: string;
      en: string;
    };
    rationale: {
      fr: string;
      en: string;
    };
  }[];
  techStack: string[];
  results: {
    metric: string;
    label: {
      fr: string;
      en: string;
    };
  }[];
  features: {
    fr: string[];
    en: string[];
  };
  themeColor: string;
  accentBorder: string;
  glowColor: string;
  btnGradient: string;
}

export const projectsData: ProjectCaseStudy[] = [
  {
    id: "badi-crm",
    slug: "badi-crm",
    title: "BadiCRM",
    client: "BadiCRM Inc.",
    year: "2025",
    location: "International / SaaS",
    category: {
      fr: "Plateforme SaaS & Sales OS Intelligent",
      en: "SaaS Platform & Intelligent Sales OS"
    },
    categoryKey: "saas",
    tagline: {
      fr: "Scale revenue with intelligent CRM — The next generation of Sales OS",
      en: "Scale revenue with intelligent CRM — The next generation of Sales OS"
    },
    url: "https://www.badicrm.com/",
    domain: "badicrm.com",
    logo: "/logos/badi-crm.png",
    heroImage: "/projects/badi-crm.jpg",
    gallery: [
      "/projects/badi-crm.jpg",
      "/projects/badi-crm-features.jpg"
    ],
    summary: {
      fr: "Conception complète de la plateforme SaaS BadiCRM. Un système d'exploitation commercial nouvelle génération alimenté par l'IA pour centraliser les contacts, piloter les pipelines visuels, automatiser les relances omnicanales (Twilio SMS / appels) et accélérer la signature de deals.",
      en: "Full design and engineering of the BadiCRM SaaS platform. An intelligent sales OS powered by AI to manage contacts, drive visual drag-and-drop pipelines, automate multichannel outreach (Twilio SMS/calls), and close deals at scale."
    },
    challenge: {
      fr: "Concevoir une interface SaaS ultra-rapide capable de rivaliser avec les leaders du marché (HubSpot, Pipedrive) tout en offrant une expérience utilisateur sans aucune latence, des enrichissements de contacts instantanés via l'IA et une intégration de téléphonie/SMS fluide.",
      en: "Engineer a high-performance SaaS product rivaling industry leaders, featuring zero-latency UX, real-time AI contact enrichment, and frictionless automated Twilio communications."
    },
    solution: {
      fr: "Architecture full-stack Next.js avec base de données temps réel, pipelines Kanban interactifs, Hub d'Intelligence Artificielle pour l'analyse prédictive des leads et moteur d'automatisation des relances commerciales.",
      en: "Full-stack Next.js App Router architecture with real-time sync, visual Kanban pipelines, AI Intelligence Hub for predictive lead scoring, and automated outreach triggers."
    },
    colorPalette: [
      {
        name: "Indigo Électrique & Bleu Cyber",
        hex: "#6366f1",
        usage: {
          fr: "Accents principaux, boutons d'action & badges IA",
          en: "Primary accents, CTA buttons & AI badges"
        },
        rationale: {
          fr: "Symbole universel de la haute technologie, de la vitesse d'exécution et de l'intelligence artificielle. Il insuffle dynamisme et modernité à toute l'interface.",
          en: "Universal symbol of cutting-edge technology, computational speed, and artificial intelligence, injecting energy and modern SaaS prestige."
        }
      },
      {
        name: "Violet Cyber & Néon Glow",
        hex: "#a855f7",
        usage: {
          fr: "Gradients de marque, halos lumineux & statuts de deals",
          en: "Brand gradients, glowing auras & deal statuses"
        },
        rationale: {
          fr: "Apporte une touche distinctive, futuriste et haut de gamme qui démarque BadiCRM des CRM d'ancienne génération souvent ternes.",
          en: "Provides a distinctive futuristic aesthetic separating BadiCRM from legacy grey enterprise software."
        }
      },
      {
        name: "Noir Obsidian Profond",
        hex: "#030712",
        usage: {
          fr: "Fond d'écran sombre & contraste des tableaux de bord",
          en: "Dark mode background & high-contrast dashboards"
        },
        rationale: {
          fr: "Réduit la fatigue oculaire des équipes commerciales qui utilisent le CRM toute la journée, tout en sublimant les métriques et graphiques colorés.",
          en: "Reduces eye strain during extended work hours while creating crisp contrast for data visualizations and kanban cards."
        }
      }
    ],
    typography: [
      {
        fontName: "Plus Jakarta Sans / Modern Sans",
        type: "Sans-Serif Géométrique Ultra-Moderne",
        usage: {
          fr: "Titres principaux, métriques clés & navigation",
          en: "Headings, primary metrics & navigation"
        },
        rationale: {
          fr: "Des formes nettes et contemporaines adaptées aux plateformes de productivité, offrant une lisibilité maximale pour les chiffres et les titres percutants.",
          en: "Crisp modern proportions tailored for high-density SaaS interfaces and high-impact headlines."
        }
      },
      {
        fontName: "Inter / System UI",
        type: "Sans-Serif de Haute Précision",
        usage: {
          fr: "Données de contacts, pipelines, formulaires & logs",
          en: "Contact tables, pipelines, forms & activity feeds"
        },
        rationale: {
          fr: "Garantit un alignement parfait au pixel près sur les grilles de données complexes et les fiches prospects.",
          en: "Engineered for pixel-perfect legibility across complex multi-column data grids and contact cards."
        }
      }
    ],
    techStack: [
      "Next.js App Router",
      "React 19",
      "TailwindCSS",
      "Twilio API (SMS & Voice)",
      "AI Intelligence Engine",
      "Real-Time Kanban Pipeline",
      "PostgreSQL / Edge DB",
      "Vercel Cloud"
    ],
    results: [
      {
        metric: "+320%",
        label: {
          fr: "Productivité des équipes de vente",
          en: "Sales team productivity increase"
        }
      },
      {
        metric: "< 150ms",
        label: {
          fr: "Temps de réponse de l'interface & IA",
          en: "Interface & AI query latency"
        }
      },
      {
        metric: "99.9%",
        label: {
          fr: "Disponibilité & Uptime serveur",
          en: "High-availability SLA uptime"
        }
      }
    ],
    features: {
      fr: [
        "Intelligence Hub : profils de prospects automatiquement enrichis par IA",
        "Visual Pipeline : suivi des opportunités par Kanban interactif drag-and-drop",
        "Smart Activity Sync : centralisation automatique des échanges et emails",
        "Twilio Outreach : automatisation des relances SMS et campagnes d'appels",
        "Predictive Analytics : prévisions de chiffre d'affaires et taux de clôture"
      ],
      en: [
        "Intelligence Hub: AI-enriched lead & contact profiles",
        "Visual Pipeline: Drag-and-drop Kanban opportunity tracker",
        "Smart Activity Sync: Automated email and meeting logging",
        "Twilio Outreach: Automated SMS and voice outreach workflows",
        "Predictive Analytics: Revenue forecasts and conversion trends"
      ]
    },
    themeColor: "from-indigo-500/25 via-purple-500/15 to-transparent",
    accentBorder: "group-hover:border-indigo-500/50",
    glowColor: "rgba(99, 102, 241, 0.25)",
    btnGradient: "from-indigo-600 via-purple-600 to-indigo-700 hover:shadow-indigo-500/40"
  },
  {
    id: "meraki-club",
    slug: "meraki-club",
    title: "Meraki Club",
    client: "Meraki Club Paris",
    year: "2025",
    location: "Paris / International",
    category: {
      fr: "Plateforme Membres, IA Concierge & Système de Gestion",
      en: "Members Platform, AI Concierge & Club Management System"
    },
    categoryKey: "webapp",
    tagline: {
      fr: "Expérience club exclusive : conciergerie IA, adhésions VIP, analytics en temps réel et paiements Revolut Business.",
      en: "Exclusive club experience: AI concierge, VIP memberships, real-time analytics, and Revolut Business payments."
    },
    url: "https://www.merakiclub.fr",
    domain: "merakiclub.fr",
    logo: "/logos/Meraki-Club.webp",
    heroImage: "/projects/meraki-club.jpg",
    gallery: [
      "/projects/meraki-club.jpg",
      "/projects/meraki-club-dashboard.jpg",
      "/projects/meraki-club-packages.jpg"
    ],
    summary: {
      fr: "Conception complète et développement full-stack de l'écosystème digital du Meraki Club avec Next.js 15 et Prisma ORM. La solution comprend un chatbot concierge intelligent disponible 24/7 pour les réservations VIP et l'accueil personnalisé, un portail de gestion de comptes membres avec pass numériques, un moteur de newsletter segmenté, l'encaissement sécurisé via les APIs Revolut Business et un back-office d'administration avancé doté de statistiques en temps réel.",
      en: "End-to-end design and full-stack engineering of Meraki Club's digital ecosystem with Next.js 15 and Prisma ORM. The solution features a 24/7 intelligent AI concierge chatbot for VIP reservations, a secure member portal with digital access passes, a targeted newsletter engine, automated payment processing via Revolut Business APIs, and an advanced admin dashboard with live business analytics."
    },
    challenge: {
      fr: "Allier l'élégance feutrée d'un club privé d'exception avec une infrastructure technologique de pointe. Les enjeux : gérer des réservations instantanées de tables et salons VIP, intégrer les paiements multi-devises automatisés via Revolut Business sans friction, garantir une sécurité sans faille des données membres avec Prisma ORM, et automatiser le support grâce à un chatbot IA tout en préservant le standard d'excellence du club.",
      en: "Harmonize the prestigious ambience of an elite private members club with cutting-edge digital infrastructure. Core challenges included seamless instant VIP bookings, automated multi-currency checkout via Revolut Business APIs, bulletproof data privacy via Prisma ORM, and high-touch conversational AI support handling 24/7 guest requests."
    },
    solution: {
      fr: "Architecture moderne Next.js App Router combinée à PostgreSQL et Prisma ORM. Intégration d'un agent conversationnel IA entraîné sur les services du club, mise en œuvre de webhooks et paiements Revolut Business Merchant, automatisation des campagnes de newsletters événementielles, et développement d'un tableau de bord d'administration sur-mesure pour visualiser le chiffre d'affaires, la fréquentation et les interactions membres en direct.",
      en: "Modern Next.js App Router architecture powered by PostgreSQL and Prisma ORM. Deployed a custom AI conversational agent trained on club concierge workflows, seamless Revolut Business Merchant webhooks for instant deposits, automated newsletter event dispatching, and a custom administrative dashboard tracking real-time revenue, footfall, and member engagement."
    },
    colorPalette: [
      {
        name: "Noir Obsidienne & Nuit Profonde",
        hex: "#0b0c10",
        usage: {
          fr: "Fond immersif, cartes de membres & contrastes",
          en: "Immersive backdrop, member cards & luxury contrast"
        },
        rationale: {
          fr: "Évoque l'atmosphère feutrée et mystérieuse des nuits parisiennes et des cercles privés d'exception.",
          en: "Evokes the moody, sophisticated atmosphere of private nightlife and exclusive members sanctuaries."
        }
      },
      {
        name: "Or Champagne & Ambre Doré",
        hex: "#d4af37",
        usage: {
          fr: "Accents dorés, badges VIP, boutons d'action & bordures",
          en: "Gold accents, VIP badges, primary CTAs & fine borders"
        },
        rationale: {
          fr: "Symbole intemporel de raffinement, de célébration et de haute distinction qui sublime chaque interaction visuelle.",
          en: "Timeless symbol of refined hospitality, celebration, and premium status elevating user engagement."
        }
      },
      {
        name: "Émeraude Fintech & Cyan",
        hex: "#10b981",
        usage: {
          fr: "Indicateurs de succès Revolut, métriques live & graphiques",
          en: "Revolut payment success badges, live telemetry & charts"
        },
        rationale: {
          fr: "Assure une lisibilité instantanée des flux financiers et des indicateurs de performance dans le tableau de bord admin.",
          en: "Provides instant readability for financial flows, transaction confirmations, and live admin analytics."
        }
      }
    ],
    typography: [
      {
        fontName: "Playfair Display / Cormorant",
        type: "Serif Haut de Gamme & Titrages Nobles",
        usage: {
          fr: "Titres principaux, devises du club & cartes d'invitation",
          en: "Main display titles, club mottos & invitation cards"
        },
        rationale: {
          fr: "Apporte le cachet aristocratique et l'héritage visuel propre aux institutions de prestige et aux clubs privés.",
          en: "Infuses classic luxury heritage and editorial dignity typical of prestigious private clubs."
        }
      },
      {
        fontName: "Plus Jakarta Sans / Inter",
        type: "Sans-Serif Géométrique Ultra-Lisible",
        usage: {
          fr: "Dashboard admin, chat IA, formulaires de réservation & métriques",
          en: "Admin dashboard, AI chat, booking forms & metrics"
        },
        rationale: {
          fr: "Garantit une ergonomie parfaite et une précision totale lors des saisies de réservation et de la consultation des statistiques financières.",
          en: "Guarantees zero friction and crisp clarity during reservation checkouts and live analytics monitoring."
        }
      }
    ],
    techStack: [
      "Next.js 15 (App Router & Server Actions)",
      "Prisma ORM & PostgreSQL",
      "Revolut Business API (Merchant Checkout)",
      "AI Concierge Chatbot (Natural Language)",
      "Newsletter Engine & Event Campaigns",
      "Advanced Admin Dashboard & Live Stats",
      "Member Account Management & Digital Pass",
      "TailwindCSS & Framer Motion"
    ],
    results: [
      {
        metric: "+320%",
        label: {
          fr: "Croissance des réservations VIP automatisées",
          en: "Increase in automated VIP reservations"
        }
      },
      {
        metric: "< 2.5s",
        label: {
          fr: "Temps de réponse de la conciergerie IA 24/7",
          en: "24/7 AI concierge average response time"
        }
      },
      {
        metric: "99.8%",
        label: {
          fr: "Taux de succès des paiements Revolut Business",
          en: "Revolut Business payment success rate"
        }
      },
      {
        metric: "+54%",
        label: {
          fr: "Taux d'ouverture des newsletters d'événements privés",
          en: "Open rate on private event newsletters"
        }
      }
    ],
    features: {
      fr: [
        "Chatbot IA concierge 24/7 : qualification des demandes et réservation de tables VIP",
        "Passerelle de paiement Revolut Business : acomptes en ligne et encaissement multi-devises",
        "Dashboard d'administration avancé : suivi de fréquentation, KPIs et chiffre d'affaires en direct",
        "Gestionnaire de newsletter intégré : segmentation des membres et annonces de soirées exclusives",
        "Gestion de comptes membres : profils VIP, historique de visites et pass d'accès numérique",
        "Stack moderne Next.js 15 & Prisma ORM avec base PostgreSQL haute performance"
      ],
      en: [
        "24/7 AI concierge chatbot: automated guest qualification and instant table booking",
        "Revolut Business gateway: frictionless online deposits and multi-currency checkouts",
        "Advanced admin control center: live visitor tracking, financial KPIs, and attendance analytics",
        "Integrated newsletter engine: automated member segmentation and exclusive event announcements",
        "Member account management: tiered VIP profiles, visit logs, and digital passes",
        "High-performance Next.js 15 & Prisma ORM stack backed by PostgreSQL database"
      ]
    },
    themeColor: "from-amber-500/20 via-orange-500/10 to-transparent",
    accentBorder: "group-hover:border-amber-500/50",
    glowColor: "rgba(212, 175, 55, 0.20)",
    btnGradient: "from-amber-600 to-yellow-600 hover:shadow-amber-500/30"
  },
  {
    id: "lucci",
    slug: "lucci-design",
    title: "Lucci Design",
    client: "Lucci Design",
    year: "2025",
    location: "Tunis / Sousse",
    category: {
      fr: "Site Web Vitrine & Agencement de Luxe",
      en: "Luxury Showcase Website & Interior Design"
    },
    categoryKey: "showcase",
    tagline: {
      fr: "Le créateur de vos envies — Menuiserie raffinée & cuisines sur-mesure",
      en: "The creator of your desires — Refined woodwork & bespoke kitchens"
    },
    url: "https://luccidesign.tn/",
    domain: "luccidesign.tn",
    logo: "/logos/lucci-design.png",
    heroImage: "/projects/lucci-design.jpg",
    gallery: [
      "/projects/lucci-design.jpg",
      "/projects/lucci-cuisine.jpg",
      "/projects/lucci-dressing.jpg"
    ],
    summary: {
      fr: "Conception complète de la plateforme vitrine haut de gamme pour Lucci Design. Présentation immersive des collections de cuisines italiennes, dressings sur-mesure, boiseries d'art et système de prise de rendez-vous qualifié.",
      en: "Full design and development of the high-end digital showcase for Lucci Design. Immersive showcase of Italian luxury kitchens, custom dressings, bespoke woodwork, and automated consultation booking."
    },
    challenge: {
      fr: "Lucci Design avait besoin d'un univers digital à la hauteur du standing exceptionnel de ses créations en bois noble. L'enjeu était de transmettre immédiatement une sensation de prestige, de modernité et de faciliter la prise de contact pour des projets à fort panier moyen.",
      en: "Lucci Design required a digital platform matching the exceptional craftsmanship of their bespoke noble wood creations. The goal was to instantly convey luxury and architectural precision while streamlining qualified consultation requests."
    },
    solution: {
      fr: "Nous avons conçu une interface épurée avec une photographie plein écran, un simulateur interactif de projets, un catalogue dynamique et un tunnel de prise de rendez-vous fluide avec rappels automatiques.",
      en: "We crafted a minimalist high-impact interface with full-screen photography, interactive project configurator, dynamic category catalogs, and a streamlined consultation booking funnel."
    },
    colorPalette: [
      {
        name: "Noir Onyx & Anthracite Profond",
        hex: "#0b0b0f",
        usage: {
          fr: "Fond principal & contrastes de luxe",
          en: "Primary background & luxury contrast"
        },
        rationale: {
          fr: "Le noir profond symbolise l'élégance absolue et fait ressortir avec intensité la chaleur et le veinage naturel des meubles en bois et des marbres de cuisine.",
          en: "Deep obsidian black conveys timeless elegance and accentuates the natural grain, warmth, and texture of noble wood and kitchen marbles."
        }
      },
      {
        name: "Rouge Rubis & Carmin",
        hex: "#e11d48",
        usage: {
          fr: "Boutons d'action (CTA) & accents de marque",
          en: "Call-to-action buttons & brand accents"
        },
        rationale: {
          fr: "Couleur identitaire du logo Lucci. Elle capte instantanément le regard sur les points d'interaction clés (Prendre RDV, Contact) sans altérer le calme visuel du site.",
          en: "Signature color of the Lucci brand. It guides user attention toward key conversion touchpoints (Book Appointment, Contact) with high contrast."
        }
      },
      {
        name: "Blanc Pur & Ivoire",
        hex: "#ffffff",
        usage: {
          fr: "Typographie principale & aération",
          en: "Primary typography & spatial breathing"
        },
        rationale: {
          fr: "Garantit une lisibilité irréprochable et crée des espaces négatifs généreux, caractéristiques des marques de haute facture.",
          en: "Ensures flawless legibility and generous negative space, a signature trait of luxury architectural portfolios."
        }
      }
    ],
    typography: [
      {
        fontName: "Geist Sans / Modern Sans",
        type: "Sans-Serif Géométrique",
        usage: {
          fr: "Titres principaux & navigation",
          en: "Headings & main navigation"
        },
        rationale: {
          fr: "Des tracés épurés et géométriques qui rappellent la précision d'assemblage et les coupes millimétrées de la menuiserie contemporaine.",
          en: "Clean geometric proportions echoing the precision, clean lines, and millimeter craftsmanship of contemporary woodworking."
        }
      },
      {
        fontName: "Inter / System Sans",
        type: "Sans-Serif Neutre & Fluide",
        usage: {
          fr: "Textes de description & fiches produits",
          en: "Body descriptions & product specifications"
        },
        rationale: {
          fr: "Optimisée pour les écrans rétina, elle offre un confort de lecture optimal même lors de la consultation des détails techniques de matériaux.",
          en: "Engineered for crystal-clear readability across all mobile and retina displays when reading technical wood specifications."
        }
      }
    ],
    techStack: [
      "Next.js App Router",
      "React 19",
      "TailwindCSS",
      "Framer Motion",
      "Automated Lead Funnel",
      "Vercel CDN Edge"
    ],
    results: [
      {
        metric: "+180%",
        label: {
          fr: "Demandes de rendez-vous qualifiés",
          en: "Qualified consultation requests"
        }
      },
      {
        metric: "< 0.6s",
        label: {
          fr: "Temps de chargement moyen",
          en: "Average load time"
        }
      },
      {
        metric: "100%",
        label: {
          fr: "Satisfaction client & prestige de marque",
          en: "Client satisfaction & brand standing"
        }
      }
    ],
    features: {
      fr: [
        "Catalogue interactif (Cuisines, Dressings, Portes, Meubles de bain)",
        "Simulateur de projet et configurateur d'échantillons",
        "Formulaire de réservation de rendez-vous synchronisé",
        "Architecture SEO optimisée pour le marché du design haut de gamme"
      ],
      en: [
        "Interactive catalog (Kitchens, Dressings, Doors, Bath Vanity)",
        "Custom project quote simulator and wood sample picker",
        "Synchronized appointment scheduling funnel",
        "Engineered SEO architecture for luxury interior design"
      ]
    },
    themeColor: "from-rose-500/20 via-amber-500/10 to-transparent",
    accentBorder: "group-hover:border-rose-500/50",
    glowColor: "rgba(244, 63, 94, 0.18)",
    btnGradient: "from-rose-600 to-amber-600 hover:shadow-rose-500/30"
  },
  {
    id: "zitouna",
    slug: "zitouna-menu",
    title: "Menu Zitouna",
    client: "Restaurant & Café Zitouna",
    year: "2025",
    location: "Tunisie",
    category: {
      fr: "Application Web Mobile & Menu QR Code",
      en: "Mobile Web App & Interactive QR Menu"
    },
    categoryKey: "webapp",
    tagline: {
      fr: "Savourez chaque instant — Carte digitale & expérience gastronomique",
      en: "Savor every moment — Digital menu & dining experience"
    },
    url: "https://zitounamenu.vercel.app/",
    domain: "zitounamenu.vercel.app",
    logo: "/logos/zitouna.png",
    heroImage: "/projects/zitouna-menu.jpg",
    gallery: [
      "/projects/zitouna-menu.jpg"
    ],
    summary: {
      fr: "Application web ultra-rapide de menu interactif scannable par QR code pour restaurant et coffee bar. Navigation fluide par carrousel de catégories, mise en valeur des formules petit-déjeuner, brunch, salades, plats et boissons.",
      en: "Ultra-fast interactive digital QR menu web application for restaurant and coffee bar. Fluid category carousels highlighting breakfast sets, gourmet toasts, bowls, meals, and specialty coffee."
    },
    challenge: {
      fr: "Supprimer les cartes papier statiques tout en offrant une expérience d'accès instantanée sans téléchargement d'application mobile, avec une esthétique chaleureuse et gourmande qui stimule les commandes.",
      en: "Eliminate static paper menus by providing an instantaneous web app experience requiring zero app store download, with warm gastronomic aesthetics driving higher average order value."
    },
    solution: {
      fr: "Développement d'une Web App PWA ultra-légère avec barre de navigation horizontale tactile collante (sticky), chargement instantané des sections et design contrasté pensé pour l'usage en salle et terrasse.",
      en: "Developed an ultra-lightweight PWA web app featuring a sticky touch-friendly category bar, instantaneous sub-0.5s loading, and high-contrast styling optimized for outdoor daylight and indoor mood lighting."
    },
    colorPalette: [
      {
        name: "Vert Forêt & Olive Sombre",
        hex: "#182618",
        usage: {
          fr: "Fond texturé & identité du lieu",
          en: "Textured background & botanical identity"
        },
        rationale: {
          fr: "Hommage direct à l'olivier ('Zitouna'). Cette teinte naturelle inspire la fraîcheur, le bio, la tranquillité et offre une ambiance feutrée agréable pour les yeux.",
          en: "Direct tribute to the olive tree ('Zitouna'). Evokes natural freshness, organic quality, relaxation, and soothing contrast under daylight."
        }
      },
      {
        name: "Ambre Doré & Crème Érable",
        hex: "#eedab7",
        usage: {
          fr: "Typographie principale & prix",
          en: "Primary typography & pricing"
        },
        rationale: {
          fr: "Rappelle la couleur de la croûte dorée des viennoiseries, de la mousse du café et du miel, stimulant l'appétit et le sentiment de chaleur gourmande.",
          en: "Recalls golden pastry crusts, caramel honey, and crema coffee, scientifically stimulating appetite and culinary pleasure."
        }
      },
      {
        name: "Terracotta & Caramel Épicé",
        hex: "#c9782b",
        usage: {
          fr: "Catégories actives & sous-titres",
          en: "Active category indicators & subtitles"
        },
        rationale: {
          fr: "Apporte du relief et guide naturellement le parcours de découverte du client d'une catégorie à l'autre.",
          en: "Adds depth and naturally guides customers through the menu sections from appetizers to specialty drinks."
        }
      }
    ],
    typography: [
      {
        fontName: "Zoxi Regular / LaLuxes",
        type: "Sérif Calligraphique Élégant",
        usage: {
          fr: "Titres de sections & en-têtes artistiques",
          en: "Section headings & artistic accents"
        },
        rationale: {
          fr: "Apporte une signature artisanale digne des brasseries et cafés de charme européens, valorisant le savoir-faire des chefs et baristas.",
          en: "Bestows an artisanal culinary flair reminiscent of luxury European cafes and gourmet bistros."
        }
      },
      {
        fontName: "Myriad Pro / System Sans",
        type: "Sans-Serif Équilibrée",
        usage: {
          fr: "Noms des plats, ingrédients & tarifs",
          en: "Dish names, ingredients & pricing"
        },
        rationale: {
          fr: "Assure un déchiffrage instantané des ingrédients et allergènes sur écran de smartphone, même sous forte luminosité.",
          en: "Guarantees instant scanning of ingredients and prices on smartphone screens in bright terrace sunlight."
        }
      }
    ],
    techStack: [
      "React 19",
      "Next.js App Router",
      "TailwindCSS",
      "Touch Scroll Engine",
      "Zero-Install Web App",
      "QR Code Fast Gateway"
    ],
    results: [
      {
        metric: "< 0.4s",
        label: {
          fr: "Temps d'ouverture par scan QR",
          en: "Instant scan-to-table load time"
        }
      },
      {
        metric: "100%",
        label: {
          fr: "Compatibilité smartphones iOS & Android",
          en: "iOS & Android smartphone compatibility"
        }
      },
      {
        metric: "+25%",
        label: {
          fr: "Augmentation des commandes de desserts & boissons",
          en: "Increase in beverage and dessert orders"
        }
      }
    ],
    features: {
      fr: [
        "Navigation tactile par défilement horizontal fluide",
        "Catégories complètes (Petit déj, Toasts, Gaufres, Bowls, Pâtes, Boissons)",
        "Affichage instantané des prix en dinars tunisiens",
        "Aucune application à télécharger — 100% accessible via navigateur"
      ],
      en: [
        "Fluid touch horizontal carousel category navigation",
        "Comprehensive food & drink menus (Breakfast, Toasts, Bowls, Pasta, Beverages)",
        "Instant responsive currency & pricing presentation",
        "Zero app store barrier — 100% browser instant load"
      ]
    },
    themeColor: "from-amber-500/20 via-emerald-500/10 to-transparent",
    accentBorder: "group-hover:border-amber-500/50",
    glowColor: "rgba(245, 158, 11, 0.18)",
    btnGradient: "from-amber-600 to-emerald-600 hover:shadow-amber-500/30"
  },
  {
    id: "archi-renov",
    slug: "archi-renov",
    title: "Archi Renov",
    client: "Archi Renov / IA Renov",
    year: "2025",
    location: "Paris & Île-de-France (75, 92, 78, 94)",
    category: {
      fr: "Plateforme B2C/B2B Rénovation & Architecture",
      en: "B2C/B2B Renovation & Architecture Platform"
    },
    categoryKey: "construction",
    tagline: {
      fr: "Pilotage de rénovation tous corps d'état à Paris & Île-de-France : gros œuvre et second œuvre",
      en: "Full-scale general contracting & remodeling in Paris & Greater Paris"
    },
    url: "https://archi-renov.com/",
    domain: "archi-renov.com",
    logo: "/logos/archi-renov.png",
    heroImage: "/projects/archi-renov.jpg",
    gallery: [
      "/projects/archi-renov.jpg",
      "/projects/archi-realisations.jpg"
    ],
    summary: {
      fr: "Plateforme digitale complète pour une entreprise générale de rénovation haut de gamme à Paris. Galerie de réalisations avant/après, simulateur d'estimation de devis en ligne, intégration CRM et tunnel publicitaire Google Ads & SEO géociblé.",
      en: "Comprehensive digital platform for a premier Paris general contracting firm. Before/after project gallery, online quote estimation simulator, CRM pipeline integration, and high-intent Google Ads & SEO campaigns."
    },
    challenge: {
      fr: "Le marché de la rénovation parisienne est très concurrentiel. L'objectif était d'instaurer une confiance absolue, de prouver la maîtrise des chantiers (gros œuvre, électricité, plomberie, finitions haut de gamme) et d'acquérir des dossiers de rénovation d'appartements et maisons à fort budget.",
      en: "The Parisian renovation market demands high trust and technical credibility. The mission was to showcase master craftsmanship across all trades while capturing high-value residential and commercial remodeling leads."
    },
    solution: {
      fr: "Création d'une plateforme axée sur la transparence des réalisations avec des filtres par pièce (salle de bain, cuisine, salon, appartement complet), des calculateurs d'estimation de travaux et une connexion directe au CRM pour relance immédiate.",
      en: "Built a high-converting platform focused on portfolio transparency with room filters (bathroom, kitchen, full apartment), online quote calculators, and automated CRM lead distribution."
    },
    colorPalette: [
      {
        name: "Or Bronze & Dorure Haussmannienne",
        hex: "#BF9A6D",
        usage: {
          fr: "Accents, boutons d'estimation & titres clés",
          en: "Accents, estimate buttons & key headings"
        },
        rationale: {
          fr: "Rappelle les dorures, le parquet point de Hongrie et les ferronneries des appartements haussmanniens de prestige à Paris.",
          en: "Evokes the architectural gilding, Hungarian point parquet, and ironwork of prestigious Parisian Haussmannian apartments."
        }
      },
      {
        name: "Bleu Nuit & Ardoise",
        hex: "#1d202f",
        usage: {
          fr: "En-tête, bannières & footer",
          en: "Header, section containers & footer"
        },
        rationale: {
          fr: "Incarne la rigueur de l'ingénierie, la solidité structurelle et la réassurance indispensable pour les chantiers de gros œuvre.",
          en: "Embodies technical engineering rigor, structural reliability, and high corporate credibility required for major renovations."
        }
      },
      {
        name: "Gris Minéral & Blanc Marbre",
        hex: "#f4f4f6",
        usage: {
          fr: "Fonds de cartes de réalisations & textes",
          en: "Project card containers & clean typography"
        },
        rationale: {
          fr: "Apporte clarté et modernité, assurant une mise en valeur optimale des photos de chantiers finis.",
          en: "Provides crisp contemporary contrast to let high-resolution before-and-after renovation photos shine."
        }
      }
    ],
    typography: [
      {
        fontName: "Montserrat",
        type: "Sans-Serif Architecturale & Majuscules",
        usage: {
          fr: "Titres principaux & bannières d'expertise",
          en: "Main headings & expertise banners"
        },
        rationale: {
          fr: "Inspirée des affiches urbaines et de la signalétique moderne, elle dégage une impression d'autorité et de professionnalisme sans compromis.",
          en: "Inspired by urban architectural signage, conveying technical authority, organization, and uncompromised craftsmanship."
        }
      },
      {
        fontName: "Poppins / Inter",
        type: "Sans-Serif Géométrique & Accessible",
        usage: {
          fr: "Textes explicatifs, fiches d'intervention & FAQ",
          en: "Service breakdowns, process steps & FAQ"
        },
        rationale: {
          fr: "Rend les explications techniques claires, conviviales et rassurantes pour les particuliers et architectes.",
          en: "Ensures technical scopes of work and pricing explanations remain approachable and reassuring for property owners."
        }
      }
    ],
    techStack: [
      "WordPress Headless & High Speed Cache",
      "Elementor Pro Custom Engine",
      "Automated Quote Calculator",
      "Google Ads Conversion Tracking",
      "CRM Lead Distribution",
      "Local SEO Paris & IDF"
    ],
    results: [
      {
        metric: "+240%",
        label: {
          fr: "Croissance des demandes de devis qualifiées",
          en: "Increase in qualified quote inquiries"
        }
      },
      {
        metric: "Top 3",
        label: {
          fr: "Positionnement Google sur les mots-clés cibles",
          en: "Google organic ranking on high-intent keywords"
        }
      },
      {
        metric: "100%",
        label: {
          fr: "Suivi des leads en temps réel via CRM",
          en: "Real-time lead tracking via CRM pipeline"
        }
      }
    ],
    features: {
      fr: [
        "Portfolio filtrable de réalisations avant/après par typologie",
        "Formulaire d'estimation de coût de travaux en temps réel",
        "Intégration directe au CRM pour relance sous 2 heures",
        "Stratégie publicitaire Google Ads & SEO géociblé 75, 92, 78, 94"
      ],
      en: [
        "Filterable before/after renovation project gallery by room type",
        "Real-time project cost estimation form",
        "Direct CRM sync with sub-2h automated follow-up",
        "High-intent Google Ads & hyper-local SEO campaign architecture"
      ]
    },
    themeColor: "from-blue-500/20 via-purple-500/10 to-transparent",
    accentBorder: "group-hover:border-blue-500/50",
    glowColor: "rgba(59, 130, 246, 0.18)",
    btnGradient: "from-blue-600 to-purple-600 hover:shadow-blue-500/30"
  },
  {
    id: "olympe-thalasso",
    slug: "olympe-thalasso",
    title: "L'Olympe Thalasso & Spa",
    client: "L'Olympe Thalasso & Spa",
    year: "2025",
    location: "Sousse / Tunisie",
    category: {
      fr: "Plateforme Vitrine Luxe & Réservation Thalasso",
      en: "Luxury Showcase & Thalassotherapy Booking"
    },
    categoryKey: "showcase",
    tagline: {
      fr: "L'art du bien-être méditerranéen : cures marines d'exception, soins thermaux et réservation en ligne fluide.",
      en: "The art of Mediterranean wellness: premier marine cures, thermal therapies, and seamless online bookings."
    },
    url: "https://olympe-thalasso.tn",
    domain: "olympe-thalasso.tn",
    logo: "/logos/olympe-thalasso.jpg",
    heroImage: "/projects/olympe-thalasso.jpg",
    gallery: [
      "/projects/olympe-thalasso.jpg",
      "/projects/olympe-soins.jpg"
    ],
    summary: {
      fr: "Refonte digitale complète et conception d'une plateforme vitrine d'exception pour L'Olympe Thalasso & Spa. Expérience sensorielle immersive présentant les cures marines traditionnelles, hydrothérapies, soins esthétiques et système de réservation directe optimisé pour la clientèle internationale.",
      en: "Complete digital redesign and engineering of a luxury showcase platform for L'Olympe Thalasso & Spa. Immersive sensory experience featuring authentic marine cures, hydrotherapy, thermal rituals, and a streamlined reservation pipeline catering to international wellness travelers."
    },
    challenge: {
      fr: "Moderniser l'image de marque du centre, sublimer la richesse des rituels marins et optimiser le parcours de réservation multilingue pour capter une clientèle touristique et locale haut de gamme en quête de séjours thermaux d'excellence.",
      en: "Elevate the center's digital prestige, showcase the sensory richness of marine spa rituals, and streamline the multilingual booking journey to attract international and regional wellness seekers."
    },
    solution: {
      fr: "Architecture Next.js haute performance avec design responsive axé sur l'élégance méditerranéenne, navigation fluide entre les différents centres et forfaits de soins, intégration d'un tunnel de réservation direct et stratégie SEO ciblée sur le thermalisme et le tourisme de santé.",
      en: "High-performance Next.js architecture with bespoke Mediterranean aesthetic, frictionless navigation across treatment centers and cure packages, direct online booking flow, and targeted international SEO for health tourism."
    },
    colorPalette: [
      {
        name: "Bleu Azur Méditerranéen",
        hex: "#0284c7",
        usage: {
          fr: "Accents océaniques, badges de soins & boutons d'action",
          en: "Oceanic accents, wellness badges & primary CTAs"
        },
        rationale: {
          fr: "Évoque la pureté de l'eau de mer, la sérénité des bassins thermaux et les bienfaits des soins d'hydrothérapie.",
          en: "Evokes the purity of seawater, thermal pools, and rejuvenating mineral-rich hydrotherapy treatments."
        }
      },
      {
        name: "Or Sable & Ambre Chaud",
        hex: "#d97706",
        usage: {
          fr: "Détails de luxe, distinctions & bordures raffinées",
          en: "Luxury highlights, prestige badges & refined trims"
        },
        rationale: {
          fr: "Rappelle la chaleur du soleil méditerranéen et le standing haut de gamme des rituels orientaux et hammams.",
          en: "Captures the golden warmth of the Mediterranean sun and the premium prestige of oriental spa rituals."
        }
      },
      {
        name: "Blanc Nacré & Minéral",
        hex: "#f8fafc",
        usage: {
          fr: "Fond des fiches de soins & contrastes visuels",
          en: "Treatment cards backdrop & clean contrasts"
        },
        rationale: {
          fr: "Apporte une sensation de fraîcheur, de propreté clinique et de légèreté propice à la détente absolue.",
          en: "Instills an aura of freshness, pristine clinical cleanliness, and lightness essential to holistic wellness."
        }
      }
    ],
    typography: [
      {
        fontName: "Playfair Display / Serif",
        type: "Serif Raffinée & Prestige Hôtelier",
        usage: {
          fr: "Titres principaux des rituels & en-têtes de cures",
          en: "Main ritual headings & cure package banners"
        },
        rationale: {
          fr: "Confère une élégance hôtelière cinq étoiles et un raffinement intemporel digne des plus grands spas européens.",
          en: "Brings 5-star hospitality sophistication and timeless luxury befitting premier European wellness retreats."
        }
      },
      {
        fontName: "Inter / Sans-Serif",
        type: "Sans-Serif Épurée & Précise",
        usage: {
          fr: "Fiches techniques des soins, durées, tarifs & FAQ",
          en: "Treatment descriptions, durations, pricing & FAQ"
        },
        rationale: {
          fr: "Garantit une lisibilité maximale pour les détails des soins et une prise de rendez-vous sans effort sur mobile.",
          en: "Delivers effortless mobile legibility for treatment protocols, schedules, and online reservations."
        }
      }
    ],
    techStack: [
      "Next.js 15 (App Router)",
      "TailwindCSS & Framer Motion",
      "Multilingual Architecture (FR / EN)",
      "Interactive Treatment Catalog",
      "Direct Booking Tunnel",
      "Medical & Wellness SEO Strategy"
    ],
    results: [
      {
        metric: "+280%",
        label: {
          fr: "Hausse des réservations de cures en ligne",
          en: "Increase in online cure reservations"
        }
      },
      {
        metric: "100%",
        label: {
          fr: "Expérience responsive fluide sur mobile",
          en: "Fluid mobile-first responsive experience"
        }
      },
      {
        metric: "+65%",
        label: {
          fr: "Trafic organique international (Europe & Maghreb)",
          en: "International organic traffic growth"
        }
      }
    ],
    features: {
      fr: [
        "Catalogue interactif des cures marines, massages du monde et rituels d'hydrothérapie",
        "Tunnel de réservation directe et demande de devis personnalisés pour séjours",
        "Présentation immersive des centres thermaux avec galeries visuelles haute définition",
        "Optimisation SEO internationale axée sur le tourisme de santé et la thalassothérapie"
      ],
      en: [
        "Interactive catalog of marine cures, world massages, and hydrotherapy rituals",
        "Direct reservation funnel and personalized wellness stay quote estimator",
        "Immersive showcase of thermal centers with high-definition visual galleries",
        "International wellness and medical tourism SEO optimization"
      ]
    },
    themeColor: "from-sky-500/20 via-amber-500/10 to-transparent",
    accentBorder: "group-hover:border-sky-500/50",
    glowColor: "rgba(2, 132, 199, 0.20)",
    btnGradient: "from-sky-600 to-blue-700 hover:shadow-sky-500/30"
  }
];

export function getProjectBySlug(slug: string): ProjectCaseStudy | undefined {
  return projectsData.find((p) => p.slug === slug || p.id === slug);
}
