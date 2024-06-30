install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

gendiff:
	node bin/gendiff.js

mock-run:
	gendiff __fixtures__/file1.json __fixtures__/file2.json

test:
	npx jest --coverage