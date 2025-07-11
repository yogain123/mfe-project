import React, { Suspense, useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import AppContext, { AppContextProvider } from "./AppContext";
import UserApiService from "./userApiService";
import "./EventBus"; // Initialize event bus

// Lazy load MFE components
const HeaderMfe = React.lazy(() => import("headerMfe/Header"));
const ProductsMfe = React.lazy(() => import("productsMfe/App"));
const OrdersMfe = React.lazy(() => import("ordersMfe/App"));
const CompletlyDifferentComp = React.lazy(() =>
  import("ordersMfe/CompletlyDifferentComp")
);
const NatashaChatbotMfe = React.lazy(() =>
  import("natashaChatbotMfe/NatashaChatbot").catch(() => {
    console.warn(
      "Natasha Chatbot MFE failed to load - showing empty component"
    );
    return { default: () => null };
  })
);

// Simple loading component
const Loading = ({ message = "Loading..." }) => (
  <div style={{ padding: "20px", textAlign: "center" }}>{message}</div>
);

// Component to handle semantic actions - must be inside Router
const SemanticActionsHandler = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (window.mfeEventBus) {
      // Handle navigation requests from Natasha
      const handleNatashaNavigation = (data) => {
        if (data.path) {
          navigate(data.path);
        }
      };

      // Handle profile update requests from Natasha
      const handleNatashaProfileUpdate = async (data) => {
        if (data.updates && Object.keys(data.updates).length > 0) {
          try {
            // Get current user data from global context
            const currentUser = window.mfeGlobalContext?.user || {};

            // Merge updates with current data
            const updatedUserData = { ...currentUser, ...data.updates };

            // Make API call to update user
            const apiResponse = await UserApiService.updateUser(
              updatedUserData
            );

            // Emit user updated event to refresh all MFEs
            window.mfeEventBus.emit("user:updated", apiResponse);
          } catch (error) {
            // Emit error event
            window.mfeEventBus.emit("user:api-error", {
              message: error.message,
              source: "Natasha Chatbot",
              updates: data.updates,
            });
          }
        }
      };

      window.mfeEventBus.on("natasha:navigate", handleNatashaNavigation);
      window.mfeEventBus.on(
        "natasha:update_profile",
        handleNatashaProfileUpdate
      );
    }
  }, [navigate]);

  return null;
};

const AppContent = () => {
  const appContext = useContext(AppContext);

  const { user, loading, error, apiStatus } = appContext;

  // Show loading state while fetching user data
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div>🔄 Loading user data from API...</div>
        <div style={{ fontSize: "14px", opacity: 0.7 }}>
          Connecting to json-server on port 3005
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Router>
        {/* Semantic Actions Handler - must be inside Router */}
        <SemanticActionsHandler />

        {/* API Status Indicator */}
        <div
          style={{
            backgroundColor: apiStatus === "error" ? "#fff3cd" : "#d1edff",
            padding: "8px 16px",
            textAlign: "center",
            fontSize: "12px",
            borderBottom: "1px solid #ddd",
          }}
        >
          {apiStatus === "error" ? (
            <span>⚠️ API Offline - Using fallback data | Error: {error}</span>
          ) : (
            <span>✅ API Connected - json-server running on port 3005</span>
          )}
        </div>

        {/* Header MFE */}
        <Suspense fallback={<Loading message="Loading Header..." />}>
          <HeaderMfe />
        </Suspense>

        {/* Main Content */}
        <main style={{ minHeight: "calc(100vh - 120px)" }}>
          <Routes>
            <Route path="/" element={<Navigate to="/products" replace />} />

            <Route
              path="/products/*"
              element={
                <Suspense fallback={<Loading message="Loading Products..." />}>
                  <ProductsMfe />
                </Suspense>
              }
            />

            <Route
              path="/orders/*"
              element={
                <Suspense fallback={<Loading message="Loading Orders..." />}>
                  <OrdersMfe />
                  <CompletlyDifferentComp />
                </Suspense>
              }
            />
          </Routes>
        </main>

        {/* Learning Info */}
        <div
          style={{
            backgroundColor: "#f8f9fa",
            padding: "16px",
            margin: "20px",
            borderRadius: "8px",
            fontSize: "14px",
          }}
        >
          <h4>🎓 MFE Learning Demo with API Integration</h4>
          <p>
            <strong>Current User:</strong> {user?.name} ({user?.role})
          </p>
          <p>
            <strong>API Status:</strong>{" "}
            {apiStatus === "error" ? "❌ Offline" : "✅ Connected"}
          </p>
          <p>
            <strong>Shared Context:</strong> User data is fetched from
            json-server API and shared across all MFEs via global context and
            events.
          </p>
          <p>
            <strong>Try:</strong> Edit user name in Products MFE and see it
            update everywhere via API!
          </p>
        </div>

        {/* Natasha Chatbot - Always visible at bottom */}
        <Suspense fallback={null}>
          <NatashaChatbotMfe />
        </Suspense>

        {/* Footer */}
        <footer
          style={{
            backgroundColor: "#343a40",
            color: "white",
            padding: "20px",
            marginTop: "40px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <div>
              <h5>🏠 Shell Application</h5>
              <p>Port: 3000</p>
              <p>Type: Container/Shell</p>
              <p>Framework: React</p>
            </div>
            <div
              style={{
                borderLeft: "1px solid #6c757d",
                paddingLeft: "20px",
                display: "flex",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              <div>
                <h5>🎯 Header MFE</h5>
                <p>Port: 3001</p>
                <p>Type: Component MFE</p>
                <p>Framework: React</p>
              </div>
              <div>
                <h5>📦 Products MFE</h5>
                <p>Port: 3002</p>
                <p>Type: Page MFE</p>
                <p>Framework: React</p>
              </div>
              <div>
                <h5>📋 Orders MFE</h5>
                <p>Port: 3003</p>
                <p>Type: Page MFE</p>
                <p>Framework: React</p>
              </div>
              <div>
                <h5>👤 User Profile MFE</h5>
                <p>Port: 3004</p>
                <p>Type: Component MFE</p>
                <p>Framework: React</p>
              </div>
              <div>
                <h5>🤖 Natasha Chatbot MFE</h5>
                <p>Port: 3006</p>
                <p>Type: Component MFE</p>
                <p>Framework: React + AI</p>
              </div>
            </div>
            <div
              style={{ borderLeft: "1px solid #6c757d", paddingLeft: "20px" }}
            >
              <h5>🔌 JSON Server API</h5>
              <p>Port: 3005</p>
              <p>Type: Mock API</p>
              <p>
                Status: {apiStatus === "error" ? "❌ Offline" : "✅ Online"}
              </p>
            </div>
          </div>
          <hr style={{ margin: "20px 0", borderColor: "#6c757d" }} />

          <div
            style={{ fontSize: "11px", opacity: "0.7", marginBottom: "10px" }}
          >
            🌐 Global APIs: window.mfeEventBus | window.mfeGlobalContext | User:{" "}
            {user?.name || "null"} | API: {apiStatus}
          </div>

          <p style={{ margin: "0", fontSize: "12px", opacity: "0.8" }}>
            Micro Frontend Architecture Demo - Module Federation with Webpack 5
            + JSON Server API
          </p>
        </footer>
      </Router>
    </div>
  );
};

function App() {
  return (
    <AppContextProvider>
      <AppContent />
    </AppContextProvider>
  );
}

export default App;
