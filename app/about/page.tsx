import React from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, Award, Users, Calculator, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us — FinanceCalc Hub',
  description:
    'Discover the mission behind FinanceCalc Hub: providing verified financial calculation engines, complete client-side data privacy, and mathematical transparency.',
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <Breadcrumbs items={[{ label: 'About Us' }]} />

      {/* Hero */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Our Foundation
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Precision Financial Math for Real Everyday Decisions
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          FinanceCalc Hub was engineered to solve a widespread problem in personal finance: online loan and mortgage calculators designed primarily as lead-generation traps for high-interest predatory lenders, rather than neutral analytical tools.
        </p>
      </div>

      {/* Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
            <Calculator className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Mathematical Accuracy
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every calculator is calibrated against standard banking actuarial formulas. We never round intermediate values or conceal fee structures.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            100% Client-Side Privacy
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Your personal financial data never leaves your device. All calculations, amortization tables, and graphs are generated locally in your browser session.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            No Lender Kickbacks
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We do not sell user leads or prioritize affiliate lender rankings. Our loyalty remains strictly with consumer clarity and fiscal empowerment.
          </p>
        </div>
      </div>

      {/* Team and Verification */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Editorial & Quantitative Verification Team
          </h2>
          <p className="text-slate-600 text-xs mt-1">
            Our formulas and educational materials are authored and reviewed by experienced financial professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {[
            {
              name: 'Julian Vance, CFA',
              role: 'Chief Quantitative Analyst',
              desc: 'Specializes in fixed-income mathematics, reducing-balance amortizations, and consumer debt modeling.',
              initials: 'JV',
            },
            {
              name: 'Elena Rostova',
              role: 'Senior Financial Educator',
              desc: 'Dedicated to demystifying compound interest curves, index fund investing, and youth financial literacy.',
              initials: 'ER',
            },
            {
              name: 'Marcus Sterling',
              role: 'Mortgage Advisory Lead',
              desc: 'Over 14 years evaluating residential underwriting, PMI triggers, escrow accounts, and prepayment strategies.',
              initials: 'MS',
            },
          ].map((person, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                {person.initials}
              </div>
              <h4 className="text-sm font-bold text-slate-900 pt-1">{person.name}</h4>
              <span className="text-[11px] font-semibold text-blue-600 block">{person.role}</span>
              <p className="text-xs text-slate-600 leading-relaxed">{person.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <div className="bg-slate-900 text-white rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-white">Ready to run your numbers?</h3>
          <p className="text-xs text-slate-400">
            Explore our Loan/EMI, Mortgage, Compound Interest, and Savings Goal calculators with live interactive charts.
          </p>
        </div>
        <Link
          href="/tools"
          className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-5 py-3 rounded-xl transition-colors whitespace-nowrap flex items-center space-x-2"
        >
          <span>Explore All Calculators</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
