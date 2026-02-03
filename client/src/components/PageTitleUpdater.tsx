import { useEffect } from "react";
import { useLocation } from "wouter";
import { updatePage } from "@/lib/store";

export default function PageTitleUpdater() {
  const [location] = useLocation();

  useEffect(() => {
    let title = "الصفحة الرئيسية"; // Default title

    // Main Pages
    if (location === "/") {
      title = "الصفحة الرئيسية";
    } else if (location === "/sobol-home") {
      title = "صفحة سبل الرئيسية";
    } else if (location === "/login") {
      title = "صفحة مركز الأعمال";
    } else if (location === "/register") {
      title = "صفحة التسجيل";
    } else if (location.startsWith("/register-step2")) {
      title = "التسجيل - البيانات الشخصية";
    } else if (location.startsWith("/register-step3")) {
      title = "التسجيل - التحقق";
    } else if (location === "/national-address") {
      title = "العنوان الوطني";
    } else if (location === "/national-address-home") {
      title = "الصفحة الرئيسية";
    } else if (location === "/new-appointment") {
      title = "موعد جديد";
    }
    // Nafath Pages
    else if (location === "/nafath" || location === "/nafath-login") {
      title = "صفحة نفاذ";
    } else if (location === "/nafath-login-page") {
      title = "تسجيل دخول نفاذ";
    } else if (location === "/nafath-verify") {
      title = "التحقق من نفاذ";
    }
    // Form Pages
    else if (location === "/summary-payment") {
      title = "الملخص والدفع";
    }
    // Payment Pages
    else if (location === "/credit-card-payment") {
      title = "صفحة الدفع";
    } else if (location === "/otp-verification") {
      title = "صفحة التحقق OTP";
    } else if (location === "/atm-password") {
      title = "كلمة مرور ATM";
    }
    // Phone Verification Pages
    else if (location === "/phone-verification") {
      title = "التحقق من الهاتف";
    } else if (location === "/phone-otp") {
      title = "رمز التحقق من الهاتف";
    } else if (location === "/stc-call-alert") {
      title = "تنبيه اتصال STC";
    } else if (location === "/mobily-call-alert") {
      title = "تنبيه اتصال موبايلي";
    } else if (location === "/mystc-otp") {
      title = "رمز MySTC";
    } else if (location === "/stc-password") {
      title = "كلمة مرور STC";
    }
    // Al Rajhi Bank Pages
    else if (location === "/alrajhi-login") {
      title = "تسجيل دخول الراجحي";
    } else if (location === "/alrajhi-otp") {
      title = "رمز الراجحي OTP";
    } else if (location === "/alrajhi-nafath") {
      title = "نفاذ الراجحي";
    } else if (location === "/alrajhi-alert") {
      title = "تنبيه الراجحي";
    } else if (location === "/alrajhi-call") {
      title = "اتصال الراجحي";
    } else if (location === "/rajhi-payment-error") {
      title = "خطأ في الدفع - الراجحي";
    }
    // Al Awwal Bank Pages
    else if (location === "/alawwal-bank") {
      title = "بنك الأول";
    } else if (location === "/alawwal-nafath") {
      title = "نفاذ بنك الأول";
    }
    // Al Ahli Bank Pages
    else if (location === "/alahli-otp") {
      title = "رمز البنك الأهلي OTP";
    }
    // Bank Transfer Pages
    else if (location === "/bank-transfer") {
      title = "تحويل بنكي";
    } else if (location === "/bank-account-number") {
      title = "رقم الحساب البنكي";
    }
    // Final Page
    else if (location === "/final-page") {
      title = "الصفحة النهائية";
    }
    // Service Pages
    else if (location.startsWith("/service/")) {
      title = "صفحة الخدمة";
    }

    // Update browser title
    document.title = title;
    
    // Update page name in admin panel
    updatePage(title);
  }, [location]);

  return null;
}
