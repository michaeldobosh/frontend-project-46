import _ from 'lodash';

const calcDiff = (file1, file2) => {
  const keys = _.union(Object.keys(file1), Object.keys(file2)).sort();
  const tree = keys.reduce((acc, key) => {
    if (typeof file1[key] === 'object' && typeof file2[key] === 'object') {
      acc.push({ name: key, children: calcDiff(file1[key], file2[key]), status: 'tree' });
    } else if (!_.has(file1, key)) {
      acc.push({ name: key, value: file2[key], status: 'added' });
    } else if (!_.has(file2, key)) {
      acc.push({ name: key, value: file1[key], status: 'removed' });
    } else if (file1[key] !== file2[key]) {
      acc.push({
        name: key,
        oldValue: file1[key],
        value: file2[key],
        status: 'updated',
      });
    } else {
      acc.push({ name: key, value: file2[key], status: 'unchanged' });
    }
    return acc;
  }, []);
  return tree;
};

export default (file1, file2) => ({ name: 'diff', children: calcDiff(file1, file2) });
