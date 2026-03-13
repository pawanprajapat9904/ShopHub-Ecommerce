import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    // window.location.href use karna zyada safe hai logout ke liye 
    // taaki memory puri tarah clean ho jaye
    window.location.href = "/";
  };

  const theme = {
    card: "#0f172a",
    accent: "#6366f1",
    border: "rgba(255, 255, 255, 0.08)",
    danger: "#ef4444"
  };

  return (
    <header style={{
      height: "70px",
      background: theme.card,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 30px",
      borderBottom: `1px solid ${theme.border}`,
      position: "sticky",
      top: 0,
      zIndex: 1000,
      boxSizing: "border-box"
    }}>
      
      {/* Title Section */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10b981" }}></div>
        <h3 style={{ fontSize: "14px", fontWeight: "700", margin: 0, letterSpacing: "1px" }}>
          ADMIN <span style={{ color: theme.accent }}>PORTAL</span>
        </h3>
      </div>

      {/* Action Section */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        
        {/* User Info (Hidden on very small screens) */}
        <div style={{ textAlign: "right", color: "rgba(255,255,255,0.5)", fontSize: "12px" }}>
          <div style={{ fontWeight: "bold", color: "#fff" }}>SYSTEM ROOT</div>
          <div>Active Session</div>
        </div>

        {/* Divider */}
        <div style={{ width: "1px", height: "24px", background: theme.border }}></div>

        {/* Safe Logout Button - Bina Inline JS manipulation ke */}
        <button 
          onClick={logout}
          className="logout-btn"
          style={{
            background: "transparent",
            color: theme.danger,
            border: `1px solid ${theme.danger}`,
            padding: "8px 18px",
            borderRadius: "8px",
            fontSize: "12px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.2s all"
          }}
        >
          LOGOUT
        </button>
      </div>

      {/* CSS Styles - Hover logic yahan handle hogi na ki JS mein */}
      <style>{`
        .logout-btn:hover {
          background: ${theme.danger} !important;
          color: #fff !important;
          box-shadow: 0 0 15px ${theme.danger}66;
        }
        @media (max-width: 600px) {
          header h3 { font-size: 12px; }
          header > div:nth-child(2) > div:first-child { display: none; }
        }
      `}</style>
    </header>
  );
};

export default Header;