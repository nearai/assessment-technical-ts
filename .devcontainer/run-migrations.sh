#!/bin/bash
set -e

source ../.env 2>/dev/null || true

npm run migrate:up

echo "Migrations completed successfully!"