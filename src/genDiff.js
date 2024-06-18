import path from 'node:path';
import fs from 'node:fs';

const getPath = (filepath) => path.resolve(process.cwd(), filepath);
const fileParser = (filepath) => JSON.parse(fs.readFileSync(filepath, 'utf8'));

const genDiff = (filepath1, filepath2) => {
  const path1 = getPath(filepath1);
  const path2 = getPath(filepath2);

  const parseredFile1 = fileParser(path1);
  const parseredFile2 = fileParser(path2);
  console.log(parseredFile1);
  console.log(parseredFile2);
};

export default genDiff;
