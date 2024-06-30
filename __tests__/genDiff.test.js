import fs from 'node:fs';
import path from 'node:path';
import genDiff from '../src/genDiff.js';

let equal;

beforeAll(() => {
  equal = fs.readFileSync(path.resolve(process.cwd(), '__fixtures__/diff.txt'), 'utf8');
});

test('diff .json files', () => {
  const data = genDiff('__fixtures__/file1.json', '__fixtures__/file2.json');

  expect(data).toEqual(equal);
});

test('diff .yaml files', () => {
  const data = genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml');

  expect(data).toEqual(equal);
});
