import { useState, useEffect } from 'react';

const WORKER_BASE = 'https://moh-proxy.fanarali881.workers.dev';

function getInitialPage() {
  // Check if there's a saved page path in the URL hash
  const hash = window.location.hash;
  if (hash && hash.length > 1) {
    const path = decodeURIComponent(hash.substring(1));
    if (path.startsWith('/Insurance')) {
      return WORKER_BASE + path;
    }
  }
  return WORKER_BASE + '/Insurance/logaction';
}

export default function KuwaitInsuranceHome() {
  const [loading, setLoading] = useState(true);
  const [iframeSrc] = useState(getInitialPage);

  useEffect(() => {
    // Listen for navigation messages from the iframe (sent by Worker's injected script)
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'moh-navigation' && event.data.path) {
        // Update the URL hash so refresh goes to the same page
        window.location.hash = encodeURIComponent(event.data.path);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9999,
      background: '#f0f4f8',
    }}>
      {loading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
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
            جاري تحميل النظام الآلي لتسجيل الضمان الصحي...
          </p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      <iframe
        src={iframeSrc}
        onLoad={() => setLoading(false)}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
        }}
        title="النظام الآلي لتسجيل الضمان الصحي"
        allowFullScreen
      />
    </div>
  );
}
