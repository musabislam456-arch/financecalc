import React from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy — FinanceCalc Hub',
  description:
    'FinanceCalc Hub privacy commitment: 100% client-side computations, zero financial record storage, and complete consumer data protection.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

      <article className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-12 shadow-sm space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
        <div className="border-b border-slate-200 pb-6">
          <div className="flex items-center space-x-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Strict Client-Side Privacy Standard</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Last updated: September 2026 • Applies globally to all FinanceCalc Hub tools
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-emerald-950 space-y-2">
          <h3 className="font-bold text-sm text-emerald-900 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>The 10-Second Privacy Summary</span>
          </h3>
          <p className="text-xs leading-relaxed text-emerald-800">
            <strong>FinanceCalc Hub does NOT collect, store, transmit, or sell your personal financial inputs.</strong> All calculations (loan principal, interest rates, mortgage numbers, savings goals) are processed entirely inside your local web browser engine via client-side JavaScript.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">
            1. Information We Do Not Collect
          </h2>
          <p>
            Unlike typical financial websites, we do not require user accounts, email registration, credit scores, bank account linking, or social security numbers. When you use our Loan/EMI, Mortgage, Compound Interest, or Savings Goal calculators, your numerical inputs remain strictly within your device's active memory and are discarded as soon as you close or refresh the tab.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">
            2. Local Storage Usage
          </h2>
          <p>
            We may use your browser's local storage (LocalStorage) exclusively to remember non-sensitive user interface preferences, such as your preferred currency display symbol (e.g. $, €, £, ₹). No personally identifiable data is ever attached to these settings.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">
            3. Server Logs & Analytics
          </h2>
          <p>
            Standard web hosting infrastructure may temporarily record generic HTTP server logs (such as your anonymized IP address, browser user-agent string, and requested URLs) solely for threat mitigation, DDoS prevention, and uptime monitoring. These logs do not contain your calculator inputs.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">
            4. Third-Party Integrations
          </h2>
          <p>
            We do not partner with high-interest subprime lenders or data brokers. If customer support tools (such as live assistance chat widgets) are integrated by site administrators, their operational scripts run in compliance with standard security sandboxing.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900">
            5. Contacting the Data Protection Officer
          </h2>
          <p>
            For inquiries regarding our architecture, mathematical verification, or data policies, contact us at <code className="bg-slate-100 px-2 py-0.5 rounded font-mono text-slate-800">privacy@financecalchub.org</code>.
          </p>
        </section>
      </article>
    </div>
  );
}
