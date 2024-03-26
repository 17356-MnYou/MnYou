FROM node:20-alpine3.18 AS base

FROM base as builder
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /usr/src/server
COPY . .
RUN npm install --production
RUN ls
RUN pwd

# Add lockfile and package.json's of isolated subworkspace
FROM base AS runner
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /usr/src/server
COPY --from=builder /usr/src/server/dist ./dist
COPY --from=builder /usr/src/server/node_modules ./node_modules
ENV SERVER_PORT=8080
RUN ls
RUN pwd

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 expressjs
USER expressjs

EXPOSE 8080
CMD [ "node", "./dist/src/index.js" ]
