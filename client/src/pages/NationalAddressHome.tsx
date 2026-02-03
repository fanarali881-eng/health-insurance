import { useState } from "react";
import { Link } from "wouter";

export default function NationalAddressHome() {
  const [activeTab, setActiveTab] = useState("individual");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white" dir="rtl" style={{ fontFamily: "'Tajawal', sans-serif" }}>
      {/* Top Header Bar - الشريط الأخضر العلوي */}
      <div className="bg-[#143c3c] text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10 md:h-12">
            {/* Right Side - Tabs */}
            <div className="hidden md:flex items-center gap-0">
              <button 
                onClick={() => setActiveTab("individual")}
                className={`px-4 md:px-6 py-2 md:py-3 font-medium text-xs md:text-sm ${activeTab === "individual" ? "bg-[#f7e733] text-[#143c3c]" : "text-white hover:bg-[#0f2e2e]"}`}
              >
                الأفراد
              </button>
              <button 
                onClick={() => setActiveTab("enterprise")}
                className={`px-4 md:px-6 py-2 md:py-3 font-medium text-xs md:text-sm ${activeTab === "enterprise" ? "bg-[#f7e733] text-[#143c3c]" : "text-white hover:bg-[#0f2e2e]"}`}
              >
                الأعمال
              </button>
              <button 
                onClick={() => setActiveTab("government")}
                className={`px-4 md:px-6 py-2 md:py-3 font-medium text-xs md:text-sm ${activeTab === "government" ? "bg-[#f7e733] text-[#143c3c]" : "text-white hover:bg-[#0f2e2e]"}`}
              >
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
              <a href="#" className="text-white text-xs md:text-sm hover:underline">English</a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#143c3c] text-white py-4 px-4">
          <div className="flex flex-col gap-2">
            <button className="px-4 py-2 bg-[#f7e733] text-[#143c3c] font-medium text-sm rounded">الأفراد</button>
            <button className="px-4 py-2 text-white font-medium text-sm">الأعمال</button>
            <button className="px-4 py-2 text-white font-medium text-sm">الخدمات الحكومية</button>
            <a href="#" className="px-4 py-2 text-white text-sm">مساعدة</a>
          </div>
        </div>
      )}

      {/* Main Navigation - الهيدر الأبيض */}
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
              <a href="#" className="px-4 py-2 text-gray-700 text-sm font-medium hover:text-[#143c3c]">إرسال</a>
              <a href="#" className="px-4 py-2 text-gray-700 text-sm font-medium hover:text-[#143c3c]">استلام</a>
              <a href="#" className="px-4 py-2 text-gray-700 text-sm font-medium hover:text-[#143c3c]">عالمي</a>
              <a href="#" className="px-4 py-2 text-[#143c3c] text-sm font-bold border-b-2 border-[#00c8e6]">العنوان الوطني</a>
              <a href="#" className="px-4 py-2 text-gray-700 text-sm font-medium hover:text-[#143c3c]">خدمات التجزئة</a>
              <a href="#" className="px-4 py-2 text-gray-700 text-sm font-medium hover:text-[#143c3c]">خدمات التمويل</a>
              <a href="#" className="px-4 py-2 text-gray-700 text-sm font-medium hover:text-[#143c3c]">الطوابع</a>
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

      {/* Hero Section - القسم الرئيسي */}
      <section className="relative">
        <img 
          src="/images/na-banner-v2.jpeg" 
          alt="العنوان الوطني" 
          className="w-full h-auto"
        />
        {/* زر سجّل الآن - يغطي الزر في الصورة */}
        <Link 
          to="/register" 
          className="absolute cursor-pointer"
          style={{
            bottom: '7%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '16%',
            height: '8%'
          }}
        >
          <span className="sr-only">سجّل الآن</span>
        </Link>
      </section>

      {/* Short Address Section - من عنوان مفصل إلى عنوان مختصر */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
            <span className="text-gray-800">من عنوان مفصل إلى:</span>
            <span className="text-[#00c8e6]"> عنوان مختصر</span>
          </h2>

          <div className="flex flex-row items-center justify-center gap-8">
            {/* Description - في اليمين */}
            <div className="text-right">
              <p className="text-black text-sm md:text-base leading-relaxed">
                عنوان بسيط سهل الحفظ يحتوي على أربعة حروف وأربعة أرقام فقط هذا الرمز<br/>
                القصير كفيل بأن يجعل حياتك أسهل
              </p>
            </div>
            {/* صورة RRRD2929 - على يسار العبارة */}
            <div className="flex-shrink-0">
              <img src="/images/rrrd2929.png" alt="RRRD2929" className="w-48 md:w-64 h-auto" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
