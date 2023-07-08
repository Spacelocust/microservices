#!/usr/bin/env bash

# Exit gracefully
trap "exit" SIGINT
trap "exit" SIGTERM

echo "Installing dependencies"

pnpm install

pnpm add -g @nestjs/cli

echo "Launching migrations"

pnpm prisma migrate dev

echo "Starting Auth server"

pnpm start:dev