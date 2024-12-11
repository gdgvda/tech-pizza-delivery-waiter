#
# Makefile
#
# for development environment make dev
# for production environment make prd
#
CUSTOM_PORT ?= 3000
APP = tech-pizza-delivery-waiter
#
rebuild:
	docker compose -f docker/production/docker-compose.yml -p $(APP) down && \
	docker compose -f docker/production/docker-compose.yml -p $(APP) rm -f && \
	docker compose -f docker/production/docker-compose.yml -p $(APP) build --no-cache && \
	APP_PORT=$(CUSTOM_PORT) docker compose -f docker/production/docker-compose.yml -p $(APP) up -d --remove-orphans && \
	docker image prune -f --filter="dangling=true"
#
