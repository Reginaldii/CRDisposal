import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['', '/partners', '/privacy', '/terms'].map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : route === '/partners' ? 0.6 : 0.4,
  }));
}
