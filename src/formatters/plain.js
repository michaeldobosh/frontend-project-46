import _ from 'lodash';

const setValue = (value) => {
  const newValue = _.isString(value) ? `'${value}'` : value;
  return _.isObject(newValue) ? '[complex value]' : newValue;
};

const stringify = (object, path = '') => {
  const result = object.children.map((node) => {
    const { name, oldValue, status } = node;
    switch (status) {
      case 'tree':
        return `${stringify(node, `${path}${name}.`)}`;
      case 'added':
        return `Property '${path}${name}' was ${status} with value: ${setValue(node.value)}`;
      case 'updated':
        return `Property '${path}${name}' was ${status}. From ${setValue(oldValue)} to ${setValue(node.value)}`;
      case 'unchanged':
        return '';
      default: return `Property '${path}${name}' was ${status}`;
    }
  });
  return `${result.filter((el) => el !== '').join('\n')}`;
};

export default stringify;
