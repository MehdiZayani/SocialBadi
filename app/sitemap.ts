import { MetadataRoute } from 'next';
import { projectsData } from '@/lib/projectsData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://socialbadi.com';
  const languages = ['fr', 'en'];

  const sitemap: MetadataRoute.Sitemap = [];

  // Only include real canonical 200-OK URLs in the sitemap with bidirectional hreflang
  languages.forEach((lang) => {
    // Language home (Priority 1.0 for main languages)
    sitemap.push({
      url: `${baseUrl}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: lang === 'fr' ? 1.0 : 0.9,
      alternates: {
        languages: {
          fr: `${baseUrl}/fr`,
          en: `${baseUrl}/en`,
          'x-default': `${baseUrl}/fr`,
        },
      },
    });

    // Main Projects page
    sitemap.push({
      url: `${baseUrl}/${lang}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          fr: `${baseUrl}/fr/projects`,
          en: `${baseUrl}/en/projects`,
          'x-default': `${baseUrl}/fr/projects`,
        },
      },
    });

    // Each case study individual project page
    projectsData.forEach((project) => {
      sitemap.push({
        url: `${baseUrl}/${lang}/projects/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.85,
        alternates: {
          languages: {
            fr: `${baseUrl}/fr/projects/${project.slug}`,
            en: `${baseUrl}/en/projects/${project.slug}`,
            'x-default': `${baseUrl}/fr/projects/${project.slug}`,
          },
        },
      });
    });

    // Static subpages
    sitemap.push({
      url: `${baseUrl}/${lang}/legal`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
      alternates: {
        languages: {
          fr: `${baseUrl}/fr/legal`,
          en: `${baseUrl}/en/legal`,
          'x-default': `${baseUrl}/fr/legal`,
        },
      },
    });

    sitemap.push({
      url: `${baseUrl}/${lang}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
      alternates: {
        languages: {
          fr: `${baseUrl}/fr/privacy`,
          en: `${baseUrl}/en/privacy`,
          'x-default': `${baseUrl}/fr/privacy`,
        },
      },
    });
  });

  return sitemap;
}
