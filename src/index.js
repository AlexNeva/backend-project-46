import { program } from 'commander';
import genDiff from './genDiff.js';

const app = () => {
  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .option('-f, --format [type]', 'output format', 'stylish')
    .option('--colors', 'Enable colored output')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2, option) => {
      console.log(genDiff(filepath1, filepath2, option.format));
    });

  program.parse();
};

export default app;
