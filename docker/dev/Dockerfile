FROM node:24.11.1-alpine3.22

# Toolchain útil para proyectos con node-gyp
RUN apk add --no-cache git openssh-client bash flock sudo \
  && echo 'node ALL=(ALL) NOPASSWD: ALL' > /etc/sudoers.d/node \
  && chmod 0440 /etc/sudoers.d/node

WORKDIR /app

# devcontainer lo mantiene vivo y luego ejecuta postStartCommand
CMD ["sleep", "infinity"]