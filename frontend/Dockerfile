FROM node:21-alpine

# Enable bash
RUN apk add --no-cache bash

RUN npm install -g serve

# Create the app dir
RUN mkdir /app
WORKDIR /app

RUN chown node:node /app

USER node

# Install app dependencies
COPY --chown=node:node package.json ./
COPY --chown=node:node package-lock.json ./
RUN npm ci

# Add app
COPY --chown=node:node . ./

RUN dos2unix entrypoint.sh

EXPOSE 3000

# Start app
CMD ["/bin/bash", "entrypoint.sh"]