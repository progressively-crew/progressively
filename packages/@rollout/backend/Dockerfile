FROM node:16-alpine3.14
WORKDIR /usr/local/src/app

ENV BACKEND_URL="http://localhost:4000"
ENV FRONTEND_URL="http://localhost:3000"
ENV DATABASE_URL="file:dev.db"
ENV ACCESS_TOKEN_SECRET="abcd"
ENV REFRESH_TOKEN_SECRET="abcd"
ENV REFRESH_TOKEN_EXPIRES="84600"
ENV SMTP_HOST="smtp.ethereal.email"
ENV SMTP_PORT=587
ENV SMTP_SECURE=""
ENV SMTP_USER=""
ENV SMTP_PASSWORD=""

COPY . .
RUN \
  npm i \
  && npm run build \

EXPOSE 4000
EXPOSE 4001

CMD ["node", "./scripts/docker-run.js"]