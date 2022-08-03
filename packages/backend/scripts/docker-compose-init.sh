#!/bin/sh

# only useful to create the DB tables in docker-compose.yml
npm run db:migrate:dev
npm run start:prod