'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Calculator, 
  Home as HomeIcon, 
  TrendingUp, 
  PiggyBank, 
  ShieldCheck, 
  Zap, 
  BookOpen, 
  ArrowRight, 
  CheckCircle2, 
  FileSpreadsheet, 
  BarChart3, 
  HelpCircle,
  Percent,
  Compass
} from 'lucide-react';
import LoanEmiCalculator from '@/components/calculators/LoanEmiCalculator';
import MortgageCalculator from '@/components/calculators/MortgageCalculator';
import CompoundInterestCalculator from '@/components/calculators/CompoundInterestCalculator';
import SavingsGoalCalculator from '@/components/calculators/SavingsGoalCalculator';
import { BLOG_POSTS } from '@/lib/blog-data';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'emi' | 'mortgage' | 'compound' | 'savings'>('emi');

  const tools = [
    {
      id: 'emi',
      name: 'Loan / EMI Calculator',
      badge: 'Most Popular',
      desc: 'Calculate monthly payments with full amortization tables and prepayment interest savings.',
      icon: Calculator,
      href: '/tools/loan-emi-calculator',
    },
    {
      id: 'mortgage',
      name: 'Mortgage & PITI',
      badge: 'Homebuyers',
      desc: 'All-inclusive home financing estimates including property taxes, homeowner insurance & PMI.',
      icon: HomeIcon,
      href: '/tools/mortgage-calculator',
    },
    {
      id: 'compound',
      name: 'Compound Interest',
      badge: 'Wealth Building',
      desc: 'Model exponential capital growth, monthly contribution impacts, and Rule of 72 doubling.',
      icon: TrendingUp,
      href: '/tools/compound-interest-calculator',
    },
    {
      id: 'savings',
      name: 'Savings Goal Plan',
      badge: 'Target Planner',
      desc: 'Reverse-engineer the exact monthly deposits required to reach your milestone on schedule.',
      icon: PiggyBank,
      href: '/tools/savings-goal-calculator',
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center space-x-2 bg-blue-950/80 border border-blue-800/60 px-3.5 py-1.5 rounded-full text-xs text-blue-300 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Client-Side Private • Zero Sign-Up Required</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Institutional-Grade <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-400">
                Personal Finance Calculators
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Make confident borrowing and investment decisions with verified reducing-balance amortization schedules, dynamic interactive charts, and transparent mathematics.
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <a
                href="#interactive-calculator"
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-lg shadow-blue-600/25 flex items-center space-x-2"
              >
                <span>Launch Calculator</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/tools"
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm px-6 py-3 rounded-xl transition-all border border-slate-700"
              >
                Browse All 4 Tools
              </Link>
            </div>
          </div>

          {/* Quick Stats Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto text-center border-t border-slate-800 pt-8">
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">4 Core</div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">Fintech Engines</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-400">100%</div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">Client-Side Logic</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">CSV Export</div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">Amortization Tables</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-sky-400">6 Currencies</div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">Global Formatting</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Calculator Showcase Section */}
      <section id="interactive-calculator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 relative z-20">
        {/* Tool Switcher Tabs */}
        <div className="bg-slate-900 p-2 rounded-2xl border border-slate-800 shadow-2xl mb-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {tools.map((tool) => {
              const Icon = tool.icon;
              const isCurrent = activeTab === tool.id;
              return (
                <button
                  key={tool.id}
                  type="button"
                  onClick={() => setActiveTab(tool.id as any)}
                  className={`flex items-center space-x-3 p-3.5 rounded-xl text-left transition-all ${
                    isCurrent
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      isCurrent ? 'bg-blue-700 text-white' : 'bg-slate-800 text-blue-400'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold uppercase tracking-wider opacity-80">
                      {tool.badge}
                    </div>
                    <div className="text-sm font-bold truncate">
                      {tool.name}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Tool Rendering */}
        <div className="transition-all duration-200">
          {activeTab === 'emi' && <LoanEmiCalculator />}
          {activeTab === 'mortgage' && <MortgageCalculator />}
          {activeTab === 'compound' && <CompoundInterestCalculator />}
          {activeTab === 'savings' && <SavingsGoalCalculator />}
        </div>
      </section>

      {/* 4 Core Calculators Overview Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Dedicated Tool Pages
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3">
            Engineered for Precision & Clarity
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Each calculator features deep explanations, transparent reducing-balance formulas, and downloadable schedules.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    {tool.badge}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-2">
                    {tool.name}
                  </h3>
                  <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <Link
                    href={tool.href}
                    className="inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors group-hover:translate-x-1 duration-200"
                  >
                    <span>Open Dedicated Tool</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Math Transparency Matters */}
      <section className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950 px-3 py-1 rounded-full border border-blue-800">
                Mathematical Verification
              </span>
              <h2 className="text-3xl font-bold text-white tracking-tight">
                Don't fall for deceptive flat rates and hidden amortized fees
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Many online lenders quote "Flat Interest Rates" that sound attractive on paper but mask double the true borrowing cost. FinanceCalc Hub uses standard reducing-balance math so you see exactly where every cent goes.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start space-x-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-200">
                    <strong>Standard Reducing Balance:</strong> Interest recalculates on remaining principal, rewarding you immediately when you prepay.
                  </span>
                </div>
                <div className="flex items-start space-x-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-200">
                    <strong>True APR Transparency:</strong> Identify upfront origination fees, PMI thresholds, and HOA impacts before signing loan documents.
                  </span>
                </div>
                <div className="flex items-start space-x-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-200">
                    <strong>Zero Tracking:</strong> Calculations happen in your browser via client-side JavaScript. No account or data submission required.
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 shadow-xl space-y-4">
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Compass className="w-5 h-5 text-blue-400" />
                  <span>The Core Reducing EMI Formula</span>
                </h3>
                <div className="bg-slate-900 p-4 rounded-xl text-center font-mono text-sm text-blue-300 border border-slate-700 overflow-x-auto">
                  EMI = [ P × r × (1 + r)^n ] / [ (1 + r)^n - 1 ]
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs text-slate-400 pt-2 border-t border-slate-700">
                  <div>
                    <strong className="text-white block font-mono">P</strong> Principal Loan
                  </div>
                  <div>
                    <strong className="text-white block font-mono">r</strong> Monthly Rate (APR/12)
                  </div>
                  <div>
                    <strong className="text-white block font-mono">n</strong> Total Installments
                  </div>
                </div>
                <div className="p-3 bg-blue-950/60 border border-blue-800/40 rounded-lg text-xs text-blue-200">
                  💡 <strong>Pro Tip:</strong> On a 30-year loan, making one extra payment per year can eliminate over 4 years of debt and save tens of thousands in interest.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Educational Blog Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Personal Finance Guides
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              Actionable Guides Written for Real People
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Clear mathematical breakdowns without unnecessary jargon.
            </p>
          </div>
          <Link
            href="/blog"
            className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center space-x-1"
          >
            <span>View All Guides</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                  <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold">
                    {post.category}
                  </span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="text-slate-600 text-xs mt-2 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs">
                  <div className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-[10px]">
                    {post.author.avatar}
                  </div>
                  <span className="text-slate-700 font-medium">{post.author.name}</span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center"
                >
                  Read &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Frequently Asked Financial Questions
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Common inquiries regarding amortizations, formulas, and calculator privacy.
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: 'What is an amortization schedule and why is it essential?',
              a: 'An amortization schedule is a complete table documenting every periodic loan payment over the entire tenure. It shows precisely what dollar amount pays down the principal balance versus what amount covers interest charges. Reviewing your schedule allows you to see how early prepayments save thousands in compound interest.',
            },
            {
              q: 'Are my numbers stored or sent to any server?',
              a: 'No. FinanceCalc Hub performs all calculations 100% client-side inside your browser engine. We never collect, transmit, or store your loan amounts, income figures, or interest rates.',
            },
            {
              q: 'What is the difference between Flat Rate and Reducing Balance?',
              a: 'A flat interest rate charges interest on your original loan amount for the entire tenure, even after you have paid off most of the loan. A reducing balance calculates interest solely on what you still owe. A 10% flat rate often equates to an effective reducing rate of nearly 18% APR.',
            },
            {
              q: 'How does Private Mortgage Insurance (PMI) work?',
              a: 'When you purchase a home with less than 20% down payment, mortgage lenders typically mandate Private Mortgage Insurance (PMI) to protect against default risk. Our Mortgage Calculator automatically flags and estimates PMI when your down payment is under 20%.',
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <HelpCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>{item.q}</span>
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed pl-6">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
