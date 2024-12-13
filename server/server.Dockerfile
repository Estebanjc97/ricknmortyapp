FROM node:18-alpine AS build

WORKDIR /app

COPY ./package.json ./package-lock.json ./

RUN npm install

COPY ./ ./

RUN npm run build

FROM node:18-slim AS runner

WORKDIR /app

COPY ./package.json ./package-lock.json ./

RUN npm install --only=production

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]