import { program } from 'commander';
import parser from './parser.js';

const app = () => {
  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .option('-f, --format [type]', 'output format', 'stylish')
    // .argument('<filepath1>')
    // .argument('<filepath2>')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => parser(filepath1, filepath2));
  program.parse(process.argv);
};

export default app;
