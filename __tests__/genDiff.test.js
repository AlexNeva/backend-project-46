import fs from 'node:fs';
import path from 'node:path';
import genDiff from '../src/genDiff.js';

test('diff compare', () => {
  const data = genDiff('__fixtures__/file1.json', '__fixtures__/file2.json');
  const equal = fs.readFileSync(path.resolve(process.cwd(), '__fixtures__/diff.txt'), 'utf8');

  expect(data).toEqual(equal);
});
