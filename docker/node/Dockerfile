# Development
FROM node:20-alpine3.17

WORKDIR /home/node/api

COPY ./scripts/api.sh /home/node/scripts/

# COPY --from=nestjs/cli usr/local/bin/nest /usr/local/bin/nest
RUN yarn global add @nestjs/cli

USER node

ENTRYPOINT [ "/bin/sh", "/home/node/scripts/api.sh" ]