import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Register from "./pages/Register";
import Login from "./pages/Login";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Layout Component: Jo Header/Footer ki visibility aur props handle karega
const Layout = ({ children, searchQuery, onSearch }) => {
  const location = useLocation();
  
  // Login aur Register pages par Header/Footer nahi dikhana hai
  const excludePaths = ["/login", "/register"];
  const shouldExclude = excludePaths.includes(location.pathname.toLowerCase());

  return (
    <>
      {/* Header ko onSearch function pass kiya */}
      {!shouldExclude && (
        <Header onSearch={onSearch} />
      )}
      
      {/* ScrollToTop har page change par screen upar le jayega */}
      <ScrollToTop />

      <main style={{ 
        minHeight: "85vh", 
        backgroundColor: "#05070a" // Consistency for dark theme
      }}>
        {children}
      </main>

      {!shouldExclude && <Footer />}
    </>
  );
};

function App() {
  // Global State for Search - Yeh Header aur Home ko connect karti hai
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <BrowserRouter>
      {/* Layout component wrap karta hai poore app ko */}
      <Layout onSearch={(val) => setSearchQuery(val)}>
        <Routes>
          {/* Home Page: Isme SearchQuery as a Prop ja rahi hai */}
          <Route path="/" element={<Home searchQuery={searchQuery} />} />
          
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
          {/* 404 - Futuristic Error Page */}
          <Route path="*" element={
            <div style={{
              textAlign: 'center', 
              padding: '150px 20px', 
              color: '#fff', 
              background: '#05070a'
            }}>
              <h1 style={{ fontSize: '80px', fontWeight: '900', color: '#6366f1' }}>404</h1>
              <h2 style={{ opacity: 0.6 }}>SYSTEM ERROR: PAGE NOT FOUND</h2>
              <button 
                onClick={() => window.location.href = "/"}
                style={{
                  marginTop: '30px', padding: '12px 30px', borderRadius: '12px',
                  background: '#6366f1', color: '#fff', border: 'none', cursor: 'pointer'
                }}
              >
                RETURN TO BASE
              </button>
            </div>
          } />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;