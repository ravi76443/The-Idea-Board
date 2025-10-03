#!/bin/sh

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to start..."
while ! nc -z db 5432; do
  sleep 1
done

echo "PostgreSQL is ready!"

# Run Prisma migrations
echo "Running Prisma migrations..."
npx prisma migrate deploy

echo "Starting the application..."
exec npm start
