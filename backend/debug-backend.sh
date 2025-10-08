#!/bin/bash

echo "🔍 Backend Diagnostics Script"
echo "==============================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the backend directory"
    exit 1
fi

echo "📁 Current directory: $(pwd)"
echo ""

# Check Node.js version
echo "📦 Node.js version:"
node --version
echo ""

# Check if dependencies are installed
echo "📦 Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo "❌ node_modules not found. Run: npm install"
else
    echo "✅ node_modules exists"
fi

# Check if Prisma is installed
echo "🔍 Checking Prisma..."
if [ -d "node_modules/@prisma/client" ]; then
    echo "✅ Prisma client installed"
else
    echo "❌ Prisma client missing. Run: npx prisma generate"
fi

# Check database file
echo "🗄️ Checking database..."
if [ -f "dev.db" ]; then
    echo "✅ Database file (dev.db) exists"
    echo "📊 Database size: $(du -h dev.db | cut -f1)"
else
    echo "❌ Database file (dev.db) missing. Run: npx prisma db push"
fi

# Check if port is available
echo "🌐 Checking port 3000..."
if lsof -ti:3000 > /dev/null 2>&1; then
    echo "⚠️  Port 3000 is in use by:"
    lsof -ti:3000 | xargs ps -p
    echo ""
    echo "💡 Kill the process: sudo lsof -ti:3000 | xargs sudo kill -9"
else
    echo "✅ Port 3000 is available"
fi

echo ""
echo "🧪 Quick Tests"
echo "==============="

# Test if backend can start
echo "🚀 Testing backend startup..."
timeout 5s npm run dev > /tmp/backend_test.log 2>&1 &
BACKEND_PID=$!
sleep 2

if kill -0 $BACKEND_PID 2>/dev/null; then
    echo "✅ Backend started successfully"
    kill $BACKEND_PID 2>/dev/null
    
    echo "🏥 Testing health endpoint..."
    sleep 1
    if curl -s http://localhost:3000/health > /dev/null; then
        echo "✅ Health endpoint responding"
    else
        echo "❌ Health endpoint not responding"
    fi
    
    echo "📝 Testing ideas endpoint..."
    if curl -s http://localhost:3000/api/ideas > /dev/null; then
        echo "✅ Ideas endpoint responding"
        echo "📊 Sample response:"
        curl -s http://localhost:3000/api/ideas | head -c 100
        echo "..."
    else
        echo "❌ Ideas endpoint not responding"
    fi
else
    echo "❌ Backend failed to start"
    echo "📄 Error log:"
    head -20 /tmp/backend_test.log
fi

echo ""
echo "📋 Summary"
echo "=========="
echo "✅ Run these commands if issues found:"
echo "   npm install"
echo "   npx prisma generate" 
echo "   npx prisma db push"
echo "   npm run db:seed"
echo "   npm run dev"
echo ""
echo "🌐 Test URLs:"
echo "   Health: http://localhost:3000/health"
echo "   Ideas:  http://localhost:3000/api/ideas"
echo "   Frontend: http://localhost:3001/ideas"
