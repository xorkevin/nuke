.PHONY: all build dev clean devserve

all: build

build:
	npm run --workspaces --if-present build

dev:
	npm run --workspaces --if-present build:dev

clean:
	npm run --workspaces --if-present clean

devserve:
	fsserve serve --config ./packages/example/fsserve.json --base ./packages/example/dist
