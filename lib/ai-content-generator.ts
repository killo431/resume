/**
 * AI Content Generation Utility for Blog Posts
 *
 * This utility provides functions to generate blog post content using AI.
 * It can create full blog posts with proper MDX formatting and frontmatter.
 */

export interface BlogGenerationOptions {
  topic: string;
  tags?: string[];
  targetAudience?: string;
  tone?: 'professional' | 'casual' | 'technical' | 'educational';
  length?: 'short' | 'medium' | 'long';
}

export interface GeneratedBlogPost {
  frontmatter: {
    title: string;
    date: string;
    author: string;
    excerpt: string;
    tags: string[];
  };
  content: string;
}

/**
 * Generates a blog post using the Gemini API
 */
export async function generateBlogPost(
  options: BlogGenerationOptions
): Promise<GeneratedBlogPost> {
  const {
    topic,
    tags = [],
    targetAudience = 'IT professionals',
    tone = 'professional',
    length = 'medium',
  } = options;

  const wordCount = {
    short: '500-800',
    medium: '1000-1500',
    long: '2000-3000',
  };

  const systemInstruction = `You are a technical writer creating blog content for Randal Derego's professional portfolio.
Randal is a Systems Administrator with 10 years of experience in IT infrastructure, virtualization, automation, and cloud technologies.

Your task is to write high-quality technical blog posts that:
- Demonstrate expertise and practical knowledge
- Include code examples and real-world scenarios
- Follow MDX/Markdown formatting
- Are engaging and informative for ${targetAudience}
- Use a ${tone} tone
- Are approximately ${wordCount[length]} words

Include the following sections:
1. Introduction with a clear value proposition
2. Main content with subsections, code examples, and practical tips
3. Real-world applications or case studies
4. Best practices or lessons learned
5. Conclusion with actionable takeaways

Use proper markdown formatting including:
- Headers (##, ###)
- Code blocks with syntax highlighting
- Lists (both ordered and unordered)
- Blockquotes for important callouts
- Bold and italic text for emphasis`;

  const prompt = `Generate a comprehensive technical blog post about: ${topic}

${tags.length > 0 ? `Focus areas/tags: ${tags.join(', ')}` : ''}

Structure the response as follows:

TITLE: [Compelling blog post title]

EXCERPT: [2-3 sentence summary for the blog listing page]

CONTENT:
[Full blog post content in Markdown format]

Make the content authentic, technical, and based on real systems administration experience. Include specific examples, commands, or configurations where appropriate.`;

  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, systemInstruction }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.text || '';

    // Parse the generated content
    const titleMatch = generatedText.match(/TITLE:\s*(.+?)(?:\n|$)/);
    const excerptMatch = generatedText.match(/EXCERPT:\s*(.+?)(?:\n\n|CONTENT:)/s);
    const contentMatch = generatedText.match(/CONTENT:\s*(.+)/s);

    const title = titleMatch ? titleMatch[1].trim() : topic;
    const excerpt = excerptMatch
      ? excerptMatch[1].trim().replace(/\n/g, ' ')
      : `Learn about ${topic} and best practices for implementation.`;
    const content = contentMatch ? contentMatch[1].trim() : generatedText;

    return {
      frontmatter: {
        title,
        date: new Date().toISOString().split('T')[0],
        author: 'Randal Derego',
        excerpt,
        tags: tags.length > 0 ? tags : ['IT', 'Infrastructure'],
      },
      content,
    };
  } catch (error) {
    console.error('Error generating blog post:', error);
    throw new Error('Failed to generate blog post. Please try again.');
  }
}

/**
 * Formats a generated blog post into MDX file content
 */
export function formatAsMDX(post: GeneratedBlogPost): string {
  const { frontmatter, content } = post;

  const frontmatterString = `---
title: "${frontmatter.title}"
date: "${frontmatter.date}"
author: "${frontmatter.author}"
excerpt: "${frontmatter.excerpt}"
tags: [${frontmatter.tags.map(tag => `"${tag}"`).join(', ')}]
---

`;

  return frontmatterString + content;
}

/**
 * Generates a slug from a title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Validates MDX content for common issues
 */
export function validateMDXContent(content: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Check for frontmatter
  if (!content.startsWith('---')) {
    errors.push('Missing frontmatter section');
  }

  // Check for required frontmatter fields
  const requiredFields = ['title', 'date', 'author', 'excerpt', 'tags'];
  requiredFields.forEach(field => {
    if (!content.includes(`${field}:`)) {
      errors.push(`Missing required frontmatter field: ${field}`);
    }
  });

  // Check for at least one heading
  if (!content.match(/^#{1,6}\s+.+$/m)) {
    errors.push('Content should include at least one heading');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Generates topic suggestions based on expertise areas
 */
export function getTopicSuggestions(): string[] {
  return [
    'Active Directory Group Policy Management',
    'Cloud Migration Strategies for Small Businesses',
    'PowerShell Scripting for System Automation',
    'VMware vSphere Performance Tuning',
    'Implementing Zero Trust Security',
    'Azure AD vs On-Premises Active Directory',
    'Backup and Disaster Recovery Best Practices',
    'Network Troubleshooting with CLI Tools',
    'Microsoft 365 Administration Tips',
    'Infrastructure as Code with Terraform',
    'Container Orchestration with Kubernetes',
    'Monitoring and Alerting Strategies',
    'Patch Management Automation',
    'DevOps Practices for IT Operations',
    'Cybersecurity Fundamentals for SysAdmins',
  ];
}

/**
 * Gets suggested tags based on a topic
 */
export function getSuggestedTags(topic: string): string[] {
  const topicLower = topic.toLowerCase();
  const tagMap: Record<string, string[]> = {
    'powershell': ['PowerShell', 'Automation', 'Scripting'],
    'vmware': ['VMware', 'Virtualization', 'Infrastructure'],
    'azure': ['Azure', 'Cloud', 'Microsoft'],
    'aws': ['AWS', 'Cloud', 'Infrastructure'],
    'active directory': ['Active Directory', 'Windows', 'Identity'],
    'security': ['Security', 'Cybersecurity', 'Best Practices'],
    'network': ['Networking', 'Infrastructure', 'Troubleshooting'],
    'docker': ['Docker', 'Containers', 'DevOps'],
    'kubernetes': ['Kubernetes', 'Containers', 'Orchestration'],
    'backup': ['Backup', 'Disaster Recovery', 'Business Continuity'],
  };

  let suggestedTags: string[] = ['IT', 'Infrastructure'];

  Object.entries(tagMap).forEach(([keyword, tags]) => {
    if (topicLower.includes(keyword)) {
      suggestedTags = [...suggestedTags, ...tags];
    }
  });

  return [...new Set(suggestedTags)].slice(0, 5);
}
