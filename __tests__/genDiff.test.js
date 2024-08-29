import fs from 'node:fs';
import path from 'node:path';
import genDiff from '../src/genDiff.js';

let equal;

beforeAll(() => {
  equal = fs.readFileSync(path.resolve(process.cwd(), '__fixtures__/deepDiff.txt'), 'utf8');
});

test('stylish diff json files', () => {
  const data = genDiff('__fixtures__/deepFile1.json', '__fixtures__/deepFile2.json', 'stylish');
  expect(data).toEqual(equal);
});

test('stylish diff YML files', () => {
  const data1 = genDiff('__fixtures__/deepFile1.yaml', '__fixtures__/deepFile2.yaml', 'stylish');
  const data2 = genDiff('__fixtures__/deepFile1.yml', '__fixtures__/deepFile2.yml', 'stylish');
  const data3 = genDiff('__fixtures__/deepFile1.yaml', '__fixtures__/deepFile2.yml', 'stylish');

  expect(data1).toEqual(equal);
  expect(data2).toEqual(equal);
  expect(data3).toEqual(equal);
});

test('stylish diff YML and json files', () => {
  const data1 = genDiff('__fixtures__/deepFile1.yaml', '__fixtures__/deepFile2.json', 'stylish');
  const data2 = genDiff('__fixtures__/deepFile1.yml', '__fixtures__/deepFile2.json', 'stylish');

  expect(data1).toEqual(equal);
  expect(data2).toEqual(equal);
});
