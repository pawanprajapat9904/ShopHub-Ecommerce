import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
      alert("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this unit?")) return;
    
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("✅ Unit Decommissioned");
      fetchProducts();
    } catch (error) {
      console.log(error);
      alert("Error deleting product");
    }
  };

  const theme = {
    bg: "#05070a",
    card: "#0f172a",
    accent: "#6366f1",
    border: "rgba(255, 255, 255, 0.05)",
    danger: "#ef4444"
  };

  return (
    <div style={{ display: "flex", backgroundColor: theme.bg, minHeight: "100vh", color: "#fff" }}>
      <Sidebar />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Header />

        <div style={{ padding: "clamp(20px, 5%, 40px)", width: "100%", boxSizing: "border-box" }}>
          
          <div style={{ marginBottom: "30px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h1 style={{ fontSize: "28px", fontWeight: "900", margin: 0 }}>
                INVENTORY <span style={{ color: theme.accent }}>SYSTEM</span>
              </h1>
              <p style={{ opacity: 0.5, fontSize: "14px" }}>Manage and monitor all deployed units.</p>
            </div>
            <button 
              onClick={() => navigate("/add-product")}
              style={{
                background: theme.accent, color: "#fff", border: "none", 
                padding: "10px 20px", borderRadius: "10px", fontWeight: "bold", 
                cursor: "pointer", fontSize: "13px"
              }}
            >
              + NEW UNIT
            </button>
          </div>

          {loading ? (
            <div style={{ color: theme.accent }}>SCANNING DATABASE...</div>
          ) : (
            <div style={{
              background: theme.card,
              borderRadius: "24px",
              border: `1px solid ${theme.border}`,
              overflow: "hidden"
            }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${theme.border}`, background: "rgba(255,255,255,0.02)" }}>
                      <th style={thStyle}>UNIT IMAGE</th>
                      <th style={thStyle}>PRODUCT NAME</th>
                      <th style={thStyle}>VALUE (₹)</th>
                      <th style={thStyle}>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p._id} style={{ borderBottom: `1px solid ${theme.border}` }} className="row-hover">
                        <td style={tdStyle}>
                          <div style={{ 
                            width: "50px", height: "50px", borderRadius: "12px", 
                            overflow: "hidden", background: "#1e293b", border: `1px solid ${theme.border}`
                          }}>
                            {p.images?.[0] ? (
                              <img src={p.images[0]} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt={p.name} />
                            ) : (
                              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: "10px", opacity: 0.3 }}>N/A</div>
                            )}
                          </div>
                        </td>
                        <td style={{ ...tdStyle, fontWeight: "600" }}>{p.name}</td>
                        <td style={{ ...tdStyle, color: "#10b981", fontWeight: "bold" }}>₹{p.price.toLocaleString()}</td>
                        <td style={tdStyle}>
                          <div style={{ display: "flex", gap: "10px" }}>
                            <button 
                              onClick={() => navigate(`/edit-product/${p._id}`)}
                              style={{ 
                                background: "rgba(99, 102, 241, 0.1)", color: theme.accent, 
                                border: `1px solid ${theme.accent}44`, padding: "6px 12px", 
                                borderRadius: "8px", cursor: "pointer", fontSize: "12px", fontWeight: "bold"
                              }}
                            >
                              EDIT
                            </button>
                            <button 
                              onClick={() => deleteProduct(p._id)}
                              style={{ 
                                background: "rgba(239, 68, 68, 0.1)", color: theme.danger, 
                                border: `1px solid ${theme.danger}44`, padding: "6px 12px", 
                                borderRadius: "8px", cursor: "pointer", fontSize: "12px", fontWeight: "bold"
                              }}
                            >
                              DELETE
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`.row-hover:hover { background: rgba(255,255,255,0.01); }`}</style>
    </div>
  );
};

const thStyle = { padding: "18px 20px", fontSize: "11px", fontWeight: "800", opacity: 0.4, letterSpacing: "1px" };
const tdStyle = { padding: "15px 20px", fontSize: "14px" };

export default Products;