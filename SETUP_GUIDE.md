# 🔧 Backend Setup Guide for Other Devices

## Common Issues & Solutions

### 1. **Database Issues**

**Problem**: `Can't reach database server` or `Database not found`

**Solutions**:
```bash
# Navigate to backend directory
cd backend

# Generate Prisma client
npm install
npx prisma generate

# Create database
npx prisma db push

# Seed with sample data
npm run db:seed
```

### 2. **Dependencies Missing**

**Problem**: `Module not found` or `Cannot resolve module`

**Solutions**:
```bash
# Install all dependencies
npm install

# Build the project
npm run build
```

### 3. **Network/CORS Issues**

**Problem**: Frontend can't connect to backend API

**Current CORS Configuration**:
- Backend: Port 3000
- Frontend: Port 3001
- CORS allows: localhost:3001, localhost:3000

**For different devices**:
1. Update IP addresses in CORS config
2. Use environment variables

### 4. **Port Conflicts**

**Problem**: `Port 3000 already in use`

**Solutions**:
```bash
# Kill process on port 3000
sudo lsof -ti:3000 | xargs sudo kill -9

# Or use different port
PORT=4000 npm run dev
```

## Quick Fix Commands

```bash
# 1. Check if backend is running
curl http://localhost:3000/health

# 2. Check if API returns data
curl http://localhost:3000/api/ideas

# 3. Start fresh
git clone <your-repo>
cd Assignment_fullStack
cd backend
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

## Environment Variables Setup

Create `.env` file in backend directory:
```env
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:3001
```

## Database Files to Check

1. `backend/dev.db` - Should exist after `npx prisma db push`
2. `backend/prisma/schema.prisma` - Should be configured for SQLite
3. `backend/package.json` - Should have all dependencies

## Testing Checklist

- [ ] Backend starts without errors
- [ ] Database file exists (`dev.db`)
- [ ] Health endpoint responds: `GET /health`
- [ ] Ideas API responds: `GET /api/ideas`
- [ ] CORS headers present in responses
- [ ] Frontend can reach backend without CORS errors
