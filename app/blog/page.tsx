'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/blog-data';
import Breadcrumbs from '@/components/Breadcrumbs';
import { BookOpen, Search, ArrowRight, Clock, User, Calculator } from 'lucide-react';

export default function BlogIndexPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Loan & Debt Management', 'Investing & Wealth Building', 'Real Estate & Mortgages'];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Breadcrumbs items={[{ label: 'Guides & Insights' }]} />

      <div className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Educational Library
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
          Personal Finance Guides & Financial Math
        </h1>
        <p className="text-slate-600 text-sm mt-2 leading-relaxed">
          Comprehensive, jargon-free guides analyzing loan mathematics, reducing balance calculations, and compound wealth strategies. Written by financial analysts.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides by keyword..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <article
            key={post.slug}
            className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                <span className="bg-blue-50 text-blue-700 font-semibold px-2.5 py-0.5 rounded text-[11px]">
                  {post.category}
                </span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{post.readTime}</span>
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>

              <p className="text-slate-600 text-xs mt-3 leading-relaxed">
                {post.excerpt}
              </p>

              {/* Key Takeaways preview */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Inside This Guide:
                </span>
                <ul className="mt-1 space-y-1">
                  {post.keyTakeaways.slice(0, 2).map((point, idx) => (
                    <li key={idx} className="text-[11px] text-slate-600 line-clamp-1">
                      • {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                  {post.author.avatar}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800">{post.author.name}</div>
                  <div className="text-[10px] text-slate-400">{post.author.role}</div>
                </div>
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1 group-hover:translate-x-1 transition-transform"
              >
                <span>Read</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <p className="text-slate-500 text-sm">No articles match your search criteria.</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="mt-3 text-xs font-semibold text-blue-600 hover:underline"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
