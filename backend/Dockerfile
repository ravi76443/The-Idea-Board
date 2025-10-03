# Use Node.js 18 Alpine for smaller image size
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install netcat for wait script
RUN apk add --no-cache netcat-openbsd

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci --only=production

# Install Prisma CLI
RUN npm install -g prisma

# Copy source code and wait script
COPY src ./src/
COPY tsconfig.json ./
COPY wait-for-db.sh ./
RUN chmod +x ./wait-for-db.sh

# Generate Prisma client
RUN npx prisma generate

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 4000

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

# Start application
CMD ["npm", "start"]
