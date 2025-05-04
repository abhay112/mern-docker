# Stage 1: Builder
FROM node:18.20.1-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files and install all deps (including dev)
COPY package*.json tsconfig*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the project (transpile TypeScript to JavaScript)
RUN npm run build

# Optional: Run tests here
# RUN npm test

# Stage 2: Production
FROM node:18.20.1-alpine

# Set working directory
WORKDIR /app

# Copy only the necessary output and minimal files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Optional: Set environment variables
ENV NODE_ENV=production \
    MONGODB_URI=mongodb://mongodb:27017/docker

# Open the port your app uses
EXPOSE 5050

# Run the app
CMD ["node", "dist/index.js"]
