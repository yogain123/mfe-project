#!/bin/bash

# MFE Learning Project Setup Script
echo "🏗️  Setting up Micro Frontend Learning Project..."
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 16+ and try again."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    print_error "Node.js version 16+ is required. Current version: $(node -v)"
    exit 1
fi

print_status "Node.js version: $(node -v)"

# Install root dependencies
print_info "Installing root dependencies..."
npm install

# Install dependencies for each MFE
print_info "Installing Shell dependencies..."
cd shell && npm install && cd ..

print_info "Installing Header MFE dependencies..."
cd header-mfe && npm install && cd ..

print_info "Installing Products MFE dependencies..."
cd products-mfe && npm install && cd ..

print_info "Installing Orders MFE dependencies..."
cd orders-mfe && npm install && cd ..

print_info "Installing User Profile MFE dependencies..."
cd user-profile-mfe && npm install && cd ..

print_status "All dependencies installed successfully!"

echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "📚 Available Commands:"
echo "----------------------"
echo "npm run dev          - Start all MFEs in development mode"
echo "npm run build        - Build all MFEs for production"
echo "npm start            - Start all MFEs in production mode"
echo "npm run deploy       - Deploy all MFEs to S3 (requires AWS setup)"
echo ""
echo "🔗 Individual MFE Commands:"
echo "---------------------------"
echo "npm run dev:shell    - Shell app (port 3000)"
echo "npm run dev:header   - Header MFE (port 3001)"
echo "npm run dev:products - Products MFE (port 3002)"
echo "npm run dev:orders   - Orders MFE (port 3003)"
echo "npm run dev:profile  - User Profile MFE (port 3004)"
echo ""
echo "🚀 Quick Start:"
echo "---------------"
echo "1. Run: npm run dev"
echo "2. Open: http://localhost:3000"
echo "3. Explore the MFE architecture!"
echo ""
echo "📖 Learning Resources:"
echo "----------------------"
echo "• README.md - Comprehensive documentation"
echo "• Each MFE has its own README with specific details"
echo "• Check webpack.config.js files to understand Module Federation"
echo ""
print_warning "Note: Make sure ports 3000-3004 are available before starting"
echo ""
print_status "Happy learning! 🎓" 