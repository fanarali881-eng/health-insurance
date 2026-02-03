import { useState } from "react";
import { Link } from "wouter";

export default function NationalAddressHome() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white" dir="rtl" style={{ fontFamily: "'Tajawal', sans-serif" }}>
      {/* Top Header Bar */}
      <div className="bg-[#143c3c] text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10 md:h-12">
            {/* Right Side - Tabs */}
            <div className="hidden md:flex items-center gap-0">
              <button className="px-4 md:px-6 py-2 md:py-3 bg-white text-[#143c3c] font-medium text-xs md:text-sm">
                الأفراد
              </button>
              <button className="px-4 md:px-6 py-2 md:py-3 text-white hover:bg-[#0f2e2e] font-medium text-xs md:text-sm">
                الأعمال
              </button>
              <button className="px-4 md:px-6 py-2 md:py-3 text-white hover:bg-[#0f2e2e] font-medium text-xs md:text-sm">
                الخدمات الحكومية
              </button>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            {/* Left Side - Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              <a href="#" className="hidden md:block text-white text-sm hover:underline">مساعدة</a>
              <button className="text-white">
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <button className="text-white">
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <a href="#" className="text-white text-xs md:text-sm hover:underline">EN</a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#143c3c] text-white py-4 px-4">
          <div className="flex flex-col gap-2">
            <button className="px-4 py-2 bg-white text-[#143c3c] font-medium text-sm rounded">الأفراد</button>
            <button className="px-4 py-2 text-white font-medium text-sm">الأعمال</button>
            <button className="px-4 py-2 text-white font-medium text-sm">الخدمات الحكومية</button>
            <a href="#" className="px-4 py-2 text-white text-sm">مساعدة</a>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/">
                <img src="/images/spl-logo.png" alt="سبل" className="h-10 md:h-12 w-auto" />
              </Link>
            </div>

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              <div className="relative group">
                <a href="#" className="px-4 py-2 text-gray-700 text-sm font-medium hover:text-[#143c3c] flex items-center gap-1">
                  إرسال
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>
              <div className="relative group">
                <a href="#" className="px-4 py-2 text-gray-700 text-sm font-medium hover:text-[#143c3c] flex items-center gap-1">
                  استلام
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>
              <a href="#" className="px-4 py-2 text-gray-700 text-sm font-medium hover:text-[#143c3c]">
                عالمي
              </a>
              <div className="relative group">
                <a href="#" className="px-4 py-2 text-[#143c3c] text-sm font-bold hover:text-[#143c3c] flex items-center gap-1 border-b-2 border-[#04ccf0]">
                  العنوان الوطني
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>
              <div className="relative group">
                <a href="#" className="px-4 py-2 text-gray-700 text-sm font-medium hover:text-[#143c3c] flex items-center gap-1">
                  خدمات التجزئة
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>
              <div className="relative group">
                <a href="#" className="px-4 py-2 text-gray-700 text-sm font-medium hover:text-[#143c3c] flex items-center gap-1">
                  خدمات التمويل
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>
              <a href="#" className="px-4 py-2 text-gray-700 text-sm font-medium hover:text-[#143c3c]">
                الطوابع
              </a>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center gap-2">
              <Link to="/login" className="px-4 md:px-6 py-1.5 md:py-2 border border-[#143c3c] text-[#143c3c] text-xs md:text-sm font-medium rounded hover:bg-[#143c3c] hover:text-white transition-colors">
                دخول
              </Link>
              <Link to="/register" className="px-4 md:px-6 py-1.5 md:py-2 text-gray-600 text-xs md:text-sm font-medium hover:text-[#143c3c]">
                تسجيل
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-l from-[#0a4a5c] via-[#0d5a6c] to-[#146c84] py-12 md:py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute right-0 top-0 w-1/2 h-full">
            <img src="/images/na-pattern.png" alt="" className="w-full h-full object-cover" />
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Right Side - Content */}
            <div className="w-full lg:w-1/2 text-right">
              {/* Logo */}
              <div className="flex justify-end mb-6">
                <div className="text-center">
                  <img src="/images/national-address-logo.png" alt="العنوان الوطني" className="h-20 md:h-24 w-auto mx-auto" />
                  <p className="text-white text-sm mt-2">عنوانك هويتك المكانية</p>
                </div>
              </div>
              
              {/* Main Title */}
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                عنوانك هو هويتك المكانية الإلزامية...
              </h1>
              
              {/* Description */}
              <p className="text-white/90 text-base md:text-lg mb-8 leading-relaxed">
                العنوان الوطني يضمن وصول شحناتك ومعاملاتك بسرعة وموثوقية. ابتداءً من 1 يناير 2026 سيصبح استخدامه إلزامياً لكل فرد وجهة.
              </p>
              
              {/* CTA Button */}
              <Link to="/register">
                <button className="px-10 md:px-16 py-3 md:py-4 bg-[#143c3c] text-white font-bold rounded-lg hover:bg-[#0f2e2e] transition-colors text-base md:text-lg">
                  سجّل الآن
                </button>
              </Link>
            </div>
            
            {/* Left Side - Image */}
            <div className="w-full lg:w-1/2 hidden lg:block">
              <div className="relative">
                <img 
                  src="/images/na-hero-image.png" 
                  alt="العنوان الوطني" 
                  className="w-full max-w-md mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative Text */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-20 hidden xl:block">
          <div className="text-white text-[120px] font-bold leading-none whitespace-nowrap transform -rotate-0">
            <div>العنوان الوطني</div>
            <div className="text-[#04ccf0]">إلزامي</div>
            <div>لكل شحنة</div>
          </div>
        </div>
      </section>

      {/* Short Address Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            <span className="text-gray-800">من عنوان مفصل إلى:</span>
            <span className="text-[#04ccf0]"> عنوان مختصر</span>
          </h2>
          
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Short Address Example */}
            <div className="w-full lg:w-1/2">
              <div className="text-center">
                <div className="inline-block relative">
                  <span className="text-4xl md:text-5xl font-bold">
                    <span className="text-[#146c84]">RRRD</span>
                    <span className="text-[#04ccf0]">2929</span>
                  </span>
                  
                  {/* Labels */}
                  <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs md:text-sm">
                    <div className="flex items-center gap-1">
                      <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                      <span className="text-gray-600">حرف تمييز</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                      <span className="text-gray-600">رمز المنطقة</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                      <span className="text-gray-600">رمز الفرع</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-3 h-3 bg-cyan-500 rounded-full"></span>
                      <span className="text-gray-600">رقم المبنى</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Description */}
            <div className="w-full lg:w-1/2 text-right">
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                عنوان بسيط سهل الحفظ يحتوي على أربعة حروف وأربعة أرقام فقط هذا الرمز القصير كفيل بأن يجعل حياتك أسهل
              </p>
              
              <p className="text-gray-600 text-sm md:text-base mb-4">بإمكانك معرفة عنوانك المختصر من خلال</p>
              
              {/* App Icons */}
              <div className="flex flex-wrap justify-end gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-[#146c84] rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">سبل</span>
                  </div>
                  <span className="text-xs text-gray-600 mt-1">سبل أون لاين</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-[#04ccf0] rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">مها</span>
                  </div>
                  <span className="text-xs text-gray-600 mt-1">المساعد الافتراضي</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-green-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">توكلنا</span>
                  </div>
                  <span className="text-xs text-gray-600 mt-1">توكلنا</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-green-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">صحتي</span>
                  </div>
                  <span className="text-xs text-gray-600 mt-1">صحتي</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-[#5c3d2e] rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">أبشر</span>
                  </div>
                  <span className="text-xs text-gray-600 mt-1">أبشر</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Register Your Address Section */}
      <section className="py-12 md:py-16 bg-[#143c3c]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-4">
            تسجيل عنوانك الوطني
          </h2>
          <p className="text-white/80 text-center max-w-3xl mx-auto mb-10 text-sm md:text-base">
            سواء كنت فرد، قطاع تجاري أو حكومي تتواجد في قرية أو مدينة يحتوي عنوانك على مجموعة من البيانات والتي تعبر عنها بالدلائل الجغرافية والمكانية والتي تمثل بمجملها بصمتك الجغرافية
          </p>
          
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Individuals Card */}
            <div className="bg-white rounded-xl p-6 md:p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-[#146c84]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-[#146c84]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#143c3c] mb-4">العنوان الوطني للأفراد</h3>
              <Link to="/register">
                <button className="flex items-center justify-center gap-2 mx-auto text-[#04ccf0] font-bold hover:text-[#03b5d6] transition-colors">
                  <span>سجّل الآن</span>
                  <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </Link>
            </div>
            
            {/* Business Card */}
            <div className="bg-white rounded-xl p-6 md:p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-[#146c84]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-[#146c84]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#143c3c] mb-4">العنوان الوطني للأعمال</h3>
              <Link to="/register">
                <button className="flex items-center justify-center gap-2 mx-auto text-[#04ccf0] font-bold hover:text-[#03b5d6] transition-colors">
                  <span>سجّل الآن</span>
                  <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Free Service Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#04ccf0] text-center mb-2">خدمة مجانية</h2>
          <p className="text-gray-600 text-center mb-10">ذات مميزات استثنائية</p>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#146c84]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-[#146c84]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                تغطي كامل مناطق المملكة العربية السعودية بدقة تصل إلى ١ متر مربع
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#04ccf0]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-[#04ccf0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                تؤهلك للحصول على ١٠ عناوين في أنحاء العالم عن طريق خدمة عالمي
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#146c84]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-[#146c84]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                استخدام العنوان يسرع وصول الشحنات إليك دون الحاجة لاتصالات إضافية
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#04ccf0]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-[#04ccf0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                سهولة الحصول على وثائقك الحكومية، الطرود التجارية والشخصية دون العناء لاستلامها شخصياً
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Address Components Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#143c3c] text-center mb-10">مكوّنات العنوان الوطني</h2>
          
          <div className="max-w-4xl mx-auto bg-white rounded-xl p-6 md:p-8 shadow-sm">
            {/* Short Address */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
              <span className="text-[#04ccf0] font-bold">العنوان المختصر</span>
              <span className="text-xl md:text-2xl font-bold text-gray-800">RRRD2929</span>
            </div>
            
            {/* Building Number */}
            <div className="flex items-start justify-between mb-4 pb-4 border-b border-gray-100">
              <div className="text-right">
                <span className="text-[#e74c3c] font-bold block">رقم المبنى</span>
                <span className="text-gray-500 text-sm">(4 أرقام فريدة تمثل مبنى سكني أو تجاري)</span>
              </div>
              <div className="text-left">
                <span className="text-gray-600 text-sm">الشارع (اسم الشارع الذي يقع عليه المدخل الرئيسي للمبنى)</span>
                <span className="text-gray-800 font-bold block">2929، ريحانة بنت زيد</span>
              </div>
            </div>
            
            {/* Secondary Number */}
            <div className="flex items-start justify-between mb-4 pb-4 border-b border-gray-100">
              <div className="text-right">
                <span className="text-[#3498db] font-bold block">الرقم الفرعي</span>
                <span className="text-gray-500 text-sm">(4 أرقام تمثل احداثيات الموقع الدقيق للمبنى، مفيدة في حال لا يوجد اسم شارع أو حي)</span>
              </div>
              <div className="text-left">
                <span className="text-gray-600 text-sm">الحي (اسم الحي الذي يتواجد به المبنى)</span>
                <span className="text-gray-800 font-bold block">8118، حي العارض</span>
              </div>
            </div>
            
            {/* Postal Code */}
            <div className="flex items-start justify-between mb-4 pb-4 border-b border-gray-100">
              <div className="text-right">
                <span className="text-[#9b59b6] font-bold block">الرمز البريدي</span>
                <span className="text-gray-500 text-sm">(5 أرقام، لكل رقم مدلول مكاني فريد، شبكة الرموز البريدية تغطي المملكة العربية السعودية بنسبة 100%)</span>
              </div>
              <div className="text-left">
                <span className="text-gray-800 font-bold block">13337</span>
              </div>
            </div>
            
            {/* City */}
            <div className="flex items-start justify-between">
              <div className="text-right">
                <span className="text-[#27ae60] font-bold block">المدينة</span>
                <span className="text-gray-500 text-sm">(المدينة التي يتواجد بها العنوان الوطني)</span>
              </div>
              <div className="text-left">
                <span className="text-gray-800 font-bold block">الرياض</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#143c3c] text-center mb-10">خدمات العنوان الوطني</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service 1 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#146c84]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-[#146c84]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-gray-800 font-bold mb-3">طلب إثبات عنوان وطني</h3>
              <Link to="/register">
                <button className="text-[#04ccf0] font-bold text-sm hover:text-[#03b5d6] transition-colors flex items-center justify-center gap-1 mx-auto">
                  <span>اطلب الآن</span>
                  <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </Link>
            </div>
            
            {/* Service 2 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#04ccf0]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-[#04ccf0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-gray-800 font-bold mb-3">إضافة تابعين وإدارة عناوينك</h3>
              <Link to="/register">
                <button className="text-[#04ccf0] font-bold text-sm hover:text-[#03b5d6] transition-colors flex items-center justify-center gap-1 mx-auto">
                  <span>إدارة عنوانك</span>
                  <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </Link>
            </div>
            
            {/* Service 3 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#146c84]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-[#146c84]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-gray-800 font-bold mb-3">تركيب لوحة عنوان وطني</h3>
              <Link to="/register">
                <button className="text-[#04ccf0] font-bold text-sm hover:text-[#03b5d6] transition-colors flex items-center justify-center gap-1 mx-auto">
                  <span>اطلب الآن</span>
                  <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </Link>
            </div>
            
            {/* Service 4 */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#04ccf0]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-[#04ccf0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-gray-800 font-bold mb-3">تحقق من إثبات العنوان</h3>
              <Link to="/register">
                <button className="text-[#04ccf0] font-bold text-sm hover:text-[#03b5d6] transition-colors flex items-center justify-center gap-1 mx-auto">
                  <span>تحقق الآن</span>
                  <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Warning Section */}
      <section className="py-10 md:py-14 bg-[#146c84]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-center md:text-right">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">احذر من المسائلة القانونية</h3>
              <p className="text-white/90 text-sm md:text-base max-w-3xl">
                العنوان الوطني هو نظام عنونة دقيق يؤهلك للحصول على مستوى أعلى من الخدمات الحكومية والتجارية لذا من مسؤولية كل فرد وكل جهة القيام بالتسجيل في العنوان الوطني والإلتزام بإدخال بيانات صحيحة تفادياً للمساءلة القانونية.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#143c3c] py-10 md:py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-10">
            {/* Column 1 */}
            <div>
              <h4 className="text-white font-bold mb-4">سبل</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 text-sm hover:text-white">عن المؤسسة</a></li>
                <li><a href="#" className="text-white/70 text-sm hover:text-white">كلمة معالي الرئيس</a></li>
                <li><a href="#" className="text-white/70 text-sm hover:text-white">مجلس الإدارة</a></li>
                <li><a href="#" className="text-white/70 text-sm hover:text-white">القادة</a></li>
                <li><a href="#" className="text-white/70 text-sm hover:text-white">الهيكل التنظيمي</a></li>
              </ul>
            </div>
            
            {/* Column 2 */}
            <div>
              <h4 className="text-white font-bold mb-4">المركز الإعلامي</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 text-sm hover:text-white">الأخبار</a></li>
                <li><a href="#" className="text-white/70 text-sm hover:text-white">الفعاليات</a></li>
                <li><a href="#" className="text-white/70 text-sm hover:text-white">الجوائز والإنجازات</a></li>
                <li><a href="#" className="text-white/70 text-sm hover:text-white">هوية البريد السعودي</a></li>
                <li><a href="#" className="text-white/70 text-sm hover:text-white">التقارير السنوية</a></li>
              </ul>
            </div>
            
            {/* Column 3 */}
            <div>
              <h4 className="text-white font-bold mb-4">أخرى</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 text-sm hover:text-white">التوظيف</a></li>
                <li><a href="#" className="text-white/70 text-sm hover:text-white">المنافسات والمناقصات</a></li>
                <li><a href="#" className="text-white/70 text-sm hover:text-white">التوعية بالاحتيال</a></li>
                <li><a href="#" className="text-white/70 text-sm hover:text-white">البيانات المفتوحة</a></li>
              </ul>
            </div>
            
            {/* Column 4 */}
            <div>
              <h4 className="text-white font-bold mb-4">مواقع ذات علاقة</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 text-sm hover:text-white">وزارة النقل والخدمات اللوجستية</a></li>
                <li><a href="#" className="text-white/70 text-sm hover:text-white">الهيئة العامة للنقل</a></li>
                <li><a href="#" className="text-white/70 text-sm hover:text-white">أبشر</a></li>
                <li><a href="#" className="text-white/70 text-sm hover:text-white">إرسال</a></li>
                <li><a href="#" className="text-white/70 text-sm hover:text-white">ناقل</a></li>
              </ul>
            </div>
            
            {/* Column 5 - Social */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1">
              <h4 className="text-white font-bold mb-4">تابعنا</h4>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                  </svg>
                </a>
              </div>
              
              {/* App Store Links */}
              <div className="flex gap-2 mt-6">
                <a href="#" className="block">
                  <img src="/images/app-store-badge.png" alt="App Store" className="h-10" />
                </a>
                <a href="#" className="block">
                  <img src="/images/google-play-badge.png" alt="Google Play" className="h-10" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-white/20 pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-white/70 text-sm">
                <a href="#" className="hover:text-white">شروط الخدمة</a>
                <a href="#" className="hover:text-white">سياسة الخصوصية</a>
                <a href="#" className="hover:text-white">إشعار الخصوصية</a>
              </div>
              <p className="text-white/70 text-sm">
                © 2026 جميع الحقوق محفوظة البريد السعودي | سبل
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
