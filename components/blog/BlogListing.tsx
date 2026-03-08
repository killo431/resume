"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, User, Tag, BookOpen, Search } from 'lucide-react';

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  tags: string[];
}

interface BlogListingProps {
  posts: BlogPost[];
  allTags: string[];
}

export default function BlogListing({ posts, allTags }: BlogListingProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter(post => {
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    const matchesSearch = !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <Link href="/" className="text-blue-600 hover:text-blue-700 mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Technical Blog</h1>
          <p className="text-lg text-slate-600">
            Insights, tutorials, and thoughts on systems administration, automation, and IT infrastructure.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Search and Filter */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Tags Filter */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === null
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-700 border border-slate-300 hover:border-blue-400'
                }`}
              >
                All Posts
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedTag === tag
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-slate-700 border border-slate-300 hover:border-blue-400'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="mx-auto text-slate-300 mb-4" size={48} />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">No posts found</h2>
            <p className="text-slate-600">
              {searchQuery || selectedTag
                ? 'Try adjusting your search or filter'
                : 'Blog posts will appear here soon'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {filteredPosts.map(post => (
              <article
                key={post.slug}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-slate-900 mb-3 hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Metadata */}
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <time>{new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</time>
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={16} />
                        <span>{post.author}</span>
                      </div>
                    </div>

                    {/* Tags */}
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full"
                          >
                            <Tag size={12} />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
