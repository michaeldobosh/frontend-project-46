import _ from 'lodash';
import getObj from './parsers.js';
import formatSelection from './formatters/index.js';

const calcDiff = (file1, file2) => {
  const keys = _.uniq([Object.keys(file1), Object.keys(file2)].flat()).sort();
  const tree = keys.reduce((acc, key) => {
    const valueIsObjects = ((typeof file1[key] === 'object') && (typeof file2[key] === 'object'));
    const mkNode = (object, status) => ({ name: key, value: object[key], status });
    if (valueIsObjects) {
      acc.push({
        name: key,
        value: 'parent',
        status: 'tree',
        children: calcDiff(file1[key], file2[key]),
      });
    } else if (!Object.hasOwn(file1, key)) {
      acc.push(mkNode(file2, 'added'));
    } else if (!Object.hasOwn(file2, key)) {
      acc.push(mkNode(file1, 'removed'));
    } else if (file1[key] !== file2[key] && !valueIsObjects) {
      acc.push(mkNode(file1, 'changed'));
      acc.push(mkNode(file2, 'updated'));
    } else {
      acc.push(mkNode(file2, 'unchanged'));
    }
    return acc;
  }, []);
  return tree;
};

export const getDiff = (ob1, ob2) => ({ name: 'diff', children: calcDiff(ob1, ob2) });

export default (filepath1, filepath2, formatName = 'stylish') => {
  const diff = getDiff(getObj(filepath1), getObj(filepath2), formatName);
  const formatter = formatSelection(formatName);
  return formatter(diff);
};
