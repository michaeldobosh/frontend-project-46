import _ from 'lodash';
import getObj from './parsers.js';
import stylish from './stylish.js';

export const calcDiff = (file1 = {}, file2 = {}) => {
  const keys = _.uniq(([Object.keys(file1), Object.keys(file2)].flat()).sort());
  const object = keys.reduce((acc, key) => {
    const valueIsObjects = ((typeof file1[key] === 'object') && (typeof file2[key] === 'object'));
    if (valueIsObjects) {
      acc[key] = calcDiff(file1[key], file2[key]);
    } else if (!Object.hasOwn(file1, key)) {
      acc[`+ ${key}`] = file2[key];
    } else if (!Object.hasOwn(file2, key)) {
      acc[`- ${key}`] = file1[key];
    } else if (file1[key] !== file2[key] && !valueIsObjects) {
      acc[`- ${key}`] = file1[key];
      acc[`+ ${key}`] = file2[key];
    } else {
      acc[key] = file2[key];
    }
    return acc;
  }, {});
  return object;
};

export default (filepath1, filepath2, formatName = 'stylish') => {
  const diff = calcDiff(getObj(filepath1), getObj(filepath2));
  switch (formatName) {
    default: return stylish(diff);
  }
};
