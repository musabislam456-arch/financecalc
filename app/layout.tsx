import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CurrencyProvider } from '@/lib/currency-context';

export const metadata: Metadata = {
  title: 'FinanceCalc Hub — Precision Personal Finance Calculators & Amortization Analytics',
  description:
    'Free personal finance calculators for loan EMI with amortization schedules, mortgage PITI costs, compound interest wealth velocity, and savings goals. 100% client-side private.',
  metadataBase: new URL('https://financecalc.utilix.site'),
  keywords: [
    'EMI calculator',
    'loan amortization schedule',
    'mortgage calculator with taxes',
    'compound interest calculator',
    'savings goal calculator',
    'reducing balance formula',
    'PITI calculator',
  ],
  authors: [{ name: 'FinanceCalc Hub Quantitative Team' }],
  openGraph: {
    title: 'FinanceCalc Hub — Free Personal Finance Calculators & Amortization',
    description:
      'Institutional-grade loan EMI, mortgage, compound interest, and savings goal calculators with interactive charts and exportable amortization tables.',
    url: 'https://financecalc.utilix.site',
    siteName: 'FinanceCalc Hub',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'FinanceCalc Hub — Free Personal Finance Calculators & Amortization',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FinanceCalc Hub — Personal Finance Calculators',
    description:
      'Interactive loan amortization, mortgage PITI breakdown, compound interest, and savings milestone calculators.',
    images: ['/opengraph-image'],
  },
  icons: {
    icon: '/icon',
    shortcut: '/icon',
    apple: '/apple-icon',
  },
  manifest: '/manifest.webmanifest',
  verification: {
    google: 'I_SaNu0LrbiQSkKmCb7bm8LRBISuViD4KTJh0FHRo2s',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col font-sans antialiased" suppressHydrationWarning>
        <CurrencyProvider>
          <Navbar />
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </CurrencyProvider>

        {/* CHATBOT_SCRIPT_START */}
        {/* Paste client's chatbot <script> embed code here */}
        {/* CHATBOT_SCRIPT_END */}
      </body>
    </html>
  );
}
