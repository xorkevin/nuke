.PHONY: all build dev lint format clean test devserve

all: build

build:
	npm run --workspaces --if-present build

dev:
	npm run --workspaces --if-present build:dev

lint:
	npm run --workspaces --if-present lint

format:
	npm run --workspaces --if-present format

clean:
	npm run --workspaces --if-present clean

test: build
	npm run --workspaces --if-present test

devserve:
	fsserve serve --config ./packages/example/fsserve.json --base ./packages/example/dist
