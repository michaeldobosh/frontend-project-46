import _ from 'lodash';

const calcDiff = (file1, file2) => {
  const keys = _.sortBy(_.union(Object.keys(file1), Object.keys(file2)));
  return keys.map((key) => {
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return { name: key, status: 'tree', children: calcDiff(file1[key], file2[key]) };
    }
    if (!_.has(file1, key)) return { name: key, value: file2[key], status: 'added' };
    if (!_.has(file2, key)) return { name: key, value: file1[key], status: 'removed' };
    if (file1[key] !== file2[key]) {
      return {
        name: key,
        oldValue: file1[key],
        value: file2[key],
        status: 'updated',
      };
    }
    return { name: key, value: file2[key], status: 'unchanged' };
  });
};

export default (file1, file2) => ({ name: 'diff', children: calcDiff(file1, file2) });
