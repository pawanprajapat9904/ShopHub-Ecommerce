import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../services/api";
import { addToCart } from "../redux/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    
    const fetchProduct = async () => {
      try {
        const res = await api.get("/products");
        const found = res.data.find((p) => p._id === id);
        setProduct(found);
      } catch (err) { console.error(err); } finally { setLoading(false); }
    };
    fetchProduct();
    return () => window.removeEventListener("resize", handleResize);
  }, [id]);

  const theme = {
    bg: "#080a0f",
    glass: "rgba(255, 255, 255, 0.03)",
    accent: "#6366f1",
    accentGlow: "rgba(99, 102, 241, 0.3)",
    text: "#f8fafc",
    muted: "#94a3b8",
    border: "rgba(255, 255, 255, 0.08)"
  };

  if (loading) return <div style={{ textAlign: "center", padding: "100px", color: theme.accent, background: theme.bg, height: "100vh", fontFamily: "Inter" }}>📡 SYNCING NEURAL DATA...</div>;
  if (!product) return <div style={{ textAlign: "center", padding: "100px", color: "#fff", background: theme.bg, height: "100vh" }}>❌ DATA NODE MISSING</div>;

  return (
    <div style={{ background: theme.bg, minHeight: "100vh", color: theme.text, fontFamily: "'Inter', sans-serif", overflowX: "hidden" }}>
      
      <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", padding: isMobile ? "20px" : "80px 8%", gap: "60px", maxWidth: "1600px", margin: "0 auto" }}>
        
        {/* --- LEFT SIDE: GALLERY MODULE --- */}
        <div style={{ flex: "1.2", display: "flex", gap: "20px", flexDirection: isMobile ? "column-reverse" : "row" }}>
          
          {/* Vertical Thumbnails */}
          {!isMobile && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {product.images?.map((img, index) => (
                <div 
                  key={index}
                  onClick={() => setActiveImg(index)}
                  style={{
                    width: "70px", height: "70px", borderRadius: "16px", overflow: "hidden", cursor: "pointer",
                    border: `2px solid ${activeImg === index ? theme.accent : "transparent"}`,
                    transition: "all 0.3s ease", transform: activeImg === index ? "scale(1.05)" : "scale(1)",
                    background: theme.glass
                  }}
                >
                  <img src={img} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}
            </div>
          )}

          {/* Main Showcase Image */}
          <div style={{ flex: 1, position: "relative", cursor: "zoom-in" }} onClick={() => setShowModal(true)}>
            <div style={{ 
              background: theme.glass, borderRadius: "32px", padding: "40px", 
              border: `1px solid ${theme.border}`, backdropFilter: "blur(10px)",
              textAlign: "center", boxShadow: `0 20px 40px rgba(0,0,0,0.4)`
            }}>
              <img
                src={product.images?.[activeImg]}
                alt={product.name}
                style={{ width: "100%", maxHeight: "400px", objectFit: "contain", filter: `drop-shadow(0 0 20px ${theme.accentGlow})` }}
              />
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDE: INFORMATION MODULE --- */}
        <div style={{ flex: "1", display: "flex", flexDirection: "column", gap: "30px" }}>
          <div>
            <span style={{ color: theme.accent, fontWeight: "bold", letterSpacing: "2px", fontSize: "12px", textTransform: "uppercase" }}>
              Available in Inventory
            </span>
            <h1 style={{ fontSize: isMobile ? "32px" : "48px", fontWeight: "900", margin: "10px 0", letterSpacing: "-1px" }}>
              {product.name}
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <div style={{ background: "#10b981", color: "#fff", padding: "4px 10px", borderRadius: "8px", fontSize: "14px", fontWeight: "bold" }}>4.8 ★</div>
              <span style={{ color: theme.muted, fontSize: "14px" }}>2.4k Trust Verifications</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: "20px" }}>
            <span style={{ fontSize: "42px", fontWeight: "900", color: "#fff" }}>₹{product.price.toLocaleString('en-IN')}</span>
            <span style={{ color: theme.muted, textDecoration: "line-through", fontSize: "20px" }}>₹{Math.round(product.price * 1.4).toLocaleString('en-IN')}</span>
          </div>

          <div style={{ background: "rgba(255,255,255,0.02)", padding: "25px", borderRadius: "24px", border: `1px solid ${theme.border}` }}>
            <h3 style={{ fontSize: "14px", color: theme.accent, marginBottom: "10px", textTransform: "uppercase", letterSpacing: "1px" }}>Specifications</h3>
            <p style={{ lineHeight: "1.8", color: theme.muted, fontSize: "16px", margin: 0 }}>
              {product.description || "The core specifications for this unit are currently classified."}
            </p>
          </div>

          {/* Action Hub */}
          <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
            <button 
              onClick={() => dispatch(addToCart(product))}
              style={{ flex: 1, padding: "20px", borderRadius: "16px", border: `1px solid ${theme.border}`, background: "transparent", color: "#fff", cursor: "pointer", fontWeight: "800", transition: "0.3s" }}
              onMouseOver={(e) => e.target.style.background = "rgba(255,255,255,0.05)"}
              onMouseOut={(e) => e.target.style.background = "transparent"}
            >
              ADD TO UNIT
            </button>
            <button 
              onClick={() => { dispatch(addToCart(product)); navigate("/cart"); }}
              style={{ flex: 1.5, padding: "20px", borderRadius: "16px", border: "none", background: theme.accent, color: "#fff", cursor: "pointer", fontWeight: "800", boxShadow: `0 10px 30px ${theme.accentGlow}`, transition: "0.3s" }}
              onMouseOver={(e) => e.target.style.transform = "translateY(-5px)"}
              onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
            >
              EXECUTE PURCHASE
            </button>
          </div>
        </div>
      </div>

      {/* --- LIGHTBOX MODAL (Z-Index 2000) --- */}
      {showModal && (
        <div 
          onClick={() => setShowModal(false)}
          style={{
            position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
            background: "rgba(0,0,0,0.98)", zIndex: 2000, display: "flex",
            justifyContent: "center", alignItems: "center", cursor: "zoom-out",
            backdropFilter: "blur(20px)"
          }}
        >
          <img 
            src={product.images?.[activeImg]} 
            style={{ maxWidth: "90%", maxHeight: "85%", objectFit: "contain", borderRadius: "20px" }} 
          />
          <div style={{ position: "absolute", top: "40px", right: "40px", color: "#fff", fontSize: "30px", fontWeight: "100" }}>CLOSE [×]</div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;