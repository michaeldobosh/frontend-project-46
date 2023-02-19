import _ from 'lodash';

const isValuesEqual = (str1, str2) => str1 === str2;
const isKeysEqual = (key1, key2) => key1 === key2;

const diff = (file1, file2) => {
  const array1 = Object.keys(file1).map((key) => key);
  const array2 = Object.keys(file2).map((key) => key);
  const keys = _.sortBy([array1, array2].flat());
  keys.forEach((key, i) => {
    const next = keys[i + 1];
    const [value1, value2] = [file1[key], file2[key]];
    if (isKeysEqual(key, next) && isValuesEqual(value1, value2)) {
      delete keys[i];
    }
    if (!isKeysEqual(key, next) && isValuesEqual(value1, value2)) {
      keys[i] = `  ${key}: ${file1[key]}\n`;
    }
    if (isKeysEqual(key, next) && !isValuesEqual(value1, value2)) {
      keys[i] = ` - ${key}: ${file1[key]}\n`;
    }
    if (!isKeysEqual(key, next) && !isValuesEqual(value1, value2)) {
      if (Object.hasOwn(file2, keys[i])) {
        keys[i] = ` + ${key}: ${file2[key]}\n`;
      }
      if (Object.hasOwn(file1, keys[i])) {
        keys[i] = ` - ${key}: ${file1[key]}\n`;
      }
    }
  });
  return `{\n ${keys.join(' ')}}`;
};

export default diff;
