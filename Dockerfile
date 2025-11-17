# Build stage
FROM node:18 AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-slim

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy built application from builder
COPY --from=builder /app/dist ./dist

# Set environment to production
ENV NODE_ENV=production

# Google Cloud Run provides PORT environment variable (default 8080)
# Our app will use this port from the environment
ENV PORT=8080

# Expose port 8080 (Google Cloud Run requirement)
EXPOSE 8080

# Start the application
CMD ["node", "dist/index.js"]
