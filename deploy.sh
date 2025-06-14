#!/bin/bash

# Check if this is a single MFE deployment command
if [ "$1" = "deploy" ]; then
    # Load environment variables from .env file
    if [ -f .env ]; then
        echo "📋 Loading environment variables from .env file..."
        export $(grep -v '^#' .env | xargs)
    else
        echo "❌ .env file not found! Please create one with required variables."
        exit 1
    fi
    
    # Deploy specific MFE based on second argument
    case "$2" in
        "header")
            echo "🚀 Deploying Header MFE to S3..."
            cd header-mfe && echo "building header mfe" && npm run build && npm run deploy:s3
            ;;
        "products")
            echo "🚀 Deploying Products MFE to S3..."
            cd products-mfe && echo "building products mfe" && npm run build && npm run deploy:s3
            ;;
        "orders")
            echo "🚀 Deploying Orders MFE to S3..."
            cd orders-mfe && echo "building orders mfe" && npm run build && npm run deploy:s3
            ;;
        "profile")
            echo "🚀 Deploying User Profile MFE to S3..."
            cd user-profile-mfe && echo "building user profile mfe" && npm run build && npm run deploy:s3
            ;;
        "shell")
            echo "🚀 Deploying Shell to S3..."
            cd shell && echo "building shell" && npm run build && npm run deploy:s3
            ;;
        *)
            echo "Usage: ./quick-deploy.sh deploy [header|products|orders|profile|shell]"
            exit 1
            ;;
    esac
    exit 0
fi

# Quick MFE Deployment Script
# Simple version for fast deployments

# Load environment variables from .env file
if [ -f .env ]; then
    echo "📋 Loading environment variables from .env file..."
    export $(grep -v '^#' .env | xargs)
else
    echo "❌ .env file not found! Please create one with required variables."
    exit 1
fi

# Verify required environment variables are set
required_vars=("AWS_ACCESS_KEY_ID" "AWS_SECRET_ACCESS_KEY" "AWS_REGION" "S3_BUCKET_NAME")
for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo "❌ Required environment variable $var is not set in .env file"
        exit 1
    fi
done

echo "🚀 Quick MFE Deployment Starting..."

# Note about S3 bucket configuration
echo "📋 Note: Ensure your S3 bucket allows public read access for the assets to be accessible"
echo "All files will be uploaded with public-read ACL permissions"

# Configure AWS CLI
aws configure set aws_access_key_id "$AWS_ACCESS_KEY_ID"
aws configure set aws_secret_access_key "$AWS_SECRET_ACCESS_KEY"
aws configure set default.region "$AWS_REGION"

echo "📦 Deploying to S3..."
npm run deploy:all:helper

echo "✅ Deployment completed!"
echo "🌐 Shell URL S3: https://${S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/mfe/shell/index.html" 
echo "🌐 Shell URL Cloudfront: https://d27b98gv23gwn2.cloudfront.net/mfe/shell/index.html" 