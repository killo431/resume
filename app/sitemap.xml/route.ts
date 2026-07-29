import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getAllPosts } from '@/lib/blog';

const BASE_URL = 'https://devtest512.info';
const appDirectory = path.join(process.cwd(), 'app');

function getStaticRoutesFromAppDir(directory: string, currentPath = ''): string[] {
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(directory, { withFileTypes: true });
  } catch (error) {
    console.error(`Failed to read app directory for sitemap generation: ${directory}`, error);
    return [];
  }

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

function getRouteMetadata(route: string): { changeFrequency: 'weekly' | 'monthly'; priority: number } {
  if (route === '/') {
    return { changeFrequency: 'weekly', priority: 1.0 };
  }

  if (route === '/blog') {
    return { changeFrequency: 'weekly', priority: 0.9 };
  }

  return { changeFrequency: 'monthly', priority: 0.8 };
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const posts = getAllPosts();
  const staticRoutes = getStaticRoutesFromAppDir(appDirectory);

  type SitemapEntry = {
    url: string;
    lastModified: Date;
    changeFrequency: 'weekly' | 'monthly';
    priority: number;
  };

  const staticEntries: SitemapEntry[] = staticRoutes.map((route) => {
    const { changeFrequency, priority } = getRouteMetadata(route);
    return {
      url: route === '/' ? BASE_URL : `${BASE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    };
  });

  const blogEntries: SitemapEntry[] = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const allEntries = [...staticEntries, ...blogEntries];
  const dedupedEntries = Array.from(
    new Map(allEntries.map((entry) => [entry.url, entry])).values(),
  );

  const urlElements = dedupedEntries
    .map(
      (entry) =>
        `  <url>\n` +
        `    <loc>${escapeXml(entry.url)}</loc>\n` +
        `    <lastmod>${entry.lastModified.toISOString()}</lastmod>\n` +
        `    <changefreq>${entry.changeFrequency}</changefreq>\n` +
        `    <priority>${entry.priority.toFixed(1)}</priority>\n` +
        `  </url>`,
    )
    .join('\n');

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urlElements +
    `\n</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
