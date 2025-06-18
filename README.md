# Micro Frontend Architecture Learning Project

## 🎯 Overview

This project demonstrates a complete **Micro Frontend (MFE) architecture** using **Webpack Module Federation** with React 17. It's designed to teach you everything from basic concepts to advanced production-ready patterns, including AI-powered chatbot integration and semantic actions.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              SHELL APP                                      │
│                           (Port: 3000)                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                    HEADER MFE (Component)                           │    │
│  │                       (Port: 3001)                                  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ┌─────────────────┐  ┌─────────────────┐   ┌─────────────────────────┐     │
│  │   PRODUCTS MFE  │  │   ORDERS MFE    │   │   NATASHA CHATBOT MFE   │     │
│  │   (Full Page)   │  │   (Full Page)   │   │     (Component)         │     │
│  │   Port: 3002    │  │   Port: 3003    │   │     Port: 3006          │     │
│  └─────────────────┘  └─────────────────┘   │   AI Assistant with     │     │
│                                             │   Semantic Actions      │     │
│  ┌─────────────────────────────────────────┐└─────────────────────────┘     │
│  │         USER PROFILE MFE (Component)    │                                │
│  │              (Port: 3004)               │                                │
│  │    (Embedded in Products MFE)           │                                │
│  └─────────────────────────────────────────┘                                │
└─────────────────────────────────────────────────────────────────────────────┘

                              ┌─────────────────────┐
                              │   JSON SERVER API   │
                              │     (Port: 3005)    │
                              │   User Data & More  │
                              └─────────────────────┘
```

## 🚀 Features

### Core Architecture

- **5 Micro Frontends**: Shell, Header, Products, Orders, User Profile, and Natasha Chatbot
- **Webpack Module Federation**: Dynamic runtime integration
- **Shared Dependencies**: Optimized React sharing between MFEs
- **Event Bus System**: Cross-MFE communication
- **Global Context**: Shared state management
- **JSON Server**: Mock API for development

### Advanced Features

- **AI-Powered Chatbot**: Natasha with semantic actions and OpenAI integration
- **Semantic Navigation**: Natural language commands for app navigation
- **AWS Deployment**: Production-ready S3 and CloudFront deployment
- **Development Workflow**: Concurrent development of all MFEs
- **Hot Module Replacement**: Fast development experience

## 🛠️ Tech Stack

- **Frontend**: React 17, Webpack 5, Module Federation
- **Styling**: CSS3 with modern design patterns
- **API**: JSON Server for mock data
- **AI Integration**: OpenAI API for chatbot functionality
- **Deployment**: AWS S3, CloudFront, automated deployment scripts
- **Development**: Concurrently, Hot Module Replacement

## 📦 Project Structure

```
mfe-project/
├── shell/                    # Shell application (host)
├── header-mfe/              # Header component MFE
├── products-mfe/            # Products page MFE
├── orders-mfe/              # Orders page MFE
├── user-profile-mfe/        # User profile component MFE
├── natasha-chatbot-mfe/     # AI chatbot component MFE
├── docs/                    # Comprehensive documentation
├── db.json                  # JSON server database
├── deploy.sh               # AWS deployment script
└── package.json            # Root package with all scripts
```

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- npm or yarn
- (Optional) AWS CLI for deployment

### Installation & Development

1. **Clone and Install**

   ```bash
   git clone <repository-url>
   cd mfe-project
   npm install
   npm run install:all
   ```

2. **Start Development Environment**

   ```bash
   # Starts all MFEs + JSON Server concurrently
   npm run dev
   ```

   This will start:

   - Shell App: http://localhost:3000
   - Header MFE: http://localhost:3001
   - Products MFE: http://localhost:3002
   - Orders MFE: http://localhost:3003
   - User Profile MFE: http://localhost:3004
   - JSON Server API: http://localhost:3005
   - Natasha Chatbot MFE: http://localhost:3006

3. **Individual MFE Development**
   ```bash
   npm run dev:shell      # Shell only
   npm run dev:header     # Header MFE only
   npm run dev:products   # Products MFE only
   npm run dev:orders     # Orders MFE only
   npm run dev:profile    # User Profile MFE only
   npm run dev:natasha    # Natasha Chatbot MFE only
   npm run api           # JSON Server only
   ```

## 🤖 Natasha AI Chatbot

The project includes **Natasha**, an AI-powered chatbot with semantic actions:

### Features

- **Natural Language Navigation**: "Show me products", "Go to orders"
- **Context Awareness**: Knows current user and app state
- **Semantic Actions**: Understands intent and executes actions
- **OpenAI Integration**: Powered by GPT for intelligent responses
- **Cross-MFE Integration**: Can trigger navigation and actions across MFEs

### Setup

1. Create `.env` file with your OpenAI API key:

   ```bash
   OPENAI_API_KEY=your_openai_api_key_here
   ```

2. The chatbot will be available as a floating component in the shell app

## 📊 JSON Server API

Mock API server provides user data and can be extended for more endpoints:

- **Endpoint**: http://localhost:3005
- **User Data**: `/user` - Current user information
- **Extensible**: Add more endpoints in `db.json`

## 🚀 Production Deployment

### AWS S3 + CloudFront Setup

1. **Configure Environment**

   ```bash
   # Create .env file with:
   AWS_ACCESS_KEY_ID=your_access_key
   AWS_SECRET_ACCESS_KEY=your_secret_key
   AWS_REGION=your_region
   S3_BUCKET_NAME=your_bucket_name
   CLOUD_FRONT_DISTRIBUTION_ID=your_distribution_id
   ```

2. **Deploy All MFEs**

   ```bash
   npm run deploy:all
   ```

3. **Deploy Individual MFEs**
   ```bash
   npm run deploy:shell
   npm run deploy:header
   npm run deploy:products
   npm run deploy:orders
   npm run deploy:profile
   npm run deploy:natasha
   ```

<strong>Please refer to `/docs` for detailed explanation of the project.</strong>

**Happy Learning! 🎉**

This project covers everything you need to understand Micro Frontend architecture in a production environment, including modern AI integration patterns.
