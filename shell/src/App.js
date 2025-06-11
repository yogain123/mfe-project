import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load MFE components
const HeaderMfe = React.lazy(() => import('headerMfe/Header'));
const ProductsMfe = React.lazy(() => import('productsMfe/App'));
const OrdersMfe = React.lazy(() => import('ordersMfe/App'));

// Loading component
const Loading = ({ message = "Loading..." }) => (
  <div className="loading" style={{ 
    padding: '40px', 
    textAlign: 'center', 
    backgroundColor: '#f0f0f0',
    border: '2px solid #007bff',
    borderRadius: '8px',
    margin: '20px'
  }}>
    {message}
  </div>
);

// Fallback components
const HeaderFallback = () => (
  <div className="header-fallback" style={{
    backgroundColor: '#fff3cd',
    padding: '15px 20px',
    textAlign: 'center',
    border: '2px solid #ffc107'
  }}>
    <h1>MFE Learning Project</h1>
    <p>Header MFE failed to load - using fallback</p>
  </div>
);

const PageFallback = ({ pageName }) => (
  <div className="page-fallback" style={{
    backgroundColor: '#f8f9fa',
    border: '2px dashed #dee2e6',
    borderRadius: '8px',
    padding: '40px',
    textAlign: 'center',
    margin: '20px'
  }}>
    <h2>{pageName} MFE Unavailable</h2>
    <p>This MFE failed to load. This could be due to:</p>
    <ul style={{ textAlign: 'left', maxWidth: '400px', margin: '15px auto' }}>
      <li>Network connectivity issues</li>
      <li>MFE server not running</li>
      <li>Configuration problems</li>
    </ul>
    <p><strong>Check the browser console for more details.</strong></p>
  </div>
);

function App() {
  console.log('🚀 Shell App rendering...');
  
  return (
    <div className="app" style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8f9fa',
      fontFamily: 'Arial, sans-serif'
    }}>
      <Router>
        <div className="layout" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          {/* Header MFE - Component that appears on all pages */}
          <ErrorBoundary fallback={<HeaderFallback />}>
            <Suspense fallback={<Loading message="Loading Header..." />}>
              <HeaderMfe />
            </Suspense>
          </ErrorBoundary>

          {/* Main Content Area */}
          <main className="main-content" style={{ 
            flex: 1, 
            padding: '20px',
            maxWidth: '1200px',
            margin: '0 auto',
            width: '100%'
          }}>
            <Routes>
              {/* Default route redirects to products */}
              <Route path="/" element={<Navigate to="/products" replace />} />
              
              {/* Products MFE - Full page route */}
              <Route 
                path="/products/*" 
                element={
                  <ErrorBoundary fallback={<PageFallback pageName="Products" />}>
                    <Suspense fallback={<Loading message="Loading Products MFE..." />}>
                      <ProductsMfe />
                    </Suspense>
                  </ErrorBoundary>
                } 
              />
              
              {/* Orders MFE - Full page route */}
              <Route 
                path="/orders/*" 
                element={
                  <ErrorBoundary fallback={<PageFallback pageName="Orders" />}>
                    <Suspense fallback={<Loading message="Loading Orders MFE..." />}>
                      <OrdersMfe />
                    </Suspense>
                  </ErrorBoundary>
                } 
              />
              
              {/* Catch all route */}
              <Route 
                path="*" 
                element={
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '40px',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    border: '1px solid #ddd'
                  }}>
                    <h2>Page Not Found</h2>
                    <p>The requested page could not be found.</p>
                  </div>
                } 
              />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="footer" style={{
            backgroundColor: '#343a40',
            color: '#fff',
            padding: '20px 0',
            marginTop: 'auto'
          }}>
            <div className="footer-content" style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '0 20px',
              textAlign: 'center'
            }}>
              <p><strong>🎓 MFE Learning Project</strong></p>
              <p>Demonstrating Micro Frontend Architecture with Module Federation</p>
              <div className="mfe-status" style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                flexWrap: 'wrap',
                fontSize: '12px',
                marginTop: '10px'
              }}>
                <span className="status-item">
                  <span className="status-active" style={{ color: '#28a745', fontWeight: 'bold' }}>●</span> Shell (3000)
                </span>
                <span className="status-item">Header MFE (3001)</span>
                <span className="status-item">Products MFE (3002)</span>
                <span className="status-item">Orders MFE (3003)</span>
                <span className="status-item">User Profile MFE (3004)</span>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </div>
  );
}

export default App; 