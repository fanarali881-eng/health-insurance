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
      <div style={{ background: '#0c2c3c', padding: '20px 0', textAlign: 'center' }}>
        <img src="/FMOHLogo.svg" alt="شعار وزارة الصحة" style={{ width: 90, height: 90, margin: '0 auto' }} />
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
      <div style={{ textAlign: 'center', padding: '12px 0', background: '#000', marginTop: 'auto' }}>
        <p style={{ color: '#fff', fontSize: 13, margin: 0 }}>© 2019 Ministry Of Health Kuwait . All Rights Reserved.</p>
      </div>
    </div>
  );
}
