import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'FinanceCalc Hub — Free Personal Finance Calculators & Amortization';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

function Chart() {
  const bars = [20, 34, 26, 48, 60];
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
      {bars.map((h, i) => (
        <div key={i} style={{ width: 10, height: h, borderRadius: 3, background: '#fbbf24' }} />
      ))}
    </div>
  );
}

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #052e16 0%, #14532d 55%, #166534 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 36 }}>
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: 22,
              background: '#166534',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(22,101,52,0.5)',
            }}
          >
            <Chart />
          </div>
          <div style={{ fontSize: 56, fontWeight: 800, color: '#ffffff', letterSpacing: -1 }}>
            FinanceCalc Hub
          </div>
        </div>
        <div style={{ fontSize: 28, color: '#bbf7d0', maxWidth: 960, textAlign: 'center' }}>
          Precision Personal Finance Calculators &amp; Amortization Analytics
        </div>
        <div style={{ marginTop: 44, display: 'flex', gap: 16 }}>
          {['EMI', 'Mortgage', 'Compound Interest', 'Savings'].map((t) => (
            <div
              key={t}
              style={{
                padding: '10px 22px',
                borderRadius: 999,
                background: 'rgba(251,191,36,0.12)',
                color: '#fde68a',
                fontSize: 19,
                border: '1px solid rgba(251,191,36,0.35)',
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
