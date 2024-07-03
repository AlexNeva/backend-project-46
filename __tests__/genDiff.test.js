import fs from 'node:fs';
import path from 'node:path';
import genDiff from '../src/genDiff.js';
import { stylish } from '../src/formatters.js';

let equal;

beforeAll(() => {
  equal = fs.readFileSync(path.resolve(process.cwd(), '__fixtures__/deepDiff.txt'), 'utf8');
});

test('diff json files', () => {
  const data = stylish(genDiff('__fixtures__/deepFile1.json', '__fixtures__/deepFile2.json'));
  expect(data).toEqual(equal);
});

test('diff YML files', () => {
  const data1 = stylish(genDiff('__fixtures__/deepFile1.yaml', '__fixtures__/deepFile2.yaml'));
  const data2 = stylish(genDiff('__fixtures__/deepFile1.yml', '__fixtures__/deepFile2.yml'));
  const data3 = stylish(genDiff('__fixtures__/deepFile1.yaml', '__fixtures__/deepFile2.yml'));

  expect(data1).toEqual(equal);
  expect(data2).toEqual(equal);
  expect(data3).toEqual(equal);
});

test('diff YML and json files', () => {
  const data1 = stylish(genDiff('__fixtures__/deepFile1.yaml', '__fixtures__/deepFile2.json'));
  const data2 = stylish(genDiff('__fixtures__/deepFile1.yml', '__fixtures__/deepFile2.json'));

  expect(data1).toEqual(equal);
  expect(data2).toEqual(equal);
});
