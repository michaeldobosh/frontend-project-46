import _ from 'lodash';

const getValue = (object, deepth = 1, indent = ' ') => Object.keys(object).map((key) => {
  const tab = indent.repeat(4 * deepth);
  if (_.isObject(object[key])) {
    return `\n${tab}${key}: {${getValue(object[key], deepth + 1)}\n${tab}}`;
  }
  return `\n${tab}${key}: ${object[key]}`;
}).join('');

const stringify = (object, deepth = 1, indent = ' ') => {
  const tabs = indent.repeat(4 * deepth - 2);
  const tab = indent.repeat(4 * deepth);
  const result = object.children.reduce((acc, node) => {
    const { name, oldValue, status } = node;
    const setValue = (data) => (_.isObject(data) ? `{${getValue(data, deepth + 1)}\n${tab}}` : `${data}`);
    switch (status) {
      case 'tree': return `${acc}\n${tab}${name}: ${stringify(node, deepth + 1)}\n${tab}}`;
      case 'added': return `${acc}\n${tabs}+ ${name}: ${setValue(node.value)}`;
      case 'updated':
        return `${acc}\n${tabs}- ${name}: ${setValue(oldValue)}\n${tabs}+ ${name}: ${setValue(node.value)}`;
      case 'removed': return `${acc}\n${tabs}- ${name}: ${setValue(node.value)}`;
      default: return `${acc}\n${tab}${name}: ${setValue(node.value)}`;
    }
  }, '');
  return `{${result}`;
};

export default (data) => `${stringify(data)}\n}`;
