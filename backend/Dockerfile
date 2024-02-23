FROM node:21-alpine

# Enable bash
RUN apk add --no-cache bash

# Create the app dir
RUN mkdir /app
WORKDIR /app

# Create app dir
RUN chown node:node /app

# Use unprivileged user
USER node

# COPY package.json ./
COPY --chown=node:node package.json ./
COPY --chown=node:node package-lock.json ./
COPY --chown=node:node GQLCodeGenConfig.ts ./
# COPY startup.sh ./
# COPY GQLCodeGenConfig.ts ./

RUN npm ci && \
    npx prisma generate 

# Add app
COPY --chown=node:node . ./

EXPOSE 4000 
EXPOSE 5000

CMD ["/bin/bash", "/app/startup.sh"]