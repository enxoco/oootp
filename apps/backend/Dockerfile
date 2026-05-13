FROM node:24-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/backend/package.json ./apps/backend/
COPY apps/frontend/package.json ./apps/frontend/
RUN npm ci

COPY . .
RUN npm run build -w @oootp/backend

FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/apps/backend/build ./
COPY apps/backend/docker-entrypoint.sh ./
RUN npm install --omit=dev && chmod +x docker-entrypoint.sh

EXPOSE 3333
ENTRYPOINT ["./docker-entrypoint.sh"]
