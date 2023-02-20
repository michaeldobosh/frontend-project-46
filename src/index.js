import _ from 'lodash';
import chalk from 'chalk';
import * as fs from 'fs';
import path from 'node:path';

const isEqual = (str1, str2) => str1 === str2;

const diff = (file1, file2) => {
  const array1 = Object.keys(file1).map((key) => key);
  const array2 = Object.keys(file2).map((key) => key);
  const keys = _.sortBy([array1, array2].flat());
  keys.forEach((key, i) => {
    const nextKey = keys[i + 1];
    const [value1, value2] = [file1[key], file2[key]];
    if (isEqual(key, nextKey) && isEqual(value1, value2)) {
      delete keys[i];
    }
    if (!isEqual(key, nextKey) && isEqual(value1, value2)) {
      keys[i] = `  ${key}: ${file1[key]}\n`;
    }
    if (isEqual(key, nextKey) && !isEqual(value1, value2)) {
      keys[i] = chalk.red(` - ${key}: ${file1[key]}\n`);
    }
    if (!isEqual(key, nextKey) && !isEqual(value1, value2)) {
      if (Object.hasOwn(file2, keys[i])) {
        keys[i] = chalk.blue(` + ${key}: ${file2[key]}\n`);
      }
      if (Object.hasOwn(file1, keys[i])) {
        keys[i] = chalk.red(` - ${key}: ${file1[key]}\n`);
      }
    }
  });
  return `{\n ${keys.join(' ')}}`;
};

const genDiff = (filepath1, filepath2) => {
  const obj1 = JSON.parse(fs.readFileSync(path.resolve(filepath1), 'utf-8'));
  const obj2 = JSON.parse(fs.readFileSync(path.resolve(filepath2)));
  console.log(diff(obj1, obj2));
};

export default genDiff;
