import path from 'node:path';
import * as fs from 'fs';
import parser from './parsers.js';
import calcDiff from './calcDiff.js';
import formatSelection from './formatters/index.js';

export const getObject = (filepath) => parser(fs.readFileSync(path.resolve(filepath), 'utf-8'), path.extname(filepath));

export default (filepath1, filepath2, formatName = 'stylish') => {
  if (getObject(filepath1) === 'Error' || getObject(filepath1) === 'Error') {
    return 'This format is incorrect, please upload documents in the format: .json, .yml, .yaml';
  }
  const diff = calcDiff(getObject(filepath1), getObject(filepath2));
  return formatSelection(formatName)(diff);
};
