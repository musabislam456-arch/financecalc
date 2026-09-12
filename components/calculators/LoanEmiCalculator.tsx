'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { 
  calculateLoanEMI, 
  AnnualAmortization, 
  AmortizationPeriod 
} from '@/lib/calculations';
import { useCurrency } from '@/lib/currency-context';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from 'recharts';
import { 
  Download, 
  Printer, 
  Share2, 
  Check, 
  Sparkles, 
  HelpCircle, 
  ArrowRight,
  TrendingDown,
  Calendar,
  DollarSign,
  Percent,
  Clock
} from 'lucide-react';

interface Props {
  initialPrincipal?: number;
  initialRate?: number;
  initialYears?: number;
  embeddedMode?: boolean;
}

export default function LoanEmiCalculator({
  initialPrincipal = 250000,
  initialRate = 6.5,
  initialYears = 15,
  embeddedMode = false,
}: Props) {
  const { formatCurrency, currency } = useCurrency();
  const [isMounted, setIsMounted] = useState(false);

  // Form states
  const [principal, setPrincipal] = useState<number>(initialPrincipal);
  const [interestRate, setInterestRate] = useState<number>(initialRate);
  const [tenureYears, setTenureYears] = useState<number>(initialYears);
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');
  const [tenureMonthsInput, setTenureMonthsInput] = useState<number>(initialYears * 12);
  const [extraPayment, setExtraPayment] = useState<number>(0);
  const [showPrepayment, setShowPrepayment] = useState<boolean>(false);

  // Amortization table states
  const [viewMode, setViewMode] = useState<'annual' | 'monthly'>('annual');
  const [monthlyPage, setMonthlyPage] = useState<number>(1);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const actualYears = tenureType === 'years' ? tenureYears : tenureMonthsInput / 12;

  // Calculation memo
  const result = useMemo(() => {
    return calculateLoanEMI(
      principal,
      interestRate,
      actualYears,
      showPrepayment ? extraPayment : 0
    );
  }, [principal, interestRate, actualYears, showPrepayment, extraPayment]);

  // Baseline without extra payment for comparison
  const baselineResult = useMemo(() => {
    return calculateLoanEMI(principal, interestRate, actualYears, 0);
  }, [principal, interestRate, actualYears]);

  // Donut chart data
  const pieData = useMemo(() => {
    return [
      { name: 'Principal Amount', value: principal, color: '#2563eb' },
      { name: 'Total Interest', value: result.totalInterest, color: '#f59e0b' },
    ];
  }, [principal, result.totalInterest]);

  // Area chart data: compare balance trajectory
  const trajectoryData = useMemo(() => {
    const data: { year: number; baseBalance: number; actualBalance: number }[] = [];
    const maxYears = Math.max(
      baselineResult.annualSchedule.length,
      result.annualSchedule.length
    );

    for (let y = 1; y <= maxYears; y++) {
      const baseYear = baselineResult.annualSchedule.find((a) => a.year === y);
      const actualYear = result.annualSchedule.find((a) => a.year === y);

      data.push({
        year: y,
        baseBalance: baseYear ? baseYear.endingBalance : 0,
        actualBalance: actualYear ? actualYear.endingBalance : 0,
      });
    }
    return data;
  }, [baselineResult, result]);

  // Export CSV
  const exportToCSV = () => {
    let headers: string[] = [];
    let rows: (string | number)[][] = [];

    if (viewMode === 'annual') {
      headers = ['Year', 'Starting Balance', 'Total Payment', 'Principal Paid', 'Interest Paid', 'Ending Balance'];
      rows = result.annualSchedule.map((row) => [
        row.year,
        row.startingBalance,
        row.totalPayment,
        row.principalPaid,
        row.interestPaid,
        row.endingBalance,
      ]);
    } else {
      headers = ['Month #', 'Payment', 'Principal', 'Interest', 'Extra Prepayment', 'Remaining Balance'];
      rows = result.monthlySchedule.map((row) => [
        row.period,
        row.payment,
        row.principal,
        row.interest,
        row.extraPayment,
        row.remainingBalance,
      ]);
    }

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Loan_Amortization_${viewMode}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyShareSummary = () => {
    const text = `FinanceCalc Hub - Loan EMI Summary:\nLoan Amount: ${formatCurrency(principal)}\nInterest Rate: ${interestRate}%\nTenure: ${actualYears} Years\nMonthly EMI: ${formatCurrency(result.monthlyPayment)}\nTotal Interest: ${formatCurrency(result.totalInterest)}\nTotal Payable: ${formatCurrency(result.totalPayment)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Monthly pagination
  const pageSize = 12;
  const totalMonthlyPages = Math.ceil(result.monthlySchedule.length / pageSize);
  const currentMonthlyItems = result.monthlySchedule.slice(
    (monthlyPage - 1) * pageSize,
    monthlyPage * pageSize
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Top Header Bar */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-blue-600 text-xs font-semibold px-2.5 py-0.5 rounded text-white uppercase tracking-wider">
              Amortization Engine
            </span>
            <span className="text-slate-400 text-xs">• Instant reducing-balance formula</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">Loan & EMI Calculator</h2>
          <p className="text-slate-300 text-sm mt-0.5">
            Model personal, car, or business loans with exact monthly breakdown and prepayment analytics.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={copyShareSummary}
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
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>
        </div>
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Inputs */}
        <div className="lg:col-span-6 space-y-6">
          {/* Loan Amount */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold text-slate-800">
              <label htmlFor="principal-input" className="flex items-center space-x-1.5">
                <span>Loan Principal Amount</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                  {currency.symbol}
                </span>
                <input
                  id="principal-input"
                  type="number"
                  min={1000}
                  max={10000000}
                  step={1000}
                  value={principal}
                  onChange={(e) => setPrincipal(Math.max(0, Number(e.target.value)))}
                  className="pl-7 pr-3 py-1.5 w-36 text-right font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>
            </div>
            <input
              type="range"
              min={5000}
              max={1500000}
              step={5000}
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>{formatCurrency(5000, { compact: true })}</span>
              <span>{formatCurrency(750000, { compact: true })}</span>
              <span>{formatCurrency(1500000, { compact: true })}</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold text-slate-800">
              <label htmlFor="rate-input" className="flex items-center space-x-1.5">
                <span>Annual Interest Rate (% p.a.)</span>
              </label>
              <div className="relative">
                <input
                  id="rate-input"
                  type="number"
                  min={0.1}
                  max={30}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
                  className="pr-7 pl-3 py-1.5 w-28 text-right font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                  %
                </span>
              </div>
            </div>
            <input
              type="range"
              min={1}
              max={20}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>1.0%</span>
              <span>10.0%</span>
              <span>20.0%</span>
            </div>
          </div>

          {/* Loan Tenure */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold text-slate-800">
              <label htmlFor="tenure-input" className="flex items-center space-x-1.5">
                <span>Loan Tenure</span>
              </label>
              <div className="flex items-center space-x-2">
                <div className="inline-flex rounded-md shadow-sm">
                  <button
                    type="button"
                    onClick={() => {
                      setTenureType('years');
                      setTenureYears(Math.round(tenureMonthsInput / 12) || 1);
                    }}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-l-md border ${
                      tenureType === 'years'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-100 text-slate-600 border-slate-300'
                    }`}
                  >
                    Years
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTenureType('months');
                      setTenureMonthsInput(tenureYears * 12);
                    }}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-r-md border-t border-b border-r ${
                      tenureType === 'months'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-100 text-slate-600 border-slate-300'
                    }`}
                  >
                    Months
                  </button>
                </div>
                <input
                  id="tenure-input"
                  type="number"
                  min={tenureType === 'years' ? 1 : 6}
                  max={tenureType === 'years' ? 40 : 480}
                  value={tenureType === 'years' ? tenureYears : tenureMonthsInput}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (tenureType === 'years') setTenureYears(val);
                    else setTenureMonthsInput(val);
                  }}
                  className="px-2 py-1.5 w-20 text-center font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            {tenureType === 'years' ? (
              <input
                type="range"
                min={1}
                max={30}
                step={1}
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            ) : (
              <input
                type="range"
                min={12}
                max={360}
                step={6}
                value={tenureMonthsInput}
                onChange={(e) => setTenureMonthsInput(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            )}
            <div className="flex justify-between text-xs text-slate-400">
              <span>{tenureType === 'years' ? '1 Year' : '12 Mo'}</span>
              <span>{tenureType === 'years' ? '15 Years' : '180 Mo'}</span>
              <span>{tenureType === 'years' ? '30 Years' : '360 Mo'}</span>
            </div>
          </div>

          {/* Prepayment Toggle Section */}
          <div className="pt-3 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="prepayment-check"
                  checked={showPrepayment}
                  onChange={(e) => setShowPrepayment(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                />
                <label
                  htmlFor="prepayment-check"
                  className="text-sm font-semibold text-slate-800 cursor-pointer flex items-center space-x-1"
                >
                  <span>Include Extra Monthly Prepayment</span>
                  <span className="text-[11px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                    Save Interest
                  </span>
                </label>
              </div>
            </div>

            {showPrepayment && (
              <div className="mt-3 p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2 animate-in fade-in">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                  <span>Additional Principal Payment / Month</span>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                      {currency.symbol}
                    </span>
                    <input
                      type="number"
                      min={0}
                      max={10000}
                      step={50}
                      value={extraPayment}
                      onChange={(e) => setExtraPayment(Math.max(0, Number(e.target.value)))}
                      className="pl-6 pr-2 py-1 w-28 text-right font-bold text-slate-900 bg-white border border-emerald-300 rounded text-xs focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min={0}
                  max={2000}
                  step={25}
                  value={extraPayment}
                  onChange={(e) => setExtraPayment(Number(e.target.value))}
                  className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                {result.interestSavings && result.interestSavings > 0 ? (
                  <div className="text-xs text-emerald-900 flex items-center space-x-1 font-medium pt-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>
                      You will save <strong>{formatCurrency(result.interestSavings)}</strong> in interest and pay off <strong>{Math.floor((result.monthsSaved || 0) / 12)} yrs {(result.monthsSaved || 0) % 12} mos earlier</strong>!
                    </span>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Dynamic Results & Visuals */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          {/* Main Result Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 relative overflow-hidden">
            <div className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
              Calculated Monthly Payment (EMI)
            </div>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-blue-700 tracking-tight">
                {formatCurrency(result.monthlyPayment)}
              </span>
              <span className="text-xs text-slate-500 font-medium">/ month</span>
            </div>

            {showPrepayment && extraPayment > 0 && (
              <div className="mt-2 text-xs font-semibold text-emerald-700 bg-emerald-100/70 border border-emerald-300/60 px-2.5 py-1 rounded-md inline-block">
                Total monthly outlay: {formatCurrency(result.monthlyPayment + extraPayment)} (Includes {formatCurrency(extraPayment)} extra principal)
              </div>
            )}

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-200 text-sm">
              <div>
                <span className="text-xs text-slate-500 block">Total Interest Payable</span>
                <span className="text-lg font-bold text-slate-900">
                  {formatCurrency(result.totalInterest)}
                </span>
                <span className="text-[11px] text-amber-600 block mt-0.5">
                  ({((result.totalInterest / result.totalPayment) * 100).toFixed(1)}% of total repayment)
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Total Repayment Amount</span>
                <span className="text-lg font-bold text-slate-900">
                  {formatCurrency(result.totalPayment)}
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  Principal + Interest
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Visual Pie Breakdown */}
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">
              Payment Composition (Principal vs Interest)
            </h4>
            <div className="h-44 w-full flex items-center justify-center">
              {isMounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip
                      formatter={(value: any) => [formatCurrency(Number(value)), '']}
                      contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                    />
                    <Legend
                      verticalAlign="bottom"
                      formatter={(value, entry: any) => (
                        <span className="text-xs font-medium text-slate-700">
                          {value}: {formatCurrency(entry.payload.value)}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-xs text-slate-400">Loading visualization...</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Trajectory Area Chart: Loan Balance Over Time */}
      <div className="border-t border-slate-200 p-6 sm:p-8 bg-slate-50/50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Loan Balance Reduction Over Tenure
            </h3>
            <p className="text-xs text-slate-500">
              Visual trajectory showing outstanding balance reduction year by year.
            </p>
          </div>
          <div className="flex items-center space-x-4 text-xs mt-2 sm:mt-0">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-600 inline-block" />
              <span className="text-slate-600 font-medium">Regular Schedule</span>
            </div>
            {showPrepayment && extraPayment > 0 && (
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                <span className="text-slate-600 font-medium">With Prepayment</span>
              </div>
            )}
          </div>
        </div>

        <div className="h-64 w-full">
          {isMounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trajectoryData} margin={{ top: 10, right: 20, left: 20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBase" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
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
                    name === 'baseBalance' ? 'Standard Balance' : 'With Extra Payment',
                  ]}
                  labelFormatter={(label) => `End of Year ${label}`}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Area
                  type="monotone"
                  dataKey="baseBalance"
                  stroke="#2563eb"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorBase)"
                  name="baseBalance"
                />
                {showPrepayment && extraPayment > 0 && (
                  <Area
                    type="monotone"
                    dataKey="actualBalance"
                    stroke="#10b981"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorActual)"
                    name="actualBalance"
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          ) : null}
        </div>
      </div>

      {/* Full Amortization Schedule Table */}
      <div className="border-t border-slate-200 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Loan Amortization Schedule
            </h3>
            <p className="text-xs text-slate-500">
              Exact periodic payment breakdown between interest charges and principal reduction.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="inline-flex rounded-lg border border-slate-300 p-0.5 bg-slate-100 text-xs">
              <button
                type="button"
                onClick={() => setViewMode('annual')}
                className={`px-3 py-1.5 font-semibold rounded-md transition-all ${
                  viewMode === 'annual'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Annual Summary
              </button>
              <button
                type="button"
                onClick={() => {
                  setViewMode('monthly');
                  setMonthlyPage(1);
                }}
                className={`px-3 py-1.5 font-semibold rounded-md transition-all ${
                  viewMode === 'monthly'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Monthly Schedule
              </button>
            </div>

            <button
              type="button"
              onClick={exportToCSV}
              className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-300 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Schedule Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-sm text-slate-700 border-collapse">
            <thead className="bg-slate-100/80 text-xs uppercase font-semibold text-slate-600 border-b border-slate-200">
              {viewMode === 'annual' ? (
                <tr>
                  <th className="py-3 px-4">Year</th>
                  <th className="py-3 px-4 text-right">Starting Balance</th>
                  <th className="py-3 px-4 text-right">Total Payment</th>
                  <th className="py-3 px-4 text-right">Principal Repaid</th>
                  <th className="py-3 px-4 text-right">Interest Charged</th>
                  <th className="py-3 px-4 text-right">Ending Balance</th>
                </tr>
              ) : (
                <tr>
                  <th className="py-3 px-4">Month #</th>
                  <th className="py-3 px-4 text-right">Payment</th>
                  <th className="py-3 px-4 text-right">Principal</th>
                  <th className="py-3 px-4 text-right">Interest</th>
                  {showPrepayment && <th className="py-3 px-4 text-right">Extra Payment</th>}
                  <th className="py-3 px-4 text-right">Remaining Balance</th>
                </tr>
              )}
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs">
              {viewMode === 'annual' ? (
                result.annualSchedule.map((row) => (
                  <tr key={row.year} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-900">Year {row.year}</td>
                    <td className="py-3 px-4 text-right">{formatCurrency(row.startingBalance)}</td>
                    <td className="py-3 px-4 text-right font-medium text-slate-900">{formatCurrency(row.totalPayment)}</td>
                    <td className="py-3 px-4 text-right text-blue-700 font-semibold">{formatCurrency(row.principalPaid)}</td>
                    <td className="py-3 px-4 text-right text-amber-700">{formatCurrency(row.interestPaid)}</td>
                    <td className="py-3 px-4 text-right font-bold text-slate-900">{formatCurrency(row.endingBalance)}</td>
                  </tr>
                ))
              ) : (
                currentMonthlyItems.map((row) => (
                  <tr key={row.period} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-4 font-bold text-slate-900">Month {row.period}</td>
                    <td className="py-2.5 px-4 text-right font-medium text-slate-900">{formatCurrency(row.payment)}</td>
                    <td className="py-2.5 px-4 text-right text-blue-700 font-semibold">{formatCurrency(row.principal)}</td>
                    <td className="py-2.5 px-4 text-right text-amber-700">{formatCurrency(row.interest)}</td>
                    {showPrepayment && (
                      <td className="py-2.5 px-4 text-right text-emerald-700 font-semibold">
                        {row.extraPayment > 0 ? formatCurrency(row.extraPayment) : '-'}
                      </td>
                    )}
                    <td className="py-2.5 px-4 text-right font-bold text-slate-900">{formatCurrency(row.remainingBalance)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Monthly Pagination Controls */}
        {viewMode === 'monthly' && totalMonthlyPages > 1 && (
          <div className="flex items-center justify-between mt-4 text-xs text-slate-600">
            <div>
              Showing months {(monthlyPage - 1) * pageSize + 1} to{' '}
              {Math.min(monthlyPage * pageSize, result.monthlySchedule.length)} of {result.monthlySchedule.length}
            </div>
            <div className="flex items-center space-x-1.5">
              <button
                type="button"
                disabled={monthlyPage === 1}
                onClick={() => setMonthlyPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 bg-slate-100 rounded border border-slate-300 disabled:opacity-40 hover:bg-slate-200"
              >
                Previous 12 Mo
              </button>
              <span className="font-semibold text-slate-800">
                Page {monthlyPage} of {totalMonthlyPages}
              </span>
              <button
                type="button"
                disabled={monthlyPage === totalMonthlyPages}
                onClick={() => setMonthlyPage((p) => Math.min(totalMonthlyPages, p + 1))}
                className="px-3 py-1.5 bg-slate-100 rounded border border-slate-300 disabled:opacity-40 hover:bg-slate-200"
              >
                Next 12 Mo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
