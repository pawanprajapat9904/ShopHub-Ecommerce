import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    otp: ""
  });
  const [loading, setLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const navigate = useNavigate();

  const theme = {
    bg: "#05070a",
    card: "#0f172a",
    accent: "#6366f1",
    border: "rgba(255, 255, 255, 0.1)",
    text: "#f8fafc"
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendOtp = async () => {
    if (!form.email) return alert("Please enter your email first");
    setLoading(true);
    try {
      await api.post("/auth/send-otp", { email: form.email });
      alert("✅ OTP sent successfully!");
      setIsOtpSent(true);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!form.otp) return alert("Please enter OTP");
    
    setLoading(true);
    try {
      const res = await api.post("/auth/register", form);
      alert("🚀 Registration successful!");
      navigate("/"); // Redirect to login
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.bg,
      color: theme.text,
      fontFamily: "'Inter', sans-serif",
      padding: "20px"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "450px",
        padding: "40px",
        background: theme.card,
        borderRadius: "28px",
        border: `1px solid ${theme.border}`,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        boxSizing: "border-box"
      }}>
        
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h2 style={{ fontSize: "28px", fontWeight: "900", margin: "0 0 10px 0" }}>
            JOIN <span style={{ color: theme.accent }}>SYSTEM</span>
          </h2>
          <p style={{ opacity: 0.5, fontSize: "14px" }}>Initialize your admin credentials</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          
          <div style={inputGroup}>
            <label style={labelStyle}>FULL NAME</label>
            <input name="name" placeholder="John Doe" onChange={handleChange} style={inputStyle(theme)} />
          </div>

          <div style={inputGroup}>
            <label style={labelStyle}>EMAIL ADDRESS</label>
            <div style={{ display: "flex", gap: "10px" }}>
              <input name="email" placeholder="admin@system.com" onChange={handleChange} style={{...inputStyle(theme), flex: 1}} />
              <button 
                onClick={sendOtp} 
                disabled={loading}
                style={otpBtnStyle(theme, loading)}
              >
                {loading ? "..." : isOtpSent ? "RESEND" : "GET OTP"}
              </button>
            </div>
          </div>

          <div style={inputGroup}>
            <label style={labelStyle}>VERIFICATION OTP</label>
            <input name="otp" placeholder="Enter 6-digit code" onChange={handleChange} style={inputStyle(theme)} />
          </div>

          <div style={inputGroup}>
            <label style={labelStyle}>ACCESS PASSWORD</label>
            <input name="password" type="password" placeholder="••••••••" onChange={handleChange} style={inputStyle(theme)} />
          </div>

          <button 
            onClick={handleSubmit} 
            disabled={loading}
            className="reg-btn"
            style={mainBtnStyle(theme, loading)}
          >
            {loading ? "PROCESSING..." : "FINALIZE REGISTRATION"}
          </button>

          <p style={{ textAlign: "center", fontSize: "13px", opacity: 0.6 }}>
            Already have access? <Link to="/" style={{ color: theme.accent, textDecoration: "none", fontWeight: "bold" }}>Login</Link>
          </p>
        </div>
      </div>

      <style>{`
        .reg-btn:hover { transform: translateY(-2px); filter: brightness(1.1); }
        .reg-btn:active { transform: translateY(0); }
      `}</style>
    </div>
  );
};

// --- Styles Objects ---
const inputGroup = { display: "flex", flexDirection: "column", gap: "6px" };
const labelStyle = { fontSize: "10px", fontWeight: "800", opacity: 0.4, letterSpacing: "1px", paddingLeft: "5px" };

const inputStyle = (theme) => ({
  width: "100%",
  padding: "14px 18px",
  borderRadius: "14px",
  border: `1px solid ${theme.border}`,
  backgroundColor: "rgba(255,255,255,0.03)",
  color: "#fff",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
  transition: "0.3s border-color",
});

const otpBtnStyle = (theme, loading) => ({
  padding: "0 15px",
  borderRadius: "14px",
  border: "none",
  backgroundColor: loading ? "rgba(255,255,255,0.1)" : theme.accent,
  color: "#fff",
  fontWeight: "bold",
  fontSize: "12px",
  cursor: loading ? "not-allowed" : "pointer",
  transition: "0.3s"
});

const mainBtnStyle = (theme, loading) => ({
  marginTop: "10px",
  padding: "16px",
  borderRadius: "14px",
  border: "none",
  backgroundColor: theme.accent,
  color: "#fff",
  fontWeight: "900",
  fontSize: "15px",
  cursor: loading ? "not-allowed" : "pointer",
  boxShadow: `0 10px 20px ${theme.accent}33`,
  transition: "0.3s"
});

export default Register;