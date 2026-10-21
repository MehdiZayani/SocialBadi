import { MetadataRoute } from 'next';
import { projectsData } from '@/lib/projectsData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://socialbadi.com';
  const languages = ['fr', 'en'];

  const sitemap: MetadataRoute.Sitemap = [];

  // Root URL
  sitemap.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
  });

  languages.forEach((lang) => {
    // Language home
    sitemap.push({
      url: `${baseUrl}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    });

    // Main Projects page
    sitemap.push({
      url: `${baseUrl}/${lang}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });

    // Each case study individual project page
    projectsData.forEach((project) => {
      sitemap.push({
        url: `${baseUrl}/${lang}/projects/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.85,
      });
    });

    // Static subpages
    sitemap.push({
      url: `${baseUrl}/${lang}/legal`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    });

    sitemap.push({
      url: `${baseUrl}/${lang}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    });
  });

  return sitemap;
}
