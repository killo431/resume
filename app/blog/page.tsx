import { getAllPosts, getAllTags } from '@/lib/blog';
import BlogListing from '@/components/blog/BlogListing';

const BASE_URL = 'https://devtest512.info';

export const metadata = {
  title: 'Blog | Randy DeRego',
  description: 'Technical insights on systems administration, automation, and IT infrastructure by Randy DeRego.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    type: 'website',
    url: '/blog',
    title: 'Blog | Randy DeRego',
    description: 'Technical insights on systems administration, automation, and IT infrastructure by Randy DeRego.',
    siteName: 'Randy DeRego',
  },
  twitter: {
    card: 'summary',
    title: 'Blog | Randy DeRego',
    description: 'Technical insights on systems administration, automation, and IT infrastructure by Randy DeRego.',
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const allTags = getAllTags();

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Randy DeRego – Technical Blog',
    url: `${BASE_URL}/blog`,
    description: 'Technical insights on systems administration, automation, and IT infrastructure by Randy DeRego.',
    author: {
      '@type': 'Person',
      name: 'Randy DeRego',
      url: BASE_URL,
    },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      url: `${BASE_URL}/blog/${post.slug}`,
      datePublished: post.date,
      author: {
        '@type': 'Person',
        name: post.author,
      },
      keywords: post.tags.join(', '),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <BlogListing posts={posts} allTags={allTags} />
    </>
  );
}
