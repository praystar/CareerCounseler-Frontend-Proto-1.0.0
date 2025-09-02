#!/bin/bash

echo "🔍 NAVIRITI Application Status Check"
echo "=================================="

# Check if server is running
if curl -s http://localhost:5173 > /dev/null; then
    echo "✅ Development server is running on http://localhost:5173"
elif curl -s http://localhost:5174 > /dev/null; then
    echo "✅ Development server is running on http://localhost:5174"
elif curl -s http://localhost:5175 > /dev/null; then
    echo "✅ Development server is running on http://localhost:5175"
else
    echo "❌ Development server is not running"
    echo "   Run: npm run dev"
    exit 1
fi

# Check if build works
echo "🔨 Testing build..."
if npm run build > /dev/null 2>&1; then
    echo "✅ Build is successful"
else
    echo "❌ Build failed"
    exit 1
fi

# Check environment file
if [ -f ".env.local" ]; then
    echo "✅ Environment file exists"
    if grep -q "your-project-id" .env.local; then
        echo "⚠️  Supabase not configured (using placeholder values)"
        echo "   Update .env.local with your Supabase credentials"
    else
        echo "✅ Supabase appears to be configured"
    fi
else
    echo "⚠️  No .env.local file found"
    echo "   Create .env.local with your Supabase credentials"
fi

echo ""
echo "🎉 Application is ready!"
echo "📱 Open your browser and visit the running server URL"
echo "📖 See SUPABASE_SETUP.md for configuration instructions"
