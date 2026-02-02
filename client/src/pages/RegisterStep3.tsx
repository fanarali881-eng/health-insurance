import { useState } from "react";
import { Link, useLocation } from "wouter";

export default function RegisterStep3() {
  const [, setLocation] = useLocation();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ phone, email, username, password, confirmPassword, agreeTerms });
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
            <h1 className="text-2xl md:text-3xl font-bold text-[#143c3c] text-center mb-4 md:mb-6">
              إنشاء حساب أفراد في الخدمات الإلكترونية
            </h1>

            {/* Welcome Box */}
            <div className="bg-[#f5e6c8] rounded-lg p-4 mb-6 text-center">
              <p className="text-[#143c3c] font-bold mb-1">مرحباً شيهانه العنزي،</p>
              <p className="text-[#143c3c] text-sm">الرجاء تعبئة بياناتك ادناه لإكمال تسجيلك في الخدمات الإلكترونية</p>
            </div>

            {/* Personal Information Section */}
            <h2 className="text-xl font-bold text-[#143c3c] text-center mb-6">
              المعلومات الشخصية
            </h2>

            <form onSubmit={handleSubmit}>
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
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="البريد الإلكتروني"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:border-[#146c84]"
                  />
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
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="اسم المستخدم"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:border-[#146c84]"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-gray-600 text-sm mb-2 text-right">كلمة المرور</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="كلمة المرور الجديدة"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:border-[#146c84]"
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-gray-600 text-sm mb-2 text-right">تأكيد كلمة المرور</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="كلمة المرور الجديدة"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:border-[#146c84]"
                  />
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="flex items-center gap-2 mb-8 justify-end">
                <label className="flex items-center gap-2 cursor-pointer">
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
                {/* Register Button */}
                <button
                  type="submit"
                  className="px-12 md:px-16 py-3 bg-[#04ccf0] text-black font-bold rounded-lg hover:bg-[#03b5d6] transition-colors text-sm md:text-base"
                >
                  تسجيل
                </button>

                {/* Back Button */}
                <Link to="/register-step2">
                  <button
                    type="button"
                    className="px-12 md:px-16 py-3 border-2 border-[#146c84] text-[#146c84] bg-white font-bold rounded-lg hover:bg-[#146c84] hover:text-white transition-colors text-sm md:text-base"
                  >
                    رجوع
                  </button>
                </Link>
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
