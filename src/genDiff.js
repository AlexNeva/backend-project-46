import path from 'node:path';
import fs from 'node:fs';
import sortBy from 'lodash/sortBy.js';
import has from 'lodash/has.js';
import { getParser } from './parsers.js';

const getPath = (filepath) => path.resolve(process.cwd(), filepath);

const genDiff = (filepath1, filepath2) => {
  const path1 = getPath(filepath1);
  const path2 = getPath(filepath2);

  const parseredFile1 = getParser(path.extname(path1))(fs.readFileSync(path1, 'utf8'));
  const parseredFile2 = getParser(path.extname(path2))(fs.readFileSync(path2, 'utf8'));

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
