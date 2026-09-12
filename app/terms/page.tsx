import React from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service — FinanceCalc Hub',
  description:
    'Terms of service and financial disclosures for using FinanceCalc Hub calculators, educational guides, and mathematical models.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Breadcrumbs items={[{ label: 'Terms of Service' }]} />

      <article className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-12 shadow-sm space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
        <div className="border-b border-slate-200 pb-6">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Last updated: September 2026 • Please read carefully before using our calculators
          </p>
        </div>

        {/* Financial Disclaimer Alert Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-amber-950 space-y-2">
          <h3 className="font-bold text-sm text-amber-900 flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>Important Financial Disclaimer</span>
          </h3>
          <p className="text-xs leading-relaxed text-amber-900">
            <strong>FinanceCalc Hub provides financial calculations and mathematical projections for informational and educational purposes only.</strong> Our tools do not constitute certified financial, mortgage, legal, tax, or investment advice. We are not a licensed financial advisory firm or a registered mortgage broker.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using FinanceCalc Hub (the "Website"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">
            2. Mathematical Accuracy & Real-World Variances
          </h2>
          <p>
            While our mathematical algorithms adhere to standard reducing-balance and compounding actuarial principles, actual loan terms, interest rates, closing costs, municipal property taxes, and mortgage insurance premiums will vary depending on your lender's underwriting standards, credit rating, geographical location, and applicable statutory laws. You should verify all figures with your licensed loan officer or financial advisor before signing legally binding documents.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">
            3. Intellectual Property
          </h2>
          <p>
            All custom graphics, charts, editorial articles, mathematical software algorithms, and layout designs on FinanceCalc Hub are the intellectual property of FinanceCalc Hub, protected by applicable international copyright and intellectual property conventions.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">
            4. Limitation of Liability
          </h2>
          <p>
            In no event shall FinanceCalc Hub, its analysts, authors, or affiliates be liable for any direct, indirect, incidental, consequential, or punitive damages arising from the use of, or inability to use, our calculations, articles, or tools.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">
            5. Modifications to Service
          </h2>
          <p>
            We reserve the right to modify, improve, or update our calculation models, educational articles, and interface designs at any time without prior notice.
          </p>
        </section>
      </article>
    </div>
  );
}
