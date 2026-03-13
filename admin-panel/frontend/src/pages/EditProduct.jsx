import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await api.get("/products");
      const product = res.data.find((p) => p._id === id);
      if (product) {
        setFormData(product);
      }
    } catch (error) {
      console.log("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await api.put(`/products/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("✅ Product Updated Successfully");
      navigate("/products");
    } catch (error) {
      console.log(error);
      alert("Failed to update product");
    }
  };

  const theme = {
    bg: "#05070a",
    card: "#0f172a",
    accent: "#6366f1",
    border: "rgba(255, 255, 255, 0.05)",
    inputBg: "rgba(255, 255, 255, 0.03)"
  };

  return (
    <div style={{ display: "flex", background: theme.bg, minHeight: "100vh", color: "#fff" }}>
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Header />

        <div style={{ padding: "clamp(20px, 5%, 40px)", width: "100%", boxSizing: "border-box" }}>
          
          {/* Page Heading */}
          <div style={{ marginBottom: "30px" }}>
            <h2 style={{ fontSize: "28px", fontWeight: "900", margin: 0 }}>
              EDIT <span style={{ color: theme.accent }}>PRODUCT</span>
            </h2>
            <p style={{ opacity: 0.5, fontSize: "14px", marginTop: "5px" }}>
              Modify unit details for ID: <span style={{ fontFamily: "monospace" }}>{id.slice(-8)}</span>
            </p>
          </div>

          {loading ? (
            <div style={{ color: theme.accent, fontWeight: "bold" }}>SYNCING DATA...</div>
          ) : (
            <form onSubmit={handleSubmit} style={{
              background: theme.card,
              padding: "30px",
              borderRadius: "24px",
              border: `1px solid ${theme.border}`,
              maxWidth: "800px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "25px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.3)"
            }}>
              
              {/* Name Field */}
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>PRODUCT IDENTITY</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Product Name"
                  style={inputStyle(theme)}
                  required
                />
              </div>

              {/* Price Field */}
              <div>
                <label style={labelStyle}>PRICE (INR)</label>
                <input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  style={inputStyle(theme)}
                  required
                />
              </div>

              {/* Category Field */}
              <div>
                <label style={labelStyle}>SECTOR / CATEGORY</label>
                <input
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Category"
                  style={inputStyle(theme)}
                  required
                />
              </div>

              {/* Stock Field */}
              <div>
                <label style={labelStyle}>STOCK UNITS</label>
                <input
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="0"
                  style={inputStyle(theme)}
                  required
                />
              </div>

              {/* Action Button */}
              <div style={{ gridColumn: "1 / -1", marginTop: "10px" }}>
                <button type="submit" style={{
                  width: "100%",
                  padding: "16px",
                  borderRadius: "12px",
                  border: "none",
                  background: theme.accent,
                  color: "#fff",
                  fontWeight: "900",
                  fontSize: "15px",
                  cursor: "pointer",
                  boxShadow: `0 10px 20px ${theme.accent}33`,
                  transition: "0.3s"
                }}>
                  COMMIT CHANGES
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// Internal Styling Objects
const labelStyle = {
  display: "block",
  fontSize: "11px",
  fontWeight: "800",
  opacity: 0.4,
  marginBottom: "10px",
  letterSpacing: "1.5px"
};

const inputStyle = (theme) => ({
  width: "100%",
  padding: "14px 18px",
  background: theme.inputBg,
  border: `1px solid ${theme.border}`,
  borderRadius: "12px",
  color: "#fff",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
  transition: "0.3s focus",
});

export default EditProduct;