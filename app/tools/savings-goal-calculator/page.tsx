import React from 'react';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';
import SavingsGoalCalculator from '@/components/calculators/SavingsGoalCalculator';
import Link from 'next/link';
import { Target, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Savings Goal Calculator & Milestone Timeline — FinanceCalc Hub',
  description:
    'Calculate the exact monthly savings deposit required to achieve your financial targets, emergency fund, or home down payment on time with compound growth.',
  openGraph: {
    title: 'Savings Goal Calculator & Milestone Timeline — FinanceCalc Hub',
    description:
      'Free savings goal planner reverse-engineering your monthly savings contribution with milestone charts and compound APY earnings.',
  },
};

export default function SavingsGoalCalculatorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <Breadcrumbs
        items={[
          { label: 'Calculators', href: '/tools' },
          { label: 'Savings Goal Calculator' },
        ]}
      />

      <SavingsGoalCalculator />

      {/* Educational Framework Guide */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Budgeting Framework
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3">
            Strategies to Hit Your Savings Goals Ahead of Schedule
          </h2>
          <p className="text-slate-600 text-sm mt-2 leading-relaxed">
            A savings target without a structured monthly contribution schedule is simply wishful thinking. Employing proven personal finance structures ensures steady progress toward your milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              1. The 50 / 30 / 20 Rule
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Allocate 50% of take-home pay to essentials (housing, groceries, utilities), 30% to discretionary spending, and dedicate 20% strictly to your debt payoff and savings goals.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              2. High-Yield Savings (HYSA)
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Keep your short-term savings (1–4 year horizons) in a High-Yield Savings Account earning 4%–5% APY with FDIC insurance, rather than a traditional checking account earning 0.01%.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              3. Automated "Pay Yourself First"
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              Set up automated direct transfers to your savings on the same morning your paycheck lands. Removing manual friction prevents discretionary lifestyle creep from consuming your goals.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
