.PHONY: all build clean publish

all: build

build:
	npm run build

clean:
	npm run clean

publish: lint
	npm publish
