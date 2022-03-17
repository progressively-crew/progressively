FROM node:16-alpine3.14
WORKDIR /usr/local/src/app

ENV BACKEND_URL="http://localhost:4000"
ENV SESSION_SECRET="abcd"

COPY . .
RUN \
  npm i \
  && npm run build
EXPOSE 3000

CMD ["npm","run", "start"]