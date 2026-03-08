"use client";

import React, { useState } from 'react';
import { Sparkles, Loader2, Download, Copy, Check } from 'lucide-react';
import {
  generateBlogPost,
  formatAsMDX,
  generateSlug,
  validateMDXContent,
  getTopicSuggestions,
  getSuggestedTags,
  type BlogGenerationOptions,
} from '@/lib/ai-content-generator';

export default function AIBlogGenerator() {
  const [topic, setTopic] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tone, setTone] = useState<'professional' | 'casual' | 'technical' | 'educational'>('professional');
  const [length, setLength] = useState<'short' | 'medium' | 'long'>('medium');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [copied, setCopied] = useState(false);

  const topicSuggestions = getTopicSuggestions();
  const suggestedTags = topic ? getSuggestedTags(topic) : [];

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setIsGenerating(true);
    setGeneratedContent('');

    try {
      const options: BlogGenerationOptions = {
        topic,
        tags: selectedTags,
        tone,
        length,
      };

      const post = await generateBlogPost(options);
      const mdxContent = formatAsMDX(post);
      setGeneratedContent(mdxContent);
    } catch (error) {
      console.error('Generation error:', error);
      alert('Failed to generate blog post. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedContent) return;

    const validation = validateMDXContent(generatedContent);
    if (!validation.valid) {
      alert('Generated content has validation errors:\n' + validation.errors.join('\n'));
      return;
    }

    // Extract title for filename
    const titleMatch = generatedContent.match(/title:\s*"(.+?)"/);
    const title = titleMatch ? titleMatch[1] : 'blog-post';
    const slug = generateSlug(title);

    const blob = new Blob([generatedContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${slug}.mdx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    if (!generatedContent) return;

    try {
      await navigator.clipboard.writeText(generatedContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-200 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-purple-600 text-white rounded-xl">
            <Sparkles size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">AI Blog Post Generator</h1>
            <p className="text-slate-600">Create professional technical content with AI assistance</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Content Settings</h2>

            {/* Topic Input */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Blog Topic *
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., PowerShell Automation Best Practices"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Topic Suggestions */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Quick Topics
              </label>
              <div className="flex flex-wrap gap-2">
                {topicSuggestions.slice(0, 6).map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setTopic(suggestion)}
                    className="px-3 py-1 text-xs bg-slate-100 hover:bg-purple-100 text-slate-700 rounded-full transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags */}
            {suggestedTags.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Tags (click to select)
                </label>
                <div className="flex flex-wrap gap-2">
                  {suggestedTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
                        selectedTags.includes(tag)
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tone */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Tone
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value as any)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="professional">Professional</option>
                <option value="technical">Technical</option>
                <option value="educational">Educational</option>
                <option value="casual">Casual</option>
              </select>
            </div>

            {/* Length */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Length
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['short', 'medium', 'long'] as const).map((len) => (
                  <button
                    key={len}
                    onClick={() => setLength(len)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      length === len
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {len.charAt(0).toUpperCase() + len.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!topic.trim() || isGenerating}
              className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Generate Blog Post
                </>
              )}
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900">Generated Content</h2>
              {generatedContent && (
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="p-2 text-slate-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check size={20} /> : <Copy size={20} />}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="p-2 text-slate-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                    title="Download MDX file"
                  >
                    <Download size={20} />
                  </button>
                </div>
              )}
            </div>

            {!generatedContent && !isGenerating && (
              <div className="text-center py-12 text-slate-400">
                <Sparkles size={48} className="mx-auto mb-4 opacity-50" />
                <p>Generated content will appear here</p>
              </div>
            )}

            {isGenerating && (
              <div className="text-center py-12">
                <Loader2 size={48} className="mx-auto mb-4 text-purple-600 animate-spin" />
                <p className="text-slate-600">Creating your blog post...</p>
              </div>
            )}

            {generatedContent && !isGenerating && (
              <div className="space-y-4">
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <pre className="text-xs text-slate-700 whitespace-pre-wrap overflow-x-auto max-h-[600px]">
                    {generatedContent}
                  </pre>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    <strong>Next Steps:</strong>
                  </p>
                  <ol className="text-sm text-blue-800 list-decimal list-inside mt-2 space-y-1">
                    <li>Review and edit the content as needed</li>
                    <li>Download the MDX file</li>
                    <li>Save it to <code className="bg-blue-100 px-1 rounded">content/blog/</code></li>
                    <li>The blog post will automatically appear on your site</li>
                  </ol>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
