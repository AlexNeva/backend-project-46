import path from 'node:path';
import fs from 'node:fs';
import sortBy from 'lodash/sortBy.js';
import has from 'lodash/has.js';

const getPath = (filepath) => path.resolve(process.cwd(), filepath);
const fileParser = (filepath) => JSON.parse(fs.readFileSync(filepath, 'utf8'));

const genDiff = (filepath1, filepath2) => {
  const path1 = getPath(filepath1);
  const path2 = getPath(filepath2);

  const parseredFile1 = fileParser(path1);
  const parseredFile2 = fileParser(path2);

  const allKeys = new Set([...Object.keys(parseredFile1), ...Object.keys(parseredFile2)]);
  const allSorteredKeys = sortBy([...allKeys]);

  const result = allSorteredKeys.reduce((acc, key) => {
    if (parseredFile1[key] !== parseredFile2[key]) {
      if (has(parseredFile1, key) && !has(parseredFile2, key)) {
        return { ...acc, [`- ${key}`]: parseredFile1[key] };
      }

      if (!has(parseredFile1, key) && has(parseredFile2, key)) {
        return { ...acc, [`+ ${key}`]: parseredFile2[key] };
      }
      return { ...acc, [`- ${key}`]: parseredFile1[key], [`+ ${key}`]: parseredFile2[key] };
    }
    return { ...acc, [key]: parseredFile1[key] };
  }, {});

  return JSON.stringify(result, undefined, 2);
};

export default genDiff;
