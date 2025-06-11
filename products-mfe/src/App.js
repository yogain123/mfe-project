import React, { Suspense, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './styles.css';
import ErrorBoundary from './components/ErrorBoundary';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import AddProduct from './components/AddProduct';

// Import User Profile MFE - This demonstrates MFE within MFE!
const UserProfileMfe = React.lazy(() => import('userProfileMfe/UserProfile'));

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfile, setShowProfile] = useState(false);

  // Mock user data
  const currentUser = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Product Manager',
    avatar: '👨‍💼'
  };

  const isActive = (path) => {
    const currentPath = location.pathname.replace('/products', '') || '/';
    return currentPath === path;
  };

  return (
    <div className="products-mfe">
      {/* MFE Header */}
      <div className="mfe-header">
        <div className="mfe-info">
          <h1>📦 Products Management</h1>
          <div className="mfe-badge">
            <span>Products MFE</span>
            <span className="port">:3002</span>
          </div>
        </div>
        
        {/* User Profile Toggle - Demonstrates Component MFE within Page MFE */}
        <div className="user-section">
          <button 
            className="profile-toggle"
            onClick={() => setShowProfile(!showProfile)}
          >
            {currentUser.avatar} {currentUser.name}
            {showProfile ? ' ▼' : ' ▶'}
          </button>
        </div>
      </div>

      {/* User Profile MFE - Component within MFE */}
      {showProfile && (
        <div className="embedded-profile">
          <div className="profile-header">
            <h3>👤 User Profile (Embedded MFE)</h3>
            <span className="learning-note">
              💡 This profile component is loaded from User Profile MFE (port 3004)
            </span>
          </div>
          <ErrorBoundary fallback={
            <div className="profile-error">
              <p>❌ User Profile MFE failed to load</p>
              <p>This demonstrates graceful degradation when embedded MFEs fail</p>
            </div>
          }>
            <Suspense fallback={<div className="loading">Loading User Profile MFE...</div>}>
              <UserProfileMfe user={currentUser} />
            </Suspense>
          </ErrorBoundary>
        </div>
      )}

      {/* Navigation */}
      <nav className="products-nav">
        <button 
          className={`nav-btn ${isActive('/') ? 'active' : ''}`}
          onClick={() => navigate('/products')}
        >
          📋 All Products
        </button>
        <button 
          className={`nav-btn ${isActive('/add') ? 'active' : ''}`}
          onClick={() => navigate('/products/add')}
        >
          ➕ Add Product
        </button>
      </nav>

      {/* Main Content */}
      <main className="products-content">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </main>

      {/* Learning Info */}
      <div className="learning-info">
        <h4>🎓 Learning Points:</h4>
        <ul>
          <li><strong>Page MFE:</strong> This entire application is loaded when you navigate to /products in the Shell</li>
          <li><strong>Independent Routing:</strong> Has its own internal routing (/products/add, /products/product/1, etc.)</li>
          <li><strong>MFE within MFE:</strong> User Profile component is loaded from another MFE (port 3004)</li>
          <li><strong>Error Boundaries:</strong> Graceful handling when embedded MFEs fail to load</li>
          <li><strong>Shared Dependencies:</strong> React, React-DOM, React-Router shared with Shell and other MFEs</li>
        </ul>
      </div>
    </div>
  );
};

export default App; 