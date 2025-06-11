import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <main className="main-content">
        {children}
      </main>
      
      <footer className="footer">
        <div className="footer-content">
          <p>🎓 MFE Learning Project - Webpack Module Federation Demo</p>
          <div className="mfe-status">
            <span className="status-item">
              🏠 Shell: <span className="status-active">Active</span>
            </span>
            <span className="status-item">
              📋 Header MFE: <span className="status-active">Loaded</span>
            </span>
            <span className="status-item">
              📦 Page MFEs: <span className="status-active">On Demand</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 