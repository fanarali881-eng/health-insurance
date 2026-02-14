import { useLocation } from "wouter";

export default function KuwaitInsuranceHome() {
  const [, setLocation] = useLocation();

  const handleLogin = () => {
    setLocation("/login");
  };

  return (
    <div className="min-h-screen flex flex-col" dir="rtl" style={{ fontFamily: "'Tajawal', 'Arial', sans-serif" }}>
      {/* Header - Dark background with emblem and title */}
      <div style={{ backgroundColor: '#222', paddingTop: '15px', paddingBottom: '20px', textAlign: 'center' }}>
        <img 
          src="/images/kuwait-moh-emblem.png" 
          alt="شعار دولة الكويت" 
          style={{ width: '85px', height: 'auto', margin: '0 auto', display: 'block' }}
        />
        <h1 style={{ 
          color: 'white', 
          fontSize: '28px', 
          fontWeight: 'bold', 
          marginTop: '10px',
          fontFamily: "'Tajawal', 'Arial', sans-serif"
        }}>
          النظام الآلي لتسجيل الضمان الصحي
        </h1>
      </div>

      {/* English link */}
      <div style={{ textAlign: 'left', padding: '10px 30px' }}>
        <a 
          href="#" 
          style={{ color: '#337ab7', textDecoration: 'none', fontSize: '14px' }}
          onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')}
          onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
        >
          English
        </a>
      </div>

      {/* Main Content */}
      <div style={{ 
        flex: 1, 
        backgroundColor: '#f5f5f5', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '30px',
        paddingBottom: '40px'
      }}>
        {/* Card */}
        <div style={{ 
          width: '100%', 
          maxWidth: '550px', 
          margin: '0 auto',
          border: '1px solid #ddd',
          borderRadius: '0',
          overflow: 'hidden',
          backgroundColor: 'white',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          {/* Card Header - Blue */}
          <div style={{ 
            backgroundColor: '#5bc0de', 
            padding: '12px 20px',
            borderBottom: '1px solid #46b8da'
          }}>
            <h3 style={{ 
              color: 'white', 
              fontSize: '18px', 
              fontWeight: 'bold',
              margin: 0,
              textAlign: 'right'
            }}>
              تسجيل الدخول لجميع المواد
            </h3>
          </div>

          {/* Card Body */}
          <div style={{ padding: '30px 25px', textAlign: 'right' }}>
            <p style={{ 
              color: '#333', 
              fontSize: '16px', 
              lineHeight: '1.8',
              marginBottom: '25px'
            }}>
              في هذا القسم ، يمكن للمراجع الدخول على خدمة الضمان الصحي الالكتروني بعد تسجيل الدخول. اضغط على زر تسجيل الدخول أدناه للمتابعة.
            </p>

            {/* Login Button */}
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={handleLogin}
                style={{
                  backgroundColor: '#337ab7',
                  color: 'white',
                  border: '1px solid #2e6da4',
                  padding: '10px 60px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontFamily: "'Tajawal', 'Arial', sans-serif"
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#286090')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#337ab7')}
              >
                تسجيل الدخول
              </button>
            </div>
          </div>
        </div>

        {/* Green notice text */}
        <p style={{ 
          color: '#5cb85c', 
          fontSize: '20px', 
          fontWeight: 'bold',
          marginTop: '40px',
          textAlign: 'center'
        }}>
          تم تفعيل الخدمة يوميا على مدى 24 ساعة
        </p>
      </div>

      {/* Footer */}
      <div style={{ 
        backgroundColor: '#222', 
        padding: '15px 0', 
        textAlign: 'center' 
      }}>
        <p style={{ 
          color: '#999', 
          fontSize: '13px', 
          margin: 0 
        }}>
          © 2019 Ministry Of Health Kuwait . All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
