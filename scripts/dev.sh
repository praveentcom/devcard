#!/bin/bash

# Load environment variables from .env.local if it exists
if [ -f .env.local ]; then
  export $(grep -v '^#' .env.local | xargs)
fi

# Load environment variables from .env if it exists
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Set default port if not specified
PORT=${PORT:-3001}

echo "Starting development server on port $PORT..."
next dev --turbopack --port $PORT
