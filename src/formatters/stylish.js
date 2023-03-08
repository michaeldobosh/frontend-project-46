import _ from 'lodash';

const getValue = (object, deepth = 1, indent = ' ') => {
  const tab = indent.repeat(4 * deepth);
  const result = Object.keys(object).map((key) => {
    if (_.isObject(object[key])) {
      return `\n${tab}${key}: ${getValue(object[key], deepth + 1)}\n${tab}}`;
    }
    return `\n${tab}${key}: ${object[key]}`;
  });
  return `{${result.join('')}`;
};

const stringify = (object, deepth = 1, indent = ' ') => {
  const tabs = indent.repeat(4 * deepth - 2);
  const tab = indent.repeat(4 * deepth);
  const result = object.children.reduce((acc, node) => {
    const { name, oldValue, status } = node;
    const setValue = (data) => (_.isObject(data) ? `${getValue(data, deepth + 1)}\n${tab}}` : `${data}`);
    if (status === 'tree') {
      acc += `\n${tab}${name}: ${stringify(node, deepth + 1)}\n${tab}}`;
    } else if (status === 'added') {
      acc += `\n${tabs}+ ${name}: ${setValue(node.value)}`;
    } else if (status === 'updated') {
      acc += `\n${tabs}- ${name}: ${setValue(oldValue)}`;
      acc += `\n${tabs}+ ${name}: ${setValue(node.value)}`;
    } else if (status === 'removed') {
      acc += `\n${tabs}- ${name}: ${setValue(node.value)}`;
    } else {
      acc += `\n${tab}${name}: ${setValue(node.value)}`;
    }
    return acc;
  }, '');
  return `{${result}`;
};

export default (data) => `${stringify(data)}\n}`;
