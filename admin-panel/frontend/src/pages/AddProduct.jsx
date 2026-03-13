import { useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: ""
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false); // Technical add: prevent double clicks

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      images.forEach((img) => data.append("images", img));

      const token = localStorage.getItem("token");
      await api.post("/products", data, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("🚀 Product Synchronized Successfully!");
      // Optional: Form reset
      setFormData({ name: "", description: "", price: "", category: "", stock: "" });
    } catch (error) {
      console.log(error);
      alert("Error: Database connection failed");
    } finally {
      setLoading(false);
    }
  };

  const theme = {
    bg: "#05070a",
    card: "#0f172a",
    accent: "#6366f1",
    border: "rgba(255, 255, 255, 0.05)"
  };

  return (
    <div style={{ display: "flex", backgroundColor: theme.bg, minHeight: "100vh", color: "#fff" }}>
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Header />

        <div style={{ padding: "clamp(20px, 5%, 40px)", width: "100%", boxSizing: "border-box" }}>
          
          <div style={{ marginBottom: "30px" }}>
            <h1 style={{ fontSize: "28px", fontWeight: "900", margin: 0 }}>
              REGISTER <span style={{ color: theme.accent }}>PRODUCT</span>
            </h1>
            <p style={{ opacity: 0.5, fontSize: "14px" }}>Add new assets to the global inventory database.</p>
          </div>

          <form onSubmit={handleSubmit} style={{
            background: theme.card,
            padding: "30px",
            borderRadius: "24px",
            border: `1px solid ${theme.border}`,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "30px",
            maxWidth: "1000px"
          }}>
            
            {/* Section 1: Details */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div className="input-field">
                <label style={labelStyle}>PRODUCT NAME</label>
                <input name="name" placeholder="e.g. RTX 5090 Super" value={formData.name} onChange={handleChange} style={inputStyle(theme)} required />
              </div>

              <div className="input-field">
                <label style={labelStyle}>SPECIFICATIONS / DESCRIPTION</label>
                <textarea name="description" placeholder="Enter tech specs..." value={formData.description} onChange={handleChange} style={{ ...inputStyle(theme), height: "120px", resize: "none" }} required />
              </div>
            </div>

            {/* Section 2: Numbers & Media */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ display: "flex", gap: "15px" }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>PRICE (₹)</label>
                  <input name="price" type="number" placeholder="0" value={formData.price} onChange={handleChange} style={inputStyle(theme)} required />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>STOCK</label>
                  <input name="stock" type="number" placeholder="0" value={formData.stock} onChange={handleChange} style={inputStyle(theme)} required />
                </div>
              </div>

              <div className="input-field">
                <label style={labelStyle}>SECTOR / CATEGORY</label>
                <input name="category" placeholder="Electronics, Fashion..." value={formData.category} onChange={handleChange} style={inputStyle(theme)} required />
              </div>

              <div className="input-field">
                <label style={labelStyle}>MEDIA ASSETS</label>
                <div style={{
                  border: `2px dashed ${theme.border}`,
                  padding: "20px",
                  borderRadius: "12px",
                  textAlign: "center",
                  cursor: "pointer",
                  position: "relative",
                  background: "rgba(255,255,255,0.02)"
                }}>
                  <input type="file" multiple onChange={handleImageChange} style={{ opacity: 0, position: "absolute", inset: 0, cursor: "pointer" }} />
                  <span style={{ fontSize: "13px", opacity: 0.5 }}>
                    {images.length > 0 ? `✅ ${images.length} Files Selected` : "Select Product Images"}
                  </span>
                </div>
              </div>

              <button type="submit" disabled={loading} style={{
                marginTop: "10px",
                background: theme.accent,
                color: "#fff",
                border: "none",
                padding: "15px",
                borderRadius: "12px",
                fontWeight: "bold",
                fontSize: "15px",
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: `0 10px 20px ${theme.accent}33`,
                transition: "0.3s"
              }}>
                {loading ? "PROCESSING..." : "DEPLOY PRODUCT"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Internal styles for clean look
const labelStyle = { display: "block", fontSize: "11px", fontWeight: "800", opacity: 0.4, marginBottom: "8px", letterSpacing: "1px" };
const inputStyle = (theme) => ({
  width: "100%", padding: "12px 15px", background: "rgba(255,255,255,0.03)", border: `1px solid ${theme.border}`,
  borderRadius: "10px", color: "#fff", fontSize: "14px", outline: "none", boxSizing: "border-box"
});

export default AddProduct;