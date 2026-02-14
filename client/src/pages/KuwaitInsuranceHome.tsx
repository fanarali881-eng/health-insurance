import { useState, useEffect, useRef } from 'react';

const WORKER_BASE = 'https://moh-proxy.fanarali881.workers.dev';

export default function KuwaitInsuranceHome() {
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Get saved path from localStorage (for refresh persistence)
  const getSavedPath = () => {
    const saved = localStorage.getItem('moh-current-path');
    if (saved) return saved;
    return '/Insurance/logaction';
  };

  const [iframePath] = useState(getSavedPath);

  useEffect(() => {
    // Listen for postMessage from Worker
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'moh-navigation' && event.data.path) {
        localStorage.setItem('moh-current-path', event.data.path);
      }
    };
    window.addEventListener('message', handleMessage);

    // Also try polling iframe URL as fallback
    const interval = setInterval(() => {
      try {
        const iframe = iframeRef.current;
        if (iframe && iframe.contentWindow) {
          const path = iframe.contentWindow.location.pathname + iframe.contentWindow.location.search;
          if (path && path !== '/') {
            // Remove worker base path prefix if present
            const cleanPath = path.startsWith('/Insurance') ? path : '/Insurance/logaction';
            localStorage.setItem('moh-current-path', cleanPath);
          }
        }
      } catch (e) {
        // Cross-origin - can't read, rely on postMessage
      }
    }, 2000);

    return () => {
      window.removeEventListener('message', handleMessage);
      clearInterval(interval);
    };
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
        ref={iframeRef}
        src={WORKER_BASE + iframePath}
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
