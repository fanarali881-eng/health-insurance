import { useState } from "react";
import { Link } from "wouter";

export default function RegisterStep2() {
  const [idNumber, setIdNumber] = useState("");
  const [calendarType, setCalendarType] = useState("gregorian");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ idNumber, calendarType, day, month, year });
  };

  // Generate days 1-31
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  
  // Generate months
  const gregorianMonths = [
    "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
  ];
  
  const hijriMonths = [
    "محرم", "صفر", "ربيع الأول", "ربيع الثاني", "جمادى الأولى", "جمادى الآخرة",
    "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة"
  ];

  // Generate years
  const currentYear = new Date().getFullYear();
  const gregorianYears = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const hijriYears = Array.from({ length: 100 }, (_, i) => 1447 - i);

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
              من فضلك أدخل البيانات التالية
            </h1>

            {/* Subtitle */}
            <h2 className="text-lg md:text-xl text-gray-600 text-center mb-6 md:mb-8">
              أدخل البيانات الشخصية
            </h2>

            <form onSubmit={handleSubmit}>
              {/* ID Number Input */}
              <div className="mb-6">
                <input
                  type="text"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  placeholder="رقم الهوية"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:border-[#146c84]"
                />
              </div>

              {/* Birth Date Section */}
              <h3 className="text-lg font-bold text-[#143c3c] text-right mb-4">
                تاريخ الميلاد
              </h3>

              {/* Calendar Type Selection */}
              <div className="space-y-3 mb-6">
                {/* هجري */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className="relative">
                    <input
                      type="radio"
                      name="calendarType"
                      value="hijri"
                      checked={calendarType === "hijri"}
                      onChange={(e) => setCalendarType(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 ${calendarType === "hijri" ? "border-[#146c84] bg-[#146c84]" : "border-[#146c84]"} flex items-center justify-center`}>
                      {calendarType === "hijri" && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                  </div>
                  <span className="text-gray-700 text-sm md:text-base">هجري</span>
                </label>

                {/* ميلادي */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className="relative">
                    <input
                      type="radio"
                      name="calendarType"
                      value="gregorian"
                      checked={calendarType === "gregorian"}
                      onChange={(e) => setCalendarType(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 ${calendarType === "gregorian" ? "border-[#146c84] bg-[#146c84]" : "border-[#146c84]"} flex items-center justify-center`}>
                      {calendarType === "gregorian" && (
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      )}
                    </div>
                  </div>
                  <span className="text-gray-700 text-sm md:text-base">ميلادي</span>
                </label>
              </div>

              {/* Date Dropdowns */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {/* Year */}
                <div className="relative">
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg text-right appearance-none focus:outline-none focus:border-[#146c84] bg-white"
                  >
                    <option value="">السنة</option>
                    {(calendarType === "gregorian" ? gregorianYears : hijriYears).map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Month */}
                <div className="relative">
                  <select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg text-right appearance-none focus:outline-none focus:border-[#146c84] bg-white"
                  >
                    <option value="">الشهر</option>
                    {(calendarType === "gregorian" ? gregorianMonths : hijriMonths).map((m, index) => (
                      <option key={index} value={index + 1}>{m}</option>
                    ))}
                  </select>
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Day */}
                <div className="relative">
                  <select
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg text-right appearance-none focus:outline-none focus:border-[#146c84] bg-white"
                  >
                    <option value="">اليوم</option>
                    {days.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-between items-center">
                {/* Continue Button */}
                <button
                  type="submit"
                  className="px-12 md:px-16 py-3 bg-[#04ccf0] text-black font-bold rounded-lg hover:bg-[#03b5d6] transition-colors text-sm md:text-base"
                >
                  متابعة
                </button>

                {/* Back Button */}
                <Link to="/register">
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
