import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQty, decreaseQty } from "../redux/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.qty, 0);

  // Modern UI Theme
  const theme = {
    bg: "#f8fafc",
    card: "#ffffff",
    accent: "#6366f1", // Indigo
    text: "#1e293b",
    danger: "#ef4444",
    glass: "rgba(255, 255, 255, 0.7)"
  };

  const containerStyle = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    gap: "30px",
    padding: isMobile ? "20px" : "40px 8%",
    backgroundColor: theme.bg,
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif"
  };

  const cartListStyle = {
    flex: "2",
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  };

  const summaryCardStyle = {
    flex: "1",
    height: "fit-content",
    backgroundColor: theme.card,
    borderRadius: "24px",
    padding: "30px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
    position: isMobile ? "static" : "sticky",
    top: "100px",
    border: "1px solid rgba(0,0,0,0.05)"
  };

  const itemCardStyle = {
    display: "flex",
    alignItems: "center",
    backgroundColor: theme.card,
    padding: "20px",
    borderRadius: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
    transition: "transform 0.2s ease",
    gap: "20px"
  };

  const qtyBtnStyle = {
    width: "32px",
    height: "32px",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    backgroundColor: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    transition: "all 0.2s"
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "100px", background: theme.bg, minHeight: "100vh" }}>
        <h1 style={{ fontSize: "60px" }}>🛒</h1>
        <h2 style={{ color: theme.text }}>Your cart is whispering...</h2>
        <p style={{ color: "#64748b" }}>Add some items to make it happy!</p>
        <Link to="/" style={{ color: theme.accent, textDecoration: "none", fontWeight: "bold" }}>Back to Store</Link>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* Left: Cart Items */}
      <div style={cartListStyle}>
        <h1 style={{ fontSize: "28px", fontWeight: "800", color: theme.text, marginBottom: "10px" }}>
          Shopping Bag <span style={{ color: theme.accent }}>({cartItems.length})</span>
        </h1>

        {cartItems.map((item) => (
          <div key={item._id} style={itemCardStyle}>
            <div style={{ background: "#f1f5f9", borderRadius: "15px", padding: "10px" }}>
              <img src={item.images?.[0]} width="90" height="90" style={{ objectFit: "contain" }} />
            </div>

            <div style={{ flex: "1" }}>
              <h3 style={{ margin: "0 0 5px 0", fontSize: "18px", color: theme.text }}>{item.name}</h3>
              <p style={{ margin: "0", fontSize: "14px", color: "#64748b" }}>Premium Quality</p>
              
              <div style={{ display: "flex", alignItems: "center", gap: "15px", marginTop: "15px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "#f8fafc", padding: "5px", borderRadius: "12px" }}>
                  <button style={qtyBtnStyle} onClick={() => dispatch(decreaseQty(item._id))}>-</button>
                  <span style={{ fontWeight: "bold", minWidth: "20px", textAlign: "center" }}>{item.qty}</span>
                  <button style={qtyBtnStyle} onClick={() => dispatch(increaseQty(item._id))}>+</button>
                </div>
                <button 
                  onClick={() => dispatch(removeFromCart(item._id))}
                  style={{ background: "none", border: "none", color: theme.danger, cursor: "pointer", fontSize: "13px", fontWeight: "600" }}
                >
                  Remove
                </button>
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <p style={{ margin: 0, fontSize: "18px", fontWeight: "700" }}>₹{(item.price * item.qty).toLocaleString('en-IN')}</p>
              <p style={{ margin: 0, fontSize: "12px", color: "#94a3b8" }}>₹{item.price}/ea</p>
            </div>
          </div>
        ))}
      </div>

      {/* Right: Checkout Sidebar */}
      <div style={summaryCardStyle}>
        <h2 style={{ fontSize: "20px", marginBottom: "25px" }}>Order Summary</h2>
        
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", color: "#64748b" }}>
          <span>Subtotal</span>
          <span>₹{totalPrice.toLocaleString('en-IN')}</span>
        </div>
        
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", color: "#64748b" }}>
          <span>Shipping</span>
          <span style={{ color: "#10b981", fontWeight: "bold" }}>FREE</span>
        </div>

        <div style={{ height: "1px", background: "#f1f5f9", margin: "20px 0" }}></div>

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px" }}>
          <span style={{ fontSize: "18px", fontWeight: "bold" }}>Total</span>
          <span style={{ fontSize: "24px", fontWeight: "800", color: theme.accent }}>₹{totalPrice.toLocaleString('en-IN')}</span>
        </div>

        <Link to="/checkout" style={{ textDecoration: "none" }}>
          <button style={{
            width: "100%",
            padding: "18px",
            background: `linear-gradient(135deg, ${theme.accent} 0%, #4f46e5 100%)`,
            color: "white",
            border: "none",
            borderRadius: "16px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 10px 20px rgba(99, 102, 241, 0.2)",
            transition: "transform 0.2s ease"
          }}
          onMouseEnter={(e) => e.target.style.transform = "translateY(-2px)"}
          onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
          >
            Go to Checkout
          </button>
        </Link>

        <p style={{ textAlign: "center", fontSize: "12px", color: "#94a3b8", marginTop: "15px" }}>
          🔒 Secure Checkout Guaranteed
        </p>
      </div>
    </div>
  );
};

export default Cart;