import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import Slider from "../components/Slider";

const Home = ({ searchQuery }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCat, setActiveCat] = useState("All");

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = allProducts;
    if (activeCat !== "All") result = result.filter(p => p.category?.toLowerCase() === activeCat.toLowerCase());
    if (searchQuery) result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    setProducts(result);
  }, [searchQuery, activeCat, allProducts]);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setAllProducts(res.data);
      setProducts(res.data);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const theme = { bg: "#05070a", border: "rgba(255, 255, 255, 0.05)", accent: "#6366f1" };

  // Helper function for Horizontal Scroll Rows
  const renderRow = (title, items) => (
    <div style={{ padding: "40px 0", borderBottom: `1px solid ${theme.border}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "0 5%", marginBottom: "20px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "800" }}>{title} <span style={{ color: theme.accent }}>//</span></h2>
        <span style={{ color: theme.accent, cursor: "pointer", fontWeight: "bold", fontSize: "14px" }}>VIEW ALL →</span>
      </div>
      <div className="custom-scroll" style={{ display: "flex", gap: "20px", overflowX: "auto", padding: "0 5% 20px 5%" }}>
        {items.map(p => (
          <div key={p._id} style={{ minWidth: "280px" }}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ backgroundColor: theme.bg, minHeight: "100vh", color: "#f8fafc" }}>
      
      {/* 1. TOP HERO SECTION */}
      {!searchQuery && <Slider />}

      {/* 2. CATEGORY BAR */}
      <div style={{ display: "flex", justifyContent: "center", gap: "40px", padding: "20px", background: "rgba(255,255,255,0.01)", position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(10px)" }}>
        {['All', 'Electronics', 'Fashion', 'Gaming', 'Home'].map(cat => (
          <span key={cat} onClick={() => setActiveCat(cat)} style={{ fontSize: "13px", fontWeight: "700", cursor: "pointer", opacity: activeCat === cat ? 1 : 0.4, color: activeCat === cat ? theme.accent : "#fff" }}>
            {cat.toUpperCase()}
          </span>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "100px" }}>📡 LOADING...</div>
      ) : (
        <div style={{ width: "100%" }}>
          
          {/* --- SEARCH RESULTS (Only shows when searching) --- */}
          {searchQuery && (
            <div style={{ padding: "40px 5%" }}>
              <h2>RESULTS FOR: <span style={{ color: theme.accent }}>{searchQuery.toUpperCase()}</span></h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "25px", marginTop: "30px" }}>
                {products.map(p => <ProductCard key={p._id} product={p} />)}
              </div>
            </div>
          )}

          {/* --- HOME FEED (Hidden when searching) --- */}
          {!searchQuery && (
            <>
              {/* Row 1: Trending Now */}
              {renderRow("Trending Now", allProducts.slice(0, 8))}

              {/* Mid-Page Banner (Amazon Style) */}
              <div style={{ 
                margin: "40px 5%", height: "200px", borderRadius: "20px", 
                background: "linear-gradient(90deg, #6366f1, #a855f7)", 
                display: "flex", alignItems: "center", padding: "0 50px" 
              }}>
                <div>
                  <h2 style={{ fontSize: "32px", margin: 0 }}>Mega Sale is LIVE!</h2>
                  <p style={{ opacity: 0.8 }}>Up to 80% off on your favorite tech gear.</p>
                </div>
              </div>

              {/* Row 2: Electronics Sector */}
              {renderRow("Electronics Hub", allProducts.filter(p => p.category === 'Electronics'))}

              {/* Grid Section: Best Sellers */}
              <div style={{ padding: "50px 5%", background: "rgba(255,255,255,0.01)" }}>
                <h2 style={{ marginBottom: "30px" }}>Best Sellers <span style={{ color: theme.accent }}>#1</span></h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "25px" }}>
                  {allProducts.slice().reverse().slice(0, 8).map(p => <ProductCard key={p._id} product={p} />)}
                </div>
              </div>

              {/* Row 3: New Arrivals */}
              {renderRow("New Arrivals", allProducts.slice(3, 11))}

              {/* Final Big Grid: Explore Everything */}
              <div style={{ padding: "50px 5%" }}>
                <h2 style={{ marginBottom: "30px" }}>More To Explore</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "25px" }}>
                  {allProducts.map(p => <ProductCard key={p._id} product={p} />)}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      <style>{`.custom-scroll::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
};

export default Home;