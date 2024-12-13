FROM node:18-alpine AS build

WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY ./ ./

RUN npm run build

FROM node:18-slim AS runner

WORKDIR /app

COPY --from=build /app/dist /app/dist
COPY --from=build /app/package*.json ./

RUN npm install --only=production

EXPOSE 4200

CMD ["node", "dist/server/server.mjs"]
