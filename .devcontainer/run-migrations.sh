#!/bin/bash
set -e

#echo "Waiting for database to be ready..."
## Wait for the database to be ready
#until PGPASSWORD=postgres psql -h db -p 5432 -U postgres -c '\q' 2>/dev/null
#do
#  echo "Waiting for database to be ready..."
#  sleep 2
#done
#
#echo "Database is ready! Running migrations..."
#cd /workspace
source ../.env 2>/dev/null || true

# Create database if it doesn't exist
PGPASSWORD=postgres psql -h localhost -U postgres -tc "SELECT 1 FROM pg_database WHERE datname = 'agent_discovery'" | grep -q 1 || PGPASSWORD=postgres psql -h localhost -U postgres -c "CREATE DATABASE agent_discovery"

npm run migrate:up

echo "Migrations completed successfully!"