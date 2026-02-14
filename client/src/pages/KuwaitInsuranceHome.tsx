import { useState, useRef } from 'react';

const PAGES = [
  'https://insonline.moh.gov.kw/Insurance/logaction',
  'https://insonline.moh.gov.kw/Insurance/InsuranceOnline',
  'https://insonline.moh.gov.kw/Insurance/InsuranceOnline/InsuredSearch',
];

export default function KuwaitInsuranceHome() {
  const [currentPage] = useState(0);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

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
      {/* Loading overlay - shows until iframe loads */}
      {!iframeLoaded && !iframeError && (
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

      {/* Direct iframe - user's browser in Kuwait can reach the site */}
      <iframe
        ref={iframeRef}
        src={PAGES[currentPage]}
        onLoad={() => setIframeLoaded(true)}
        onError={() => setIframeError(true)}
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
