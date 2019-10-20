.PHONY: all build clean dev dev-story publish

all: build

build: clean
	npm run build

clean:
	rm -rf dist

dev:
	npm run build-dev

dev-story:
	npm run storybook

publish: build
	npm publish
