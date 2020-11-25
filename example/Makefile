.PHONY: all dev build

all: build

dev:
	npm run build-dev

build:
	if [ -d bin ]; then rm -r bin; fi
	npm run build
