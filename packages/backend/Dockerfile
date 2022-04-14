FROM node:16-alpine3.14 AS builder
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
RUN npm install

COPY . .
RUN npm run build

FROM node:16-alpine3.14 AS runner

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/scripts ./scripts

EXPOSE 4000
EXPOSE 4001

CMD [ "npm", "run", "start:prod" ]