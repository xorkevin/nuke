.PHONY: all build clean

all: build

build:
	npm run --workspaces --if-present build

clean:
	npm run --workspaces --if-present clean
