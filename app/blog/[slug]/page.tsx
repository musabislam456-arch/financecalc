import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/blog-data';
import Breadcrumbs from '@/components/Breadcrumbs';
import { 
  Clock, 
  Calendar, 
  User, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Share2, 
  Calculator, 
  BookOpen 
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Article Not Found — FinanceCalc Hub',
    };
  }

  return {
    title: `${post.title} — FinanceCalc Hub`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Guides & Insights', href: '/blog' },
          { label: post.title },
        ]}
      />

      <article className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-12 shadow-sm space-y-8">
        {/* Article Header */}
        <header className="space-y-4 border-b border-slate-200 pb-8">
          <div className="flex items-center space-x-2 text-xs">
            <span className="bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {post.category}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{post.publishedDate}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            {post.excerpt}
          </p>

          {/* Author Byline */}
          <div className="flex items-center space-x-3 pt-4">
            <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-sm">
              {post.author.avatar}
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">{post.author.name}</div>
              <div className="text-xs text-slate-500">{post.author.role} • Reviewed for Mathematical Accuracy</div>
            </div>
          </div>
        </header>

        {/* Key Takeaways Callout Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Key Takeaways & Executive Summary</span>
          </h3>
          <ul className="mt-3 space-y-2.5">
            {post.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="text-xs sm:text-sm text-slate-700 flex items-start space-x-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                <span className="leading-relaxed">{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Article Body Content */}
        <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-6">
          {post.content.split('\n\n').map((paragraph, index) => {
            const trimmed = paragraph.trim();
            if (!trimmed) return null;

            if (trimmed.startsWith('### ')) {
              return (
                <h2 key={index} className="text-xl sm:text-2xl font-bold text-slate-900 pt-4 pb-1 border-b border-slate-100">
                  {trimmed.replace('### ', '')}
                </h2>
              );
            }

            if (trimmed.startsWith('#### ')) {
              return (
                <h3 key={index} className="text-lg font-bold text-slate-900 pt-2">
                  {trimmed.replace('#### ', '')}
                </h3>
              );
            }

            if (trimmed.startsWith('$$') && trimmed.endsWith('$$')) {
              return (
                <div key={index} className="bg-slate-900 text-blue-300 p-4 rounded-xl font-mono text-center text-sm overflow-x-auto shadow-inner">
                  {trimmed.replaceAll('$$', '')}
                </div>
              );
            }

            if (trimmed.startsWith('|')) {
              // Parse markdown table
              const lines = trimmed.split('\n');
              const headers = lines[0].split('|').filter(Boolean).map((h) => h.trim());
              const rows = lines.slice(2).map((line) => line.split('|').filter(Boolean).map((c) => c.trim()));

              return (
                <div key={index} className="overflow-x-auto my-4 border border-slate-200 rounded-xl">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        {headers.map((h, hIdx) => (
                          <th key={hIdx} className="py-2.5 px-4">{h.replace(/\*\*/g, '')}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-50">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="py-2.5 px-4 font-normal">
                              {cell.replace(/\*\*/g, '')}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            }

            if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
              const items = trimmed.split('\n');
              return (
                <ul key={index} className="space-y-2 list-disc list-inside text-sm text-slate-700">
                  {items.map((item, iIdx) => (
                    <li key={iIdx} className="leading-relaxed">
                      {item.replace(/^[\*\-]\s+/, '').replace(/\*\*(.*?)\*\*/g, '$1')}
                    </li>
                  ))}
                </ul>
              );
            }

            if (trimmed.startsWith('---')) {
              return <hr key={index} className="border-slate-200 my-6" />;
            }

            return (
              <p key={index} className="leading-relaxed">
                {trimmed.replace(/\*\*(.*?)\*\*/g, '$1')}
              </p>
            );
          })}
        </div>

        {/* Interactive Tool Cross-Link CTA Banner */}
        <div className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Interactive Tool Companion
            </span>
            <h3 className="text-xl font-bold text-white">
              Try the {post.relatedTool.name}
            </h3>
            <p className="text-xs text-slate-300 max-w-md">
              Apply the formulas covered in this guide using our live interactive calculator with dynamic schedule charts.
            </p>
          </div>
          <Link
            href={post.relatedTool.path}
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-5 py-3 rounded-xl transition-all shadow-md whitespace-nowrap flex items-center space-x-2"
          >
            <span>Open {post.relatedTool.name}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Article Footer & Navigation */}
        <footer className="pt-8 border-t border-slate-200 flex items-center justify-between">
          <Link
            href="/blog"
            className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center space-x-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Guides</span>
          </Link>

          <Link
            href="/tools"
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1"
          >
            <span>Browse All Calculators</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </footer>
      </article>
    </div>
  );
}
