PWD=$(shell pwd)
COMPOSE=docker compose
COMPOSECI=docker compose -f compose.ci.yml
EXECAUTH=$(COMPOSE) exec auth
EXECUSER=$(COMPOSE) exec user
EXECFRONT=$(COMPOSE) exec front
BUFF=docker run --rm -it -v "$(PWD):/microservices" -w /microservices/proto bufbuild/buf
ifeq (up,$(firstword $(MAKECMDGOALS)))
  # use the second argument for "up"
  UP_ENV_FILE := $(wordlist 2, 2, $(MAKECMDGOALS))
  # ...and turn them into do-nothing targets
  $(eval $(UP_ENV_FILE):;@:)
endif

# Starting and stopping the project
start:
	$(COMPOSE) build --force-rm
	$(COMPOSE) up -d --remove-orphans --force-recreate

start-nocache:
	$(COMPOSE) build --force-rm --no-cache
	$(COMPOSE) up -d --remove-orphans --force-recreate

start-ci:
	$(COMPOSECI) build --force-rm --no-cache
	$(COMPOSECI) up -d auth front mongodb mariadb --remove-orphans --force-recreate

up:
ifndef UP_ENV_FILE
	$(COMPOSE) up -d --remove-orphans
else
	$(COMPOSE) --env-file ${UP_ENV_FILE} up -d --remove-orphans
endif

stop:
	$(COMPOSE) stop

down:
	$(COMPOSE) down

restart:
	$(COMPOSE) restart

# SSH
ssh-auth:
	$(EXECAUTH) sh

bash-auth:
	$(EXECAUTH) bash

ssh-user:
	$(EXECUSER) sh

bash-user:
	$(EXECUSER) bash

ssh-front:
	$(EXECFRONT) sh

bash-front:
	$(EXECFRONT) bash

# Logs
logs:
	$(COMPOSE) logs

logs-auth:
	$(COMPOSE) logs auth

logs-user:
	$(COMPOSE) logs user

logs-front:
	$(COMPOSE) logs front

# Yarn
upgrade-auth:
	$(EXECAUTH) yarn upgrade-interactive

upgrade-latest-auth:
	$(EXECAUTH) yarn upgrade-interactive --latest

upgrade-user:
	$(EXECUSER) yarn upgrade-interactive

upgrade-latest-user:
	$(EXECUSER) yarn upgrade-interactive --latest

upgrade-front:
	$(EXECFRONT) yarn upgrade-interactive

upgrade-latest-front:
	$(EXECFRONT) yarn upgrade-interactive --latest

# Lint
## Auth api
lint-auth:
	$(EXECAUTH) yarn lint

lint-fix-auth:
	$(EXECAUTH) yarn lint:fix

format-auth:
	$(EXECAUTH) yarn format

format-fix-auth:
	$(EXECAUTH) yarn format:fix

## User api
lint-user:
	$(EXECUSER) yarn lint

lint-fix-user:
	$(EXECUSER) yarn lint:fix

format-user:
	$(EXECUSER) yarn format

format-fix-user:
	$(EXECUSER) yarn format:fix

## Front
lint-front:
	$(EXECFRONT) yarn lint

lint-fix-front:
	$(EXECFRONT) yarn lint:fix

format-front:
	$(EXECFRONT) yarn format

format-fix-front:
	$(EXECFRONT) yarn format:fix

proto-export: 
	$(BUFF) mod update
	$(BUFF) generate
	$(BUFF) export . --output ../auth-api/src/proto
	$(BUFF) export . --output ../user-api/src/proto