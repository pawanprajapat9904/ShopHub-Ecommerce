import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const theme = {
    cardBg: "rgba(15, 23, 42, 0.4)", // Darker glass
    accent: "#6366f1", // Indigo
    accentGlow: "rgba(99, 102, 241, 0.3)",
    textMain: "#f8fafc",
    textMuted: "#94a3b8",
    border: "rgba(255, 255, 255, 0.08)"
  };

  const cardStyle = {
    width: "100%",
    padding: "16px",
    background: theme.cardBg,
    border: `1px solid ${theme.border}`,
    borderRadius: "28px",
    fontFamily: "'Inter', sans-serif",
    display: "flex",
    flexDirection: "column",
    transition: "all 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
    cursor: "pointer",
    textDecoration: "none",
    color: theme.textMain,
    backdropFilter: "blur(12px)",
    position: "relative",
    overflow: "hidden",
  };

  const imgContainer = {
    height: "220px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "15px",
    background: "rgba(0,0,0,0.2)",
    borderRadius: "20px",
    padding: "20px",
    position: "relative",
    overflow: "hidden"
  };

  // Quick Action Button Style
  const quickAddBtn = {
    position: "absolute",
    bottom: "10px",
    left: "50%",
    transform: "translateX(-50%) translateY(50px)",
    background: theme.accent,
    color: "#fff",
    border: "none",
    padding: "8px 20px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "bold",
    transition: "0.4s",
    opacity: 0,
    boxShadow: `0 10px 20px ${theme.accentGlow}`
  };

  const handleAddToCart = (e) => {
    e.preventDefault(); // Link navigation ko rokne ke liye
    dispatch(addToCart(product));
    // Yahan ek toast notification trigger kar sakte hain
  };

  return (
    <Link 
      to={`/product/${product._id}`} 
      style={cardStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-12px) scale(1.02)";
        e.currentTarget.style.borderColor = theme.accent;
        e.currentTarget.style.boxShadow = `0 30px 60px rgba(0,0,0,0.5), 0 0 20px ${theme.accentGlow}`;
        e.currentTarget.querySelector('.quick-add').style.transform = "translateX(-50%) translateY(0)";
        e.currentTarget.querySelector('.quick-add').style.opacity = "1";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.borderColor = theme.border;
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.querySelector('.quick-add').style.transform = "translateX(-50%) translateY(50px)";
        e.currentTarget.querySelector('.quick-add').style.opacity = "0";
      }}
    >
      {/* 1. Futuristic Label */}
      <div style={{
        position: "absolute", top: "15px", left: "15px", 
        fontSize: "10px", fontWeight: "800", color: theme.accent,
        letterSpacing: "1px", textTransform: "uppercase", zIndex: 2
      }}>
        Unit_{product._id?.slice(-4)}
      </div>

      {/* 2. Image Showcase with Hover Action */}
      <div style={imgContainer}>
        <img
          src={product.images?.[0]}
          alt={product.name}
          style={{ 
            maxHeight: "100%", maxWidth: "100%", objectFit: "contain",
            filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.4))"
          }}
        />
        {/* Hover hone par ye dikhega */}
        <button className="quick-add" style={quickAddBtn} onClick={handleAddToCart}>
          + QUICK ADD
        </button>
      </div>

      {/* 3. Data Section */}
      <div style={{ padding: "5px" }}>
        <h3 style={{ 
          fontSize: "17px", fontWeight: "700", margin: "0 0 8px 0",
          color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" 
        }}>
          {product.name}
        </h3>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "22px", fontWeight: "900", color: "#fff" }}>
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span style={{ fontSize: "11px", color: theme.textMuted, textDecoration: "line-through" }}>
              ₹{Math.round(product.price * 1.4).toLocaleString('en-IN')}
            </span>
          </div>
          
          <div style={{ textAlign: "right" }}>
            <div style={{ 
              background: "rgba(16, 185, 129, 0.1)", color: "#10b981", 
              padding: "4px 8px", borderRadius: "8px", fontSize: "12px", fontWeight: "bold" 
            }}>
              4.4 ★
            </div>
            <span style={{ color: "#10b981", fontSize: "11px", fontWeight: "bold", display: "block", marginTop: "4px" }}>
              -30% OFF
            </span>
          </div>
        </div>
      </div>

      {/* Futuristic Bottom Line */}
      <div style={{ 
        position: "absolute", bottom: 0, left: 0, width: "100%", height: "2px", 
        background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)`,
        opacity: 0.5
      }} />
    </Link>
  );
};

export default ProductCard;