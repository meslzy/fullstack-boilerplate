# Dev

```bash
docker compose -f docker-compose.dev.yml build --no-cache
docker compose -f docker-compose.dev.yml up --build
docker compose -f docker-compose.dev.yml up
```

# Prod

```bash
docker compose -f docker-compose.prod.yml build --no-cache
docker compose -f docker-compose.prod.yml up --build
docker compose -f docker-compose.prod.yml up
```
