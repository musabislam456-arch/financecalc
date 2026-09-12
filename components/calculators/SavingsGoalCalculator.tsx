'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { calculateSavingsGoalMonthlyDeposit } from '@/lib/calculations';
import { useCurrency } from '@/lib/currency-context';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import {
  PiggyBank,
  Target,
  Download,
  Share2,
  Check,
  CheckCircle2,
  TrendingUp,
  Clock,
  Sparkles
} from 'lucide-react';

interface Props {
  initialTarget?: number;
  initialStarting?: number;
  initialYears?: number;
  initialApy?: number;
}

export default function SavingsGoalCalculator({
  initialTarget = 50000,
  initialStarting = 5000,
  initialYears = 4,
  initialApy = 4.5,
}: Props) {
  const { formatCurrency, currency } = useCurrency();
  const [isMounted, setIsMounted] = useState(false);

  const [targetAmount, setTargetAmount] = useState<number>(initialTarget);
  const [initialSavings, setInitialSavings] = useState<number>(initialStarting);
  const [years, setYears] = useState<number>(initialYears);
  const [apy, setApy] = useState<number>(initialApy);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const result = useMemo(() => {
    return calculateSavingsGoalMonthlyDeposit(
      targetAmount,
      initialSavings,
      years,
      apy
    );
  }, [targetAmount, initialSavings, years, apy]);

  // Sample schedule for chart (e.g. every year or every 6 months to keep it clean)
  const chartData = useMemo(() => {
    // Generate data points
    const data = [{ month: 0, year: 0, balance: initialSavings, target: targetAmount }];
    const step = Math.max(1, Math.floor(result.schedule.length / 24)); // max 24 points

    result.schedule.forEach((item, idx) => {
      if (idx % step === 0 || idx === result.schedule.length - 1) {
        data.push({
          month: item.month,
          year: Math.round((item.month / 12) * 10) / 10,
          balance: item.totalBalance,
          target: targetAmount,
        });
      }
    });

    return data;
  }, [result, initialSavings, targetAmount]);

  const copySummary = () => {
    const text = `FinanceCalc Hub - Savings Goal Plan:\nTarget Goal: ${formatCurrency(targetAmount)}\nCurrent Savings: ${formatCurrency(initialSavings)}\nTimeline: ${years} Years\nExpected APY: ${apy}%\nRequired Monthly Deposit: ${formatCurrency(result.monthlyDepositRequired)}\nTotal Deposited By You: ${formatCurrency(result.totalDepositedByYou)}\nTotal Interest Earned: ${formatCurrency(result.totalInterestEarned)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const exportSchedule = () => {
    const headers = ['Month #', 'Monthly Deposit', 'Interest Earned This Month', 'Total Accumulated Balance'];
    const rows = result.schedule.map((r) => [
      r.month,
      r.savingsDeposit,
      r.interestEarned,
      r.totalBalance,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Savings_Goal_Schedule_${targetAmount}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-blue-600 text-xs font-semibold px-2.5 py-0.5 rounded text-white uppercase tracking-wider">
              Goal Targeter
            </span>
            <span className="text-slate-400 text-xs">• Reverse annuity compounding</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">Savings Goal Calculator</h2>
          <p className="text-slate-300 text-sm mt-0.5">
            Discover exactly how much you need to set aside each month to achieve your financial milestones.
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
            <span>Print Plan</span>
          </button>
        </div>
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form Inputs */}
        <div className="lg:col-span-6 space-y-6">
          {/* Target Savings Amount */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold text-slate-800">
              <label htmlFor="target-amt">Target Savings Goal Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                  {currency.symbol}
                </span>
                <input
                  id="target-amt"
                  type="number"
                  min={1000}
                  max={5000000}
                  step={1000}
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(Math.max(100, Number(e.target.value)))}
                  className="pl-7 pr-3 py-1.5 w-36 text-right font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <input
              type="range"
              min={5000}
              max={250000}
              step={2500}
              value={targetAmount}
              onChange={(e) => setTargetAmount(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex space-x-2 text-xs">
              <span className="text-slate-400">Common goals:</span>
              {[
                { label: 'Emergency Fund ($15k)', val: 15000 },
                { label: 'Down Payment ($60k)', val: 60000 },
                { label: 'Major Milestone ($100k)', val: 100000 },
              ].map((g) => (
                <button
                  key={g.label}
                  type="button"
                  onClick={() => setTargetAmount(g.val)}
                  className="text-blue-600 hover:underline font-medium"
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Current Starting Savings */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold text-slate-800">
              <label htmlFor="starting-savings">Current Savings Already Set Aside</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                  {currency.symbol}
                </span>
                <input
                  id="starting-savings"
                  type="number"
                  min={0}
                  max={targetAmount}
                  step={500}
                  value={initialSavings}
                  onChange={(e) => setInitialSavings(Math.max(0, Number(e.target.value)))}
                  className="pl-7 pr-3 py-1.5 w-36 text-right font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={Math.min(targetAmount, 100000)}
              step={500}
              value={initialSavings}
              onChange={(e) => setInitialSavings(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Timeframe (Years) & APY */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="goal-years" className="text-xs font-semibold text-slate-700">
                  Time Horizon
                </label>
                <span className="text-xs font-bold text-blue-700">{years} Years ({years * 12} mos)</span>
              </div>
              <input
                id="goal-years"
                type="number"
                min={0.5}
                max={30}
                step={0.5}
                value={years}
                onChange={(e) => setYears(Math.max(0.5, Number(e.target.value)))}
                className="w-full px-3 py-1.5 text-right font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg text-sm"
              />
              <input
                type="range"
                min={1}
                max={15}
                step={1}
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600 mt-2"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="goal-apy" className="text-xs font-semibold text-slate-700">
                  Annual Expected APY
                </label>
                <span className="text-xs font-bold text-blue-700">{apy}% APY</span>
              </div>
              <div className="relative">
                <input
                  id="goal-apy"
                  type="number"
                  min={0}
                  max={20}
                  step={0.1}
                  value={apy}
                  onChange={(e) => setApy(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-1.5 text-right font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg text-sm pr-7"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">
                  %
                </span>
              </div>
              <div className="flex space-x-2 text-[11px] mt-2">
                <button
                  type="button"
                  onClick={() => setApy(4.5)}
                  className="text-blue-600 hover:underline"
                >
                  HYSA (4.5%)
                </button>
                <button
                  type="button"
                  onClick={() => setApy(7.0)}
                  className="text-blue-600 hover:underline"
                >
                  Index (7%)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output Card */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          {/* Main Required Monthly Contribution Highlight */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <div className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
              Required Monthly Contribution
            </div>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-blue-700 tracking-tight">
                {formatCurrency(result.monthlyDepositRequired)}
              </span>
              <span className="text-xs text-slate-500 font-medium">/ month for {years} years</span>
            </div>

            <p className="text-xs text-slate-600 mt-2">
              Save this amount each month in an account earning {apy}% APY to reach your goal of <strong>{formatCurrency(targetAmount)}</strong> right on schedule.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Total Out-of-Pocket Saved</span>
                <span className="text-base font-bold text-slate-900">
                  {formatCurrency(result.totalDepositedByYou)}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  Starting balance + monthly deposits
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Compound Interest Boost</span>
                <span className="text-base font-bold text-emerald-600">
                  +{formatCurrency(result.totalInterestEarned)}
                </span>
                <span className="text-[10px] text-emerald-700 font-medium block">
                  Free money earned from APY
                </span>
              </div>
            </div>
          </div>

          {/* Goal Milestones Checklist */}
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-3">
              Goal Milestones Progression
            </h4>
            <div className="space-y-2 text-xs">
              {[
                { label: '25% of Target', amt: targetAmount * 0.25 },
                { label: '50% Halfway Mark', amt: targetAmount * 0.5 },
                { label: '75% Home Stretch', amt: targetAmount * 0.75 },
                { label: '100% Target Complete', amt: targetAmount },
              ].map((m, idx) => {
                const reached = initialSavings >= m.amt;
                return (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-2 rounded-lg border ${
                      reached
                        ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <CheckCircle2
                        className={`w-4 h-4 ${reached ? 'text-emerald-600' : 'text-slate-300'}`}
                      />
                      <span className="font-semibold">{m.label}</span>
                    </div>
                    <span className="font-bold">{formatCurrency(m.amt)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Target Timeline Chart */}
      <div className="border-t border-slate-200 p-6 sm:p-8 bg-slate-50/50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Savings Growth Curve to Target
            </h3>
            <p className="text-xs text-slate-500">
              Your balance trajectory growing to touch your target milestone.
            </p>
          </div>
        </div>

        <div className="h-64 w-full">
          {isMounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGoal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
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
                  formatter={(val: any) => [formatCurrency(Number(val)), 'Portfolio Balance']}
                  labelFormatter={(label) => `At Year ${label}`}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <ReferenceLine y={targetAmount} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Target Goal', fill: '#ef4444', fontSize: 11, position: 'insideTopRight' }} />
                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke="#2563eb"
                  strokeWidth={2}
                  fill="url(#colorGoal)"
                  name="balance"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : null}
        </div>
      </div>
    </div>
  );
}
