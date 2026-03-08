This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

This portfolio website includes:

- **AI-Powered Chatbot**: Interactive AI assistant using Gemini API for job matching and conversations
- **Job Fit Analyzer**: AI tool that analyzes job descriptions against resume qualifications
- **Technical Blog**: MDX-powered blog with AI content generation capabilities
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Dark Mode**: Theme switcher with localStorage persistence
- **Skills Visualization**: Interactive skill proficiency displays
- **Project Showcase**: GitHub-integrated project highlights
- **Contact System**: Multi-channel contact options and form

## Getting Started

### Environment Setup

1. Copy the example environment file:
```bash
cp .env.local.example .env.local
```

2. Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

3. Add your API key to `.env.local`:
```
GEMINI_API_KEY=your_actual_api_key_here
NEXT_TELEMETRY_DISABLED=1
```

> **Note:** The `NEXT_TELEMETRY_DISABLED=1` environment variable disables Next.js telemetry collection, which prevents telemetry messages during builds.

### Running the Development Server

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Blog System

This project includes a full-featured blog powered by MDX (Markdown + JSX).

### Creating Blog Posts

#### Option 1: Manual Creation

Create a new `.mdx` file in `content/blog/` with frontmatter:

```mdx
---
title: "Your Blog Post Title"
date: "2026-03-08"
author: "Randal Derego"
excerpt: "Brief description"
tags: ["Tag1", "Tag2"]
---

# Your Content Here

Write your post using Markdown...
```

#### Option 2: AI Generation

1. Visit `/blog/generate` in your browser
2. Enter a topic or select from suggestions
3. Choose tone, tags, and length
4. Click "Generate Blog Post"
5. Download the generated MDX file
6. Save it to `content/blog/`

### Blog Features

- **MDX Support**: Markdown with embedded React components
- **Search & Filter**: Full-text search and tag-based filtering
- **Syntax Highlighting**: Code blocks with language-specific highlighting
- **Reading Time**: Automatic calculation
- **SEO Optimized**: Meta tags and Open Graph data
- **Responsive Design**: Mobile-friendly layout

For detailed blog documentation, see [BLOG_DOCUMENTATION.md](./BLOG_DOCUMENTATION.md)

## Project Structure

```
/app
  /api/gemini          # Gemini AI API route
  /blog                # Blog pages
    /[slug]            # Dynamic blog post pages
    /generate          # AI blog generator
  /page.tsx            # Main portfolio page
  /layout.tsx          # Root layout
/components
  /blog                # Blog-specific components
/content
  /blog                # MDX blog posts
/lib
  /blog.ts             # Blog utilities
  /ai-content-generator.ts  # AI content generation
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

**Important:** When deploying to Vercel, make sure to add the following environment variables in your project settings:
1. Go to your project settings on Vercel
2. Navigate to "Environment Variables"
3. Add `GEMINI_API_KEY` with your Gemini API key value
4. Add `NEXT_TELEMETRY_DISABLED` with value `1` to disable telemetry messages during builds

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Technologies Used

- **Next.js 16.1.6**: React framework with App Router
- **React 19.2.3**: UI library
- **TypeScript 5**: Type safety
- **Tailwind CSS 4**: Utility-first CSS
- **MDX**: Markdown with JSX support
- **Gemini AI**: AI-powered content generation and chatbot
- **Lucide React**: Icon library
- **gray-matter**: Frontmatter parsing
- **next-mdx-remote**: MDX rendering for Next.js
