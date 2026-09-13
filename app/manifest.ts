import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FinanceCalc Hub',
    short_name: 'FinanceCalc',
    description:
      'Precision Personal Finance Calculators & Amortization Analytics - EMI, mortgage, compound interest and savings.',
    start_url: '/',
    display: 'standalone',
    background_color: '#052e16',
    theme_color: '#166534',
    icons: [
      { src: '/icon', sizes: '192x192', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  };
}
