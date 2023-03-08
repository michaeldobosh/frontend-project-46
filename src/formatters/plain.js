import _ from 'lodash';

const stringify = (object, path = '') => {
  const result = object.children.reduce((acc, node) => {
    const { name, status } = node;
    if (_.isString(node.value)) node.value = `'${node.value}'`;
    if (_.isString(node.oldValue)) node.oldValue = `'${node.oldValue}'`;
    const value = _.isObject(node.value) ? '[complex value]' : node.value;
    const oldValue = _.isObject(node.oldValue) ? '[complex value]' : node.oldValue;
    if (status === 'tree') {
      acc.push(`${stringify(node, `${path}${name}.`)}`);
    } else if (status === 'added') {
      acc.push(`Property '${path}${name}' was ${status} with value: ${value}`);
    } else if (status === 'updated') {
      acc.push(`Property '${path}${name}' was ${status}. From ${oldValue} to ${value}`);
    } else if (status === 'removed') {
      acc.push(`Property '${path}${name}' was ${status}`);
    }
    return acc;
  }, []);
  return `${result.join('\n')}`;
};

export default stringify;
