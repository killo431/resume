import AIBlogGenerator from '@/components/blog/AIBlogGenerator';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'AI Blog Generator | Randal Derego',
  description: 'Generate professional technical blog posts using AI',
};

export default function GenerateBlogPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft size={20} />
            Back to Blog
          </Link>
        </div>
      </header>

      <AIBlogGenerator />
    </div>
  );
}
