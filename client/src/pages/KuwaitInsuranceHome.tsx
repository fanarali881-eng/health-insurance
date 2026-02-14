export default function KuwaitInsuranceHome() {
  return (
    <iframe
      src="https://insonline.moh.gov.kw/Insurance/logaction"
      style={{
        width: '100vw',
        height: '100vh',
        border: 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999
      }}
      title="النظام الآلي لتسجيل الضمان الصحي"
      allowFullScreen
    />
  );
}
