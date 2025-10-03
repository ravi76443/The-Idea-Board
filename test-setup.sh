#!/bin/bash

echo "🧪 Idea Board Acceptance Tests"
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to test URL
test_url() {
    local url=$1
    local description=$2
    local expected_status=${3:-200}
    
    echo -n "Testing $description... "
    
    response=$(curl -s -o /dev/null -w "%{http_code}" "$url" 2>/dev/null)
    
    if [ "$response" = "$expected_status" ]; then
        echo -e "${GREEN}✓ PASS${NC} (HTTP $response)"
        return 0
    else
        echo -e "${RED}✗ FAIL${NC} (HTTP $response, expected $expected_status)"
        return 1
    fi
}

# Function to test API endpoint
test_api() {
    local url=$1
    local description=$2
    local method=${3:-GET}
    
    echo -n "Testing API $description... "
    
    if [ "$method" = "POST" ]; then
        response=$(curl -s -X POST "$url" \
            -H "Content-Type: application/json" \
            -d '{"text":"Test idea from acceptance test"}' \
            -w "%{http_code}" 2>/dev/null)
    else
        response=$(curl -s -w "%{http_code}" "$url" 2>/dev/null)
    fi
    
    status_code="${response: -3}"
    
    if [ "$status_code" = "200" ] || [ "$status_code" = "201" ]; then
        echo -e "${GREEN}✓ PASS${NC} (HTTP $status_code)"
        return 0
    else
        echo -e "${RED}✗ FAIL${NC} (HTTP $status_code)"
        return 1
    fi
}

# Wait for services to be ready
echo -e "${YELLOW}Waiting for services to be ready...${NC}"
sleep 10

# Test Docker services
echo ""
echo "1. Testing Docker Services"
echo "------------------------"
echo -n "Checking Docker services... "

if docker-compose ps | grep -q "Up"; then
    echo -e "${GREEN}✓ PASS${NC}"
    passed_services=1
else
    echo -e "${RED}✗ FAIL${NC} - Services not running"
    passed_services=0
fi

# Test Frontend
echo ""
echo "2. Testing Frontend"
echo "------------------"
test_url "http://localhost:3000" "Landing page" && frontend_passed=1 || frontend_passed=0
test_url "http://localhost:3000/app" "Idea Board page" && app_passed=1 || app_passed=0

# Test Backend API
echo ""
echo "3. Testing Backend API"
echo "---------------------"
test_url "http://localhost:4000/health" "Health check" && health_passed=1 || health_passed=0
test_api "http://localhost:4000/api/ideas" "GET ideas" && get_ideas_passed=1 || get_ideas_passed=0
test_api "http://localhost:4000/api/ideas" "POST ideas" "POST" && post_idea_passed=1 || post_idea_passed=0

# Summary
echo ""
echo "🎯 Test Summary"
echo "==============="

total_tests=6
passed_tests=$((passed_services + frontend_passed + app_passed + health_passed + get_ideas_passed + post_idea_passed))

echo "Passed: $passed_tests/$total_tests tests"

if [ $passed_tests -eq $total_tests ]; then
    echo -e "${GREEN}🎉 All tests passed! The Idea Board is working correctly.${NC}"
    echo ""
    echo "🌐 Access URLs:"
    echo "  Frontend: http://localhost:3000"
    echo "  Idea Board: http://localhost:3000/app"
    echo "  API: http://localhost:4000/api/ideas"
    echo ""
    echo "✅ Ready for demo and development!"
else
    echo -e "${RED}❌ Some tests failed. Please check the Docker containers and try again.${NC}"
    echo ""
    echo "🔧 Troubleshooting:"
    echo "  1. Run: docker-compose logs"
    echo "  2. Run: docker-compose restart"
    echo "  3. Run: docker-compose up --build"
fi

exit $([ $passed_tests -eq $total_tests ])
