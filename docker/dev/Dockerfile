FROM node:24.11.1-alpine3.22

# Toolchain útil para proyectos con node-gyp
RUN apk add --no-cache git openssh-client bash

WORKDIR /app

# devcontainer lo mantiene vivo y luego ejecuta postStartCommand
CMD ["sleep", "infinity"]