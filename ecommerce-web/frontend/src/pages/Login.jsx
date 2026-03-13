import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.user.name);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Access Denied");
    }
  };

  // Ultra-Futuristic Styles
  const pageStyle = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#05070a", // Deep space black
    backgroundImage: `radial-gradient(circle at 50% 50%, #1e1b4b 0%, #05070a 100%)`,
    fontFamily: "'Inter', sans-serif",
    overflow: "hidden"
  };

  const glassCard = {
    width: "100%",
    maxWidth: "400px",
    padding: "40px",
    background: "rgba(255, 255, 255, 0.03)",
    backdropFilter: "blur(20px)",
    borderRadius: "30px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
    textAlign: "center"
  };

  const inputGroup = {
    marginBottom: "20px",
    textAlign: "left"
  };

  const inputStyle = {
    width: "100%",
    padding: "15px",
    marginTop: "8px",
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    color: "#fff",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.3s ease",
    boxSizing: "border-box"
  };

  const buttonStyle = {
    width: "100%",
    padding: "16px",
    background: isHovered 
      ? "linear-gradient(90deg, #6366f1, #a855f7)" 
      : "linear-gradient(90deg, #4f46e5, #7c3aed)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: isHovered ? "0 0 20px rgba(99, 102, 241, 0.6)" : "none",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    marginTop: "10px"
  };

  return (
    <div style={pageStyle}>
      {/* Background Glow Decorations */}
      <div style={{
        position: "absolute", width: "300px", height: "300px", 
        background: "#6366f1", filter: "blur(150px)", top: "10%", left: "10%", opacity: 0.2
      }}></div>

      <div style={glassCard}>
        <div style={{ marginBottom: "30px" }}>
          <h2 style={{ color: "#fff", fontSize: "28px", margin: "0", letterSpacing: "-1px" }}>
            Welcome <span style={{ color: "#6366f1" }}>Back</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", marginTop: "5px" }}>
            Enter your credentials to access the hub.
          </p>
        </div>

        <div style={inputGroup}>
          <label style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px", fontWeight: "600" }}>IDENTIFIER</label>
          <input
            placeholder="name@email.com"
            style={inputStyle}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
          />
        </div>

        <div style={inputGroup}>
          <label style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px", fontWeight: "600" }}>SECURITY KEY</label>
          <input
            type="password"
            placeholder="••••••••"
            style={inputStyle}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
          />
        </div>

        <button 
          style={buttonStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleLogin}
        >
          AUTHENTICATE
        </button>

        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", marginTop: "25px" }}>
          New here? <span 
            onClick={() => navigate("/register")}
            style={{ color: "#6366f1", cursor: "pointer", fontWeight: "600" }}
          >Create an account</span>
        </p>
      </div>
    </div>
  );
};

export default Login;