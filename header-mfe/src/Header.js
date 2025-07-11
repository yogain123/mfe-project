import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./styles.css";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (window.mfeEventBus) {
      // Get initial context
      const context = window.mfeGlobalContext;
      if (context) {
        setUser(context.user);
      }

      // Listen for user updates
      window.mfeEventBus.on("user:updated", setUser);
    }
  }, []);

  const navigationItems = [
    {
      path: "/products",
      label: "📦 Products",
      description: "Product Management MFE",
    },
    {
      path: "/orders",
      label: "📋 Orders",
      description: "Order Management MFE",
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <header className="mfe-header">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <button
          onClick={() => {
            window.mfeEventBus.emit(
              "update-title",
              "Title Changed via event bus"
            );
          }}
        >
          click me to update Product title
        </button>
      </div>
      <div className="header-container">
        {/* Logo/Brand */}
        <div className="header-brand">
          <h1 className="brand-title">🏗️ MFE Architecture</h1>
          <span className="brand-subtitle">Learning Project</span>
        </div>

        {/* Navigation */}
        <nav className="header-nav">
          <div className="nav-desktop">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`nav-item ${
                  isActive(item.path) ? "nav-item-active" : ""
                }`}
                title={item.description}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </nav>

        {/* Right Side - User Info & MFE Badge */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* User Info - Clean display from Shell Context */}
          {user && (
            <div
              className="user-info"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 12px",
                backgroundColor: "#f8f9fa",
                border: "1px solid #dee2e6",
                borderRadius: "20px",
                fontSize: "13px",
                color: "#495057",
              }}
            >
              <span style={{ fontSize: "16px" }}>{user.avatar}</span>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "2px" }}
              >
                <span style={{ fontWeight: "500" }}>{user.name}</span>
                <span style={{ fontSize: "11px", opacity: "0.7" }}>
                  {user.email}
                </span>
              </div>
            </div>
          )}

          {/* MFE Info Badge - Smaller */}
          <div className="mfe-badge" style={{ fontSize: "11px", opacity: 0.7 }}>
            <span className="badge-text">Header MFE</span>
            <span className="badge-port">:3001</span>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`mobile-nav-item ${
                isActive(item.path) ? "mobile-nav-item-active" : ""
              }`}
            >
              <div className="mobile-nav-label">{item.label}</div>
              <div className="mobile-nav-description">{item.description}</div>
            </button>
          ))}
        </div>
      )}

      {/* Simplified Learning Info Bar */}
      <div className="learning-info-bar">
        <div className="info-container">
          <span className="info-text">
            💡 <strong>Component MFE</strong> with{" "}
            <strong>Shared Context</strong>
            {user && ` - User: ${user.name} (${user.email})`}
          </span>
        </div>
      </div>

      {/* MFE Footer */}
      <div
        style={{
          backgroundColor: "#6f42c1",
          color: "white",
          padding: "10px",
          textAlign: "center",
          fontSize: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          <span>
            <strong>🎯 Header MFE</strong>
          </span>
          <span style={{ opacity: "0.9" }}>
            Port: 3001 | Type: Component MFE | Framework: React
          </span>
          <span style={{ opacity: "0.8" }}>Module Federation</span>
        </div>
        <div style={{ marginTop: "6px", fontSize: "9px", opacity: "0.5" }}>
          🌐 window.mfeEventBus | User: {user?.name || "null"}
        </div>
      </div>
    </header>
  );
};

export default Header;
