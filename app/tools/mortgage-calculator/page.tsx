import React from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import MortgageCalculator from '@/components/calculators/MortgageCalculator';
import Link from 'next/link';
import { BookOpen, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Mortgage & PITI Calculator with Taxes & PMI — FinanceCalc Hub',
  description:
    'Calculate total monthly mortgage payments including Principal, Interest, Property Taxes, Homeowners Insurance (PITI), HOA dues, and automatic PMI calculation for down payments under 20%.',
  openGraph: {
    title: 'Mortgage & PITI Calculator with Taxes & PMI — FinanceCalc Hub',
    description:
      'Accurate home mortgage calculator modeling real-world ownership expenses with amortization schedules and visual payment breakdown.',
  },
};

export default function MortgageCalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <Breadcrumbs
        items={[
          { label: 'Calculators', href: '/tools' },
          { label: 'Mortgage Calculator' },
        ]}
      />

      <MortgageCalculator />

      {/* Educational Guide Section */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Homebuyer Guide
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3">
            Understanding Your Total Monthly Housing Cost (PITI)
          </h2>
          <p className="text-slate-600 text-sm mt-2 leading-relaxed">
            First-time homebuyers frequently overlook the recurring non-mortgage costs of homeownership. PITI stands for Principal, Interest, Taxes, and Insurance — the four pillars that determine what you actually write a check for each month.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">P - Principal</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              The portion of your monthly check that pays down the borrowed loan balance and builds your home equity.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">I - Interest</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              The fee charged by your bank or mortgage lender for borrowing their capital. Front-loaded in the early years.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">T - Taxes</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Local municipal property taxes assessed on your home's value, typically collected by your lender into an escrow account.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">I - Insurance (Hazard & PMI)</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Hazard homeowner insurance protecting the physical asset, plus Private Mortgage Insurance (PMI) if your down payment was under 20%.
            </p>
          </div>
        </div>

        {/* Read More in Blog Link */}
        <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-5 h-5 text-blue-700 flex-shrink-0" />
            <div className="text-xs text-blue-950">
              <strong>Thinking about extra payments?</strong> Read our article: <em>"Mortgage Prepayment Strategies: How Extra Payments Save Tens of Thousands in Interest"</em>.
            </div>
          </div>
          <Link
            href="/blog/mortgage-prepayment-strategies"
            className="text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
          >
            Read Prepayment Guide &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
