import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://socialbadi.com';
  const languages = ['fr', 'en'];
  
  // Generate URLs for each language
  const routes = [
    '',
    '/contact',
    '/pricing',
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  // Add root URL
  sitemap.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  });

  // Add language-specific pages
  languages.forEach((lang) => {
    routes.forEach((route) => {
      sitemap.push({
        url: `${baseUrl}/${lang}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 0.9 : 0.8,
      });
    });
  });

  return sitemap;
}
