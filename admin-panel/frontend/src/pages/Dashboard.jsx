import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalSales: 0,
    activeOrders: 0,
    totalUsers: 0,
    growth: 0
  });
  const navigate = useNavigate();

  // 🛡️ AUTH & DATA FETCH
  const fetchDashboardData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const isAdmin = localStorage.getItem("isAdmin");

      if (!token || isAdmin !== "true") {
        navigate("/");
        return;
      }

      // API Call to get all orders
      const res = await api.get("/orders", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = Array.isArray(res.data) ? res.data : (res.data.orders || []);
      setOrders(data);

      // 🧮 LIVE CALCULATIONS
      const total = data.reduce((acc, curr) => acc + (curr.totalPrice || 0), 0);
      const active = data.filter(o => o.status === "Pending" || o.status === "Shipped").length;
      
      setStats({
        totalSales: total,
        activeOrders: active,
        totalUsers: 0, // Iske liye alag /users API lagegi agar chahiye toh
        totalOrders: data.length
      });

    } catch (error) {
      console.error("Dashboard Sync Error:", error);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const theme = {
    bg: "#05070a",
    card: "#0f172a",
    accent: "#6366f1",
    border: "rgba(255, 255, 255, 0.05)",
    success: "#10b981"
  };

  return (
    <div style={{ display: "flex", backgroundColor: theme.bg, minHeight: "100vh", color: "#fff", width: "100%" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Header />
        
        <main style={{ padding: "clamp(20px, 5%, 40px)", boxSizing: "border-box" }}>
          <div style={{ marginBottom: "40px", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: "32px", fontWeight: "900", margin: 0 }}>
                SYSTEM <span style={{ color: theme.accent }}>LIVE</span>
              </h1>
              <p style={{ opacity: 0.5, fontSize: "14px" }}>Monitoring real-time database transactions.</p>
            </div>
            <button onClick={fetchDashboardData} style={refreshBtn}>SYNC DATABASE</button>
          </div>

          {loading ? (
            <div style={{ color: theme.accent, textAlign: "center", padding: "50px" }}>SYNCING WITH MONGODB...</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
              
              {/* STAT CARDS */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "25px" }}>
                <StatCard title="TOTAL REVENUE" value={`₹${stats.totalSales.toLocaleString()}`} icon="💰" trend="LIVE FROM DB" theme={theme} />
                <StatCard title="ACTIVE ORDERS" value={stats.activeOrders} icon="📦" trend="PENDING/SHIPPED" theme={theme} />
                <StatCard title="TOTAL LOGS" value={stats.totalOrders} icon="📑" trend="ALL TRANSACTIONS" theme={theme} />
                <StatCard title="UPLINK STATUS" value="STABLE" icon="📡" trend="LATENCY: 24ms" theme={theme} />
              </div>

              {/* LIVE REVENUE VISUALIZER */}
              <div style={chartContainer(theme)}>
                <div style={{ padding: "20px", borderBottom: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: "12px", fontWeight: "bold", opacity: 0.6 }}>REVENUE FLOW ANALYTICS</span>
                    <span style={{ fontSize: "12px", color: theme.success }}>● LIVE</span>
                </div>
                
                <div style={{ height: "250px", display: "flex", alignItems: "flex-end", justifyContent: "space-around", padding: "20px" }}>
                  {/* Dynamic Bars based on real order values */}
                  {orders.slice(0, 10).map((order, i) => (
                    <div key={i} style={{ textAlign: 'center', width: '30px' }}>
                      <div style={{ 
                        height: `${Math.min((order.totalPrice / stats.totalSales) * 1000, 180)}px`, 
                        minHeight: '10px',
                        background: `linear-gradient(to top, ${theme.accent}, #8b5cf6)`,
                        borderRadius: "6px 6px 0 0",
                        transition: "0.5s ease",
                        boxShadow: `0 0 15px ${theme.accent}33`
                      }} />
                      <div style={{ fontSize: '8px', marginTop: '8px', opacity: 0.4 }}>{order._id.slice(-4)}</div>
                    </div>
                  ))}
                  {orders.length === 0 && <p style={{ opacity: 0.2 }}>No transaction data to visualize</p>}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

// --- Helper Components & Styles ---

const StatCard = ({ title, value, icon, trend, theme }) => (
  <div style={{ background: theme.card, padding: "25px", borderRadius: "20px", border: `1px solid ${theme.border}` }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
      <span style={{ fontSize: "11px", fontWeight: "800", opacity: 0.4, letterSpacing: "1px" }}>{title}</span>
      <span>{icon}</span>
    </div>
    <div style={{ fontSize: "26px", fontWeight: "900", marginBottom: "5px" }}>{value}</div>
    <div style={{ fontSize: "10px", color: theme.success, fontWeight: "bold" }}>{trend}</div>
  </div>
);

const chartContainer = (theme) => ({
  background: theme.card,
  borderRadius: "24px",
  border: `1px solid ${theme.border}`,
  overflow: "hidden",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
});

const refreshBtn = {
  background: "rgba(99, 102, 241, 0.1)",
  border: "1px solid rgba(99, 102, 241, 0.2)",
  color: "#6366f1",
  padding: "8px 16px",
  borderRadius: "8px",
  fontSize: "12px",
  fontWeight: "bold",
  cursor: "pointer"
};

export default Dashboard;