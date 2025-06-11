import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { path: '/products', label: '📦 Products', description: 'Product Management MFE' },
    { path: '/orders', label: '📋 Orders', description: 'Order Management MFE' }
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
          <h1 className="brand-title">
            🏗️ MFE Architecture
          </h1>
          <span className="brand-subtitle">Learning Project</span>
        </div>

        {/* Navigation */}
        <nav className="header-nav">
          <div className="nav-desktop">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`nav-item ${isActive(item.path) ? 'nav-item-active' : ''}`}
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
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </nav>

        {/* MFE Info Badge */}
        <div className="mfe-badge">
          <span className="badge-text">Header MFE</span>
          <span className="badge-port">:3001</span>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`mobile-nav-item ${isActive(item.path) ? 'mobile-nav-item-active' : ''}`}
            >
              <div className="mobile-nav-label">{item.label}</div>
              <div className="mobile-nav-description">{item.description}</div>
            </button>
          ))}
        </div>
      )}

      {/* Learning Info Bar */}
      <div className="learning-info-bar">
        <div className="info-container">
          <span className="info-text">
            💡 <strong>Learning Point:</strong> This header is a <strong>Component MFE</strong> 
            loaded from port 3001 and shared across all pages in the Shell app
          </span>
          <span className="info-status">
            Status: <span className="status-loaded">Loaded via Module Federation</span>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header; 