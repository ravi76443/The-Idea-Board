# Idea Board

A collaborative platform for sharing and voting on innovative ideas. Built with **Next.js**, **TypeScript**, **PostgreSQL**, and **Docker**.

## 🎯 Project Overview

Idea Board consists of two main components:

1. **Marketing Landing Page** (`/`) - A beautiful, responsive homepage showcasing the platform's features
2. **Idea Board Application** (`/app`) - The core interactive application for sharing and voting on ideas

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 14 + React 18 + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript + Prisma ORM
- **Database**: PostgreSQL 15
- **Containerization**: Docker + Docker Compose
- **API**: REST endpoints with rate limiting and validation

### Project Structure
```
Assignment_fullStack/
├── frontend/                 # Next.js frontend application
│   ├── app/                 # App router pages and components
│   ├── components/          # React components
│   ├── lib/                # API utilities and helpers
│   ├── types/              # TypeScript type definitions
│   ├── Dockerfile          # Frontend Docker configuration
│   └── package.json
├── backend/                # Express backend application
│   ├── src/               # Source code
│   │   ├── routes/        # API route handlers
│   │   ├── index.ts       # Application entry point
│   │   └── seed.ts        # Database seeding script
│   ├── prisma/            # Database schema and migrations
│   ├── Dockerfile         # Backend Docker configuration
│   └── package.json
├── docker-compose.yml     # Container orchestration
├── env.example           # Environment variables template
└── README.md            # This file
```

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local development)

### Running with Docker Compose (Recommended)

1. **Clone and setup**
   ```bash
   cd Assignment_fullStack
   cp env.example .env  # Optional: customize environment variables
   ```

2. **Start all services**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend (Idea Board): http://localhost:3000
   - Backend API: http://localhost:4000
   - Database: localhost:5432 (for debugging)

4. **Verify installation**
   ```bash
   curl http://localhost:4000/health
   # Should return: {"status":"OK","timestamp":"..."}
   ```

### Port Configuration

| Service | Port | Description |
|---------|------|-------------|
| Frontend | 3000 | Next.js application |
| Backend | 4000 | Express API server |
| PostgreSQL | 5432 | Database (exposed for debugging) |

## 📚 API Documentation

### Base URL
```
http://localhost:4000/api
```

### Endpoints

#### 1. Health Check
```http
GET /health
```
Returns service health status.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

#### 2. Get All Ideas
```http
GET /api/ideas
```
Returns all ideas sorted by votes (descending), then by creation date (descending).

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "text": "Build a mobile app that helps people find local events",
      "votes": 15,
      "created_at": "2024-01-01T00:00:00.000Z"
    }
  ],
  "count": 10
}
```

#### 3. Create New Idea
```http
POST /api/ideas
Content-Type: application/json

{
  "text": "Your brilliant idea here..."
}
```

**Validation Rules:**
- `text` is required
- `text` must be a non-empty string
- `text` cannot exceed 280 characters
- Input is sanitized to prevent XSS attacks

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "id": 11,
    "text": "Your brilliant idea here...",
    "votes": 0,
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "Idea text cannot exceed 280 characters"
}
```

#### 4. Upvote Idea
```http
POST /api/ideas/:id/upvote
```
Atomically increments the vote count for a specific idea.

