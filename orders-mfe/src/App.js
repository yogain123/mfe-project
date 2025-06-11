import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './styles.css';
import OrderList from './components/OrderList';
import OrderDetail from './components/OrderDetail';

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    const currentPath = location.pathname.replace('/orders', '') || '/';
    return currentPath === path;
  };

  return (
    <div className="orders-mfe">
      {/* MFE Header */}
      <div className="mfe-header">
        <div className="mfe-info">
          <h1>📋 Orders Management</h1>
          <div className="mfe-badge">
            <span>Orders MFE</span>
            <span className="port">:3003</span>
          </div>
        </div>
        
        <div className="stats-section">
          <div className="stat-item">
            <span className="stat-number">24</span>
            <span className="stat-label">Total Orders</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">$2,450</span>
            <span className="stat-label">Revenue</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="orders-nav">
        <button 
          className={`nav-btn ${isActive('/') ? 'active' : ''}`}
          onClick={() => navigate('/orders')}
        >
          📋 All Orders
        </button>
        <button className="nav-btn">
          📊 Analytics
        </button>
        <button className="nav-btn">
          ⚙️ Settings
        </button>
      </nav>

      {/* Main Content */}
      <main className="orders-content">
        <Routes>
          <Route path="/" element={<OrderList />} />
          <Route path="/order/:id" element={<OrderDetail />} />
        </Routes>
      </main>

      {/* Learning Info */}
      <div className="learning-info">
        <h4>🎓 Learning Points:</h4>
        <ul>
          <li><strong>Page MFE:</strong> Complete standalone application loaded on /orders route</li>
          <li><strong>Independent State:</strong> Manages its own order data and state</li>
          <li><strong>Internal Routing:</strong> Has routes like /orders/order/123</li>
          <li><strong>Isolated Styling:</strong> CSS scoped to this MFE only</li>
          <li><strong>Shared Dependencies:</strong> Uses same React version as other MFEs</li>
        </ul>
      </div>
    </div>
  );
};

export default App; 