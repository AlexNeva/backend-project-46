import path from 'node:path';
import fs from 'node:fs';
import sortBy from 'lodash/sortBy.js';
import has from 'lodash/has.js';
import isPlainObject from 'lodash/isPlainObject.js';
import getParser from './parsers.js';
import getFormatter from './formatters/index.js';

const getPath = (filepath) => path.resolve(process.cwd(), filepath);

const genDiff = (filepath1, filepath2, formatName) => {
  const path1 = getPath(filepath1);
  const path2 = getPath(filepath2);

  const parseredFile1 = getParser(path.extname(path1))(fs.readFileSync(path1, 'utf8'));
  const parseredFile2 = getParser(path.extname(path2))(fs.readFileSync(path2, 'utf8'));

  const iter = (obj1, obj2) => {
    const allKeys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
    const allSorteredKeys = sortBy([...allKeys]);

    return allSorteredKeys.reduce((acc, key) => {
      if (
        has(obj1, key)
        &&
        has(obj2, key)
        &&
        isPlainObject(obj1[key])
        &&
        isPlainObject(obj2[key])
      ) {
        return [...acc, { name: key, children: iter(obj1[key], obj2[key]) }];
      }

      if (has(obj1, key) && !has(obj2, key)) {
        return [...acc, { name: key, type: 'removed', oldValue: obj1[key] }];
      }

      if (!has(obj1, key) && has(obj2, key)) {
        return [...acc, { name: key, type: 'added', newValue: obj2[key] }];
      }

      if (obj1[key] !== obj2[key]) {
        return [
          ...acc,
          {
            name: key,
            type: 'updated',
            oldValue: obj1[key],
            newValue: obj2[key],
          },
        ];
      }

      return [...acc, { name: key, type: 'unchanged', oldValue: obj1[key] }];
    }, []);
  };

  const diff = iter(parseredFile1, parseredFile2);

  const formatter = getFormatter(formatName);

  return formatter(diff);
};

export default genDiff;
