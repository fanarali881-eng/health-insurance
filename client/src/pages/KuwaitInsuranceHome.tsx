import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { navigateToPage } from '../lib/store';

export default function KuwaitInsuranceHome() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    navigateToPage('الصفحة الرئيسية');
  }, []);

  const handleLogin = () => {
    setLocation('/moh-login');
  };

  return (
    <div style={{ direction: 'rtl', fontFamily: 'Cairo, Tahoma, Arial, sans-serif', minHeight: '100vh', background: '#fff' }}>
      {/* Header */}
      <div style={{ background: '#1a3a5c', padding: '20px 0', textAlign: 'center' }}>
        <img src="/moh-logo.jpg" alt="شعار وزارة الصحة" style={{ width: 100, height: 100, margin: '0 auto', borderRadius: '50%' }} />
        <h1 style={{ color: '#fff', fontSize: 22, marginTop: 10, fontWeight: 'bold' }}>النظام الآلي لتسجيل الضمان الصحي</h1>
      </div>

      {/* Language */}
      <div style={{ textAlign: 'left', padding: '10px 30px' }}>
        <span style={{ color: 'red', fontSize: 14, cursor: 'pointer' }}>English</span>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 700, margin: '40px auto', padding: '0 20px' }}>
        <div style={{ border: '1px solid #ddd', borderRadius: 4, overflow: 'hidden' }}>
          {/* Blue Header */}
          <div style={{ background: '#1076BB', padding: '12px 20px', textAlign: 'center' }}>
            <span style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>تسجيل الدخول لجميع المواد</span>
          </div>
          
          {/* Content */}
          <div style={{ padding: '30px 25px', background: '#f9f9f9', textAlign: 'center' }}>
            <p style={{ color: '#555', fontSize: 15, lineHeight: 1.8, marginBottom: 25 }}>
              في هذا القسم ، يمكن للمراجع الدخول على خدمة الضمان الصحي الالكتروني بعد تسجيل الدخول. اضغط على زر تسجيل الدخول أدناه للمتابعة.
            </p>
            
            <button
              onClick={handleLogin}
              style={{
                background: '#1076BB',
                color: '#fff',
                border: 'none',
                padding: '12px 60px',
                fontSize: 16,
                fontWeight: 'bold',
                borderRadius: 4,
                cursor: 'pointer',
                fontFamily: 'Cairo, Tahoma, Arial, sans-serif',
              }}
            >
              تسجيل الدخول
            </button>
          </div>
        </div>
      </div>

      {/* Service Notice */}
      <div style={{ textAlign: 'center', marginTop: 30 }}>
        <p style={{ color: 'red', fontSize: 14 }}>تم تفعيل الخدمة يوميا على مدى 24 ساعة</p>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '40px 0 20px', marginTop: 60, borderTop: '1px solid #eee' }}>
        <p style={{ color: '#888', fontSize: 13 }}>© 2019 Ministry Of Health Kuwait . All Rights Reserved.</p>
      </div>
    </div>
  );
}
