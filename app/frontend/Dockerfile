# Stage 1: build
FROM node:18.20.1-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: run optimized build
FROM node:18.20.1-alpine
WORKDIR /app
COPY --from=builder /app ./
RUN npm prune --production
EXPOSE 3000
CMD ["npm", "start"]
