import type { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import { getAllPosts } from '@/lib/blog';

const BASE_URL = 'https://devtest512.info';
const appDirectory = path.join(process.cwd(), 'app');

function getStaticRoutesFromAppDir(directory: string, currentPath = ''): string[] {
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  const routes: string[] = [];

  if (entries.some((entry) => entry.isFile() && entry.name === 'page.tsx')) {
    const segments = currentPath
      .split(path.sep)
      .filter(Boolean)
      .filter((segment) => !segment.startsWith('(') && !segment.startsWith('@'));

    routes.push(segments.length === 0 ? '/' : `/${segments.join('/')}`);
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    if (entry.name.startsWith('[')) {
      continue;
    }

    const nestedDirectory = path.join(directory, entry.name);
    const nestedPath = path.join(currentPath, entry.name);
    routes.push(...getStaticRoutesFromAppDir(nestedDirectory, nestedPath));
  }

  return routes;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const staticRoutes = getStaticRoutesFromAppDir(appDirectory);

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: route === '/' ? BASE_URL : `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/' || route === '/blog' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1.0 : route === '/blog' ? 0.9 : 0.8,
  }));

  const sitemapEntries = [...staticEntries, ...blogEntries];
  const dedupedEntries = Array.from(new Map(sitemapEntries.map((entry) => [entry.url, entry])).values());

  return dedupedEntries;
}
