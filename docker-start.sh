#!/bin/bash
echo "Migrating the database..."
npx drizzle-kit push --config ./drizzle.config.prod.ts
echo "Starting the app..."
node server.js