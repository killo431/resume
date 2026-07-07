import type { ComponentPropsWithoutRef } from 'react';
import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import Link from 'next/link';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold tracking-tight text-slate-950 mb-6 mt-10 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold tracking-tight text-slate-950 mb-4 mt-10">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold text-slate-900 mb-3 mt-8">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold text-slate-900 mb-3 mt-6">{children}</h4>
    ),
    p: ({ children }) => (
      <p className="mb-5 text-base leading-8 text-slate-700">{children}</p>
    ),
    a: ({ href, children }) => (
      <Link
        href={href || '#'}
        className="font-medium text-blue-700 underline decoration-blue-200 underline-offset-4 transition-colors hover:text-blue-800"
      >
        {children}
      </Link>
    ),
    ul: ({ children }) => (
      <ul className="mb-6 list-disc space-y-3 pl-6 text-slate-700 marker:text-blue-500">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-6 list-decimal space-y-3 pl-6 text-slate-700 marker:font-semibold marker:text-slate-500">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="pl-1 leading-8">{children}</li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mb-6 rounded-r-2xl border-l-4 border-blue-500 bg-blue-50 px-5 py-4 text-slate-700">
        {children}
      </blockquote>
    ),
    strong: ({ children }) => <strong className="font-semibold text-slate-950">{children}</strong>,
    code: ({ children, className }: ComponentPropsWithoutRef<'code'>) =>
      className ? (
        <code className={className}>{children}</code>
      ) : (
        <code className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[0.95em] font-medium text-slate-900">
          {children}
        </code>
      ),
    pre: ({ children }) => (
      <pre className="mb-6 overflow-x-auto rounded-2xl bg-slate-950 p-5 text-sm leading-7 text-slate-100 shadow-sm">
        {children}
      </pre>
    ),
    img: ({ src, alt }) => (
      <Image
        src={src || ''}
        alt={alt || ''}
        width={800}
        height={400}
        className="my-8 rounded-2xl border border-slate-200"
      />
    ),
    hr: () => <hr className="my-8 border-slate-200" />,
    table: ({ children }) => (
      <div className="mb-8 overflow-x-auto rounded-2xl border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 bg-white">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="bg-slate-50 px-4 py-3 text-left text-sm font-semibold text-slate-900">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border-t border-slate-200 px-4 py-3 text-sm text-slate-700">
        {children}
      </td>
    ),
    ...components,
  };
}
