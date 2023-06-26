PWD=$(shell pwd)
COMPOSE=docker compose
COMPOSECI=docker compose -f compose.ci.yml
EXECAUTH=$(COMPOSE) exec auth
EXECMAILER=$(COMPOSE) exec mailer
EXECFRONT=$(COMPOSE) exec front
ifeq (up,$(firstword $(MAKECMDGOALS)))
  # use the second argument for "up"
  UP_ENV_FILE := $(wordlist 2, 2, $(MAKECMDGOALS))
  # ...and turn them into do-nothing targets
  $(eval $(UP_ENV_FILE):;@:)
endif


BUFF=docker run -v "$(PWD):/microservices" -w /microservices bufbuild/buf 

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

ssh-mailer:
	$(EXECMAILER) sh

bash-mailer:
	$(EXECMAILER) bash

ssh-front:
	$(EXECFRONT) sh

bash-front:
	$(EXECFRONT) bash

# Logs
logs:
	$(COMPOSE) logs

logs-auth:
	$(COMPOSE) logs auth

logs-mailer:
	$(COMPOSE) logs mailer

logs-front:
	$(COMPOSE) logs front

# Yarn
upgrade-auth:
	$(EXECAUTH) yarn upgrade-interactive

upgrade-latest-auth:
	$(EXECAUTH) yarn upgrade-interactive --latest

upgrade-mailer:
	$(EXECMAILER) yarn upgrade-interactive

upgrade-latest-mailer:
	$(EXECMAILER) yarn upgrade-interactive --latest

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

## Mailer api
lint-mailer:
	$(EXECMAILER) yarn lint

lint-fix-mailer:
	$(EXECMAILER) yarn lint:fix

format-mailer:
	$(EXECMAILER) yarn format

format-fix-mailer:
	$(EXECMAILER) yarn format:fix

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
	$(BUFF) export ./proto --output ./auth/src/proto
	$(BUFF) export ./proto --output ./auth/src/proto

proto-generate: