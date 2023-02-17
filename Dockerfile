FROM node:18 AS builder
WORKDIR /app

RUN apt-get update || : && apt-get install python -y
RUN apt-get install python3-pip -y
RUN npm i -g pnpm

COPY . .

RUN rm -rf packages/!(backend|database)
RUN pnpm install
RUN pnpm run build

FROM node:18 AS runner

COPY --from=builder /app/packages/backend/node_modules ./node_modules
COPY --from=builder /app/packages/backend/package.json ./
COPY --from=builder /app/packages/backend/pnpm-lock.yaml ./
COPY --from=builder /app/packages/backend/dist ./dist
COPY --from=builder /app/packages/database/prisma ./prisma
COPY --from=builder /app/packages/backend/scripts ./scripts

EXPOSE 4000

CMD [ "pnpm", "run", "start:prod" ]