#!/bin/sh

# only useful to create the DB tables in docker-compose.yml
pnpm run db:prepare
pnpm run start:backend