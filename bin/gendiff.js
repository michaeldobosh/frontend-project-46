#!/usr/bin/env node
import { program } from 'commander';
import * as fs from 'fs';
import path from 'node:path';
import diff from '../src/index.js';

function genDiff(filepath1, filepath2) {
  const obj1 = JSON.parse(fs.readFileSync(path.resolve(filepath1)));
  const obj2 = JSON.parse(fs.readFileSync(path.resolve(filepath2)));
  const str = diff(obj1, obj2);
  console.log(str);
}

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => genDiff(filepath1, filepath2))
  .option('-f, --format <type>', 'output format', '.txt');

program.parse(process.argv);

export default genDiff;
