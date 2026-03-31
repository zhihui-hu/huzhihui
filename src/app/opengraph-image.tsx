import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';
export const alt = 'Hu Zhihui personal website';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '56px',
        background:
          'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
        color: '#0f172a',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: '0.16em',
          }}
        >
          HUZHIHUI.COM
        </div>
        <div
          style={{
            display: 'flex',
            padding: '10px 18px',
            borderRadius: '9999px',
            background: '#0f172a',
            color: '#f8fafc',
            fontSize: 22,
            fontWeight: 600,
          }}
        >
          PROGRAMMER
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          maxWidth: '900px',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.05,
          }}
        >
          Hu Zhihui
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 34,
            color: '#334155',
          }}
        >
          Personal Website and Portfolio
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            lineHeight: 1.4,
            color: '#475569',
          }}
        >
          Building web and cross-platform products since December 2016 with
          React, Vue, TypeScript and Electron.
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 22,
          color: '#64748b',
        }}
      >
        <div style={{ display: 'flex' }}>Software Engineer</div>
        <div style={{ display: 'flex' }}>huzhihui.com</div>
      </div>
    </div>,
    size,
  );
}
