import { useState } from 'react';

const WORKER_BASE = 'https://moh-proxy.fanarali881.workers.dev';

const PAGES = [
  WORKER_BASE + '/?url=' + encodeURIComponent('https://insonline.moh.gov.kw/Insurance/logaction'),
  WORKER_BASE + '/?url=' + encodeURIComponent('https://insonline.moh.gov.kw/Insurance/InsuranceOnline'),
  WORKER_BASE + '/?url=' + encodeURIComponent('https://insonline.moh.gov.kw/Insurance/InsuranceOnline/InsuredSearch'),
];

const PAGE_NAMES = [
  'تسجيل الدخول',
  'التسجيل الآلي',
  'البحث عن مؤمن',
];

export default function KuwaitInsuranceHome() {
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9999,
      background: '#f0f4f8',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Navigation tabs */}
      <div style={{
        display: 'flex',
        gap: 0,
        background: '#1a7a4c',
        padding: '0',
        direction: 'rtl',
        fontFamily: 'Cairo, Arial, sans-serif',
        flexShrink: 0,
      }}>
        {PAGE_NAMES.map((name, i) => (
          <button
            key={i}
            onClick={() => { setCurrentPage(i); setLoading(true); }}
            style={{
              padding: '12px 24px',
              background: currentPage === i ? '#fff' : 'transparent',
              color: currentPage === i ? '#1a7a4c' : '#fff',
              border: 'none',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: currentPage === i ? 'bold' : 'normal',
              fontFamily: 'Cairo, Arial, sans-serif',
              borderBottom: currentPage === i ? '3px solid #1a7a4c' : '3px solid transparent',
              transition: 'all 0.2s',
            }}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Loading overlay */}
      {loading && (
        <div style={{
          position: 'absolute',
          top: 50,
          left: 0,
          width: '100%',
          height: 'calc(100% - 50px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f0f4f8',
          zIndex: 10000,
          direction: 'rtl',
          fontFamily: 'Cairo, Arial, sans-serif'
        }}>
          <div style={{
            width: 60,
            height: 60,
            border: '4px solid #e0e0e0',
            borderTop: '4px solid #1a7a4c',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <p style={{ marginTop: 20, color: '#333', fontSize: 16 }}>
            جاري تحميل {PAGE_NAMES[currentPage]}...
          </p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* iframe showing the proxied page */}
      <iframe
        key={currentPage}
        src={PAGES[currentPage]}
        onLoad={() => setLoading(false)}
        style={{
          width: '100%',
          flex: 1,
          border: 'none',
        }}
        title="النظام الآلي لتسجيل الضمان الصحي"
        allowFullScreen
      />
    </div>
  );
}
