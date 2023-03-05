import _ from 'lodash';
import getObj from './parsers.js';
import formatSelection from './formatters/index.js';

const describeNode = (object, key, status) => ({ name: key, value: object[key], status });

export const calcDiff = (file1, file2) => {
  const keys = _.uniq([Object.keys(file1), Object.keys(file2)].flat()).sort();
  const tree = keys.reduce((acc, key) => {
    const valueIsObjects = ((typeof file1[key] === 'object') && (typeof file2[key] === 'object'));
    if (valueIsObjects) {
      acc.push({
        name: key,
        value: 'parent',
        status: 'tree',
        children: calcDiff(file1[key], file2[key]),
      });
    } else if (!Object.hasOwn(file1, key)) {
      acc.push(describeNode(file2, key, 'added'));
    } else if (!Object.hasOwn(file2, key)) {
      acc.push(describeNode(file1, key, 'removed'));
    } else if (file1[key] !== file2[key] && !valueIsObjects) {
      acc.push(describeNode(file1, key, 'changed'));
      acc.push(describeNode(file2, key, 'updated'));
    } else {
      acc.push(describeNode(file2, key, 'unchanged'));
    }
    return acc;
  }, []);
  return tree;
};

export default (filepath1, filepath2, formatName = 'stylish') => {
  const diff = { name: 'diff', children: calcDiff(getObj(filepath1), getObj(filepath2)) };
  const formatter = formatSelection(formatName);
  return formatter(diff);
};
