import React, { useState, useEffect } from 'react';

const Slider = () => {
  const [current, setCurrent] = useState(0);

  const slides = [
    {
      title: "QUANTUM TECH",
      subtitle: "2026 EDITION",
      desc: "Experience the next evolution of neural processing units.",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
      color: "#6366f1"
    },
    {
      title: "CYBER WEAR",
      subtitle: "STYLE PROTOCOL",
      desc: "Smart fabrics designed for the urban navigator.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
      color: "#a855f7"
    },
    {
      title: "ZERO LATENCY",
      subtitle: "PRO GAMING",
      desc: "Break the speed of sound with ultra-responsive gear.",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2040&auto=format&fit=crop",
      color: "#f43f5e"
    }
  ];

  // Auto-play logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Styles
  const containerStyle = {
    position: "relative",
    width: "100%",
    height: "500px",
    overflow: "hidden",
    background: "#05070a",
  };

  const slideStyle = (index) => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: current === index ? 1 : 0,
    transition: "all 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `linear-gradient(rgba(5, 7, 10, 0.7), rgba(5, 7, 10, 0.3)), url(${slides[index].image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    transform: current === index ? "scale(1)" : "scale(1.1)",
  });

  const contentStyle = {
    textAlign: "center",
    color: "#fff",
    zIndex: 10,
    padding: "0 20px",
    transform: current ? "translateY(0)" : "translateY(20px)",
    transition: "0.8s ease-out",
  };

  const badgeStyle = {
    background: slides[current].color,
    padding: "5px 15px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "2px",
    marginBottom: "20px",
    display: "inline-block",
    boxShadow: `0 0 20px ${slides[current].color}66`,
  };

  return (
    <div style={containerStyle}>
      {slides.map((slide, index) => (
        <div key={index} style={slideStyle(index)}>
          {current === index && (
            <div style={contentStyle}>
              <span style={badgeStyle}>{slide.subtitle}</span>
              <h1 style={{ fontSize: "64px", fontWeight: "900", margin: "10px 0", letterSpacing: "-3px" }}>
                {slide.title}
              </h1>
              <p style={{ fontSize: "18px", opacity: 0.8, maxWidth: "600px", margin: "0 auto 30px" }}>
                {slide.desc}
              </p>
              <button style={{
                padding: "15px 40px",
                borderRadius: "12px",
                border: "none",
                background: "#fff",
                color: "#000",
                fontWeight: "800",
                cursor: "pointer",
                transition: "0.3s"
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              >
                INITIALIZE SHOP
              </button>
            </div>
          )}
        </div>
      ))}

      {/* Navigation Indicators */}
      <div style={{
        position: "absolute",
        bottom: "30px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: "12px",
        zIndex: 20
      }}>
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            style={{
              width: current === index ? "40px" : "12px",
              height: "6px",
              borderRadius: "10px",
              background: current === index ? slides[current].color : "rgba(255,255,255,0.2)",
              cursor: "pointer",
              transition: "all 0.4s ease"
            }}
          />
        ))}
      </div>

      {/* Side Glass Accents */}
      <div style={{ position: "absolute", left: 0, top: 0, width: "100px", height: "100%", background: "linear-gradient(to right, #05070a, transparent)", zIndex: 5 }}></div>
      <div style={{ position: "absolute", right: 0, top: 0, width: "100px", height: "100%", background: "linear-gradient(to left, #05070a, transparent)", zIndex: 5 }}></div>
    </div>
  );
};

export default Slider;