#
# Makefile
#
# for development environment make dev
# for production environment make prd
#
CUSTOM_PORT ?= 80
APP = tech-pizza-delivery-waiter
#
# build development environment
development:
	docker compose -f docker/development/docker-compose.yml -p $(APP)-dev down && \
	docker compose -f docker/development/docker-compose.yml -p $(APP)-dev rm -f && \
	docker compose -f docker/development/docker-compose.yml -p $(APP)-dev build --no-cache && \
	APP_PORT=$(CUSTOM_PORT) docker compose -f docker/development/docker-compose.yml -p $(APP)-dev up -d --remove-orphans && \
	docker image prune -f --filter="dangling=true"
#
# build production environment
production:
	docker compose -f docker/production/docker-compose.yml -p $(APP)-dev down && \
	docker compose -f docker/production/docker-compose.yml -p $(APP)-dev rm -f && \
	docker compose -f docker/production/docker-compose.yml -p $(APP)-dev build --no-cache && \
	APP_PORT=$(CUSTOM_PORT) docker compose -f docker/production/docker-compose.yml -p $(APP)-dev up -d --remove-orphans && \
	docker image prune -f --filter="dangling=true"
#
