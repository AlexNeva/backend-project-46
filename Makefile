install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

gendiff:
	node bin/gendiff.js

mock-run:
	gendiff __fixtures__/file1.yaml __fixtures__/file2.yaml

mock-run-plain:
	gendiff --format plain __fixtures__/file1.yaml __fixtures__/file2.yaml

mock-run-json:
	gendiff --format json __fixtures__/file.yaml __fixtures__/file2.yaml

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8