import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const plain = (object, path = '') => {
  const result = object.children.map(({ name, status }, i, node) => {
    const value = stringify(node[i].value);
    const oldValue = stringify(node[i].oldValue);
    switch (status) {
      case 'tree':
        return `${plain(node[i], `${path}${name}.`)}`;
      case 'added':
        return `Property '${path}${name}' was ${status} with value: ${value}`;
      case 'updated':
        return `Property '${path}${name}' was ${status}. From ${oldValue} to ${value}`;
      case 'removed':
        return `Property '${path}${name}' was ${status}`;
      case 'unchanged':
        return 'unchanged';
      default: return null;
    }
  });
  return `${result.filter((el) => el !== 'unchanged').join('\n')}`;
};

export default plain;
