
FROM node:16-alpine3.14 AS builder
WORKDIR /app

RUN apk add g++ make py3-pip
COPY package*.json ./
RUN npm i -g pnpm
RUN pnpm i

ENV NODE_ENV=production

COPY . .
RUN pnpm run build

FROM node:16-alpine3.14 AS runner

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["npm","run", "start"]