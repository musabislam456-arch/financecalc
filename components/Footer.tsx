'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calculator, ShieldCheck, Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Newsletter & Value Proposition Strip */}
      <div className="border-b border-slate-800/80 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-950/60 border border-blue-800/50 px-2.5 py-1 rounded-full">
                Financial Literacy First
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-3">
                Actionable financial clarity without sales pressure
              </h3>
              <p className="text-slate-400 text-sm mt-1 max-w-xl">
                Get monthly deep dives on interest rate trends, mortgage refinancing strategies, and compound wealth modeling directly in your inbox.
              </p>
            </div>
            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="flex items-center space-x-2 text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-4 py-3 rounded-lg text-sm">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span>Thank you! You are subscribed to our monthly financial brief.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work or personal email..."
                    className="bg-slate-800 border border-slate-700 text-white placeholder-slate-400 text-sm rounded-lg px-3.5 py-2.5 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors flex items-center justify-center space-x-1.5"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
              <p className="text-[11px] text-slate-500 mt-2">
                No spam. Unsubscribe at any time. We strictly safeguard your privacy.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
                <Calculator className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                FinanceCalc <span className="text-blue-400">Hub</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              FinanceCalc Hub delivers institutional-grade mathematical models for consumer loans, mortgages, compounding investments, and structured savings goals. Built for clarity, transparency, and consumer empowerment.
            </p>
            <div className="flex items-center space-x-3 text-xs text-slate-400">
              <div className="flex items-center text-emerald-400">
                <ShieldCheck className="w-4 h-4 mr-1" />
                <span>100% Client-Side Private</span>
              </div>
              <span>•</span>
              <span>Zero Account Required</span>
            </div>
          </div>

          {/* Calculators Column */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Core Calculators
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/tools/loan-emi-calculator" className="hover:text-white transition-colors">
                  Loan & EMI Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/mortgage-calculator" className="hover:text-white transition-colors">
                  Mortgage & PITI Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/compound-interest-calculator" className="hover:text-white transition-colors">
                  Compound Interest Model
                </Link>
              </li>
              <li>
                <Link href="/tools/savings-goal-calculator" className="hover:text-white transition-colors">
                  Savings Goal & Timeline
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                  All Financial Tools &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Educational Guides Column */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Guides & Education
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/blog/how-emi-is-calculated" className="hover:text-white transition-colors">
                  How EMI is Calculated
                </Link>
              </li>
              <li>
                <Link href="/blog/compound-interest-explained-for-beginners" className="hover:text-white transition-colors">
                  Compound Interest Explained
                </Link>
              </li>
              <li>
                <Link href="/blog/mortgage-prepayment-strategies" className="hover:text-white transition-colors">
                  Mortgage Prepayment Tactics
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                  Browse All Guides &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal Column */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Company & Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About FinanceCalc Hub
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-xs text-slate-500 space-y-3">
          <p>
            <strong className="text-slate-400">Financial Disclaimer:</strong> The calculations, amortization schedules, and financial models provided by FinanceCalc Hub are intended solely for general informational and educational purposes. They do not constitute certified financial, legal, tax, or investment advice. Actual loan terms, APR, taxes, insurance premiums, and investment outcomes may vary based on lender underwriting criteria and market conditions. Always consult a licensed Certified Financial Planner (CFP) or tax advisor before executing major debt or investment transactions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between text-slate-500 pt-2 gap-2">
            <div>
              &copy; {new Date().getFullYear()} FinanceCalc Hub. All rights reserved.
            </div>
            <div className="flex items-center space-x-4">
              <span>Security: ISO 27001 Methodology Aligned</span>
              <span>•</span>
              <span>No Cookies / No Cross-Site Tracking</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
