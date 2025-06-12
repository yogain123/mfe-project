import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./styles.css";
import OrderList from "./OrderList";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (window.mfeEventBus) {
      // Get initial context
      const context = window.mfeGlobalContext;
      if (context) {
        setUser(context.user);
      }

      // Listen for user updates
      const unsubscribeUser = window.mfeEventBus.on(
        "user:updated",
        (userData) => {
          setUser(userData);
        }
      );

      return unsubscribeUser;
    }
  }, []);

  const isActive = (path) => {
    const currentPath = location.pathname.replace("/orders", "") || "/";
    return currentPath === path;
  };

  return (
    <div className="orders-mfe">
      {/* MFE Header */}
      <div className="mfe-header">
        <div className="mfe-info">
          <h1>📋 Orders Management</h1>
          <div className="mfe-badge">
            <span>Orders MFE :3003</span>
          </div>
        </div>

        {user && (
          <div className="user-context">
            <span>{user.avatar}</span>
            <div>
              <div>Welcome, {user.name}!</div>
              <div>{user.role}</div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="orders-nav">
        <button
          className={`nav-btn ${isActive("/") ? "active" : ""}`}
          onClick={() => navigate("/orders")}
        >
          📋 All Orders
        </button>
      </nav>

      {/* Main Content */}
      <main className="orders-content">
        <Routes>
          <Route path="/" element={<OrderList />} />
        </Routes>
      </main>

      {/* Simple Learning Info */}
      <div className="learning-info">
        <h4>🎓 Orders MFE</h4>
        <p>
          <strong>User:</strong> {user?.name || "Loading..."} |
          <strong> Type:</strong> Page MFE |<strong> Context:</strong> Shared
          via events
        </p>
      </div>
    </div>
  );
};

export default App;
