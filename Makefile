.PHONY: all build clean

all: build

build: clean
	npm run build

clean:
	rm -rf dist

dev:
	npm run build-dev

dev-story:
	npm run storybook
