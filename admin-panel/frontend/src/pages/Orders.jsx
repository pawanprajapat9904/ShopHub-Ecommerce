import { useEffect, useState, useCallback } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🛡️ Enhanced Fetch with Auto-Detection
  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await api.get("/orders", {
        headers: { Authorization: `Bearer ${token}` }
      });

      // --- 🔍 DEEP DEBUGGER START ---
      console.log("📡 Full API Object:", res);
      console.log("📦 Raw Data from DB:", res.data);
      // --- 🔍 DEEP DEBUGGER END ---

      // Technical Fix: Multiple formats ko handle karne ke liye logic
      let normalizedData = [];
      if (Array.isArray(res.data)) {
        normalizedData = res.data;
      } else if (res.data && res.data.orders && Array.isArray(res.data.orders)) {
        normalizedData = res.data.orders;
      } else if (res.data && res.data.data && Array.isArray(res.data.data)) {
        normalizedData = res.data.data;
      }

      console.log("✅ Processed Orders for State:", normalizedData);
      setOrders(normalizedData);

    } catch (error) {
      console.error("❌ Critical Fetch Error:", error);
      if (error.response?.status === 401) {
        alert("Session Expired. Logging out...");
        localStorage.clear();
        window.location.href = "/";
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await api.put(`/orders/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    //  // alert(`Unit ${id.slice(-5)} status: ${status}`);
      fetchOrders();
    } catch (error) {
      console.error(error);
      alert("Update failed. Check connection.");
    }
  };

  const theme = {
    bg: "#05070a",
    card: "#0f172a",
    accent: "#6366f1",
    border: "rgba(255, 255, 255, 0.05)",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444"
  };

  const getStatusStyle = (status) => {
    const s = status?.toLowerCase();
    if (s === "delivered") return { color: theme.success, bg: "rgba(16, 185, 129, 0.1)" };
    if (s === "shipped") return { color: theme.accent, bg: "rgba(99, 102, 241, 0.1)" };
    if (s === "cancelled") return { color: theme.danger, bg: "rgba(239, 68, 68, 0.1)" };
    return { color: theme.warning, bg: "rgba(245, 158, 11, 0.1)" };
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
                ORDER <span style={{ color: theme.accent }}>LOGS</span>
              </h1>
              <p style={{ opacity: 0.5, fontSize: "14px" }}>Active system transactions in database.</p>
            </div>
            <button onClick={fetchOrders} style={refreshBtn}>FORCE SYNC</button>
          </div>

          {loading ? (
            <div style={{ color: theme.accent, textAlign: "center", padding: "50px" }}>ESTABLISHING SECURE LINK...</div>
          ) : (
            <div style={{
              background: theme.card,
              borderRadius: "24px",
              border: `1px solid ${theme.border}`,
              overflow: "hidden",
              boxShadow: "0 20px 50px rgba(0,0,0,0.2)"
            }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${theme.border}`, background: "rgba(255,255,255,0.02)" }}>
                      <th style={thStyle}>ORDER ID</th>
                      <th style={thStyle}>REVENUE</th>
                      <th style={thStyle}>STATUS</th>
                      <th style={thStyle}>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length > 0 ? (
                      orders.map((o) => (
                        <tr key={o._id} style={{ borderBottom: `1px solid ${theme.border}` }} className="table-row">
                          <td style={tdStyle}>
                            <span style={{ fontSize: "11px", opacity: 0.6, fontFamily: "monospace" }}>
                                #{o._id?.slice(-8).toUpperCase() || "N/A"}
                            </span>
                          </td>
                          <td style={{ ...tdStyle, fontWeight: "bold", color: theme.success }}>
                            ₹{o.totalPrice?.toLocaleString() || "0"}
                          </td>
                          <td style={tdStyle}>
                            <span style={{
                              padding: "4px 12px",
                              borderRadius: "20px",
                              fontSize: "11px",
                              fontWeight: "bold",
                              ...getStatusStyle(o.status)
                            }}>
                              {o.status?.toUpperCase() || "UNKNOWN"}
                            </span>
                          </td>
                          <td style={tdStyle}>
                            <select
                              value={o.status}
                              onChange={(e) => updateStatus(o._id, e.target.value)}
                              style={selectStyle(theme)}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" style={{ padding: "80px", textAlign: "center" }}>
                          <p style={{ opacity: 0.3, margin: 0 }}>NO RECORDS FOUND IN MONGODB</p>
                          <p style={{ fontSize: "12px", color: theme.accent, marginTop: "10px" }}>Check Compass Collection Name</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`.table-row:hover { background: rgba(255,255,255,0.01); transition: 0.2s; }`}</style>
    </div>
  );
};

const thStyle = { padding: "20px", fontSize: "11px", fontWeight: "800", opacity: 0.4, letterSpacing: "1px" };
const tdStyle = { padding: "20px", fontSize: "14px" };
const refreshBtn = { background: theme => theme?.accent || "#6366f1", color: "#fff", border: "none", padding: "8px 15px", borderRadius: "8px", cursor: "pointer", fontSize: "11px", fontWeight: "bold" };
const selectStyle = (theme) => ({ background: "#1e293b", color: "#fff", border: `1px solid ${theme.border}`, padding: "6px", borderRadius: "6px", cursor: "pointer", outline: "none", fontSize: "12px" });

export default Orders;