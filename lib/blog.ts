import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPostMetadata {
  title: string;
  date: string;
  author: string;
  excerpt: string;
  tags: string[];
  coverImage?: string;
}

export interface BlogPost extends BlogPostMetadata {
  slug: string;
  content: string;
}

const postsDirectory = path.join(process.cwd(), 'content/blog');

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs.readdirSync(postsDirectory)
    .filter(file => file.endsWith('.mdx'));
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const realSlug = slug.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug: realSlug,
      content,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      author: data.author || 'Randal Derego',
      excerpt: data.excerpt || '',
      tags: data.tags || [],
      coverImage: data.coverImage,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export function getAllPosts(): BlogPost[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export function getPostsByTag(tag: string): BlogPost[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.tags.includes(tag));
}

export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const tagSet = new Set<string>();
  allPosts.forEach(post => {
    post.tags.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}
