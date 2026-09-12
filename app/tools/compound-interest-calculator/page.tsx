import React from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import CompoundInterestCalculator from '@/components/calculators/CompoundInterestCalculator';
import Link from 'next/link';
import { BookOpen, Zap, TrendingUp, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Compound Interest Calculator & Rule of 72 — FinanceCalc Hub',
  description:
    'Simulate multi-year investment compounding with monthly contributions, customizable frequency, stacked principal vs interest charts, and Rule of 72 capital doubling projections.',
  openGraph: {
    title: 'Compound Interest Calculator & Rule of 72 — FinanceCalc Hub',
    description:
      'Free visual compound interest calculator modeling exponential portfolio growth with monthly deposits and annual breakdown tables.',
  },
};

export default function CompoundInterestCalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <Breadcrumbs
        items={[
          { label: 'Calculators', href: '/tools' },
          { label: 'Compound Interest Calculator' },
        ]}
      />

      <CompoundInterestCalculator />

      {/* Guide Content */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Wealth Building
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3">
            The Mathematics of Exponential Compounding
          </h2>
          <p className="text-slate-600 text-sm mt-2 leading-relaxed">
            Compound interest is earning return on your return. While linear savings grow by addition ($P + d + d$), compound savings grow by repeated geometric multiplication ($P \times (1 + r)^t$).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900">
              The Compounding Equation
            </h3>
            <div className="bg-slate-900 text-blue-300 p-4 rounded-xl font-mono text-xs overflow-x-auto">
              A = P(1 + r/n)^(nt)
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              When regular monthly contributions ($PMT$) are included, the future value of your portfolio is the sum of the compounding original principal and the future value of the series of annuity payments.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <Zap className="w-4 h-4 text-blue-600" />
              <span>The Rule of 72 Shortcut</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              To quickly approximate how many years it takes for your investment balance to double without writing out formulas:
            </p>
            <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl font-mono text-xs font-bold text-blue-900">
              Years to Double ≈ 72 ÷ Annual Interest Rate (%)
            </div>
            <p className="text-xs text-slate-500">
              For example, at an 8% expected market return, your money doubles approximately every 9 years (72 ÷ 8 = 9).
            </p>
          </div>
        </div>

        {/* Read More in Blog Link */}
        <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-5 h-5 text-blue-700 flex-shrink-0" />
            <div className="text-xs text-blue-950">
              <strong>Curious about the math?</strong> Read our beginner guide: <em>"Compound Interest Explained for Beginners: The Rule of 72 & Exponential Growth"</em>.
            </div>
          </div>
          <Link
            href="/blog/compound-interest-explained-for-beginners"
            className="text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
          >
            Read Article &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
