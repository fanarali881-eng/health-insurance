import { useState } from "react";
import { Link } from "wouter";

export default function SobolHome() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [branchSearch, setBranchSearch] = useState("");

  return (
    <div className="min-h-screen bg-white" dir="rtl" style={{ fontFamily: "'Tajawal', sans-serif" }}>
      {/* Top Header Bar */}
      <div className="bg-[#0d7377] text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            {/* Right Side - Tabs */}
            <div className="flex items-center gap-0">
              <button className="px-6 py-3 bg-white text-[#0d7377] font-medium text-sm">
                الأفراد
              </button>
              <button className="px-6 py-3 text-white hover:bg-[#0a5f62] font-medium text-sm">
                الأعمال
              </button>
              <button className="px-6 py-3 text-white hover:bg-[#0a5f62] font-medium text-sm">
                الخدمات الحكومية
              </button>
            </div>
            
            {/* Left Side - Actions */}
            <div className="flex items-center gap-4">
              <a href="#" className="text-white text-sm hover:underline">مساعدة</a>
              <button className="text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <button className="text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              <a href="#" className="text-white text-sm hover:underline">English</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/">
                <div className="text-[#0d7377] text-3xl font-bold">سبل</div>
              </Link>
            </div>

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              <div className="relative group">
                <a href="#" className="px-4 py-2 text-gray-700 text-sm font-medium hover:text-[#0d7377] flex items-center gap-1">
                  إرسال
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>
              <div className="relative group">
                <a href="#" className="px-4 py-2 text-gray-700 text-sm font-medium hover:text-[#0d7377] flex items-center gap-1">
                  استلام
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>
              <a href="#" className="px-4 py-2 text-gray-700 text-sm font-medium hover:text-[#0d7377]">
                عالمي
              </a>
              <div className="relative group">
                <a href="#" className="px-4 py-2 text-gray-700 text-sm font-medium hover:text-[#0d7377] flex items-center gap-1">
                  العنوان الوطني
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>
              <div className="relative group">
                <a href="#" className="px-4 py-2 text-gray-700 text-sm font-medium hover:text-[#0d7377] flex items-center gap-1">
                  خدمات التجزئة
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>
              <div className="relative group">
                <a href="#" className="px-4 py-2 text-gray-700 text-sm font-medium hover:text-[#0d7377] flex items-center gap-1">
                  خدمات التمويل
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>
              <a href="#" className="px-4 py-2 text-gray-700 text-sm font-medium hover:text-[#0d7377]">
                الشركة الوطنية للتمويل
              </a>
              <a href="#" className="px-4 py-2 text-gray-700 text-sm font-medium hover:text-[#0d7377]">
                الطوابع
              </a>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center gap-2">
              <a href="#" className="px-6 py-2 border border-[#0d7377] text-[#0d7377] text-sm font-medium rounded hover:bg-[#0d7377] hover:text-white transition-colors">
                دخول
              </a>
              <a href="#" className="px-6 py-2 text-gray-600 text-sm font-medium hover:text-[#0d7377]">
                تسجيل
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-8">
            {/* Right Side - Banner Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden" style={{ backgroundColor: '#40c4c4' }}>
                <div className="p-8 text-white">
                  <div className="text-center">
                    <p className="text-lg mb-2">تبدأ إلزامية</p>
                    <h3 className="text-2xl font-bold mb-2">العنوان الوطني</h3>
                    <p className="text-lg">في 1 يناير 2026</p>
                    <p className="text-sm mt-4">بادر بالتسجيل أو تحديث بياناتك في العنوان الوطني لضمان استمرارية خدماتك</p>
                  </div>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop" 
                  alt="مباني" 
                  className="w-full h-64 object-cover opacity-50"
                />
              </div>
            </div>

            {/* Left Side - Content */}
            <div className="w-full lg:w-1/2 text-right">
              <h1 className="text-5xl lg:text-6xl font-bold text-[#0d7377] mb-4">
                سبيلك للعالم
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                اهلا بك في البريد السعودي | سبل
              </p>

              {/* Tracking Box */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-6 h-6 text-[#0d7377]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <h3 className="text-lg font-bold text-gray-800">تتبع الشحنات</h3>
                </div>
                <p className="text-gray-500 text-sm mb-4">أدخل رقمًا أو عدة أرقام تتبع</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g XHSNF74652HBD"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:border-[#0d7377]"
                  />
                  <button className="px-8 py-3 bg-[#40c4c4] text-white font-medium rounded-lg hover:bg-[#35a8a8] transition-colors">
                    تتبع
                  </button>
                </div>
                <p className="text-gray-400 text-xs mt-3">
                  افصل بين أرقام التتبع المتعددة بمسافة لمعرفة حالة كل شحنة
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warning Banner */}
      <section className="bg-[#0d7377] py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <a href="#" className="px-6 py-2 border border-white text-white text-sm font-medium rounded hover:bg-white hover:text-[#0d7377] transition-colors">
              اكتشف المزيد
            </a>
            <div className="flex items-center gap-3 text-white">
              <span className="text-sm">تحذير : لا يستخدم البريد الإلكتروني لسداد الفواتير!</span>
              <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Services Cards Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 - العنوان الوطني */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 text-right hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-gray-800 mb-3">العنوان الوطني</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                العنوان الوطني هو نظام عنونة دقيق يحدد مواقع الأفراد والمؤسسات سواء كانت شركات أو جهات حكومية بدقة.
              </p>
              <a href="#" className="inline-block px-6 py-2 bg-[#40c4c4] text-white text-sm font-medium rounded-lg hover:bg-[#35a8a8] transition-colors">
                سّجل الآن
              </a>
            </div>

            {/* Card 2 - حاسبة الأسعار */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 text-right hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-gray-800 mb-3">حاسبة الأسعار</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                هل لديك شحنة أو طرد بحاجة إلى إرساله؟ أدخل وزن الشحنة ووجهتها واعرف تكاليف شحنتك ومدة التوصيل.
              </p>
              <a href="#" className="inline-block px-6 py-2 bg-[#40c4c4] text-white text-sm font-medium rounded-lg hover:bg-[#35a8a8] transition-colors">
                احسب طردك
              </a>
            </div>

            {/* Card 3 - سداد الفواتير */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 text-right hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-gray-800 mb-3">سداد الفواتير</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                هل لديك فاتورة مستحقة؟ يمكنك دفع جميع فواتيرك البريدية بسهولة عبر الإنترنت.
              </p>
              <a href="#" className="inline-block px-6 py-2 bg-[#40c4c4] text-white text-sm font-medium rounded-lg hover:bg-[#35a8a8] transition-colors">
                سدد فاتورتك
              </a>
            </div>

            {/* Card 4 - منصة SMEs */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 text-right hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-gray-800 mb-3">منصة SMEs</h3>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                منصة إلكترونية تمكنك من شراء باقة من 20 شحنة أو أكثر لإرسال شحناتك داخل المملكة بوزن يصل حتى 20 كيلو للشحنة.
              </p>
              <a href="#" className="inline-block px-6 py-2 bg-[#40c4c4] text-white text-sm font-medium rounded-lg hover:bg-[#35a8a8] transition-colors">
                اختر باقتك
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Global Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Right Side - Content */}
            <div className="w-full lg:w-1/2 text-right">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">عالمي</h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                تسوّق من علاماتك التجارية المفضلة حول العالم، واستلم مشترياتك على عنوانك الوطني أو أي عنوان آخر.
              </p>
              <a href="#" className="inline-block px-8 py-3 bg-[#40c4c4] text-white font-medium rounded-lg hover:bg-[#35a8a8] transition-colors">
                ابدأ التسوّق
              </a>
            </div>

            {/* Left Side - Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1526367790999-0150786686a2?w=600&h=400&fit=crop" 
                  alt="عالمي" 
                  className="w-full rounded-2xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two Column Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Column 1 */}
            <div className="text-right">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">عنوانك هويتك</h3>
              <p className="text-gray-600 mb-6">
                يمكنك تسجيل عنوانك الوطني بالمجان وإدارته بكل يسر وسهولة.
              </p>
              <a href="#" className="inline-block px-8 py-3 bg-[#40c4c4] text-white font-medium rounded-lg hover:bg-[#35a8a8] transition-colors">
                سجّل الآن
              </a>
            </div>

            {/* Column 2 */}
            <div className="text-right">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">هل تشحن باستمرار؟</h3>
              <p className="text-gray-600 mb-6">
                يمكنك توفير مايقارب 50٪ من قيمة الشحن عند استخدامك منصة SMEs.
              </p>
              <a href="#" className="inline-block px-8 py-3 bg-[#40c4c4] text-white font-medium rounded-lg hover:bg-[#35a8a8] transition-colors">
                اختر الباقة المناسبة
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Branch Finder Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">أكثر من 450 فرع لخدمتكم</h2>
          <p className="text-xl text-gray-600 mb-12">الآن أصبحنا أقرب لكم</p>

          <div className="max-w-2xl mx-auto">
            <h3 className="text-lg font-medium text-gray-700 mb-4 text-right">ابحث عن فرع البريد السعودي | سبل</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="أدخل عنوانًا أو مدينة"
                value={branchSearch}
                onChange={(e) => setBranchSearch(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-right focus:outline-none focus:border-[#0d7377]"
              />
              <button className="px-8 py-3 bg-[#0d7377] text-white font-medium rounded-lg hover:bg-[#0a5f62] transition-colors">
                البحث
              </button>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="mt-12 bg-gray-200 rounded-2xl h-80 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <p>خريطة تفاعلية تمكنك من معرفة الفروع التابعة للأحياء ومقدمي الخدمة الأقرب لكل حي</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Right Side - Content */}
            <div className="w-full lg:w-1/2 text-right">
              <div className="w-16 h-16 bg-[#40c4c4] rounded-2xl flex items-center justify-center mb-6">
                <span className="text-white text-2xl font-bold">سبل</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">تطبيق سبل أون لاين</h2>
              <p className="text-gray-600 text-lg mb-8">
                استفد من خدمات سبل عبر التطبيق، واستمتع بتجربة أسهل وأسرع.
              </p>
              <p className="text-[#0d7377] font-medium mb-6">حمّل التطبيق الآن!</p>
              <div className="flex gap-4 justify-start">
                <a href="#" className="bg-black text-white rounded-xl px-4 py-3 flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-xs text-gray-300">GET IT ON</div>
                    <div className="text-sm font-bold">Google Play</div>
                  </div>
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                </a>
                <a href="#" className="bg-black text-white rounded-xl px-4 py-3 flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-xs text-gray-300">Download on the</div>
                    <div className="text-sm font-bold">App Store</div>
                  </div>
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Left Side - Phone Mockup */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative">
                <div className="w-64 h-[500px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                    <div className="bg-[#0d7377] p-4 text-white text-center">
                      <span className="text-xl font-bold">سبل</span>
                    </div>
                    <div className="p-4 text-right">
                      <p className="text-sm text-gray-600 mb-2">تتبع شحنة</p>
                      <div className="bg-gray-100 rounded-lg p-3 mb-4">
                        <p className="text-xs text-gray-400">e.g XHSNF74652HBD</p>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">عناويني</p>
                      <div className="bg-gray-100 rounded-lg p-3">
                        <p className="text-xs text-gray-800">RRRD2929</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Boxes Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Warning Box */}
            <div className="bg-white rounded-xl p-8 border border-gray-200 text-right">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">تحذير لعملائنا من الرسائل الاحتيالية</h3>
                  <p className="text-gray-600 mb-6">
                    نُجدّد تنويهنا لعملائنا الكرام بعدم التفاعل مع الرسائل الاحتيالية الواردة عبر البريد الإلكتروني، والتي تنتحل اسم وشعار مؤسسة البريد السعودي | سبل.
                  </p>
                  <a href="#" className="inline-block px-6 py-2 border border-[#0d7377] text-[#0d7377] text-sm font-medium rounded-lg hover:bg-[#0d7377] hover:text-white transition-colors">
                    للمزيد من التفاصيل
                  </a>
                </div>
                <svg className="w-16 h-16 text-yellow-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>

            {/* Customer Care Box */}
            <div className="bg-white rounded-xl p-8 border border-gray-200 text-right">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">مركز العناية بالعملاء</h3>
                  <p className="text-gray-600 mb-6">
                    نسعد بخدمتكم بالرد على جميع طلباتكم واستفساراتكم عبر الرقم المجاني 19992 ومن خارج المملكة +966112898888
                  </p>
                  <a href="#" className="inline-block px-6 py-2 border border-[#0d7377] text-[#0d7377] text-sm font-medium rounded-lg hover:bg-[#0d7377] hover:text-white transition-colors">
                    اتصل بنا
                  </a>
                </div>
                <svg className="w-16 h-16 text-[#0d7377] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0d7377] text-white py-16">
        <div className="container mx-auto px-4">
          {/* Footer Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            {/* Column 1 - Logo */}
            <div className="col-span-2 md:col-span-1">
              <div className="text-3xl font-bold mb-6">سبل</div>
              {/* Social Media Icons */}
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2 - سبل */}
            <div>
              <h4 className="font-bold mb-4">سبل</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li><a href="#" className="hover:text-white">عن المؤسسة</a></li>
                <li><a href="#" className="hover:text-white">كلمة معالي الرئيس</a></li>
                <li><a href="#" className="hover:text-white">مجلس الإدارة</a></li>
                <li><a href="#" className="hover:text-white">القادة</a></li>
                <li><a href="#" className="hover:text-white">الهيكل التنظيمي</a></li>
                <li><a href="#" className="hover:text-white">استراتيجية البريد السعودي</a></li>
                <li><a href="#" className="hover:text-white">المسؤولية الاجتماعية</a></li>
                <li><a href="#" className="hover:text-white">محفظة الاستثمارات</a></li>
                <li><a href="#" className="hover:text-white">فروعنا</a></li>
              </ul>
            </div>

            {/* Column 3 - المركز الإعلامي */}
            <div>
              <h4 className="font-bold mb-4">المركز الإعلامي</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li><a href="#" className="hover:text-white">الأخبار</a></li>
                <li><a href="#" className="hover:text-white">الفعاليات</a></li>
                <li><a href="#" className="hover:text-white">الجوائز والإنجازات</a></li>
                <li><a href="#" className="hover:text-white">هوية البريد السعودي</a></li>
                <li><a href="#" className="hover:text-white">التقارير السنوية</a></li>
              </ul>
            </div>

            {/* Column 4 - أخرى */}
            <div>
              <h4 className="font-bold mb-4">أخرى</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li><a href="#" className="hover:text-white">التوظيف</a></li>
                <li><a href="#" className="hover:text-white">المنافسات والمناقصات</a></li>
                <li><a href="#" className="hover:text-white">التوعية بالاحتيال</a></li>
                <li><a href="#" className="hover:text-white">البيانات المفتوحة</a></li>
                <li><a href="#" className="hover:text-white">مشاركة البيانات</a></li>
              </ul>
            </div>

            {/* Column 5 - مواقع ذات علاقة */}
            <div>
              <h4 className="font-bold mb-4">مواقع ذات علاقة</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li><a href="#" className="hover:text-white">وزارة النقل والخدمات اللوجستية</a></li>
                <li><a href="#" className="hover:text-white">الهيئة العامة للنقل</a></li>
                <li><a href="#" className="hover:text-white">أبشر</a></li>
                <li><a href="#" className="hover:text-white">إرسال</a></li>
                <li><a href="#" className="hover:text-white">ناقل</a></li>
                <li><a href="#" className="hover:text-white">المركز السعودي للأعمال</a></li>
              </ul>
            </div>
          </div>

          {/* App Download */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-8 border-t border-white/20">
            <div className="flex gap-4">
              <a href="#" className="bg-black text-white rounded-lg px-3 py-2 flex items-center gap-2 text-sm">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
                </svg>
                <div>
                  <div className="text-[10px] text-gray-400">Download on the</div>
                  <div className="font-medium">App Store</div>
                </div>
              </a>
              <a href="#" className="bg-black text-white rounded-lg px-3 py-2 flex items-center gap-2 text-sm">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <div>
                  <div className="text-[10px] text-gray-400">GET IT ON</div>
                  <div className="font-medium">Google Play</div>
                </div>
              </a>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-4">
              <div className="bg-white text-gray-800 rounded px-3 py-2 text-xs">
                <div className="font-bold">Great Place</div>
                <div className="font-bold">To Work.</div>
                <div className="text-red-600 text-[10px]">Certified</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">2030</div>
                <div className="text-xs">رؤية</div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-white/20 text-sm">
            <div className="flex gap-6">
              <a href="#" className="hover:underline">شروط الخدمة</a>
              <a href="#" className="hover:underline">سياسة الخصوصية</a>
              <a href="#" className="hover:underline">إشعار الخصوصية</a>
            </div>
            <p className="text-white/60">© 2026 جميع الحقوق محفوظة البريد السعودي | سبل</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
