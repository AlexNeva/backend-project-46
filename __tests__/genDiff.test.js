import fs from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { expect, test } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const testCases = [
  {
    ext1: 'yml',
    ext2: 'yml',
    format: undefined,
    expected: 'stylishDiff.txt',
  },
  {
    ext1: 'yaml',
    ext2: 'yaml',
    format: undefined,
    expected: 'stylishDiff.txt',
  },
  {
    ext1: 'json',
    ext2: 'json',
    format: undefined,
    expected: 'stylishDiff.txt',
  },
  {
    ext1: 'yaml',
    ext2: 'yaml',
    format: 'stylish',
    expected: 'stylishDiff.txt',
  },
  {
    ext1: 'yaml',
    ext2: 'yaml',
    format: 'plain',
    expected: 'plainDiff.txt',
  },
  {
    ext1: 'yaml',
    ext2: 'yaml',
    format: 'json',
    expected: 'jsonDiff.txt',
  },
];

test.each(testCases)('getDiff($ext1, $ext2, $format)', ({
  ext1,
  ext2,
  format,
  expected,
}) => {
  const file1 = getFixturePath(`file1.${ext1}`);
  const file2 = getFixturePath(`file2.${ext2}`);
  expect(genDiff(file1, file2, format)).toEqual(fs.readFileSync(getFixturePath(expected), 'utf-8'));
});
