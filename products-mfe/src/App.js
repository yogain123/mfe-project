import React, { Suspense, useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./styles.css";
import ErrorBoundary from "./ErrorBoundary";
import ProductList from "./ProductList";

// Import User Profile MFE
const UserProfileMfe = React.lazy(() => import("userProfileMfe/UserProfile"));

// Simple User Editor Component
const UserEditor = ({ user, updateUser }) => {
  const [username, setUsername] = useState(user?.name || "");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setUsername(user?.name || "");
  }, [user?.name]);

  const handleSave = () => {
    if (username.trim() && username !== user.name) {
      updateUser({ name: username.trim() });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setUsername(user?.name || "");
    setIsEditing(false);
  };

  return (
    <div
      style={{
        padding: "12px",
        backgroundColor: "#f8f9fa",
        borderRadius: "6px",
        margin: "12px 0",
        backgroundColor: "lightblue",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span>👤 User:</span>
        {isEditing ? (
          <>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                padding: "4px 8px",
                borderRadius: "4px",
                border: "1px solid #ddd",
              }}
            />
            <button
              onClick={handleSave}
              style={{
                padding: "4px 8px",
                backgroundColor: "#007bff",
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
            <strong>{user?.name}</strong>
            <button
              onClick={() => setIsEditing(true)}
              style={{
                padding: "4px 8px",
                backgroundColor: "#28a745",
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
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (window.mfeEventBus) {
      // Get initial context
      const context = window.mfeGlobalContext;
      if (context) {
        setUser(context.user);
      }

      // Listen for user updates
      window.mfeEventBus.on("user:updated", (userData) => {
        setUser(userData);
      });
    }
  }, []);

  const updateUser = (updates) => {
    if (window.mfeEventBus) {
      window.mfeEventBus.emit("user:update", updates);
    }
  };

  const isActive = (path) => {
    const currentPath = location.pathname.replace("/products", "") || "/";
    return currentPath === path;
  };

  return (
    <div className="products-mfe">
      {/* MFE Header */}
      <div className="mfe-header">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>📦 Products Management</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button
              onClick={() => setShowProfile(!showProfile)}
              style={{
                padding: "6px 12px",
                backgroundColor: "#f8f9fa",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            >
              {user?.avatar} {user?.name}
            </button>
            <span style={{ fontSize: "12px", opacity: 0.7 }}>
              Products MFE :3002
            </span>
          </div>
        </div>

        {/* User Editor */}
        {user && <UserEditor user={user} updateUser={updateUser} />}
      </div>

      {/* Embedded User Profile MFE */}
      {showProfile && (
        <div
          style={{
            padding: "16px",
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            margin: "16px",
            borderRadius: "8px",
          }}
        >
          <h3>👤 User Profile (Embedded MFE)</h3>
          <ErrorBoundary
            fallback={<div>❌ User Profile MFE failed to load</div>}
          >
            <Suspense fallback={<div>Loading User Profile MFE...</div>}>
              <UserProfileMfe user={user} />
            </Suspense>
          </ErrorBoundary>
        </div>
      )}

      {/* Navigation */}
      <nav className="products-nav">
        <button
          className={`nav-btn ${isActive("/") ? "active" : ""}`}
          onClick={() => navigate("/products")}
        >
          📋 All Products
        </button>
      </nav>

      {/* Main Content */}
      <main className="products-content">
        <Routes>
          <Route path="/" element={<ProductList />} />
        </Routes>
      </main>

      {/* Simple Learning Info */}
      <div className="learning-info">
        <h4>🎓 Products MFE</h4>
        <p>
          <strong>User:</strong> {user?.name || "Loading..."} |
          <strong>
            {" "}
            Edit user above to see real-time updates across all MFEs!
          </strong>
        </p>
      </div>

      {/* MFE Footer */}
      <footer
        style={{
          backgroundColor: "#007bff",
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
            <strong>📦 Products MFE</strong>
          </div>
          <div style={{ fontSize: "14px", opacity: "0.9" }}>
            Port: 3002 | Type: Page MFE | Framework: React
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
