import fs from 'node:fs';
import path from 'node:path';
import genDiff from '../src/genDiff.js';

describe('stylish diff', () => {
  let equal;
  const formatName = 'stylish';

  beforeAll(() => {
    equal = fs.readFileSync(path.resolve(process.cwd(), '__fixtures__/deepDiff.txt'), 'utf8');
  });

  test('diff json files', () => {
    const data = genDiff('__fixtures__/deepFile1.json', '__fixtures__/deepFile2.json', formatName);
    expect(data).toEqual(equal);
  });

  test('diff YML files', () => {
    const data1 = genDiff('__fixtures__/deepFile1.yaml', '__fixtures__/deepFile2.yaml', formatName);
    const data2 = genDiff('__fixtures__/deepFile1.yml', '__fixtures__/deepFile2.yml', formatName);
    const data3 = genDiff('__fixtures__/deepFile1.yaml', '__fixtures__/deepFile2.yml', formatName);

    expect(data1).toEqual(equal);
    expect(data2).toEqual(equal);
    expect(data3).toEqual(equal);
  });

  test('diff YML and json files', () => {
    const data1 = genDiff('__fixtures__/deepFile1.yaml', '__fixtures__/deepFile2.json', formatName);
    const data2 = genDiff('__fixtures__/deepFile1.yml', '__fixtures__/deepFile2.json', formatName);

    expect(data1).toEqual(equal);
    expect(data2).toEqual(equal);
  });
});

describe('plain diff', () => {
  let equal;
  const formatName = 'plain';

  beforeAll(() => {
    equal = fs.readFileSync(path.resolve(process.cwd(), '__fixtures__/plainDiff.txt'), 'utf8');
  });

  test('diff json files', () => {
    const data = genDiff('__fixtures__/deepFile1.json', '__fixtures__/deepFile2.json', formatName);
    expect(data).toEqual(equal);
  });

  test('diff YML files', () => {
    const data1 = genDiff('__fixtures__/deepFile1.yaml', '__fixtures__/deepFile2.yaml', formatName);
    const data2 = genDiff('__fixtures__/deepFile1.yml', '__fixtures__/deepFile2.yml', formatName);
    const data3 = genDiff('__fixtures__/deepFile1.yaml', '__fixtures__/deepFile2.yml', formatName);

    expect(data1).toEqual(equal);
    expect(data2).toEqual(equal);
    expect(data3).toEqual(equal);
  });

  test('diff YML and json files', () => {
    const data1 = genDiff('__fixtures__/deepFile1.yaml', '__fixtures__/deepFile2.json', formatName);
    const data2 = genDiff('__fixtures__/deepFile1.yml', '__fixtures__/deepFile2.json', formatName);

    expect(data1).toEqual(equal);
    expect(data2).toEqual(equal);
  });
});
