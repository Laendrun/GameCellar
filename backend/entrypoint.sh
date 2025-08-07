#!/bin/sh

# Validate required env vars
# if [ -z "$POSTGRES_USER" ] || [ -z "$POSTGRES_PASSWORD" ] || [ -z "$POSTGRES_DB" ]; then
#   echo "Missing required database environment variables."
#   exit 1
# fi

# Remove when going on another computer
# export NODE_TLS_REJECT_UNAUTHORIZED=0
# export DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@database:5432/${POSTGRES_DB}"

npx prisma generate
npx prisma db push

if [ ! -f ".seeded" ]; then
  echo "Seeding base admin..."
  node prisma/seed_user.js && touch .seeded
fi


node index.js