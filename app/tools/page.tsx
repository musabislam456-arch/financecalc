import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Calculator, Home, TrendingUp, PiggyBank, ArrowRight, CheckCircle2 } from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Financial Calculators Directory — FinanceCalc Hub',
  description:
    'Explore our suite of personal finance calculation engines: Loan EMI with amortization, Mortgage PITI, Compound Interest, and Savings Goal Planner.',
};

export default function ToolsDirectoryPage() {
  const tools = [
    {
      name: 'Loan & EMI Calculator',
      slug: 'loan-emi-calculator',
      badge: 'Core Debt Tool',
      icon: Calculator,
      description:
        'Compute accurate equated monthly installments for auto, personal, or educational loans. Includes customizable extra monthly prepayments to calculate interest savings, interactive balance trajectories, and exportable amortization schedules.',
      features: [
        'Reducing-balance mathematical precision',
        'Optional extra monthly prepayment simulator',
        'Full month-by-month and annual schedules',
        'Downloadable CSV & print-ready reports',
      ],
    },
    {
      name: 'Mortgage & PITI Calculator',
      slug: 'mortgage-calculator',
      badge: 'Homebuying & Refinance',
      icon: Home,
      description:
        'Gain complete clarity on true homeownership costs. Models Principal, Interest, Property Taxes, Homeowners Insurance (PITI), automatic Private Mortgage Insurance (PMI) when down payment is under 20%, and HOA fees.',
      features: [
        'Synchronized down payment ($ and %)',
        'Automatic PMI detection under 20% down',
        'Interactive donut breakdown of monthly costs',
        'Full 15, 20, and 30-year lifetime cost models',
      ],
    },
    {
      name: 'Compound Interest Calculator',
      slug: 'compound-interest-calculator',
      badge: 'Wealth & Investing',
      icon: TrendingUp,
      description:
        'Harness the exponential power of compounding interest. Simulate regular monthly deposits across multi-decade horizons with customizable compounding frequency (monthly, quarterly, annually) and Rule of 72 doubling projections.',
      features: [
        'Stacked area chart comparing principal vs interest',
        'Support for monthly, quarterly, and annual compounding',
        'Built-in Rule of 72 capital doubling engine',
        'Year-by-year balance progression table',
      ],
    },
    {
      name: 'Savings Goal Calculator',
      slug: 'savings-goal-calculator',
      badge: 'Milestone Planner',
      icon: PiggyBank,
      description:
        'Turn ambitious financial goals into manageable monthly habits. Calculates the precise monthly contribution needed to reach your target savings amount by your desired deadline, factoring in annual compound interest yields.',
      features: [
        'Reverse-annuity mathematical computation',
        'Visual milestone tracking checkpoints (25%, 50%, 75%, 100%)',
        'Interactive target timeline curve',
        'Customizable APY benchmarks for HYSAs & market funds',
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Breadcrumbs items={[{ label: 'Calculators' }]} />

      <div className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Financial Tool Suite
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
          Precision Financial Calculators
        </h1>
        <p className="text-slate-600 text-sm mt-2 leading-relaxed">
          Select a calculator below to start modeling your borrowing, homebuying, investing, or savings plans. Every calculation is performed 100% locally in your browser.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.slug}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                    {tool.badge}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-slate-900">
                  {tool.name}
                </h2>
                <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                  {tool.description}
                </p>

                <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Key Features
                  </span>
                  {tool.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <Link
                  href={`/tools/${tool.slug}`}
                  className="w-full bg-slate-900 hover:bg-blue-600 text-white font-semibold text-xs py-3 px-4 rounded-xl transition-colors flex items-center justify-center space-x-2 shadow-sm"
                >
                  <span>Launch {tool.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
