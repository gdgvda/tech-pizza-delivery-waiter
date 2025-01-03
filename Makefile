IMAGE_NAME = pizza-waiter
CUSTOM_PORT ?= 3000

# Build the Docker image for production
build:
	docker build --no-cache -t $(IMAGE_NAME):prod -f Dockerfile .

# Run the Docker container for production
prod: build
	docker run -d -p $(CUSTOM_PORT):3000 --name $(IMAGE_NAME)_prod $(IMAGE_NAME):prod

# Stop the production container
stop:
	docker stop $(IMAGE_NAME)_prod

# Remove the production container
clean:
	docker rm $(IMAGE_NAME)_prod

# Remove the production image
clean-image:
	docker rmi $(IMAGE_NAME):prod

# Help command to display available targets
help:
	@echo "Available targets:"
	@echo "  build         - Build the Docker image for production"
	@echo "  prod          - Run the Docker container for production"
	@echo "  stop          - Stop the production container"
	@echo "  clean         - Remove the production container"
	@echo "  clean-image   - Remove the production image"
	@echo "  help          - Display this help message"

.PHONY: build production stop clean clean-image help
