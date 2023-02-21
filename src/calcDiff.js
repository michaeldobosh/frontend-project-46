import _ from 'lodash';

const isEqual = (str1, str2) => str1 === str2;
const calcDiff = (file1, file2) => {
  const keys = _.sortBy([Object.keys(file1), Object.keys(file2)].flat());
  keys.forEach((key, i) => {
    const nextKey = keys[i + 1];
    const [value1, value2] = [file1[key], file2[key]];
    const isThereObjectProperty = (object, sign) => {
      if (Object.hasOwn(object, key)) {
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
      isThereObjectProperty(file1, '-');
      isThereObjectProperty(file2, '+');
    }
  });
  return `{\n ${keys.join(' ')}}`;
};

export default calcDiff;
