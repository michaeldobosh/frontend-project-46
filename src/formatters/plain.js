import _ from 'lodash';

const setValue = (data) => {
  if (_.isString(data)) data = `'${data}'`;
  return _.isObject(data) ? '[complex value]' : data;
};

const stringify = (object, path = '') => {
  const result = object.children.reduce((acc, node) => {
    const { name, oldValue, status } = node;
    if (status === 'tree') {
      acc.push(`${stringify(node, `${path}${name}.`)}`);
    } else if (status === 'added') {
      acc.push(`Property '${path}${name}' was ${status} with value: ${setValue(node.value)}`);
    } else if (status === 'updated') {
      acc.push(`Property '${path}${name}' was ${status}. From ${setValue(oldValue)} to ${setValue(node.value)}`);
    } else if (status === 'removed') {
      acc.push(`Property '${path}${name}' was ${status}`);
    }
    return acc;
  }, []);
  return `${result.join('\n')}`;
};

export default stringify;
