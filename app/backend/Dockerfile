# Stage 1: Builder (for building the app)
FROM node:18.20.1-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install all dependencies (including dev dependencies)
COPY package*.json tsconfig*.json ./
RUN npm ci  # Use `npm ci` for faster, reproducible installs

# Copy the source code to the container
COPY . .

# Build the project (transpile TypeScript to JavaScript)
RUN npm run build

# Optional: Run tests here (if needed)
# RUN npm test


# Stage 2: Production (for final image)
FROM node:18.20.1-alpine

# Set working directory
WORKDIR /app

# Copy only the necessary output and minimal files from the builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Set environment variables (adjust as needed)
ENV NODE_ENV=production \
    MONGODB_URI=mongodb://mongodb:27017/docker

# Expose the port the app uses
EXPOSE 5050

# Optional: Add a health check to monitor the app's health
HEALTHCHECK CMD curl --fail http://localhost:5050/healthz || exit 1

# Run the app
CMD ["node", "dist/index.js"]
