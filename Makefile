.PHONY: all setup build buildlib dev lint format clean test devserve

all: build

setup:
	yarn dlx @yarnpkg/sdks base

build:
	yarn workspaces foreachrun -A build

buildlib:
	yarn workspaces foreachrun -R --from '@xorkevin/nuke' build

dev: buildlib
	yarn workspace @xorkevin/nuke-example run build-dev

lint:
	yarn workspaces foreachrun -A lint

format:
	yarn workspaces foreachrun -A format

clean:
	yarn workspaces foreachrun -A clean

test:
	yarn workspaces foreachrun -A test

devserve:
	fsserve serve --config ./packages/example/fsserve.json --base ./packages/example/dist
