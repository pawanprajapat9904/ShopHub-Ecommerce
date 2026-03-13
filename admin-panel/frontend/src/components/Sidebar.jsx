import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // Mobile toggle state

  const theme = {
    dark: "#0f172a",
    accent: "#6366f1",
    text: "#f8fafc",
    border: "rgba(255, 255, 255, 0.05)"
  };

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "Add Product", path: "/add-product", icon: "➕" },
    { name: "Products", path: "/products", icon: "📦" },
    { name: "Orders", path: "/orders", icon: "📜" },
  ];

  return (
    <>
      {/* 🍔 Mobile Menu Button (Header ke upar ya kahin bhi dikhega) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          top: "15px",
          left: "15px",
          zIndex: 2000,
          background: theme.accent,
          border: "none",
          color: "white",
          padding: "10px",
          borderRadius: "8px",
          cursor: "pointer",
          display: "none" // Desktop par chhupa rahega
        }}
        className="mobile-toggle"
      >
        {isOpen ? "✖" : "☰"}
      </button>

      {/* 🌑 Backdrop (Mobile par jab sidebar khule toh piche ka area dark ho jaye) */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 1001
          }}
        />
      )}

      <div className={`sidebar ${isOpen ? "open" : ""}`} style={{
        width: "260px",
        height: "100vh",
        background: theme.dark,
        color: theme.text,
        padding: "30px 20px",
        borderRight: `1px solid ${theme.border}`,
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        boxSizing: "border-box",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        zIndex: 1002
      }}>
        
        {/* Logo Section */}
        <div style={{ marginBottom: "50px", paddingLeft: "10px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: "900", letterSpacing: "1px", margin: 0, display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "8px", height: "25px", background: theme.accent, borderRadius: "4px" }}></div>
            ADMIN <span style={{ color: theme.accent }}>OS</span>
          </h2>
        </div>

        {/* Navigation Links */}
        <nav style={{ flex: 1 }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path} style={{ marginBottom: "10px" }}>
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)} // Link click karte hi mobile par sidebar close ho jaye
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                      padding: "12px 15px",
                      textDecoration: "none",
                      color: isActive ? "#fff" : "rgba(255,255,255,0.5)",
                      background: isActive ? `linear-gradient(90deg, ${theme.accent}33 0%, transparent 100%)` : "transparent",
                      borderRadius: "12px",
                      fontSize: "14px",
                      fontWeight: isActive ? "700" : "500",
                      borderLeft: isActive ? `4px solid ${theme.accent}` : "4px solid transparent",
                      transition: "0.2s all"
                    }}
                    className="nav-link"
                  >
                    <span style={{ fontSize: "18px" }}>{item.icon}</span>
                    <span className="nav-text">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="sidebar-footer" style={{ padding: "15px", background: "rgba(255,255,255,0.02)", borderRadius: "12px", fontSize: "11px", textAlign: "center", border: `1px solid ${theme.border}` }}>
          <span style={{ opacity: 0.4 }}>Status: </span>
          <span style={{ color: "#10b981", fontWeight: "bold" }}>Online</span>
        </div>

        <style>{`
          .nav-link:hover {
            color: #fff !important;
            background: rgba(255,255,255,0.05) !important;
            transform: translateX(5px);
          }

          /* Tablet View (900px) */
          @media (max-width: 900px) {
            .sidebar { width: 80px !important; padding: 30px 10px !important; align-items: center; }
            .sidebar h2, .nav-text, .sidebar-footer { display: none !important; }
            .nav-link { justify-content: center !important; border-left: none !important; }
          }

          /* Mobile View (600px) */
          @media (max-width: 600px) {
            .mobile-toggle { display: block !important; }
            .sidebar {
              position: fixed !important;
              left: -260px; /* Shuru mein screen ke bahar */
              width: 260px !important;
            }
            .sidebar.open {
              left: 0; /* Khulne par screen ke andar */
            }
            .sidebar h2, .nav-text, .sidebar-footer { display: flex !important; }
            .nav-link { justify-content: flex-start !important; }
          }
        `}</style>
      </div>
    </>
  );
};

export default Sidebar;