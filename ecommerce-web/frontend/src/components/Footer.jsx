import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerStyle = {
    background: "#05070a", // Deep Black
    color: "#94a3b8", // Muted text
    padding: "60px 8% 30px 8%",
    borderTop: "1px solid rgba(255, 255, 255, 0.05)",
    fontFamily: "'Inter', sans-serif",
    marginTop: "auto" // Hamesha niche rehne ke liye
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "40px",
    marginBottom: "40px"
  };

  const sectionTitle = {
    color: "#fff",
    fontSize: "14px",
    fontWeight: "800",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    marginBottom: "20px"
  };

  const linkStyle = {
    display: "block",
    color: "#94a3b8",
    textDecoration: "none",
    fontSize: "14px",
    marginBottom: "12px",
    transition: "color 0.3s ease"
  };

  return (
    <footer style={footerStyle}>
      <div style={gridStyle}>
        
        {/* Brand Section */}
        <div>
          <h2 style={{ color: "#fff", fontSize: "24px", fontWeight: "900", marginBottom: "15px", letterSpacing: "-1px" }}>
            Shop<span style={{ color: "#6366f1" }}>Hub.</span>
          </h2>
          <p style={{ fontSize: "14px", lineHeight: "1.6" }}>
            The next generation of e-commerce. Experience the future of shopping with our neural-linked inventory.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={sectionTitle}>Navigation</h4>
          <Link to="/" style={linkStyle} onMouseOver={(e) => e.target.style.color = "#6366f1"} onMouseOut={(e) => e.target.style.color = "#94a3b8"}>Marketplace</Link>
          <Link to="/cart" style={linkStyle} onMouseOver={(e) => e.target.style.color = "#6366f1"} onMouseOut={(e) => e.target.style.color = "#94a3b8"}>Neural Cart</Link>
          <Link to="/login" style={linkStyle} onMouseOver={(e) => e.target.style.color = "#6366f1"} onMouseOut={(e) => e.target.style.color = "#94a3b8"}>Access Hub</Link>
        </div>

        {/* Support */}
        <div>
          <h4 style={sectionTitle}>Assistance</h4>
          <a href="#" style={linkStyle}>Track Order</a>
          <a href="#" style={linkStyle}>Privacy Policy</a>
          <a href="#" style={linkStyle}>Help Center</a>
        </div>

        {/* Contact/Newsletter */}
        <div>
          <h4 style={sectionTitle}>Updates</h4>
          <p style={{ fontSize: "12px", marginBottom: "15px" }}>Subscribe for the latest drops.</p>
          <div style={{ display: "flex", gap: "10px" }}>
            <input 
              placeholder="Email Node" 
              style={{ 
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", 
                padding: "10px", borderRadius: "8px", color: "#fff", width: "100%" 
              }} 
            />
            <button style={{ background: "#6366f1", border: "none", padding: "10px 15px", borderRadius: "8px", color: "#fff", cursor: "pointer" }}>→</button>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div style={{ 
        borderTop: "1px solid rgba(255, 255, 255, 0.05)", 
        paddingTop: "30px", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        flexWrap: "wrap",
        gap: "20px"
      }}>
        <p style={{ fontSize: "12px" }}>© 2026 ShopHub Systems. Universal Identity Verified.</p>
        <div style={{ display: "flex", gap: "20px", fontSize: "18px" }}>
          <span style={{ cursor: "pointer" }}>𝕏</span>
          <span style={{ cursor: "pointer" }}>📸</span>
          <span style={{ cursor: "pointer" }}>📺</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;