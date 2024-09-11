import { program } from 'commander';
import genDiff from './genDiff.js';

const app = () => {
  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .option('-f, --format [type]', 'output format', 'stylish')
    .arguments('<filepath1> <filepath2>');
  program.parse();

  const [path1, path2] = program.args;
  const { format } = program.opts();

  console.log(genDiff(path1, path2, format));
};

export default app;
