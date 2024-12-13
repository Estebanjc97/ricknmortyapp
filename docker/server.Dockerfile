FROM node:18-alpine AS builder

WORKDIR /app

COPY ../server/package.json ../server/package-lock.json ./

RUN npm install

COPY ../server .

RUN npm run build

FROM node:18-slim AS production

WORKDIR /app

COPY ../server/package.json ../server/package-lock.json ./

RUN npm install --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]