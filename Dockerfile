# syntax=docker/dockerfile:1
FROM node:22-alpine AS base

# --------- Install deps ---------
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# --------- Build the app ---------
FROM base AS builder
WORKDIR /app

# Declare build arguments
ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_AWS_BUCKET_FOLDER
ARG NEXT_PUBLIC_AWS_BASE_URL
ARG DB_SSL_ENABLED

# Set them as environment variables so they are available during npm run build
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=$NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_AWS_BUCKET_FOLDER=$NEXT_PUBLIC_AWS_BUCKET_FOLDER
ENV NEXT_PUBLIC_AWS_BASE_URL=$NEXT_PUBLIC_AWS_BASE_URL
ENV DB_SSL_ENABLED=$DB_SSL_ENABLED

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Use build-time secrets (available only during this RUN command)
RUN --mount=type=secret,id=stripe_secret_key,env=STRIPE_SECRET_KEY \
    --mount=type=secret,id=postgres_user,env=POSTGRES_USER \
    --mount=type=secret,id=postgres_host,env=POSTGRES_HOST \
    --mount=type=secret,id=postgres_pass,env=POSTGRES_PASS \
    --mount=type=secret,id=postgres_database,env=POSTGRES_DATABASE \
    --mount=type=secret,id=postgres_port,env=POSTGRES_PORT \
    npm run build

# --------- Final prod image ---------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
    
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
    
# Copy the public directory with the correct ownership
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
    
# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
    
USER nextjs
    
EXPOSE 3000
    
ENV PORT=3000
    
CMD ["node", "server.js"]
