.PHONY: all lint publish

all: lint

lint:
	npm run lint

publish: lint
	npm publish

.PHONY: dev

dev-story:
	npm run storybook
