import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api from "../services/api";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.qty, 0);

  const placeOrder = async () => {
    if (cartItems.length === 0) return;
    setIsProcessing(true);
    try {
      const orderData = {
        products: cartItems.map((item) => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          qty: item.qty
        })),
        totalPrice
      };
      await api.post("/orders", orderData);
      alert("🚀 Order Placed Successfully!");
      localStorage.removeItem("cart");
      window.location.href = "/"; 
    } catch (error) {
      alert("❌ Something went wrong.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Ultra-Modern Theme
  const theme = {
    primary: "#6366f1", // Indigo
    background: "#f1f5f9",
    card: "rgba(255, 255, 255, 0.95)",
    textDark: "#0f172a",
    textLight: "#64748b"
  };

  const pageContainer = {
    background: theme.background,
    minHeight: "100vh",
    padding: isMobile ? "20px 10px" : "40px 20px",
    fontFamily: "'Inter', sans-serif"
  };

  const glassCard = {
    maxWidth: "900px",
    margin: "0 auto",
    backgroundColor: theme.card,
    borderRadius: "32px",
    padding: isMobile ? "25px" : "50px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.08)",
    backdropFilter: "blur(10px)",
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    gap: "40px"
  };

  const sectionTitle = {
    fontSize: "14px",
    fontWeight: "700",
    color: theme.primary,
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    marginBottom: "15px",
    display: "block"
  };

  return (
    <div style={pageContainer}>
      <div style={glassCard}>
        
        {/* Left Side: Info */}
        <div style={{ flex: "1.5" }}>
          <h1 style={{ fontSize: "32px", fontWeight: "800", marginBottom: "30px", color: theme.textDark }}>
            Secure Checkout
          </h1>

          <div style={{ marginBottom: "40px" }}>
            <span style={sectionTitle}>01. Shipping Details</span>
            <div style={{ padding: "20px", borderRadius: "20px", background: "#f8fafc", border: "1px solid #e2e8f0" }}>
              <p style={{ fontWeight: "700", margin: "0 0 5px 0" }}>John Doe</p>
              <p style={{ color: theme.textLight, fontSize: "14px", lineHeight: "1.5" }}>
                123, Tech Street, Pink City,<br />
                Jaipur, Rajasthan - 302001
              </p>
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <span style={sectionTitle}>02. Review Items</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              {cartItems.map((item) => (
                <div key={item._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p style={{ margin: 0, fontWeight: "600", fontSize: "15px" }}>{item.name}</p>
                    <p style={{ margin: 0, fontSize: "12px", color: theme.textLight }}>Quantity: {item.qty}</p>
                  </div>
                  <p style={{ fontWeight: "700" }}>₹{(item.price * item.qty).toLocaleString('en-IN')}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Payment Summary */}
        <div style={{ 
          flex: "1", 
          background: theme.textDark, 
          borderRadius: "24px", 
          padding: "30px", 
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}>
          <div>
            <h3 style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", marginBottom: "20px" }}>PAYMENT SUMMARY</h3>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
              <span style={{ opacity: 0.8 }}>Subtotal</span>
              <span>₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
              <span style={{ opacity: 0.8 }}>Shipping</span>
              <span style={{ color: "#4ade80" }}>FREE</span>
            </div>
            <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", margin: "20px 0" }}></div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontSize: "18px" }}>Total</span>
              <span style={{ fontSize: "28px", fontWeight: "800" }}>₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <button 
            disabled={isProcessing || cartItems.length === 0} 
            onClick={placeOrder} 
            style={{
              width: "100%",
              padding: "18px",
              backgroundColor: isProcessing ? "#444" : theme.primary,
              color: "#fff",
              border: "none",
              borderRadius: "16px",
              fontSize: "16px",
              fontWeight: "700",
              cursor: isProcessing ? "not-allowed" : "pointer",
              marginTop: "40px",
              boxShadow: isProcessing ? "none" : "0 10px 20px rgba(99, 102, 241, 0.3)",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => !isProcessing && (e.target.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => !isProcessing && (e.target.style.transform = "scale(1)")}
          >
            {isProcessing ? "SECURELY PROCESSING..." : "PAY & CONFIRM"}
          </button>
        </div>

      </div>
      <p style={{ textAlign: "center", marginTop: "20px", color: theme.textLight, fontSize: "13px" }}>
        🔒 Your payment information is encrypted and secure.
      </p>
    </div>
  );
};

export default Checkout;