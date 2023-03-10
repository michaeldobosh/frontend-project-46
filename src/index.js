import path from 'node:path';
import * as fs from 'fs';
import parse from './parsers.js';
import getDiff from './getDiff.js';
import formatSelection from './formatters/index.js';

export const getObject = (filepath) => parse(fs.readFileSync(path.resolve(filepath), 'utf-8'), path.extname(filepath));

export default (filepath1, filepath2, formatName = 'stylish') => {
  const diff = getDiff(getObject(filepath1), getObject(filepath2));
  return formatSelection(formatName)(diff);
};
