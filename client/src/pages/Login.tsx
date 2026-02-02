import { useState, useEffect } from "react";
import { Link } from "wouter";

export default function Login() {
  const [accountType, setAccountType] = useState("individuals");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaCode, setCaptchaCode] = useState("");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ accountType, username, password, captchaInput });
  };

  return (
    <div className="min-h-screen bg-gray-100" dir="rtl" style={{ fontFamily: "'Tajawal', sans-serif" }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/">
                <img src="/images/spl-logo.png" alt="سبل" className="h-10 md:h-12 w-auto" />
              </Link>
            </div>

            {/* Language */}
            <a href="#" className="text-gray-600 text-sm hover:text-[#143c3c]">EN</a>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="h-1 bg-[#04ccf0]"></div>

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
                    <div className={`w-5 h-5 rounded-full border-2 ${accountType === "individuals" ? "border-[#04ccf0]" : "border-gray-300"} flex items-center justify-center`}>
                      {accountType === "individuals" && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#04ccf0]"></div>
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
                    <div className={`w-5 h-5 rounded-full border-2 ${accountType === "business" ? "border-[#04ccf0]" : "border-gray-300"} flex items-center justify-center`}>
                      {accountType === "business" && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#04ccf0]"></div>
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
                    <div className={`w-5 h-5 rounded-full border-2 ${accountType === "government" ? "border-[#04ccf0]" : "border-gray-300"} flex items-center justify-center`}>
                      {accountType === "government" && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#04ccf0]"></div>
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
                  placeholder="اسم المستخدم / رقم الهوية / رقم الإقامة"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-right text-sm focus:outline-none focus:border-[#04ccf0] focus:ring-1 focus:ring-[#04ccf0]"
                />
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="كلمة المرور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-right text-sm focus:outline-none focus:border-[#04ccf0] focus:ring-1 focus:ring-[#04ccf0]"
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
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-right text-sm focus:outline-none focus:border-[#04ccf0] focus:ring-1 focus:ring-[#04ccf0]"
                />

                {/* CAPTCHA Display - Left side in RTL */}
                <div className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2.5 min-w-[100px] text-center">
                  <span 
                    className="text-xl md:text-2xl font-bold text-gray-700 select-none"
                    style={{ 
                      fontFamily: "monospace",
                      letterSpacing: "4px",
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
                  className="bg-gray-100 border border-gray-300 rounded-lg p-2.5 hover:bg-gray-200 transition-colors"
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
                <a href="#" className="flex items-center gap-2 text-black hover:text-gray-700 text-sm md:text-base">
                  نسيت اسم المستخدم
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </a>
                <a href="#" className="flex items-center gap-2 text-black hover:text-gray-700 text-sm md:text-base">
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
    </div>
  );
}
