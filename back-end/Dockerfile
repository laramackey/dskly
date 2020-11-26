FROM node:12.18.4-alpine AS base
RUN apk update && \
    apk add git
RUN mkdir /app
WORKDIR /app
ADD package-lock.json /app/package-lock.json
ADD package.json /app/package.json
RUN npm ci -q
ADD . /app
RUN npm run build

FROM base AS builder
RUN npm prune --production && rm -rf /app/dist/test

FROM node:12.16.1-alpine3.9 AS release
RUN mkdir /app
WORKDIR /app
COPY --from=builder /app/dist /app
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package.json /app/package.json
RUN npm rebuild
CMD npm start