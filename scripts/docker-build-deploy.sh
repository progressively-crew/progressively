#!/bin/sh

echo "----- Building the backend image ----"
docker build -t mfrachet/progressively-backend ./packages/backend

echo "----- Deploying the backend image ----"
docker push mfrachet/progressively-backend

echo "----- Building the frontend image ----"
docker build -t mfrachet/progressively-frontend ./packages/frontend

echo "----- Deploying the frontend image ----"
docker push mfrachet/progressively-frontend