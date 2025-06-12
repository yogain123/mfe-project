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
      const unsubscribe = window.mfeEventBus.on("user:updated", setUser);
      return unsubscribe;
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
              <span style={{ fontWeight: "500" }}>{user.name}</span>
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
            {user && ` - Current User: ${user.name}`}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
