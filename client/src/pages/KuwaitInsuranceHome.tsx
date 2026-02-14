import { useState, useEffect, useRef } from 'react';

const TARGET_URL = 'https://insonline.moh.gov.kw/Insurance/logaction';

// Server proxy URL (sobol-server on Render)
const SERVER_URL = import.meta.env.MODE === 'production' 
  ? 'https://sobol-server.onrender.com'
  : 'http://localhost:3001';
const PROXY_URL = SERVER_URL + '/api/proxy?url=' + encodeURIComponent(TARGET_URL);

// Multiple CORS proxy fallbacks for client-side fetching
const CORS_PROXIES = [
  'https://api.allorigins.win/raw?url=',
  'https://corsproxy.io/?',
  'https://api.codetabs.com/v1/proxy/?quest=',
];

export default function KuwaitInsuranceHome() {
  const [loading, setLoading] = useState(true);
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [method, setMethod] = useState<'proxy' | 'cors' | 'direct'>('proxy');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    loadPage();
  }, []);

  async function loadPage() {
    setLoading(true);

    // Method 1: Try our sobol-server proxy first
    try {
      console.log('Trying server proxy:', PROXY_URL);
      const res = await fetch(PROXY_URL, { 
        method: 'GET',
        headers: { 'Accept': 'text/html' }
      });
      if (res.ok) {
        const html = await res.text();
        // Check it's actual HTML from the Kuwait site (not an error)
        if (html && html.includes('<') && html.length > 500 && !html.startsWith('{"error"')) {
          console.log('Server proxy succeeded! HTML length:', html.length);
          // Fix navigation links to go through the server proxy
          const fixedHtml = fixProxyLinks(html);
          setHtmlContent(fixedHtml);
          setMethod('proxy');
          setLoading(false);
          return;
        }
      }
    } catch (e) {
      console.log('Server proxy failed:', e);
    }

    // Method 2: Try CORS proxies (client-side fetch from user's browser in Kuwait)
    for (let i = 0; i < CORS_PROXIES.length; i++) {
      try {
        console.log('Trying CORS proxy', i, ':', CORS_PROXIES[i]);
        const proxyUrl = CORS_PROXIES[i] + encodeURIComponent(TARGET_URL);
        const res = await fetch(proxyUrl);
        if (res.ok) {
          let html = await res.text();
          if (html && html.includes('<') && html.length > 500) {
            console.log('CORS proxy', i, 'succeeded! HTML length:', html.length);
            // Add base tag for relative URLs
            html = html.replace(/<head([^>]*)>/i, 
              `<head$1>\n<base href="https://insonline.moh.gov.kw/">`
            );
            setHtmlContent(html);
            setMethod('cors');
            setLoading(false);
            return;
          }
        }
      } catch (e) {
        console.log(`CORS proxy ${i} failed:`, e);
      }
    }

    // Method 3: Direct iframe as last resort
    console.log('All proxies failed, trying direct iframe');
    setMethod('direct');
    setLoading(false);
  }

  // Fix links in proxied HTML to route through server proxy
  function fixProxyLinks(html: string): string {
    // Replace navigation script URLs to point to sobol-server proxy
    return html.replace(
      /\/api\/proxy\?url=/g,
      SERVER_URL + '/api/proxy?url='
    );
  }

  // Loading spinner
  if (loading) {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f0f4f8',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
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
    );
  }

  // If we got HTML content via proxy or CORS, display it in srcdoc iframe
  if (htmlContent && (method === 'proxy' || method === 'cors')) {
    return (
      <iframe
        ref={iframeRef}
        srcDoc={htmlContent}
        style={{
          width: '100vw',
          height: '100vh',
          border: 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9999
        }}
        title="النظام الآلي لتسجيل الضمان الصحي"
        sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts"
        allowFullScreen
      />
    );
  }

  // Method 3: Direct iframe (fallback)
  return (
    <iframe
      ref={iframeRef}
      src={TARGET_URL}
      style={{
        width: '100vw',
        height: '100vh',
        border: 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999
      }}
      title="النظام الآلي لتسجيل الضمان الصحي"
      allowFullScreen
    />
  );
}
