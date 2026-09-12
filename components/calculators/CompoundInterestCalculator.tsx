'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { calculateCompoundInterest } from '@/lib/calculations';
import { useCurrency } from '@/lib/currency-context';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import {
  TrendingUp,
  Download,
  Share2,
  Check,
  Zap,
  Sparkles,
  Info
} from 'lucide-react';

interface Props {
  initialPrincipal?: number;
  initialMonthly?: number;
  initialRate?: number;
  initialYears?: number;
}

export default function CompoundInterestCalculator({
  initialPrincipal = 10000,
  initialMonthly = 500,
  initialRate = 8,
  initialYears = 20,
}: Props) {
  const { formatCurrency, currency } = useCurrency();
  const [isMounted, setIsMounted] = useState(false);

  // States
  const [principal, setPrincipal] = useState<number>(initialPrincipal);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(initialMonthly);
  const [annualRate, setAnnualRate] = useState<number>(initialRate);
  const [years, setYears] = useState<number>(initialYears);
  const [frequency, setFrequency] = useState<'monthly' | 'quarterly' | 'semiannually' | 'annually'>('monthly');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const result = useMemo(() => {
    return calculateCompoundInterest(
      principal,
      monthlyContribution,
      annualRate,
      years,
      frequency
    );
  }, [principal, monthlyContribution, annualRate, years, frequency]);

  const copySummary = () => {
    const text = `FinanceCalc Hub - Compound Interest Projection:\nInitial: ${formatCurrency(principal)}\nMonthly: ${formatCurrency(monthlyContribution)}\nReturn: ${annualRate}%/yr\nPeriod: ${years} Years\nFuture Value: ${formatCurrency(result.futureValue)}\nTotal Contributions: ${formatCurrency(result.totalPrincipal)}\nTotal Interest Earned: ${formatCurrency(result.totalInterest)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const exportSchedule = () => {
    const headers = ['Year', 'Total Principal Invested', 'Interest Earned in Year', 'Total Cumulative Interest', 'Ending Portfolio Balance'];
    const rows = result.growthSchedule.map((r) => [
      r.year,
      r.totalContributions,
      r.interestEarnedYear,
      r.totalInterest,
      r.balance,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Compound_Growth_${years}Years.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const interestMultiplier = result.totalPrincipal > 0 ? (result.futureValue / result.totalPrincipal).toFixed(2) : '0';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-blue-600 text-xs font-semibold px-2.5 py-0.5 rounded text-white uppercase tracking-wider">
              Wealth Velocity
            </span>
            <span className="text-slate-400 text-xs">• Exponential growth modeling</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">Compound Interest Calculator</h2>
          <p className="text-slate-300 text-sm mt-0.5">
            Visualize how consistent contributions and compounding interest turn modest savings into significant wealth.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={copySummary}
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3 py-2 rounded-lg transition-colors border border-slate-700"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Summary Copied' : 'Share / Copy'}</span>
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3 py-2 rounded-lg transition-colors border border-slate-700"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form Inputs */}
        <div className="lg:col-span-6 space-y-6">
          {/* Initial Principal */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold text-slate-800">
              <label htmlFor="initial-deposit">Initial Investment / Principal</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                  {currency.symbol}
                </span>
                <input
                  id="initial-deposit"
                  type="number"
                  min={0}
                  max={10000000}
                  step={500}
                  value={principal}
                  onChange={(e) => setPrincipal(Math.max(0, Number(e.target.value)))}
                  className="pl-7 pr-3 py-1.5 w-36 text-right font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={100000}
              step={1000}
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Monthly Contribution */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold text-slate-800">
              <label htmlFor="monthly-contrib">Regular Monthly Contribution</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                  {currency.symbol}
                </span>
                <input
                  id="monthly-contrib"
                  type="number"
                  min={0}
                  max={50000}
                  step={50}
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Math.max(0, Number(e.target.value)))}
                  className="pl-7 pr-3 py-1.5 w-36 text-right font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={3000}
              step={25}
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Estimated Annual Return Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold text-slate-800">
              <label htmlFor="comp-annual-rate">Estimated Annual Return Rate</label>
              <div className="relative">
                <input
                  id="comp-annual-rate"
                  type="number"
                  min={0.1}
                  max={30}
                  step={0.25}
                  value={annualRate}
                  onChange={(e) => setAnnualRate(Math.max(0.1, Number(e.target.value)))}
                  className="pr-7 pl-3 py-1.5 w-28 text-right font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                  %
                </span>
              </div>
            </div>
            <input
              type="range"
              min={1}
              max={15}
              step={0.25}
              value={annualRate}
              onChange={(e) => setAnnualRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex space-x-2 text-xs">
              <span className="text-slate-400">Benchmark presets:</span>
              {[
                { label: 'HYSA (4.5%)', val: 4.5 },
                { label: 'Balanced (7%)', val: 7 },
                { label: 'S&P 500 (10%)', val: 10 },
              ].map((b) => (
                <button
                  key={b.label}
                  type="button"
                  onClick={() => setAnnualRate(b.val)}
                  className="text-blue-600 hover:underline font-medium"
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Investment Horizon Years & Compounding Frequency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="years-horizon" className="text-xs font-semibold text-slate-700">
                  Time Horizon (Years)
                </label>
                <span className="text-xs font-bold text-blue-700">{years} yrs</span>
              </div>
              <input
                id="years-horizon"
                type="number"
                min={1}
                max={50}
                value={years}
                onChange={(e) => setYears(Math.max(1, Math.min(50, Number(e.target.value))))}
                className="w-full px-3 py-1.5 text-right font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg text-sm"
              />
            </div>

            <div>
              <label htmlFor="comp-freq" className="text-xs font-semibold text-slate-700 block mb-1">
                Compounding Frequency
              </label>
              <select
                id="comp-freq"
                value={frequency}
                onChange={(e: any) => setFrequency(e.target.value)}
                className="w-full px-3 py-1.5 text-xs font-semibold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg"
              >
                <option value="monthly">Monthly (12x / yr)</option>
                <option value="quarterly">Quarterly (4x / yr)</option>
                <option value="semiannually">Semi-Annually (2x / yr)</option>
                <option value="annually">Annually (1x / yr)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Output Card & Analytics */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          {/* Main Future Value Highlight */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 relative">
            <div className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
              Projected Total Portfolio Value
            </div>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-blue-700 tracking-tight">
                {formatCurrency(result.futureValue)}
              </span>
              <span className="text-xs text-slate-500 font-medium">in {years} years</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Total Principal Contributed</span>
                <span className="text-base font-bold text-slate-900">
                  {formatCurrency(result.totalPrincipal)}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  Your out-of-pocket savings
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Total Compound Interest</span>
                <span className="text-base font-bold text-emerald-600">
                  +{formatCurrency(result.totalInterest)}
                </span>
                <span className="text-[10px] text-emerald-700 font-medium block">
                  {((result.totalInterest / result.futureValue) * 100).toFixed(1)}% of total portfolio!
                </span>
              </div>
            </div>
          </div>

          {/* Rule of 72 & Multiplier Highlight Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/80">
              <div className="flex items-center space-x-1.5 text-xs font-semibold text-blue-900">
                <Zap className="w-4 h-4 text-blue-600" />
                <span>Rule of 72 Doubling Time</span>
              </div>
              <div className="text-xl font-bold text-blue-900 mt-1">
                {result.ruleOf72Years ? `~${result.ruleOf72Years} Years` : 'N/A'}
              </div>
              <p className="text-[11px] text-blue-700 mt-0.5 leading-snug">
                At {annualRate}% annual return, your capital doubles every {result.ruleOf72Years} years without extra deposits.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
              <div className="flex items-center space-x-1.5 text-xs font-semibold text-emerald-900">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Capital Multiplier</span>
              </div>
              <div className="text-xl font-bold text-emerald-900 mt-1">
                {interestMultiplier}x
              </div>
              <p className="text-[11px] text-emerald-700 mt-0.5 leading-snug">
                For every $1.00 you deposit, compound growth turns it into ${interestMultiplier}.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Growth Trajectory Chart */}
      <div className="border-t border-slate-200 p-6 sm:p-8 bg-slate-50/50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Wealth Compounding Growth Trajectory
            </h3>
            <p className="text-xs text-slate-500">
              Watch interest earnings (emerald) overtake your cumulative principal contributions (blue) over time.
            </p>
          </div>
          <div className="flex items-center space-x-4 text-xs mt-2 sm:mt-0">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-600 inline-block" />
              <span className="text-slate-600 font-medium">Principal Invested</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              <span className="text-slate-600 font-medium">Interest Earned</span>
            </div>
          </div>
        </div>

        <div className="h-72 w-full">
          {isMounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={result.growthSchedule} margin={{ top: 10, right: 20, left: 20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="year" tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} unit=" yr" />
                <YAxis
                  tickLine={false}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  tickFormatter={(val) => formatCurrency(val, { compact: true })}
                />
                <RechartsTooltip
                  formatter={(val: any, name: any) => [
                    formatCurrency(Number(val)),
                    name === 'totalContributions' ? 'Total Principal Invested' : 'Accumulated Interest',
                  ]}
                  labelFormatter={(label) => `Year ${label}`}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Area
                  type="monotone"
                  stackId="1"
                  dataKey="totalContributions"
                  stroke="#2563eb"
                  fill="url(#colorPrincipal)"
                  name="totalContributions"
                />
                <Area
                  type="monotone"
                  stackId="1"
                  dataKey="totalInterest"
                  stroke="#10b981"
                  fill="url(#colorInterest)"
                  name="totalInterest"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : null}
        </div>
      </div>

      {/* Year-by-Year Growth Table */}
      <div className="border-t border-slate-200 p-6 sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Annual Compounding Growth Breakdown
            </h3>
            <p className="text-xs text-slate-500">
              Year-by-year summary of total deposits, annual interest gains, and year-end balance.
            </p>
          </div>
          <button
            type="button"
            onClick={exportSchedule}
            className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CSV</span>
          </button>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl max-h-80">
          <table className="w-full text-left text-xs text-slate-700 border-collapse">
            <thead className="bg-slate-100 text-slate-600 font-semibold sticky top-0 border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Year</th>
                <th className="py-2.5 px-4 text-right">Principal Invested</th>
                <th className="py-2.5 px-4 text-right">Annual Interest Earned</th>
                <th className="py-2.5 px-4 text-right">Cumulative Interest</th>
                <th className="py-2.5 px-4 text-right">Ending Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {result.growthSchedule.map((row) => (
                <tr key={row.year} className="hover:bg-slate-50">
                  <td className="py-2.5 px-4 font-bold text-slate-900">Year {row.year}</td>
                  <td className="py-2.5 px-4 text-right">{formatCurrency(row.totalContributions)}</td>
                  <td className="py-2.5 px-4 text-right text-emerald-700 font-medium">+{formatCurrency(row.interestEarnedYear)}</td>
                  <td className="py-2.5 px-4 text-right text-emerald-700 font-semibold">{formatCurrency(row.totalInterest)}</td>
                  <td className="py-2.5 px-4 text-right font-bold text-slate-900">{formatCurrency(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
