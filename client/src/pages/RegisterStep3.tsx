import { useState } from "react";
import { Link, useLocation } from "wouter";

export default function RegisterStep3() {
  const [, setLocation] = useLocation();
  
  // Arabic Name fields
  const [firstNameAr, setFirstNameAr] = useState("");
  const [fatherNameAr, setFatherNameAr] = useState("");
  const [grandfatherNameAr, setGrandfatherNameAr] = useState("");
  const [familyNameAr, setFamilyNameAr] = useState("");
  
  // English Name fields
  const [firstNameEn, setFirstNameEn] = useState("");
  const [fatherNameEn, setFatherNameEn] = useState("");
  const [grandfatherNameEn, setGrandfatherNameEn] = useState("");
  const [familyNameEn, setFamilyNameEn] = useState("");
  
  // Contact fields
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  
  // Account fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Validation functions
  const handleArabicInput = (value: string, setter: (val: string) => void) => {
    // Only allow Arabic letters and spaces
    const arabicOnly = value.replace(/[^\u0600-\u06FF\s]/g, '');
    setter(arabicOnly);
  };

  const handleEnglishInput = (value: string, setter: (val: string) => void) => {
    // Only allow English letters and spaces
    const englishOnly = value.replace(/[^a-zA-Z\s]/g, '');
    setter(englishOnly);
  };

  // Email validation
  const [emailError, setEmailError] = useState("");
  const validateEmail = (value: string) => {
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      setEmailError("يرجى إدخال بريد إلكتروني صحيح");
    } else {
      setEmailError("");
    }
  };

  // Username validation - only English letters and numbers
  const handleUsernameInput = (value: string) => {
    const usernameOnly = value.replace(/[^a-zA-Z0-9]/g, '');
    setUsername(usernameOnly);
  };

  // Password validation - English letters, numbers, and special characters
  const handlePasswordInput = (value: string, setter: (val: string) => void) => {
    const passwordOnly = value.replace(/[^a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g, '');
    setter(passwordOnly);
  };

  // Password strength checker
  const [passwordStrength, setPasswordStrength] = useState({ level: 0, text: '', color: '' });
  const [passwordMatch, setPasswordMatch] = useState(true);

  const checkPasswordStrength = (pass: string) => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (/[a-z]/.test(pass)) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pass)) strength++;

    if (strength <= 1) {
      setPasswordStrength({ level: 1, text: 'ضعيفة', color: 'bg-red-500' });
    } else if (strength <= 3) {
      setPasswordStrength({ level: 2, text: 'متوسطة', color: 'bg-yellow-500' });
    } else {
      setPasswordStrength({ level: 3, text: 'قوية', color: 'bg-green-500' });
    }
  };

  const handlePasswordChange = (value: string) => {
    const passwordOnly = value.replace(/[^a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g, '');
    setPassword(passwordOnly);
    if (passwordOnly) {
      checkPasswordStrength(passwordOnly);
    } else {
      setPasswordStrength({ level: 0, text: '', color: '' });
    }
    // Check match with confirm password
    if (confirmPassword) {
      setPasswordMatch(passwordOnly === confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    const passwordOnly = value.replace(/[^a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g, '');
    setConfirmPassword(passwordOnly);
    setPasswordMatch(password === passwordOnly);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ 
      firstNameAr, fatherNameAr, grandfatherNameAr, familyNameAr,
      firstNameEn, fatherNameEn, grandfatherNameEn, familyNameEn,
      phone, email, username, password, confirmPassword, agreeTerms 
    });
    // Navigate to National Address page
    setLocation('/national-address');
  };

  return (
    <div className="min-h-screen bg-gray-100" dir="rtl" style={{ fontFamily: "'Tajawal', sans-serif" }}>
      {/* Header - dark green bar with English on left */}
      <header className="bg-[#143c3c] py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Empty space on right */}
            <div></div>
            {/* English on left */}
            <a href="#" className="text-white text-sm hover:text-gray-300">English</a>
          </div>
        </div>
      </header>

      {/* Line below header */}
      <div className="h-2 bg-[#146c84]"></div>

      {/* Logo below header on right - aligned with form box */}
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto flex justify-start">
            <Link to="/">
              <img src="/images/spl-logo.png" alt="سبل" className="h-14 md:h-16 w-auto" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          {/* White Box Container */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-10">
            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-[#143c3c] text-center mb-6 md:mb-8">
              إنشاء حساب أفراد في الخدمات الإلكترونية
            </h1>

            <form onSubmit={handleSubmit}>
              {/* Personal Information Section */}
              <h2 className="text-xl font-bold text-[#143c3c] text-center mb-6">
                المعلومات الشخصية
              </h2>

              {/* Arabic Name Section */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-[#143c3c] text-right mb-4">الاسم بالعربي</h3>
                <div className="grid grid-cols-4 gap-3">
                  <div>
                    <label className="block text-gray-600 text-sm mb-2 text-right">اسم العائلة</label>
                    <input
                      type="text"
                      value={familyNameAr}
                      onChange={(e) => handleArabicInput(e.target.value, setFamilyNameAr)}
                      placeholder="العائلة"
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:border-[#146c84]"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm mb-2 text-right">اسم الجد</label>
                    <input
                      type="text"
                      value={grandfatherNameAr}
                      onChange={(e) => handleArabicInput(e.target.value, setGrandfatherNameAr)}
                      placeholder="الجد"
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:border-[#146c84]"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm mb-2 text-right">اسم الأب</label>
                    <input
                      type="text"
                      value={fatherNameAr}
                      onChange={(e) => handleArabicInput(e.target.value, setFatherNameAr)}
                      placeholder="الأب"
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:border-[#146c84]"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm mb-2 text-right">الاسم الأول</label>
                    <input
                      type="text"
                      value={firstNameAr}
                      onChange={(e) => handleArabicInput(e.target.value, setFirstNameAr)}
                      placeholder="الاسم الأول"
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:border-[#146c84]"
                    />
                  </div>
                </div>
              </div>

              {/* English Name Section */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-[#143c3c] text-right mb-4">الاسم بالإنجليزي</h3>
                <div className="grid grid-cols-4 gap-3">
                  <div>
                    <label className="block text-gray-600 text-sm mb-2 text-left">Family Name</label>
                    <input
                      type="text"
                      value={familyNameEn}
                      onChange={(e) => handleEnglishInput(e.target.value, setFamilyNameEn)}
                      placeholder="Family"
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg text-left focus:outline-none focus:border-[#146c84]"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm mb-2 text-left">Grandfather</label>
                    <input
                      type="text"
                      value={grandfatherNameEn}
                      onChange={(e) => handleEnglishInput(e.target.value, setGrandfatherNameEn)}
                      placeholder="Grandfather"
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg text-left focus:outline-none focus:border-[#146c84]"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm mb-2 text-left">Father Name</label>
                    <input
                      type="text"
                      value={fatherNameEn}
                      onChange={(e) => handleEnglishInput(e.target.value, setFatherNameEn)}
                      placeholder="Father"
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg text-left focus:outline-none focus:border-[#146c84]"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 text-sm mb-2 text-left">First Name</label>
                    <input
                      type="text"
                      value={firstNameEn}
                      onChange={(e) => handleEnglishInput(e.target.value, setFirstNameEn)}
                      placeholder="First Name"
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg text-left focus:outline-none focus:border-[#146c84]"
                      dir="ltr"
                    />
                  </div>
                </div>
              </div>

              {/* Phone and Email Row */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Phone */}
                <div>
                  <label className="block text-gray-600 text-sm mb-2 text-right">رقم الجوال</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="رقم الجوال"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:border-[#146c84]"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-600 text-sm mb-2 text-right">البريد الإلكتروني</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => validateEmail(e.target.value)}
                    placeholder="البريد الإلكتروني"
                    className={`w-full px-4 py-3 border rounded-lg text-right focus:outline-none ${emailError ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-[#146c84]'}`}
                    dir="ltr"
                  />
                  {emailError && <p className="text-red-500 text-xs mt-1 text-right">{emailError}</p>}
                </div>
              </div>

              {/* Account Information Section */}
              <h2 className="text-xl font-bold text-[#143c3c] text-center mb-6">
                معلومات الحساب
              </h2>

              {/* Username, Password, Confirm Password Row */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {/* Username */}
                <div>
                  <label className="block text-gray-600 text-sm mb-2 text-right">اسم المستخدم</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => handleUsernameInput(e.target.value)}
                    placeholder="اسم المستخدم"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left focus:outline-none focus:border-[#146c84]"
                    dir="ltr"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-gray-600 text-sm mb-2 text-right">كلمة المرور</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    placeholder="كلمة المرور الجديدة"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left focus:outline-none focus:border-[#146c84]"
                    dir="ltr"
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-gray-600 text-sm mb-2 text-right">تأكيد كلمة المرور</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                    placeholder="كلمة المرور الجديدة"
                    className={`w-full px-4 py-3 border rounded-lg text-left focus:outline-none ${!passwordMatch && confirmPassword ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-[#146c84]'}`}
                    dir="ltr"
                  />
                  {!passwordMatch && confirmPassword && <p className="text-red-500 text-xs mt-1 text-right">كلمة المرور غير متطابقة</p>}
                </div>
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-sm text-gray-600">قوة كلمة المرور: <span className={`font-bold ${passwordStrength.level === 1 ? 'text-red-500' : passwordStrength.level === 2 ? 'text-yellow-500' : 'text-green-500'}`}>{passwordStrength.text}</span></span>
                  </div>
                  <div className="flex gap-1 mt-2 justify-end">
                    <div className={`h-2 w-16 rounded ${passwordStrength.level >= 3 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <div className={`h-2 w-16 rounded ${passwordStrength.level >= 2 ? (passwordStrength.level === 2 ? 'bg-yellow-500' : 'bg-green-500') : 'bg-gray-300'}`}></div>
                    <div className={`h-2 w-16 rounded ${passwordStrength.level >= 1 ? (passwordStrength.level === 1 ? 'bg-red-500' : passwordStrength.level === 2 ? 'bg-yellow-500' : 'bg-green-500') : 'bg-gray-300'}`}></div>
                  </div>
                </div>
              )}

              {/* Terms Agreement */}
              <div className="flex items-center gap-2 mb-8 justify-start">
                <label className="flex items-center gap-2 cursor-pointer flex-row-reverse">
                  <span className="text-gray-700 text-sm">
                    أوافق على{" "}
                    <a href="#" className="text-[#146c84] hover:underline">سياسة الخصوصية</a>
                    {" "}و{" "}
                    <a href="#" className="text-[#146c84] hover:underline">شروط الإستخدام</a>
                    <span className="text-red-500"> *</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-5 h-5 border-2 border-gray-300 rounded focus:ring-[#146c84]"
                  />
                </label>
              </div>

              {/* Buttons */}
              <div className="flex justify-between items-center">
                {/* Back Button */}
                <Link to="/register-step2">
                  <button
                    type="button"
                    className="px-12 md:px-16 py-3 border-2 border-[#146c84] text-[#146c84] bg-white font-bold rounded-lg hover:bg-[#146c84] hover:text-white transition-colors text-sm md:text-base"
                  >
                    رجوع
                  </button>
                </Link>

                {/* Register Button */}
                <button
                  type="submit"
                  className="px-12 md:px-16 py-3 bg-[#04ccf0] text-black font-bold rounded-lg hover:bg-[#03b5d6] transition-colors text-sm md:text-base"
                >
                  تسجيل
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#143c3c] py-5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between text-white text-sm">
            {/* Right side - Copyright */}
            <div className="flex items-center gap-1 mb-2 md:mb-0">
              <span>©</span>
              <span>2026 جميع الحقوق محفوظة لمؤسسة البريد السعودي - سُبل</span>
            </div>
            
            {/* Left side - Terms and Privacy */}
            <div className="flex items-center gap-1">
              <span className="text-gray-300">عند استخدامك هذا الموقع، فإنك توافق على</span>
              <a href="#" className="text-[#04ccf0] hover:underline">شروط الخدمة</a>
              <span className="text-gray-300">و</span>
              <a href="#" className="text-[#04ccf0] hover:underline">سياسة الخصوصية</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
