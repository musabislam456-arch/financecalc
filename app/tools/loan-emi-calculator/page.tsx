import React from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import LoanEmiCalculator from '@/components/calculators/LoanEmiCalculator';
import Link from 'next/link';
import { HelpCircle, BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Loan & EMI Calculator with Amortization Schedule — FinanceCalc Hub',
  description:
    'Calculate monthly loan EMI with reducing-balance accuracy, interactive amortization schedule tables, interest-saving prepayment simulations, and CSV export.',
  openGraph: {
    title: 'Loan & EMI Calculator with Amortization Schedule — FinanceCalc Hub',
    description:
      'Free loan EMI calculator with instant reducing-balance schedule, charts, and extra payment interest savings calculator.',
  },
};

export default function LoanEmiCalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <Breadcrumbs
        items={[
          { label: 'Calculators', href: '/tools' },
          { label: 'Loan & EMI Calculator' },
        ]}
      />

      <LoanEmiCalculator />

      {/* In-depth Educational & Formula Content */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Guide & Methodology
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3">
            How Equated Monthly Installments (EMI) Are Calculated
          </h2>
          <p className="text-slate-600 text-sm mt-2 leading-relaxed">
            An Equated Monthly Installment is the fixed payment amount made to a lender each calendar month. Understanding how your lender calculates interest ensures you don't overpay and helps you capitalize on early principal prepayments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">
              The Reducing Balance Formula
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Standard commercial banking uses the mathematical reducing balance formula:
            </p>
            <div className="bg-slate-900 text-blue-300 p-4 rounded-xl font-mono text-xs overflow-x-auto">
              EMI = [ P × r × (1 + r)^n ] / [ (1 + r)^n - 1 ]
            </div>
            <ul className="text-xs text-slate-700 space-y-2">
              <li><strong>P (Principal):</strong> The total borrowed sum before interest.</li>
              <li><strong>r (Periodic Monthly Rate):</strong> Annual Interest Rate divided by 12, then divided by 100.</li>
              <li><strong>n (Tenure in Months):</strong> Number of monthly payments.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">
              Reducing Balance vs. Flat Rate Loans
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Never accept an auto loan or personal loan quote without verifying if it is <strong>reducing</strong> or <strong>flat</strong>:
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-2">
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <span><strong>Reducing Balance:</strong> Fair method. Interest is charged solely on what you still owe each month.</span>
              </div>
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span><strong>Flat Rate:</strong> Expensive method. Interest is charged on the original principal for the entire loan life. An 8% flat rate is equivalent to roughly ~15% reducing APR!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Read More in Blog Link */}
        <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-5 h-5 text-blue-700 flex-shrink-0" />
            <div className="text-xs text-blue-950">
              <strong>Want the full mathematical proof with tables?</strong> Read our comprehensive guide: <em>"How EMI is Calculated: The Mathematical Formula, Reducing Balance vs Flat Rate"</em>.
            </div>
          </div>
          <Link
            href="/blog/how-emi-is-calculated"
            className="text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
          >
            Read In-Depth Guide &rarr;
          </Link>
        </div>

        {/* Frequently Asked Questions */}
        <div className="border-t border-slate-200 pt-8 space-y-4">
          <h3 className="text-lg font-bold text-slate-900">
            Frequently Asked Questions About Loan EMIs
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
              <h4 className="font-bold text-slate-900 mb-1">
                How does an extra monthly payment save so much interest?
              </h4>
              <p className="text-slate-600 leading-relaxed">
                When you make an extra payment earmarked for principal, it immediately reduces the balance against which the lender computes next month's interest. This creates a compounding savings cascade throughout the remaining loan term.
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
              <h4 className="font-bold text-slate-900 mb-1">
                Why does my principal balance barely drop in Year 1?
              </h4>
              <p className="text-slate-600 leading-relaxed">
                In standard amortization, interest charges are highest when the outstanding principal is highest. Early monthly installments consist mostly of interest. As the balance shrinks, each subsequent payment allocates more to principal.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
