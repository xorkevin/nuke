.PHONY: all build dev clean

all: build

build:
	npm run --workspaces --if-present build

dev:
	npm run --workspaces --if-present build:dev

clean:
	npm run --workspaces --if-present clean
