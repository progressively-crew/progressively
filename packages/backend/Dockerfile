FROM node:18 AS builder
WORKDIR /app

RUN apt-get update || : && apt-get install python -y
RUN apt-get install python3-pip -y

COPY package*.json ./
COPY prisma ./prisma/
RUN npm i -g pnpm
RUN pnpm install

COPY . .
RUN pnpm run build

FROM node:18 AS runner

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prismix.config.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/scripts ./scripts

EXPOSE 4000

CMD [ "npm", "run", "start:prod" ]