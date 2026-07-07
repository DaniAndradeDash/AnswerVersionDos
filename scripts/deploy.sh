#!/bin/bash

# DevOps Deployment Preparation Script
# Usage: ./scripts/deploy.sh

set -e # Exit immediately if a command exits with a non-zero status

echo "--- 🚀 Starting Build Process ---"

# 1. Clean previous build
echo "Cleaning old build files..."
rm -rf out/

# 2. Build the project
echo "Running Next.js build..."
npm run build

# 3. Preparation notice for upload
echo "--- ✅ Build Completed Successfully ---"
echo "Structure of 'out/' directory:"
ls -F out/

echo ""
echo "--- 📋 INSTRUCTIONS FOR DEPLOYMENT ---"
echo "1. Connect to your hosting via FTP/SFTP."
echo "2. Navigate to your 'public_html' directory."
echo "3. DELETE ALL current contents of 'public_html' to avoid conflicts."
echo "4. UPLOAD THE CONTENTS of the 'out/' directory (NOT the folder itself) into 'public_html/'."
echo "5. Ensure folders have 755 permissions and files have 644 permissions."
echo "---------------------------------------"
