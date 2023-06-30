#!/usr/bin/env bash

# Exit gracefully
trap "exit" SIGINT
trap "exit" SIGTERM

echo "Installing dependencies"

yarn install

echo "Migrations launch"

yarn prisma migrate dev

echo "Starting Auth server"

yarn start:dev