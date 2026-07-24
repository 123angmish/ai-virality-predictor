# Production Dockerfile for AI Virality Predictor Frontend
FROM node:18-alpine

WORKDIR /app

# Copy package.json and lockfile
COPY package*.json ./
RUN npm install

# Copy source code and build Next.js app
COPY . .
ENV NEXT_PUBLIC_API_URL=http://localhost:8000
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
