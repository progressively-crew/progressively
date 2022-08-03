#!/bin/sh

# only useful to create the DB tables in docker-compose.yml
ls -a
npm run db:migrate:dev
npm run start:prod