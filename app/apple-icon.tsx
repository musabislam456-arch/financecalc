import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

function Chart() {
  const bars = [16, 28, 20, 38, 48];
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
      {bars.map((h, i) => (
        <div key={i} style={{ width: 8, height: h, borderRadius: 3, background: '#fbbf24' }} />
      ))}
    </div>
  );
}

export default function AppleIcon() {
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
        }}
      >
        <Chart />
      </div>
    ),
    { ...size }
  );
}
