import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { cities } from '@/lib/cities';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/dumpster-rentals',
    '/construction-debris',
    '/contractors',
    '/residential',
    '/pricing',
    '/about',
    '/faq',
    '/service-areas',
    '/contact',
    '/quote',
  ].map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const cityRoutes = cities.map((c) => ({
    url: `${site.url}/service-areas/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...cityRoutes];
}
