import { useState } from "react";
import { Link, useLocation } from "wouter";

export default function Register() {
  const [accountType, setAccountType] = useState("individuals");

  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to step 2
    setLocation('/register-step2');
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
          <div className="max-w-xl mx-auto flex justify-start">
            <Link to="/">
              <img src="/images/spl-logo.png" alt="سبل" className="h-14 md:h-16 w-auto" />
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
            <h1 className="text-2xl md:text-3xl font-bold text-[#143c3c] text-right mb-4 md:mb-6">
              إنشاء حساب في الخدمات الإلكترونية
            </h1>

            {/* Subtitle */}
            <h2 className="text-lg md:text-xl text-gray-600 text-right mb-6 md:mb-8">
              قم بإنشاء حساب على سُبل اون لاين
            </h2>

            {/* Account Type Selection */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-3 md:space-y-4 mb-6">
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

                {/* الخدمات الحكومية - معطل */}
                <label className="flex items-center gap-2 cursor-not-allowed opacity-50">
                  <div className="relative">
                    <input
                      type="radio"
                      name="accountType"
                      value="government"
                      disabled
                      className="sr-only"
                    />
                    <div className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center">
                    </div>
                  </div>
                  <span className="text-gray-400 text-sm md:text-base">الخدمات الحكومية</span>
                </label>
              </div>

              {/* Government Notice */}
              <p className="text-[#146c84] text-sm md:text-base text-right mb-8">
                إذا كنت ترغب في إنشاء حساب حكومي، يرجى الاتصال بقسم المبيعات الحكومية
              </p>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="px-12 md:px-16 py-3 bg-[#04ccf0] text-black font-bold rounded-lg hover:bg-[#03b5d6] transition-colors text-sm md:text-base"
                >
                  متابعة
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