**Parameters:**
- `id` (path) - The idea ID to upvote

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "text": "Build a mobile app that helps people find local events",
    "votes": 16,
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": "Idea not found"
}
```

### Rate Limiting
- 100 requests per 15 minutes per IP (production)
- 1000 requests per 15 minutes per IP (development)
- Response when limit exceeded:
```json
{
  "error": "Too many requests from this IP, please try again later."
}
```

## 🗄️ Database Schema

### Ideas Table
```sql
CREATE TABLE ideas (
    id SERIAL PRIMARY KEY,
    text VARCHAR(280) NOT NULL,
    votes INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Indexes
- `idx_ideas_votes` - Performance for sorting by votes
- `idx_ideas_created` - Performance for sorting by creation date
- `idx_ideas_votes_created` - Composite index for default sorting

## 🧪 Testing the Application

### Manual Acceptance Tests

1. **Docker Services Test**
   ```bash
   docker-compose ps
   # All 3 services should be "Up"
   ```

2. **Landing Page Test**
   ```bash
   curl -I http://localhost:3000/
   # Should return HTTP 200
   ```

3. **Idea Board Test**
   ```bash
   curl -I http://localhost:3000/app
   # Should return HTTP 200
   ```

4. **API Tests**
   ```bash
   # Test API health
   curl http://localhost:4000/health
   
   # Get all ideas
   curl http://localhost:4000/api/ideas
   
   # Create new idea
   curl -X POST http://localhost:4000/api/ideas \
     -H "Content-Type: application/json" \
     -d '{"text":"Test idea"}'
   
   # Upvote idea (replace 1 with actual idea ID)
   curl -X POST http://localhost:4000/api/ideas/1/upvote
   ```

### Browser Testing

1. Navigate to http://localhost:3000
2. Verify landing page displays with hero, features, and CTA
3. Click "Get Started" to navigate to `/app`
4. Submit a new idea using the form
5. Verify the idea appears in the list
6. Click the upvote button and verify count increments
7. Refresh the page and verify data persists

## 🔧 Development

### Local Development Setup

1. **Start Database**
   ```bash
   docker-compose up db -d
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp ../env.example .env
   npx prisma generate
   npx prisma migrate dev
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Environment Variables

Copy `env.example` to `.env` and customize:

```bash
# Database Configuration
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=idea_board
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/idea_board?schema=public

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:4000
FRONTEND_URL=http://localhost:3000
PORT=4000

# Environment
NODE_ENV=development
```

### Database Management

#### Creating Migrations
```bash
cd backend
npx prisma migrate dev --name init    # Generate and apply migration
npx prisma generate                   # Generate Prisma client
npx prisma studio                     # Open Prisma Studio (http://localhost:5555)
```

#### Seeding Database
```bash
cd backend
npm run db:seed
```

#### Reset Database
```bash
cd backend
npx prisma migrate reset --force
npm run db:seed
```

## 🔒 Security Features

- **Input Sanitization**: XSS prevention in idea text
- **Rate Limiting**: Prevents API abuse
- **CORS Protection**: Controlled cross-origin access
- **Helmet**: Security headers middleware
- **SQL Injection Prevention**: Prisma ORM protection
- **Container Security**: Non-root user execution

## 🚀 Performance Features

- **Database Indexing**: Optimized query performance
- **Frontend Polling**: Auto-refresh every 5 seconds
- **Optimistic Updates**: Instant UI feedback
- **Responsive Design**: Mobile-first approach
- **Docker Multi-stage Builds**: Optimized container images
- **Connection Pooling**: Efficient database connections

## 🛠️ Deployment

### Docker Compose Production
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build
```

### Environment-Specific Configurations
- Copy `env.example` to `.env.production`
- Update API URLs for production domains
- Configure production database credentials
- Set `NODE_ENV=production`

### Health Checks
- Container health checks for database readiness
- API health endpoint for monitoring
- Service dependencies ensure proper startup order

## 🎨 UI/UX Features

- **Responsive Design**: Works on mobile, tablet, and desktop
- **Accessibility**: Semantic HTML and keyboard navigation
- **Loading States**: Skeleton screens and progress indicators
- **Error Handling**: User-friendly error messages
- **Real-time Updates**: Live voting and idea submission
- **Character Limit**: Live counter with visual feedback

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Errors**
   ```bash
   # Check if database is running
   docker-compose ps db
   
   # View database logs
   docker-compose logs db
   ```

2. **Port Conflicts**
   ```bash
   # Kill processes using ports 3000, 4000, 5432
   sudo lsof -ti:3000,4000,5432 | xargs kill -9
   ```

3. **Build Failures**
   ```bash
   # Clean Docker cache
   docker system prune -f
   docker-compose build --no-cache
   ```

4. **Permission Issues**
   ```bash
   # Fix file permissions
   sudo chown -R $USER:$USER .
   ```

## 🚦 Future Enhancements

### Potential Features
- **Real-time Notifications**: WebSocket implementation with Socket.IO
- **User Authentication**: Login/register system
- **Advanced Filtering**: Search and category filtering
- **Admin Dashboard**: Moderation and analytics
- **Mobile App**: React Native companion app
- **Integration APIs**: Third-party service connections

### Technical Improvements
- **Unit Tests**: Jest test suite for backend
- **E2E Testing**: Cypress/Playwright tests
- **CI/CD Pipeline**: GitHub Actions for automated testing
- **Monitoring**: Application performance monitoring
- **Backup Strategy**: Automated database backups
- **Kubernetes**: Container orchestration manifests

## 📄 License

This project is developed as a full-stack assignment demonstrating modern web development practices with containerization and responsive design.

---

**Built with ❤️ using Next.js, TypeScript, and Docker**
