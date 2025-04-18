#!/bin/bash
set -e

# Wait for the database to be ready
until pg_isready -h localhost -p 5432 -U postgres
do
  echo "Waiting for database to be ready..."
  sleep 2
done

echo "Database is ready!"