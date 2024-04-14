.PHONY: all build buildlib dev lint format clean test devserve

all: build

build:
	yarn workspaces foreach -Apt run build

buildlib:
	yarn workspaces foreach -Rpt --from '@xorkevin/nuke' run build

dev: buildlib
	yarn workspace @xorkevin/nuke-example run build-dev

lint:
	yarn workspaces foreach -Apt run lint

format:
	yarn workspaces foreach -Apt run format

clean:
	yarn workspaces foreach -Apt run clean

test:
	yarn workspaces foreach -Apt run test

devserve:
	fsserve serve --config ./packages/example/fsserve.json --base ./packages/example/dist
