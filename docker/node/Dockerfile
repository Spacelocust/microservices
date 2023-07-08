# Development
FROM node:20-alpine3.17

WORKDIR /home/node/api

COPY ./scripts/api.sh /home/node/scripts/

RUN npm install -g pnpm

USER node

ENTRYPOINT [ "/bin/sh", "/home/node/scripts/api.sh" ]