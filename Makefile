install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

gendiff:
	node bin/gendiff.js

mock-run:
	gendiff __fixtures__/deepFile1.yaml __fixtures__/deepFile2.yaml

mock-run-plain:
	gendiff --format plain __fixtures__/deepFile1.yaml __fixtures__/deepFile2.yaml

mock-run-json:
	gendiff --format json __fixtures__/deepFile1.yaml __fixtures__/deepFile2.yaml

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8