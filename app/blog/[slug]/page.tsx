import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, User, Tag, ArrowLeft, Clock } from 'lucide-react';
import { getPostBySlug, getPostSlugs } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { useMDXComponents as getMDXComponents } from '@/mdx-components';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx$/, ''),
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Randy DeRego`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      siteName: 'Randy DeRego',
    },
    twitter: {
      card: 'summary',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Estimate reading time (rough calculation: 200 words per minute)
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);
  const mdxComponents = getMDXComponents({});

  const BASE_URL = 'https://devtest512.info';
  const postSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: `${BASE_URL}/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: 'Randy DeRego',
      url: BASE_URL,
    },
    keywords: post.tags.join(', '),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postSchema) }}
      />
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft size={20} />
            Back to Blog
          </Link>
        </div>
      </header>

      <article className="max-w-4xl mx-auto px-6 py-12">
        {/* Post Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {post.title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap gap-4 text-slate-900 mb-6">
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <time>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <User size={18} />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>{readingTime} min read</span>
            </div>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${tag}`}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full hover:bg-blue-100 transition-colors"
                >
                  <Tag size={14} />
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* Post Content */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm text-slate-800">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeHighlight],
              },
            }}
          />
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-slate-200">
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-2">About the Author</h3>
            <p className="text-slate-700 mb-4">
              <strong>Randy DeRego</strong> is a Systems Administrator with 10 years of experience
              specializing in infrastructure management, automation, and IT operations. He has worked
              with various technologies including VMware, Azure, AWS, and modern DevOps tools.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              Get in touch →
            </Link>
          </div>
        </footer>
      </article>
    </div>
    </>
  );
}
