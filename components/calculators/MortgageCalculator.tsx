'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { calculateMortgage } from '@/lib/calculations';
import { useCurrency } from '@/lib/currency-context';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import {
  Home,
  ShieldAlert,
  Download,
  Share2,
  Check,
  Percent,
  DollarSign,
  Info,
  Calendar,
  Building
} from 'lucide-react';

interface Props {
  initialPrice?: number;
  initialDownPercent?: number;
  initialRate?: number;
  initialTerm?: number;
}

export default function MortgageCalculator({
  initialPrice = 450000,
  initialDownPercent = 20,
  initialRate = 6.75,
  initialTerm = 30,
}: Props) {
  const { formatCurrency, currency } = useCurrency();
  const [isMounted, setIsMounted] = useState(false);

  // Inputs
  const [homePrice, setHomePrice] = useState<number>(initialPrice);
  const [downPercent, setDownPercent] = useState<number>(initialDownPercent);
  const [interestRate, setInterestRate] = useState<number>(initialRate);
  const [loanTerm, setLoanTerm] = useState<number>(initialTerm);
  const [propertyTaxRate, setPropertyTaxRate] = useState<number>(1.2); // 1.2% national average
  const [annualInsurance, setAnnualInsurance] = useState<number>(1400); // $1,400/yr
  const [monthlyHoa, setMonthlyHoa] = useState<number>(0);
  const [pmiRate, setPmiRate] = useState<number>(0.75); // 0.75% typical PMI
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const downAmount = useMemo(() => {
    return Math.round((homePrice * downPercent) / 100);
  }, [homePrice, downPercent]);

  const handleDownAmountChange = (amount: number) => {
    if (homePrice > 0) {
      const pct = Math.min(100, Math.max(0, (amount / homePrice) * 100));
      setDownPercent(Math.round(pct * 10) / 10);
    }
  };

  const mortgageResult = useMemo(() => {
    return calculateMortgage({
      homePrice,
      downPaymentPercent: downPercent,
      downPaymentAmount: downAmount,
      loanTermYears: loanTerm,
      annualInterestRate: interestRate,
      annualPropertyTaxRate: propertyTaxRate,
      annualHomeInsurance: annualInsurance,
      monthlyHoaFee: monthlyHoa,
      annualPmiRate: pmiRate,
    });
  }, [
    homePrice,
    downPercent,
    downAmount,
    loanTerm,
    interestRate,
    propertyTaxRate,
    annualInsurance,
    monthlyHoa,
    pmiRate,
  ]);

  // Donut chart of monthly payment composition
  const monthlyBreakdownData = useMemo(() => {
    const data = [
      {
        name: 'Principal & Interest',
        value: mortgageResult.monthlyPrincipalAndInterest,
        color: '#1e40af', // Deep blue
      },
      {
        name: 'Property Taxes',
        value: mortgageResult.monthlyPropertyTax,
        color: '#0284c7', // Sky blue
      },
      {
        name: 'Home Insurance',
        value: mortgageResult.monthlyHomeInsurance,
        color: '#10b981', // Emerald
      },
    ];

    if (mortgageResult.monthlyPmi > 0) {
      data.push({
        name: 'PMI (Private Insurance)',
        value: mortgageResult.monthlyPmi,
        color: '#f59e0b', // Amber
      });
    }

    if (mortgageResult.monthlyHoa > 0) {
      data.push({
        name: 'HOA Fees',
        value: mortgageResult.monthlyHoa,
        color: '#8b5cf6', // Purple
      });
    }

    return data;
  }, [mortgageResult]);

  const copySummary = () => {
    const text = `FinanceCalc Hub - Mortgage Estimate:\nHome Price: ${formatCurrency(homePrice)}\nDown Payment: ${formatCurrency(downAmount)} (${downPercent}%)\nInterest Rate: ${interestRate}%\nTerm: ${loanTerm} Years\nTotal Monthly Payment: ${formatCurrency(mortgageResult.totalMonthlyPayment)}\n(P&I: ${formatCurrency(mortgageResult.monthlyPrincipalAndInterest)}, Taxes: ${formatCurrency(mortgageResult.monthlyPropertyTax)}, Ins: ${formatCurrency(mortgageResult.monthlyHomeInsurance)}${mortgageResult.monthlyPmi > 0 ? `, PMI: ${formatCurrency(mortgageResult.monthlyPmi)}` : ''})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const exportSchedule = () => {
    const headers = ['Year', 'Starting Balance', 'Annual Payment', 'Principal Paid', 'Interest Paid', 'Ending Balance'];
    const rows = mortgageResult.annualSchedule.map((r) => [
      r.year,
      r.startingBalance,
      r.totalPayment,
      r.principalPaid,
      r.interestPaid,
      r.endingBalance,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Mortgage_Amortization_${homePrice}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const hasPmi = downPercent < 20;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Top Header Bar */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-blue-600 text-xs font-semibold px-2.5 py-0.5 rounded text-white uppercase tracking-wider">
              PITI Mortgage Engine
            </span>
            <span className="text-slate-400 text-xs">• Real-world homeowner expenses</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">Mortgage Calculator</h2>
          <p className="text-slate-300 text-sm mt-0.5">
            Calculate your complete monthly housing payment including principal, interest, taxes, insurance, and PMI.
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
          {/* Home Purchase Price */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold text-slate-800">
              <label htmlFor="home-price">Home Purchase Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                  {currency.symbol}
                </span>
                <input
                  id="home-price"
                  type="number"
                  min={50000}
                  max={5000000}
                  step={5000}
                  value={homePrice}
                  onChange={(e) => setHomePrice(Math.max(0, Number(e.target.value)))}
                  className="pl-7 pr-3 py-1.5 w-36 text-right font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <input
              type="range"
              min={100000}
              max={2000000}
              step={10000}
              value={homePrice}
              onChange={(e) => setHomePrice(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>{formatCurrency(100000, { compact: true })}</span>
              <span>{formatCurrency(1000000, { compact: true })}</span>
              <span>{formatCurrency(2000000, { compact: true })}</span>
            </div>
          </div>

          {/* Down Payment ($ and %) */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold text-slate-800">
              <label htmlFor="down-payment-amt">Down Payment</label>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                    {currency.symbol}
                  </span>
                  <input
                    id="down-payment-amt"
                    type="number"
                    min={0}
                    max={homePrice}
                    step={1000}
                    value={downAmount}
                    onChange={(e) => handleDownAmountChange(Number(e.target.value))}
                    className="pl-6 pr-2 py-1.5 w-28 text-right font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="relative">
                  <input
                    type="number"
                    min={0}
                    max={100}
                    step={0.5}
                    value={downPercent}
                    onChange={(e) => setDownPercent(Math.min(100, Math.max(0, Number(e.target.value))))}
                    className="pr-6 pl-2 py-1.5 w-20 text-right font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-medium">
                    %
                  </span>
                </div>
              </div>
            </div>
            <input
              type="range"
              min={0}
              max={50}
              step={1}
              value={downPercent}
              onChange={(e) => setDownPercent(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex items-center justify-between text-xs">
              <div className="flex space-x-1.5">
                {[3.5, 5, 10, 20].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setDownPercent(preset)}
                    className={`px-2 py-0.5 rounded border text-[11px] font-medium transition-colors ${
                      downPercent === preset
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {preset}%
                  </button>
                ))}
              </div>
              <span className="text-slate-500 font-medium">
                Loan Amount: {formatCurrency(mortgageResult.loanAmount)}
              </span>
            </div>
          </div>

          {/* Loan Term & Interest Rate */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-slate-800 block mb-1">
                Loan Term
              </label>
              <div className="grid grid-cols-3 gap-1">
                {[15, 20, 30].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setLoanTerm(term)}
                    className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                      loanTerm === term
                        ? 'bg-blue-700 text-white border-blue-700 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {term} Years
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="mortgage-rate" className="text-sm font-semibold text-slate-800">
                  Interest Rate
                </label>
                <span className="text-xs font-bold text-blue-700">{interestRate}%</span>
              </div>
              <div className="relative">
                <input
                  id="mortgage-rate"
                  type="number"
                  min={1}
                  max={15}
                  step={0.125}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Math.max(0.1, Number(e.target.value)))}
                  className="w-full px-3 py-1.5 text-right font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg text-sm pr-7"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">
                  %
                </span>
              </div>
            </div>
          </div>

          {/* Taxes, Insurance, HOA Details */}
          <div className="pt-4 border-t border-slate-200 space-y-4">
            <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider">
              Taxes, Insurance & Additional Fees
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">
                  Property Tax (%/yr)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min={0}
                    max={5}
                    step={0.1}
                    value={propertyTaxRate}
                    onChange={(e) => setPropertyTaxRate(Math.max(0, Number(e.target.value)))}
                    className="w-full px-2.5 py-1.5 text-right text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg pr-6"
                  />
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                    %
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  {formatCurrency(mortgageResult.monthlyPropertyTax)}/mo
                </span>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">
                  Home Insurance ($/yr)
                </label>
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                    {currency.symbol}
                  </span>
                  <input
                    type="number"
                    min={0}
                    max={10000}
                    step={50}
                    value={annualInsurance}
                    onChange={(e) => setAnnualInsurance(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-6 pr-2 py-1.5 text-right text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  {formatCurrency(mortgageResult.monthlyHomeInsurance)}/mo
                </span>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">
                  HOA Fees ($/mo)
                </label>
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                    {currency.symbol}
                  </span>
                  <input
                    type="number"
                    min={0}
                    max={2000}
                    step={25}
                    value={monthlyHoa}
                    onChange={(e) => setMonthlyHoa(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-6 pr-2 py-1.5 text-right text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Monthly dues
                </span>
              </div>
            </div>

            {/* PMI Notification Alert */}
            {hasPmi && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start space-x-2.5 text-xs text-amber-900">
                <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold">Private Mortgage Insurance (PMI) Active:</strong>
                  <p className="mt-0.5 text-amber-800">
                    Because down payment is under 20% ({downPercent}%), lenders require PMI. Estimated at <strong>{formatCurrency(mortgageResult.monthlyPmi)}/mo</strong> until loan reaches 80% LTV.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Output: Monthly Breakdown & Visuals */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          {/* Main Payment Highlight Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <div className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
              Total Estimated Monthly Payment (PITI)
            </div>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-blue-700 tracking-tight">
                {formatCurrency(mortgageResult.totalMonthlyPayment)}
              </span>
              <span className="text-xs text-slate-500 font-medium">/ month</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-4 border-t border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Principal & Int.</span>
                <span className="font-bold text-slate-800">
                  {formatCurrency(mortgageResult.monthlyPrincipalAndInterest)}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Property Tax</span>
                <span className="font-bold text-slate-800">
                  {formatCurrency(mortgageResult.monthlyPropertyTax)}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Insurance</span>
                <span className="font-bold text-slate-800">
                  {formatCurrency(mortgageResult.monthlyHomeInsurance)}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">PMI / HOA</span>
                <span className="font-bold text-slate-800">
                  {formatCurrency(mortgageResult.monthlyPmi + mortgageResult.monthlyHoa)}
                </span>
              </div>
            </div>
          </div>

          {/* Monthly Cost Breakdown Donut Chart */}
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">
              Monthly Payment Components Breakdown
            </h4>
            <div className="h-48 w-full flex items-center justify-center">
              {isMounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={monthlyBreakdownData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {monthlyBreakdownData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip
                      formatter={(val: any) => [formatCurrency(Number(val)), '']}
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
              ) : null}
            </div>
          </div>

          {/* Lifetime Cost Summary */}
          <div className="bg-slate-100/70 border border-slate-200 rounded-xl p-4 text-xs space-y-1.5">
            <div className="flex justify-between text-slate-600">
              <span>Total Interest Paid over {loanTerm} years:</span>
              <strong className="text-slate-900">{formatCurrency(mortgageResult.totalInterestPaid)}</strong>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Total Lifetime Cost (Loan + Interest + Taxes + Ins):</span>
              <strong className="text-slate-900">{formatCurrency(mortgageResult.totalCostOfLoan)}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Amortization Table */}
      <div className="border-t border-slate-200 p-6 sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Mortgage Amortization Schedule (Annual)
            </h3>
            <p className="text-xs text-slate-500">
              Annual progression of loan balance reduction and cumulative interest.
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

        <div className="overflow-x-auto border border-slate-200 rounded-xl max-h-96">
          <table className="w-full text-left text-xs text-slate-700 border-collapse">
            <thead className="bg-slate-100 text-slate-600 font-semibold sticky top-0 border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Year</th>
                <th className="py-2.5 px-4 text-right">Starting Balance</th>
                <th className="py-2.5 px-4 text-right">Annual P&I Payment</th>
                <th className="py-2.5 px-4 text-right">Principal Paid</th>
                <th className="py-2.5 px-4 text-right">Interest Paid</th>
                <th className="py-2.5 px-4 text-right">Ending Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {mortgageResult.annualSchedule.map((row) => (
                <tr key={row.year} className="hover:bg-slate-50">
                  <td className="py-2.5 px-4 font-bold text-slate-900">Year {row.year}</td>
                  <td className="py-2.5 px-4 text-right">{formatCurrency(row.startingBalance)}</td>
                  <td className="py-2.5 px-4 text-right font-medium">{formatCurrency(row.totalPayment)}</td>
                  <td className="py-2.5 px-4 text-right text-blue-700 font-semibold">{formatCurrency(row.principalPaid)}</td>
                  <td className="py-2.5 px-4 text-right text-amber-700">{formatCurrency(row.interestPaid)}</td>
                  <td className="py-2.5 px-4 text-right font-bold text-slate-900">{formatCurrency(row.endingBalance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
