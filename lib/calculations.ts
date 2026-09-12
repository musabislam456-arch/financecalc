export interface AmortizationPeriod {
  period: number; // Month number
  year: number;
  monthName?: string;
  payment: number;
  principal: number;
  interest: number;
  extraPayment: number;
  totalInterestToDate: number;
  remainingBalance: number;
}

export interface AnnualAmortization {
  year: number;
  startingBalance: number;
  totalPayment: number;
  principalPaid: number;
  interestPaid: number;
  endingBalance: number;
}

export interface LoanCalculationResult {
  monthlyPayment: number;
  totalInterest: number;
  totalPayment: number;
  payoffMonths: number;
  monthlySchedule: AmortizationPeriod[];
  annualSchedule: AnnualAmortization[];
  interestSavings?: number;
  monthsSaved?: number;
}

/**
 * Calculates standard Equated Monthly Installment (EMI)
 * Formula: E = P * r * (1+r)^n / ((1+r)^n - 1)
 * where:
 * P = Principal loan amount
 * r = Monthly interest rate (annual rate / 12 / 100)
 * n = Tenure in months
 */
export function calculateLoanEMI(
  principal: number,
  annualInterestRate: number,
  tenureYears: number,
  extraMonthlyPayment: number = 0
): LoanCalculationResult {
  const p = Math.max(0, principal);
  const totalMonths = Math.max(1, Math.round(tenureYears * 12));
  const r = (annualInterestRate / 100) / 12;

  let baseMonthlyPayment = 0;
  if (r === 0) {
    baseMonthlyPayment = p / totalMonths;
  } else {
    baseMonthlyPayment = (p * r * Math.pow(1 + r, totalMonths)) / (Math.pow(1 + r, totalMonths) - 1);
  }

  // Calculate standard baseline without extra payments to determine interest saved
  let standardTotalInterest = 0;
  let tempBal = p;
  for (let m = 1; m <= totalMonths; m++) {
    const interest = tempBal * r;
    const principalPaid = Math.min(tempBal, baseMonthlyPayment - interest);
    standardTotalInterest += interest;
    tempBal = Math.max(0, tempBal - principalPaid);
    if (tempBal <= 0) break;
  }

  // Calculate actual schedule with optional extra monthly payments
  const monthlySchedule: AmortizationPeriod[] = [];
  let remainingBalance = p;
  let totalInterest = 0;
  let month = 0;

  while (remainingBalance > 0.01 && month < totalMonths * 2) {
    month++;
    const interest = remainingBalance * r;
    const regularPrincipal = baseMonthlyPayment - interest;
    
    // Add extra monthly prepayment if any
    const requestedPayment = regularPrincipal + extraMonthlyPayment;
    const principalPaid = Math.min(remainingBalance, requestedPayment);
    const actualExtra = Math.max(0, principalPaid - regularPrincipal);

    remainingBalance = Math.max(0, remainingBalance - principalPaid);
    totalInterest += interest;

    monthlySchedule.push({
      period: month,
      year: Math.ceil(month / 12),
      payment: principalPaid + interest,
      principal: principalPaid,
      interest: interest,
      extraPayment: actualExtra,
      totalInterestToDate: totalInterest,
      remainingBalance: Math.round(remainingBalance * 100) / 100,
    });
  }

  // Aggregate annual schedule
  const annualSchedule: AnnualAmortization[] = [];
  const yearsTotal = Math.ceil(month / 12);

  for (let y = 1; y <= yearsTotal; y++) {
    const monthsInYear = monthlySchedule.filter((m) => m.year === y);
    if (monthsInYear.length === 0) continue;

    const startBal = y === 1 ? p : monthlySchedule.find((m) => m.period === (y - 1) * 12)?.remainingBalance ?? p;
    const yearPrincipal = monthsInYear.reduce((sum, item) => sum + item.principal, 0);
    const yearInterest = monthsInYear.reduce((sum, item) => sum + item.interest, 0);
    const yearPayment = monthsInYear.reduce((sum, item) => sum + item.payment, 0);
    const endBal = monthsInYear[monthsInYear.length - 1].remainingBalance;

    annualSchedule.push({
      year: y,
      startingBalance: Math.round(startBal * 100) / 100,
      totalPayment: Math.round(yearPayment * 100) / 100,
      principalPaid: Math.round(yearPrincipal * 100) / 100,
      interestPaid: Math.round(yearInterest * 100) / 100,
      endingBalance: Math.round(endBal * 100) / 100,
    });
  }

  const payoffMonths = month;
  const interestSavings = Math.max(0, standardTotalInterest - totalInterest);
  const monthsSaved = Math.max(0, totalMonths - payoffMonths);

  return {
    monthlyPayment: Math.round(baseMonthlyPayment * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalPayment: Math.round((p + totalInterest) * 100) / 100,
    payoffMonths,
    monthlySchedule,
    annualSchedule,
    interestSavings: Math.round(interestSavings * 100) / 100,
    monthsSaved,
  };
}

export interface MortgageInputs {
  homePrice: number;
  downPaymentPercent: number;
  downPaymentAmount: number;
  loanTermYears: number;
  annualInterestRate: number;
  annualPropertyTaxRate: number; // percentage of home value
  annualHomeInsurance: number; // dollars per year
  monthlyHoaFee: number; // monthly HOA
  annualPmiRate: number; // usually 0.5% - 1.5% if down payment < 20%
}

export interface MortgageResult {
  loanAmount: number;
  downPayment: number;
  monthlyPrincipalAndInterest: number;
  monthlyPropertyTax: number;
  monthlyHomeInsurance: number;
  monthlyHoa: number;
  monthlyPmi: number;
  totalMonthlyPayment: number;
  totalInterestPaid: number;
  totalCostOfLoan: number; // Principal + Total Interest + Total Taxes + Total Insurance + PMI
  annualSchedule: AnnualAmortization[];
}

export function calculateMortgage(inputs: MortgageInputs): MortgageResult {
  const homePrice = Math.max(0, inputs.homePrice);
  const downPayment = Math.min(homePrice, Math.max(0, inputs.downPaymentAmount));
  const loanAmount = Math.max(0, homePrice - downPayment);
  const totalMonths = inputs.loanTermYears * 12;
  const monthlyRate = (inputs.annualInterestRate / 100) / 12;

  let monthlyPrincipalAndInterest = 0;
  if (monthlyRate === 0) {
    monthlyPrincipalAndInterest = loanAmount / totalMonths;
  } else {
    monthlyPrincipalAndInterest =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
  }

  const monthlyPropertyTax = (homePrice * (inputs.annualPropertyTaxRate / 100)) / 12;
  const monthlyHomeInsurance = inputs.annualHomeInsurance / 12;
  const monthlyHoa = inputs.monthlyHoaFee;

  // PMI is typically charged until loan balance reaches 80% of original home value
  const requiresPmi = downPayment < homePrice * 0.2;
  const monthlyPmi = requiresPmi ? (loanAmount * (inputs.annualPmiRate / 100)) / 12 : 0;

  const totalMonthlyPayment =
    monthlyPrincipalAndInterest + monthlyPropertyTax + monthlyHomeInsurance + monthlyHoa + monthlyPmi;

  // Generate annual schedule
  let remaining = loanAmount;
  let totalInterestPaid = 0;
  const annualSchedule: AnnualAmortization[] = [];

  for (let y = 1; y <= inputs.loanTermYears; y++) {
    const startBal = remaining;
    let yearPrincipal = 0;
    let yearInterest = 0;

    for (let m = 1; m <= 12; m++) {
      if (remaining <= 0) break;
      const interest = remaining * monthlyRate;
      const principal = Math.min(remaining, monthlyPrincipalAndInterest - interest);
      yearInterest += interest;
      yearPrincipal += principal;
      remaining = Math.max(0, remaining - principal);
    }

    totalInterestPaid += yearInterest;

    annualSchedule.push({
      year: y,
      startingBalance: Math.round(startBal * 100) / 100,
      totalPayment: Math.round((yearPrincipal + yearInterest) * 100) / 100,
      principalPaid: Math.round(yearPrincipal * 100) / 100,
      interestPaid: Math.round(yearInterest * 100) / 100,
      endingBalance: Math.round(remaining * 100) / 100,
    });
  }

  const totalCostOfLoan =
    loanAmount +
    totalInterestPaid +
    monthlyPropertyTax * totalMonths +
    monthlyHomeInsurance * totalMonths +
    monthlyHoa * totalMonths;

  return {
    loanAmount: Math.round(loanAmount * 100) / 100,
    downPayment: Math.round(downPayment * 100) / 100,
    monthlyPrincipalAndInterest: Math.round(monthlyPrincipalAndInterest * 100) / 100,
    monthlyPropertyTax: Math.round(monthlyPropertyTax * 100) / 100,
    monthlyHomeInsurance: Math.round(monthlyHomeInsurance * 100) / 100,
    monthlyHoa: Math.round(monthlyHoa * 100) / 100,
    monthlyPmi: Math.round(monthlyPmi * 100) / 100,
    totalMonthlyPayment: Math.round(totalMonthlyPayment * 100) / 100,
    totalInterestPaid: Math.round(totalInterestPaid * 100) / 100,
    totalCostOfLoan: Math.round(totalCostOfLoan * 100) / 100,
    annualSchedule,
  };
}

export interface CompoundYearData {
  year: number;
  totalContributions: number;
  interestEarnedYear: number;
  totalInterest: number;
  balance: number;
}

export interface CompoundInterestResult {
  futureValue: number;
  totalPrincipal: number;
  totalInterest: number;
  growthSchedule: CompoundYearData[];
  ruleOf72Years: number | null;
}

export function calculateCompoundInterest(
  initialPrincipal: number,
  monthlyContribution: number,
  annualInterestRate: number,
  years: number,
  compoundingFrequency: 'monthly' | 'quarterly' | 'semiannually' | 'annually' = 'monthly'
): CompoundInterestResult {
  const p = Math.max(0, initialPrincipal);
  const pmt = Math.max(0, monthlyContribution);
  const r = annualInterestRate / 100;
  const t = Math.max(1, years);

  let n = 12; // Compounding periods per year
  if (compoundingFrequency === 'annually') n = 1;
  else if (compoundingFrequency === 'semiannually') n = 2;
  else if (compoundingFrequency === 'quarterly') n = 4;
  else if (compoundingFrequency === 'monthly') n = 12;

  const growthSchedule: CompoundYearData[] = [];
  let currentBalance = p;
  let totalContributions = p;
  let cumulativeInterest = 0;

  for (let year = 1; year <= t; year++) {
    const startingBal = currentBalance;
    let yearContribution = 0;

    // Simulate 12 months in this year
    for (let m = 1; m <= 12; m++) {
      // Add monthly contribution
      currentBalance += pmt;
      yearContribution += pmt;
      totalContributions += pmt;

      // Apply compounding if applicable this month
      // For monthly: every month (r / 12)
      // For quarterly: at m % 3 === 0 (r / 4)
      // For semi-annual: at m % 6 === 0 (r / 2)
      // For annual: at m === 12 (r)
      if (n === 12) {
        currentBalance *= 1 + r / 12;
      } else if (n === 4 && m % 3 === 0) {
        currentBalance *= 1 + r / 4;
      } else if (n === 2 && m % 6 === 0) {
        currentBalance *= 1 + r / 2;
      } else if (n === 1 && m === 12) {
        currentBalance *= 1 + r;
      }
    }

    const interestEarnedYear = currentBalance - startingBal - yearContribution;
    cumulativeInterest += interestEarnedYear;

    growthSchedule.push({
      year,
      totalContributions: Math.round(totalContributions * 100) / 100,
      interestEarnedYear: Math.round(interestEarnedYear * 100) / 100,
      totalInterest: Math.round(cumulativeInterest * 100) / 100,
      balance: Math.round(currentBalance * 100) / 100,
    });
  }

  const ruleOf72Years = annualInterestRate > 0 ? Math.round((72 / annualInterestRate) * 10) / 10 : null;

  return {
    futureValue: Math.round(currentBalance * 100) / 100,
    totalPrincipal: Math.round(totalContributions * 100) / 100,
    totalInterest: Math.round(cumulativeInterest * 100) / 100,
    growthSchedule,
    ruleOf72Years,
  };
}

export interface SavingsGoalResult {
  targetAmount: number;
  initialAmount: number;
  monthlyDepositRequired: number;
  totalDepositedByYou: number;
  totalInterestEarned: number;
  monthsToGoal: number;
  schedule: {
    month: number;
    year: number;
    savingsDeposit: number;
    interestEarned: number;
    totalBalance: number;
  }[];
}

export function calculateSavingsGoalMonthlyDeposit(
  targetAmount: number,
  initialAmount: number,
  years: number,
  annualInterestRate: number
): SavingsGoalResult {
  const target = Math.max(0, targetAmount);
  const initial = Math.min(target, Math.max(0, initialAmount));
  const months = Math.max(1, Math.round(years * 12));
  const r = (annualInterestRate / 100) / 12;

  // FV of initial deposit after months: initial * (1+r)^months
  const fvInitial = initial * Math.pow(1 + r, months);
  const remainingTarget = Math.max(0, target - fvInitial);

  let monthlyDeposit = 0;
  if (remainingTarget > 0) {
    if (r === 0) {
      monthlyDeposit = remainingTarget / months;
    } else {
      // Annuity formula: FV = PMT * ((1+r)^n - 1) / r
      // PMT = FV * r / ((1+r)^n - 1)
      monthlyDeposit = (remainingTarget * r) / (Math.pow(1 + r, months) - 1);
    }
  }

  // Generate milestone schedule
  let currentBalance = initial;
  const schedule: {
    month: number;
    year: number;
    savingsDeposit: number;
    interestEarned: number;
    totalBalance: number;
  }[] = [];

  let totalInterest = 0;
  let totalDeposited = initial;

  for (let m = 1; m <= months; m++) {
    const interest = currentBalance * r;
    totalInterest += interest;
    currentBalance += interest + monthlyDeposit;
    totalDeposited += monthlyDeposit;

    // Record monthly snapshots
    schedule.push({
      month: m,
      year: Math.ceil(m / 12),
      savingsDeposit: Math.round(monthlyDeposit * 100) / 100,
      interestEarned: Math.round(interest * 100) / 100,
      totalBalance: Math.round(currentBalance * 100) / 100,
    });
  }

  return {
    targetAmount: target,
    initialAmount: initial,
    monthlyDepositRequired: Math.round(monthlyDeposit * 100) / 100,
    totalDepositedByYou: Math.round(totalDeposited * 100) / 100,
    totalInterestEarned: Math.round(totalInterest * 100) / 100,
    monthsToGoal: months,
    schedule,
  };
}
