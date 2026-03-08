# Blog Infrastructure Documentation

This document explains the MDX blog infrastructure implemented for the Randal Derego portfolio website.

## Overview

The blog system uses Next.js 16 with MDX (Markdown + JSX) to provide a powerful, flexible blogging platform with AI-powered content generation capabilities.

## Architecture

### File Structure

```
/app
  /blog
    /page.tsx                 # Blog listing page
    /[slug]/page.tsx          # Dynamic blog post pages
    /generate/page.tsx        # AI blog generator page
/components
  /blog
    /BlogListing.tsx          # Blog list with search/filter
    /AIBlogGenerator.tsx      # AI content generation UI
/content
  /blog
    /*.mdx                    # Blog post files
/lib
  /blog.ts                    # Blog utilities
  /ai-content-generator.ts   # AI content generation
```

## Features

### 1. MDX Support

- **Markdown + React Components**: Write posts in Markdown with embedded React components
- **Syntax Highlighting**: Code blocks with syntax highlighting via rehype-highlight
- **GitHub Flavored Markdown**: Tables, task lists, strikethrough via remark-gfm
- **Custom Styling**: Tailwind CSS styled components for consistent design

### 2. Blog Posts

Each blog post is an MDX file with frontmatter:

```mdx
---
title: "Your Blog Post Title"
date: "2026-03-08"
author: "Randal Derego"
excerpt: "Brief description for listing page"
tags: ["Tag1", "Tag2", "Tag3"]
---

# Your Content Here

Regular markdown content with all features...
```

### 3. Dynamic Features

- **Search**: Full-text search across post titles and excerpts
- **Tag Filtering**: Filter posts by tags
- **Responsive Design**: Mobile-first, works on all devices
- **Reading Time**: Automatic calculation based on word count
- **SEO Optimized**: Meta tags, Open Graph data for social sharing

### 4. AI Content Generation

The AI blog generator allows creating professional blog posts using Gemini AI:

**Features:**
- Topic-based generation
- Customizable tone (professional, technical, educational, casual)
- Adjustable length (short, medium, long)
- Tag suggestions based on topic
- Quick topic templates
- Download as MDX file
- Copy to clipboard
- Content validation

**Access:** Navigate to `/blog/generate`

## Usage

### Creating a Blog Post Manually

1. Create a new `.mdx` file in `/content/blog/`
2. Add frontmatter with required fields (title, date, author, excerpt, tags)
3. Write content in Markdown format
4. The post will automatically appear on the blog page

**Example filename:** `my-post-title.mdx`

### Using the AI Generator

1. Visit `/blog/generate`
2. Enter a topic or select from suggestions
3. Choose tags, tone, and length
4. Click "Generate Blog Post"
5. Review and download the generated content
6. Save the downloaded file to `/content/blog/`

### Editing Posts

Simply edit the `.mdx` file in `/content/blog/`. Changes will be reflected after restarting the dev server or rebuilding.

## Styling

### Custom MDX Components

Located in `/mdx-components.tsx`, these provide consistent styling:

- Headings (h1, h2, h3)
- Paragraphs
- Links
- Lists (ordered and unordered)
- Blockquotes
- Code blocks
- Tables
- Images

### Customization

To modify component styles, edit `/mdx-components.tsx`.

## API Integration

### AI Content Generation

The AI generator uses the existing `/api/gemini` route:

```typescript
POST /api/gemini
Body: {
  prompt: string,
  systemInstruction: string
}
Response: {
  text: string
}
```

**Environment Variables Required:**
- `GEMINI_API_KEY`: Your Google Gemini API key

## Deployment

### Production Build

```bash
npm run build
```

The blog pages are statically generated at build time for optimal performance.

### Environment Setup

Ensure `GEMINI_API_KEY` is set in:
- `.env.local` for local development
- Vercel environment variables for production

## SEO & Performance

### Static Generation

All blog posts are statically generated using `generateStaticParams()`, providing:
- Fast page loads
- Better SEO
- Reduced server costs

### Metadata

Each post includes:
- Page title and description
- Open Graph tags for social sharing
- Article schema with publish date and author

### Performance Optimizations

- Image optimization via Next.js Image component
- Code splitting for blog pages
- Lazy loading of components

## Content Guidelines

### Best Practices

1. **Titles**: Clear, descriptive, 40-60 characters
2. **Excerpts**: 2-3 sentences, ~150 characters
3. **Tags**: 3-5 relevant tags per post
4. **Content**: Use headers for structure, include code examples
5. **Images**: Use descriptive alt text

### Recommended Post Structure

```markdown
# Main Title

Introduction paragraph setting context.

## Section 1

Content with examples...

### Subsection

Detailed information...

## Section 2

More content...

## Conclusion

Summary and call to action.
```

## Troubleshooting

### Posts Not Appearing

1. Check file is in `/content/blog/`
2. Ensure file has `.mdx` extension
3. Verify frontmatter is properly formatted
4. Restart dev server: `npm run dev`

### Build Errors

1. Validate MDX syntax
2. Check for missing frontmatter fields
3. Ensure all imports are correct
4. Review error messages in terminal

### AI Generation Issues

1. Verify `GEMINI_API_KEY` is set
2. Check API endpoint is accessible
3. Review browser console for errors
4. Ensure valid internet connection

## Future Enhancements

Potential additions:

- [ ] RSS feed generation
- [ ] Blog post categories
- [ ] Author pages
- [ ] Related posts suggestions
- [ ] Comment system integration
- [ ] Social sharing buttons
- [ ] Newsletter subscription
- [ ] Blog analytics dashboard

## Technical Stack

- **Next.js 16.1.6**: React framework with App Router
- **MDX**: Markdown with JSX support
- **@next/mdx**: Official Next.js MDX integration
- **gray-matter**: Frontmatter parsing
- **remark-gfm**: GitHub Flavored Markdown
- **rehype-highlight**: Syntax highlighting
- **Tailwind CSS 4**: Styling
- **TypeScript 5**: Type safety
- **Gemini AI**: Content generation

## Resources

- [Next.js MDX Documentation](https://nextjs.org/docs/pages/building-your-application/configuring/mdx)
- [MDX Documentation](https://mdxjs.com/)
- [Remark Plugins](https://github.com/remarkjs/remark/blob/main/doc/plugins.md)
- [Rehype Plugins](https://github.com/rehypejs/rehype/blob/main/doc/plugins.md)

## Support

For questions or issues:
- Check this documentation
- Review the code in `/lib/blog.ts` and `/lib/ai-content-generator.ts`
- Contact the developer

---

**Last Updated:** 2026-03-08
**Version:** 1.0.0
