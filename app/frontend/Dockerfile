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

ENV NODE_ENV=production

# API URL for the backend service. while using kubernatese
# NEXT_PUBLIC_API_URL=http://<your-ip>:30001

ENV NEXT_PUBLIC_API_URL=http://<your-ip>:30001

CMD ["npm", "start"]
