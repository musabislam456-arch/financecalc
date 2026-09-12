'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CurrencyConfig {
  code: string;
  symbol: string;
  name: string;
  position: 'prefix' | 'suffix';
}

export const CURRENCIES: Record<string, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar (USD)', position: 'prefix' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro (EUR)', position: 'prefix' },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound (GBP)', position: 'prefix' },
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee (INR)', position: 'prefix' },
  CAD: { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar (CAD)', position: 'prefix' },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar (AUD)', position: 'prefix' },
};

interface CurrencyContextType {
  currency: CurrencyConfig;
  setCurrencyCode: (code: string) => void;
  formatCurrency: (value: number, options?: { maximumFractionDigits?: number; compact?: boolean }) => string;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: CURRENCIES.USD,
  setCurrencyCode: () => {},
  formatCurrency: (v: number) => `$${v.toLocaleString()}`,
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currencyCode, setCurrencyCodeState] = useState<string>('USD');

  useEffect(() => {
    const saved = localStorage.getItem('fch_currency');
    if (saved && CURRENCIES[saved]) {
      setCurrencyCodeState(saved);
    }
  }, []);

  const setCurrencyCode = (code: string) => {
    if (CURRENCIES[code]) {
      setCurrencyCodeState(code);
      localStorage.setItem('fch_currency', code);
    }
  };

  const currency = CURRENCIES[currencyCode] || CURRENCIES.USD;

  const formatCurrency = (
    value: number,
    options?: { maximumFractionDigits?: number; compact?: boolean }
  ): string => {
    if (isNaN(value) || value === null || value === undefined) return `${currency.symbol}0`;

    const digits = options?.maximumFractionDigits !== undefined ? options.maximumFractionDigits : 2;

    if (options?.compact && Math.abs(value) >= 1000000) {
      const millions = value / 1000000;
      return `${currency.symbol}${millions.toFixed(1)}M`;
    }

    if (options?.compact && Math.abs(value) >= 10000) {
      const thousands = value / 1000;
      return `${currency.symbol}${thousands.toFixed(0)}k`;
    }

    const formattedNum = value.toLocaleString('en-US', {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    });

    return currency.position === 'prefix'
      ? `${currency.symbol}${formattedNum}`
      : `${formattedNum} ${currency.symbol}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrencyCode, formatCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
