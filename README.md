# Micro Frontend Architecture Learning Project

## 🎯 Overview

This project demonstrates a complete **Micro Frontend (MFE) architecture** using **Webpack Module Federation** with React 17. It's designed to teach you everything from basic concepts to advanced production-ready patterns.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        SHELL APP                            │
│                     (Port: 3000)                            │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              HEADER MFE (Component)                 │    │
│  │                 (Port: 3001)                        │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐                   │
│  │   PRODUCTS MFE  │  │   ORDERS MFE    │                   │
│  │   (Full Page)   │  │   (Full Page)   │                   │
│  │   Port: 3002    │  │   Port: 3003    │                   │
│  └─────────────────┘  └─────────────────┘                   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │         USER PROFILE MFE (Component)                │    │
│  │              (Port: 3004)                           │    │
│  │    (Can be embedded in other MFEs)                  │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## 🧩 MFE Types Covered

### 1. **Shell App** (Container/Host)

- **Purpose**: Main orchestrator that loads and manages all MFEs
- **Port**: 3000
- **Responsibilities**:
  - Routing between MFEs
  - Shared state management
  - Common layout structure
  - Loading remote MFEs

### 2. **Component MFEs** (Shared Components)

- **Header MFE** (Port: 3001): Navigation component used across the shell
- **User Profile MFE** (Port: 3004): Reusable profile component that can be embedded anywhere

### 3. **Page MFEs** (Full Page Applications)

- **Products MFE** (Port: 3002): Complete product management application
- **Orders MFE** (Port: 3003): Complete order management application

## 🔧 Key Concepts Demonstrated

### Module Federation Patterns:

1. **Host-Remote Pattern**: Shell consumes remote MFEs
2. **Bidirectional Sharing**: MFEs can consume components from each other
3. **Shared Dependencies**: React, React-DOM shared across all MFEs
4. **Dynamic Imports**: Runtime loading of remote modules
5. **Error Boundaries**: Graceful fallbacks when MFEs fail to load

### Production Patterns:

1. **Independent Deployment**: Each MFE can be deployed separately
2. **Version Management**: Semantic versioning for MFE compatibility
3. **Build Optimization**: Separate builds with shared chunks
4. **Environment Configuration**: Dev, staging, production configs
5. **S3 Deployment**: Production deployment to AWS S3

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm 7+

### Installation

```bash
# Install all dependencies for all MFEs
npm run install:all

# Or install individually
npm install
npm run install:shell
npm run install:header
npm run install:products
npm run install:orders
npm run install:profile
```

### Development

```bash
# Start all MFEs in development mode
npm run dev

# Or start individually
npm run dev:shell    # Shell app on port 3000
npm run dev:header   # Header MFE on port 3001
npm run dev:products # Products MFE on port 3002
npm run dev:orders   # Orders MFE on port 3003
npm run dev:profile  # User Profile MFE on port 3004
```

### Production Build

```bash
# Build all MFEs
npm run build

# Start production servers
npm start
```

### Deployment to S3

```bash
# Deploy all MFEs to S3
npm run deploy

# Configure AWS credentials first:
# aws configure
# or set environment variables:
# AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION
```

## 📁 Project Structure

```
mfe-project/
├── package.json                 # Root workspace configuration
├── README.md                   # This file
├── shell/                      # Shell/Host Application
│   ├── webpack.config.js       # Module Federation config
│   ├── package.json
│   └── src/
├── header-mfe/                 # Header Component MFE
│   ├── webpack.config.js
│   ├── package.json
│   └── src/
├── products-mfe/               # Products Page MFE
│   ├── webpack.config.js
│   ├── package.json
│   └── src/
├── orders-mfe/                 # Orders Page MFE
│   ├── webpack.config.js
│   ├── package.json
│   └── src/
└── user-profile-mfe/           # User Profile Component MFE
    ├── webpack.config.js
    ├── package.json
    └── src/
```

## 🎓 Learning Path

### Beginner Level

1. **Start the Shell**: Understand how the main container works
2. **Component MFE**: See how Header MFE is loaded as a component
3. **Page MFE**: Navigate to Products/Orders to see full-page MFEs

### Intermediate Level

1. **Module Federation Config**: Study webpack.config.js files
2. **Shared Dependencies**: Understand how React is shared
3. **Error Boundaries**: See fallback mechanisms in action

### Advanced Level

1. **Cross-MFE Communication**: Profile MFE embedded in Products MFE
2. **State Management**: Shared state between MFEs
3. **Production Deployment**: S3 deployment with proper caching

## 🔍 How It Works

### Module Federation Magic

```javascript
// In Shell (Host)
new ModuleFederationPlugin({
  name: "shell",
  remotes: {
    headerMfe: "headerMfe@http://localhost:3001/remoteEntry.js",
    productsMfe: "productsMfe@http://localhost:3002/remoteEntry.js",
  },
});

// In Header MFE (Remote)
new ModuleFederationPlugin({
  name: "headerMfe",
  filename: "remoteEntry.js",
  exposes: {
    "./Header": "./src/Header",
  },
});
```

### Runtime Loading

```javascript
// Dynamic import in Shell
const HeaderMfe = React.lazy(() => import("headerMfe/Header"));

// With error boundary and suspense
<ErrorBoundary fallback={<div>Header failed to load</div>}>
  <Suspense fallback={<div>Loading header...</div>}>
    <HeaderMfe />
  </Suspense>
</ErrorBoundary>;
```

## 🌟 Production Features

- **Independent Deployments**: Deploy MFEs separately without affecting others
- **Graceful Degradation**: Fallbacks when MFEs fail to load
- **Shared Dependencies**: Optimized bundle sizes with shared React
- **Environment Configs**: Different configs for dev/staging/prod
- **S3 Deployment**: Production-ready deployment scripts
- **Caching Strategy**: Proper cache headers for optimal performance

## 🚨 Common Pitfalls & Solutions

1. **CORS Issues**: Properly configured webpack dev server
2. **Shared Dependencies**: Version mismatches handled
3. **Circular Dependencies**: Avoided with proper architecture
4. **Error Handling**: Comprehensive error boundaries
5. **Performance**: Lazy loading and code splitting implemented

## 📚 Next Steps

After mastering this setup, explore:

- **State Management**: Redux/Zustand across MFEs
- **Authentication**: Shared auth across MFEs
- **Testing**: E2E testing for MFE architecture
- **Monitoring**: Error tracking and performance monitoring
- **CI/CD**: Automated deployment pipelines

---

**Happy Learning! 🎉**

This project covers everything you need to understand Micro Frontend architecture in a production environment.
