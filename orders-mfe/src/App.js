import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./styles.css";
import OrderList from "./OrderList";
import UserApiService from "./userApiService";

// Email Editor Component
const EmailEditor = ({ user, updateUser }) => {
  const [email, setEmail] = useState(user?.email || "");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setEmail(user?.email || "");
  }, [user?.email]);

  const handleSave = () => {
    if (email.trim() && email !== user.email) {
      updateUser({ email: email.trim() });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEmail(user?.email || "");
    setIsEditing(false);
  };

  return (
    <div
      style={{
        padding: "12px",
        backgroundColor: "#e8f5e8",
        borderRadius: "6px",
        margin: "12px 0",
        border: "1px solid #28a745",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span>📧 Email:</span>
        {isEditing ? (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: "4px 8px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                minWidth: "200px",
              }}
              placeholder="Enter email address"
            />
            <button
              onClick={handleSave}
              style={{
                padding: "4px 8px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              style={{
                padding: "4px 8px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <strong>{user?.email}</strong>
            <button
              onClick={() => setIsEditing(true)}
              style={{
                padding: "4px 8px",
                backgroundColor: "#17a2b8",
                color: "white",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

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

  const updateUser = async (updates) => {
    try {
      // Orders MFE makes its own API call
      await UserApiService.updateUserAndNotify(updates);
      console.log("🔄 Orders MFE: User update completed successfully");
    } catch (error) {
      console.error("❌ Orders MFE: Failed to update user:", error.message);
      // Could show user-friendly error message here
    }
  };

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

      {/* Email Editor */}
      {user && <EmailEditor user={user} updateUser={updateUser} />}

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
          <strong> Email:</strong> {user?.email || "Loading..."} |
          <strong> Type:</strong> Page MFE |<strong> Context:</strong> Shared
          via events
        </p>
        <p style={{ fontSize: "12px", opacity: "0.8", marginTop: "5px" }}>
          💡 Edit email above to see real-time updates across all MFEs!
        </p>
      </div>

      {/* MFE Footer */}
      <footer
        style={{
          backgroundColor: "#28a745",
          color: "white",
          padding: "15px",
          marginTop: "30px",
          textAlign: "center",
          borderRadius: "8px",
          margin: "30px 16px 16px 16px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <strong>📋 Orders MFE</strong>
          </div>
          <div style={{ fontSize: "14px", opacity: "0.9" }}>
            Port: 3003 | Type: Page MFE | Framework: React
          </div>
          <div style={{ fontSize: "12px", opacity: "0.8" }}>
            Module Federation
          </div>
        </div>
        <div style={{ marginTop: "8px", fontSize: "10px", opacity: "0.6" }}>
          🌐 window.mfeEventBus | User: {user?.name || "null"}
        </div>
      </footer>
    </div>
  );
};

export default App;
