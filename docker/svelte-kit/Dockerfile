FROM node:current-alpine3.17

WORKDIR /home/node/svelte-kit

COPY ./scripts/front.sh /home/node/scripts/

USER node

ENTRYPOINT [ "/bin/sh", "/home/node/scripts/front.sh" ]
