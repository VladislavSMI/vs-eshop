.PHONY: build-local
build-local: ## Build the local docker image.
	docker compose build

.PHONY: start-local
start-local: ## Start the local docker container.
	docker compose up -d

.PHONY: stop-local
stop-local: ## Stop the local docker container.
	docker compose down