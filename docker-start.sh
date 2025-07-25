#!/bin/bash
echo "Migrating the database..."
npx drizzle-kit push
echo "Starting the app..."
node server.js