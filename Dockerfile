FROM nginx:alpine AS base

# Development stage
FROM base AS development

COPY ./infra/nginx/conf.d/dev.conf /etc/nginx/conf.d/default.conf

# Production stage
FROM base AS production

COPY ./infra/nginx/conf.d/prod.conf /etc/nginx/conf.d/default.conf