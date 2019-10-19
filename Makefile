.PHONY: all build clean dev dev-story

all: build

build: clean
	npm run build

clean:
	rm -rf dist

dev:
	npm run build-dev

dev-story:
	npm run storybook
