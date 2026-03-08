import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import Link from 'next/link';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold text-slate-900 mb-6 mt-8">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold text-slate-900 mb-4 mt-6">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold text-slate-900 mb-3 mt-4">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-slate-700 mb-4 leading-relaxed">{children}</p>
    ),
    a: ({ href, children }) => (
      <Link href={href || '#'} className="text-blue-600 hover:text-blue-700 underline">
        {children}
      </Link>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-slate-700">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-slate-700">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="ml-4">{children}</li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 py-2 mb-4 italic text-slate-600 bg-blue-50 rounded-r">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto mb-4 text-sm">
        {children}
      </pre>
    ),
    img: ({ src, alt }) => (
      <Image
        src={src || ''}
        alt={alt || ''}
        width={800}
        height={400}
        className="rounded-lg my-6"
      />
    ),
    hr: () => <hr className="my-8 border-slate-200" />,
    table: ({ children }) => (
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full divide-y divide-slate-200">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="px-4 py-2 bg-slate-100 text-left text-sm font-semibold text-slate-900">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-2 border-t border-slate-200 text-sm text-slate-700">
        {children}
      </td>
    ),
    ...components,
  };
}
