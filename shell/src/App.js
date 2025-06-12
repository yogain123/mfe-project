import React, { Suspense, useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import AppContext, { AppContextProvider } from "./AppContext";
import "./EventBus"; // Initialize event bus

// Lazy load MFE components
const HeaderMfe = React.lazy(() => import("headerMfe/Header"));
const ProductsMfe = React.lazy(() => import("productsMfe/App"));
const OrdersMfe = React.lazy(() => import("ordersMfe/App"));

// Simple loading component
const Loading = ({ message = "Loading..." }) => (
  <div style={{ padding: "20px", textAlign: "center" }}>{message}</div>
);

const AppContent = () => {
  const appContext = useContext(AppContext);

  const { user } = appContext;

  return (
    <div className="app">
      <Router>
        {/* Header MFE */}
        <ErrorBoundary fallback={<div>Header failed to load</div>}>
          <Suspense fallback={<Loading message="Loading Header..." />}>
            <HeaderMfe />
          </Suspense>
        </ErrorBoundary>

        {/* Main Content */}
        <main style={{ minHeight: "calc(100vh - 120px)" }}>
          <Routes>
            <Route path="/" element={<Navigate to="/products" replace />} />

            <Route
              path="/products/*"
              element={
                <ErrorBoundary
                  fallback={<div>Products MFE failed to load</div>}
                >
                  <Suspense
                    fallback={<Loading message="Loading Products..." />}
                  >
                    <ProductsMfe />
                  </Suspense>
                </ErrorBoundary>
              }
            />

            <Route
              path="/orders/*"
              element={
                <ErrorBoundary fallback={<div>Orders MFE failed to load</div>}>
                  <Suspense fallback={<Loading message="Loading Orders..." />}>
                    <OrdersMfe />
                  </Suspense>
                </ErrorBoundary>
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
          <h4>🎓 MFE Learning Demo</h4>
          <p>
            <strong>Current User:</strong> {user?.name} ({user?.role})
          </p>
          <p>
            <strong>Shared Context:</strong> User data is shared across all MFEs
            via global context and events.
          </p>
          <p>
            <strong>Try:</strong> Edit user name in Products MFE and see it
            update everywhere!
          </p>
        </div>
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
