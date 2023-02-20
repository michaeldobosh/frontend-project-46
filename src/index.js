import _ from 'lodash';
import * as fs from 'fs';
import path from 'node:path';

const isEqual = (str1, str2) => str1 === str2;
export const diff = (file1, file2) => {
  const keys = _.sortBy([Object.keys(file1), Object.keys(file2)].flat());
  keys.forEach((key, i) => {
    const nextKey = keys[i + 1];
    const [value1, value2] = [file1[key], file2[key]];
    const isThereObjectProperty = (object, sign) => {
      if (Object.hasOwn(object, keys[i])) {
        keys[i] = ` ${sign} ${key}: ${object[key]}\n`;
      }
    };
    if (isEqual(key, nextKey) && isEqual(value1, value2)) {
      delete keys[i];
    }
    if (!isEqual(key, nextKey) && isEqual(value1, value2)) {
      keys[i] = `  ${key}: ${file1[key]}\n`;
    }
    if (isEqual(key, nextKey) && !isEqual(value1, value2)) {
      keys[i] = ` - ${key}: ${file1[key]}\n`;
    }
    if (!isEqual(key, nextKey) && !isEqual(value1, value2)) {
      isThereObjectProperty(file2, '+');
      isThereObjectProperty(file1, '-');
    }
  });
  return `{\n ${keys.join(' ')}}`;
};

const genDiff = (filepath1, filepath2) => {
  const obj1 = JSON.parse(fs.readFileSync(path.resolve(filepath1), 'utf-8'));
  const obj2 = JSON.parse(fs.readFileSync(path.resolve(filepath2), 'utf-8'));
  return diff(obj1, obj2);
};

export default genDiff;
