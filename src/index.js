import path from 'node:path';
import fs from 'node:fs';
import getParser from './parsers.js';
import getFormatter from './formatters/index.js';
import buildDiff from './buildDiff.js';

const getPath = (filepath) => path.resolve(process.cwd(), filepath);

const genDiff = (filepath1, filepath2, formatName) => {
  const path1 = getPath(filepath1);
  const path2 = getPath(filepath2);

  const parseredFile1 = getParser(path.extname(path1).slice(1))(fs.readFileSync(path1, 'utf8'));
  const parseredFile2 = getParser(path.extname(path2).slice(1))(fs.readFileSync(path2, 'utf8'));

  const diff = buildDiff(parseredFile1, parseredFile2);

  const format = getFormatter(formatName);

  return format(diff);
};

export default genDiff;
