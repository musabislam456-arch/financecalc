# FinanceCalc Hub

**Live site:** [financecalc.utilix.site](https://financecalc.utilix.site)

Precision personal finance calculators and amortization analytics — 100% client-side.

## Features

- **Loan EMI Calculator** with full amortization schedule
- **Mortgage Calculator** with PITI breakdown
- **Compound Interest Calculator**
- **Savings Goal Calculator**
- Interactive charts and exportable amortization tables
- Multi-currency support
- Blog for SEO and financial education

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router) + React + TypeScript
- Tailwind CSS
- Auto-generated `sitemap.xml` and `robots.txt`

## Getting Started

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
bun run build
bun start
```

## Project Structure

```
app/            Routes (tools/*, blog, about, contact, privacy, terms)
components/     Shared UI components (Navbar, Footer, etc.)
lib/            Currency context and blog data
```

## License

All rights reserved.
