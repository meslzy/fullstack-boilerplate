FROM node:alpine as base

RUN apk update
RUN apk add --no-cache libc6-compat

ARG APP_NAME=${APP_NAME}
ENV APP_NAME=${APP_NAME}

ENV NEXT_TELEMETRY_DISABLED=1
ENV TURBO_TELEMETRY_DISABLED=1
ENV CHOKIDAR_USEPOLLING=true

# Development runner stage
FROM base as development

WORKDIR /app

COPY . .

RUN npm install

CMD npx turbo run dev --filter=${APP_NAME}...

# Production builder stage
FROM base as builder

WORKDIR /app

RUN npm install -g turbo@2

COPY . .

RUN turbo prune ${APP_NAME} --docker

# Production installer stage
FROM base as installer

WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json .
RUN npm install --omit=dev

COPY --from=builder /app/out/full/ .

RUN npx turbo run build --filter=${APP_NAME}...

# Production runner stage
FROM base as production

WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

USER nextjs

COPY --from=installer --chown=nextjs:nodejs /app/apps/${APP_NAME}/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/${APP_NAME}/.next/static ./apps/${APP_NAME}/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/${APP_NAME}/public ./apps/${APP_NAME}/public

CMD node apps/${APP_NAME}/server.js