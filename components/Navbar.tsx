'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Calculator, 
  Menu, 
  X, 
  ChevronDown, 
  Home, 
  TrendingUp, 
  PiggyBank, 
  BookOpen, 
  Info, 
  Mail, 
  Coins 
} from 'lucide-react';
import { useCurrency, CURRENCIES } from '@/lib/currency-context';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const { currency, setCurrencyCode } = useCurrency();
  const pathname = usePathname();

  const toolLinks = [
    {
      name: 'Loan & EMI Calculator',
      href: '/tools/loan-emi-calculator',
      desc: 'Calculate monthly payments and amortization schedules',
      icon: Calculator,
    },
    {
      name: 'Mortgage Calculator',
      href: '/tools/mortgage-calculator',
      desc: 'Estimate home loan costs with taxes, PMI & insurance',
      icon: Home,
    },
    {
      name: 'Compound Interest Calculator',
      href: '/tools/compound-interest-calculator',
      desc: 'Visualize exponential wealth compounding over time',
      icon: TrendingUp,
    },
    {
      name: 'Savings Goal Calculator',
      href: '/tools/savings-goal-calculator',
      desc: 'Plan monthly contributions to hit savings milestones',
      icon: PiggyBank,
    },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md group-hover:bg-blue-500 transition-colors">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center">
                FinanceCalc <span className="text-blue-400 ml-1">Hub</span>
              </span>
              <span className="block text-[10px] tracking-wider uppercase text-slate-400 font-medium">
                Precision Financial Analytics
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === '/'
                  ? 'bg-slate-800 text-blue-400'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Home
            </Link>

            {/* Calculators Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                onMouseEnter={() => setToolsDropdownOpen(true)}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 transition-colors ${
                  pathname.startsWith('/tools')
                    ? 'bg-slate-800 text-blue-400'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span>Calculators</span>
                <ChevronDown className="w-4 h-4 ml-0.5" />
              </button>

              {toolsDropdownOpen && (
                <div
                  onMouseLeave={() => setToolsDropdownOpen(false)}
                  className="absolute left-0 mt-1 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="px-3 py-1.5 border-b border-slate-800">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Financial Calculation Engines
                    </p>
                  </div>
                  {toolLinks.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        onClick={() => setToolsDropdownOpen(false)}
                        className="flex items-start px-4 py-3 hover:bg-slate-800/80 transition-colors group"
                      >
                        <div className="p-2 rounded-lg bg-slate-800 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors mr-3 mt-0.5">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-100 group-hover:text-blue-400 transition-colors">
                            {tool.name}
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5 leading-snug">
                            {tool.desc}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                  <div className="p-2 border-t border-slate-800 mt-1 bg-slate-950/40">
                    <Link
                      href="/tools"
                      onClick={() => setToolsDropdownOpen(false)}
                      className="block text-center text-xs font-medium text-blue-400 hover:text-blue-300 py-1"
                    >
                      View All Calculator Tools &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/blog"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/blog')
                  ? 'bg-slate-800 text-blue-400'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Guides & Insights
            </Link>

            <Link
              href="/about"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/about')
                  ? 'bg-slate-800 text-blue-400'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              About Us
            </Link>

            <Link
              href="/contact"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/contact')
                  ? 'bg-slate-800 text-blue-400'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Actions: Currency Selector */}
          <div className="hidden sm:flex items-center space-x-3">
            <div className="flex items-center bg-slate-800/90 border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-300">
              <Coins className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
              <label htmlFor="currency-select" className="sr-only">Currency</label>
              <select
                id="currency-select"
                value={currency.code}
                onChange={(e) => setCurrencyCode(e.target.value)}
                className="bg-transparent border-none text-white text-xs font-semibold focus:outline-none cursor-pointer pr-1"
              >
                {Object.values(CURRENCIES).map((c) => (
                  <option key={c.code} value={c.code} className="bg-slate-900 text-white">
                    {c.symbol} {c.code}
                  </option>
                ))}
              </select>
            </div>

            <Link
              href="/tools/loan-emi-calculator"
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors shadow-sm"
            >
              Calculate EMI
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center space-x-2">
            <div className="flex items-center bg-slate-800 rounded px-2 py-1 text-xs">
              <select
                aria-label="Select currency"
                value={currency.code}
                onChange={(e) => setCurrencyCode(e.target.value)}
                className="bg-transparent text-white text-xs font-bold focus:outline-none"
              >
                {Object.values(CURRENCIES).map((c) => (
                  <option key={c.code} value={c.code} className="bg-slate-900 text-white">
                    {c.symbol}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800"
          >
            Home
          </Link>

          <div className="border-t border-slate-800 pt-2">
            <div className="px-3 text-xs font-semibold uppercase text-slate-400 tracking-wider">
              Financial Tools
            </div>
            {toolLinks.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-sm text-slate-300 hover:text-white hover:bg-slate-800"
              >
                {tool.name}
              </Link>
            ))}
          </div>

          <div className="border-t border-slate-800 pt-2 space-y-1">
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800"
            >
              Guides & Articles
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-slate-800"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
