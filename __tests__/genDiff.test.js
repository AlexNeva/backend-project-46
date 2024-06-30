import fs from 'node:fs';
import path from 'node:path';
import genDiff from '../src/genDiff.js';

let equal;

beforeAll(() => {
  equal = fs.readFileSync(path.resolve(process.cwd(), '__fixtures__/diff.txt'), 'utf8');
});

test('diff json files', () => {
  const data = genDiff('__fixtures__/file1.json', '__fixtures__/file2.json');
  expect(data).toEqual(equal);
});

test('diff YML files', () => {
  const data1 = genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml');
  const data2 = genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml');
  const data3 = genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yml');

  expect(data1).toEqual(equal);
  expect(data2).toEqual(equal);
  expect(data3).toEqual(equal);
});

test('diff YML and json files', () => {
  const data1 = genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.json');
  const data2 = genDiff('__fixtures__/file1.yml', '__fixtures__/file2.json');

  expect(data1).toEqual(equal);
  expect(data2).toEqual(equal);
});
