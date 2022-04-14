
FROM node:16-alpine3.14 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

ENV NODE_ENV=production

COPY . .
RUN npm run build

FROM node:16-alpine3.14 AS runner

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["npm","run", "start"]