.PHONY: all lint publish

all: lint

lint:
	npm run lint

publish: lint
	npm publish

.PHONY: dev build

dev:
	npm run build-dev

build:
	if [ -d example/bin ]; then rm -r example/bin; fi
	npm run build
