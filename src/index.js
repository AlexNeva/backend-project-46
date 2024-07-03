import { program } from 'commander';
import genDiff from './genDiff.js';
import { plain, stylish } from './formatters.js';

const app = () => {
  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .option('-f, --format [type]', 'output format', 'stylish')
    .arguments('<filepath1> <filepath2>');
  program.parse(process.argv);

  const [path1, path2] = program.args;
  const { format } = program.opts();
  const formatter = format === 'stylish' ? stylish : plain;

  console.log(formatter(genDiff(path1, path2)));
};

export default app;
