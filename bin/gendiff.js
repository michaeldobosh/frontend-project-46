#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/parsers.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => console.log(genDiff(filepath1, filepath2)))
  .option('-f, --format <type>', 'output format', '.txt');

program.parse(process.argv);

export default genDiff;
