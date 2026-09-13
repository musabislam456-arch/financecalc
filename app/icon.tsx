import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 192, height: 192 };
export const contentType = 'image/png';

function Chart() {
  const bars = [18, 30, 22, 42, 52];
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
      {bars.map((h, i) => (
        <div key={i} style={{ width: 9, height: h, borderRadius: 3, background: '#fbbf24' }} />
      ))}
    </div>
  );
}

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#166534',
          borderRadius: 40,
        }}
      >
        <Chart />
      </div>
    ),
    { ...size }
  );
}
