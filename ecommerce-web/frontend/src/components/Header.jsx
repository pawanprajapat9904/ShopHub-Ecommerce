import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = ({ onSearch }) => {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    if (token) setUser(name);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (window.location.pathname !== "/") navigate("/");
    if (onSearch) onSearch(value);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
    window.location.reload();
  };

  const colors = {
    primary: "#6366f1",
    dark: "#0f172a",
    glass: "rgba(15, 23, 42, 0.98)",
  };

  return (
    <>
      <header style={{
        position: "sticky", top: 0, zIndex: 1000,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "0 5%", height: "70px",
        background: scrolled ? colors.glass : colors.dark,
        backdropFilter: "blur(15px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        transition: "0.3s ease", color: "#fff",
        width: "100%", boxSizing: "border-box"
      }}>

        {/* --- Logo --- */}
        <div onClick={() => navigate("/")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
          <div style={{ width: "35px", height: "35px", background: colors.primary, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 15px ${colors.primary}66` }}>
            <span style={{ fontWeight: "900", fontSize: "16px" }}>S</span>
          </div>
          <h1 className="logo-text" style={{ margin: 0, fontSize: "20px", fontWeight: "900", letterSpacing: "-1px" }}>ShopHub</h1>
        </div>

        {/* --- Search Box (Fluid) --- */}
        <div className="search-box" style={{ flex: 1, maxWidth: "400px", margin: "0 20px" }}>
          <input
            placeholder="Search products..."
            value={search}
            onChange={handleInputChange}
            style={{ width: "100%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", padding: "10px 15px", borderRadius: "10px", color: "#fff", fontSize: "14px", outline: "none" }}
          />
        </div>

        {/* --- LAPTOP NAV (Visible on Desktop) --- */}
        <nav className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: "25px" }}>
          <Link to="/" style={navLink}>Home</Link>
          <Link to="/orders" style={navLink}>Orders</Link>
          <Link to="/cart" style={{ position: "relative", textDecoration: "none", fontSize: "20px" }}>
            🛒 {cartCount > 0 && <span style={badgeStyle(colors)}>{cartCount}</span>}
          </Link>
          
          {!user ? (
            <button onClick={() => navigate("/login")} style={loginBtn(colors)}>LOGIN</button>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={avatarStyle(colors)}>{user[0].toUpperCase()}</div>
              <span onClick={handleLogout} style={{ fontSize: "11px", opacity: 0.5, cursor: "pointer", fontWeight: "bold" }}>EXIT</span>
            </div>
          )}
        </nav>

        {/* --- MOBILE ACTIONS (Visible on Mobile) --- */}
        <div className="mobile-actions" style={{ display: "none", alignItems: "center", gap: "15px" }}>
          <Link to="/cart" style={{ position: "relative", fontSize: "22px" }}>
            🛒 {cartCount > 0 && <span style={badgeStyle(colors)}>{cartCount}</span>}
          </Link>
          <div onClick={() => setMenuOpen(true)} style={{ fontSize: "26px", cursor: "pointer" }}>☰</div>
        </div>
      </header>

      {/* --- MOBILE SIDEBAR --- */}
      {menuOpen && (
        <div onClick={() => setMenuOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 1001 }} />
      )}
      <div style={{
        position: "fixed", top: 0, right: menuOpen ? 0 : "-280px", width: "280px", height: "100vh",
        background: "#0f172a", zIndex: 1002, transition: "0.4s cubic-bezier(0.4, 0, 0.2, 1)", 
        padding: "40px 30px", boxSizing: "border-box", display: "flex", flexDirection: "column"
      }}>
        <div onClick={() => setMenuOpen(false)} style={{ alignSelf: "flex-end", fontSize: "28px", cursor: "pointer", marginBottom: "40px" }}>✕</div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          <Link to="/" onClick={() => setMenuOpen(false)} style={sideLink}>Home</Link>
          <Link to="/orders" onClick={() => setMenuOpen(false)} style={sideLink}>My Orders</Link>
          <hr style={{ border: "0.5px solid rgba(255,255,255,0.1)", width: "100%" }} />
          
          {!user ? (
            <button onClick={() => { navigate("/login"); setMenuOpen(false); }} style={{ ...loginBtn(colors), width: "100%", padding: "15px" }}>LOGIN</button>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
               <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={avatarStyle(colors)}>{user[0].toUpperCase()}</div>
                  <span style={{ fontWeight: "600" }}>{user}</span>
               </div>
               <button onClick={handleLogout} style={{ background: "transparent", color: "#ff4d4d", border: "1px solid #ff4d4d", padding: "12px", borderRadius: "10px", fontWeight: "bold", cursor: "pointer" }}>LOGOUT</button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        /* Media Queries for Desktop vs Mobile */
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-actions { display: flex !important; }
          .search-box { margin: 0 10px !important; }
        }
        @media (max-width: 480px) {
          .logo-text { display: none; } /* Logo text hides to give space to search input */
          header { padding: 0 12px !important; }
        }
      `}</style>
    </>
  );
};

// Internal Styles
const navLink = { textDecoration: "none", color: "rgba(255,255,255,0.8)", fontSize: "14px", fontWeight: "600", transition: "0.2s" };
const sideLink = { textDecoration: "none", color: "#fff", fontSize: "18px", fontWeight: "500" };
const loginBtn = (colors) => ({ background: colors.primary, color: "#fff", border: "none", padding: "8px 22px", borderRadius: "10px", fontWeight: "bold", cursor: "pointer" });
const avatarStyle = (colors) => ({ width: "35px", height: "35px", borderRadius: "50%", background: colors.primary, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" });
const badgeStyle = (colors) => ({ position: "absolute", top: "-5px", right: "-10px", background: colors.primary, color: "#fff", fontSize: "10px", width: "18px", height: "18px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", border: "2px solid #0f172a" });

export default Header;