#!/bin/bash

# Deployment Verification Script
# Automatically checks if GitHub Pages deployment was successful

set -e  # Exit on error

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 DEPLOYMENT VERIFICATION STARTING..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Get current main branch commit
MAIN_COMMIT=$(git rev-parse --short HEAD)
echo "✓ Main branch commit: $MAIN_COMMIT"

# Fetch latest remote branches
echo "✓ Fetching remote branches..."
git fetch origin gh-pages 2>&1 | grep -v "^From" || true

# Get gh-pages commit and timestamp
GH_PAGES_COMMIT=$(git log origin/gh-pages --oneline -1 --format="%h")
GH_PAGES_TIME=$(git log origin/gh-pages -1 --format="%ar")
GH_PAGES_MESSAGE=$(git log origin/gh-pages -1 --format="%s")

echo "✓ gh-pages commit: $GH_PAGES_COMMIT"
echo "✓ Deployed: $GH_PAGES_TIME"
echo "✓ Message: $GH_PAGES_MESSAGE"
echo ""

# Check if deployment is recent (within last 2 minutes)
GH_PAGES_TIMESTAMP=$(git log origin/gh-pages -1 --format="%ct")
CURRENT_TIMESTAMP=$(date +%s)
TIME_DIFF=$((CURRENT_TIMESTAMP - GH_PAGES_TIMESTAMP))

if [ $TIME_DIFF -lt 120 ]; then
    echo "✅ DEPLOYMENT VERIFIED: gh-pages updated within last 2 minutes"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🎉 DEPLOYMENT SUCCESSFUL!"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "🌐 Site URL: https://pwff123.github.io/FoundersFactory/"
    echo "⏰ Deployed: $GH_PAGES_TIME"
    echo "📦 Commit: $GH_PAGES_COMMIT - $GH_PAGES_MESSAGE"
    echo ""
    echo "Note: It may take 1-2 minutes for GitHub Pages to rebuild."
    echo "      Clear your browser cache if you don't see changes immediately."
    echo ""
    exit 0
else
    echo "⚠️  WARNING: gh-pages branch was last updated $GH_PAGES_TIME"
    echo "   This deployment may not have succeeded properly."
    echo ""
    echo "   Please check:"
    echo "   1. Run 'npm run deploy' manually"
    echo "   2. Check GitHub Actions at: https://github.com/PWFF123/FoundersFactory/actions"
    echo "   3. Verify gh-pages branch at: https://github.com/PWFF123/FoundersFactory/tree/gh-pages"
    echo ""
    exit 1
fi
