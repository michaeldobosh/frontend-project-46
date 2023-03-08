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
    const { name, status } = node;
    const value = _.isObject(node.value) ? `${getValue(node.value, deepth + 1)}\n${tab}}` : `${node.value}`;
    const oldValue = _.isObject(node.oldValue) ? `${getValue(node.oldValue, deepth + 1)}\n${tab}}` : `${node.oldValue}`;
    if (status === 'tree') {
      acc += `\n${tab}${name}: ${stringify(node, deepth + 1)}\n${tab}}`;
    } else if (status === 'added') {
      acc += `\n${tabs}+ ${name}: ${value}`;
    } else if (status === 'updated') {
      acc += `\n${tabs}- ${name}: ${oldValue}`;
      acc += `\n${tabs}+ ${name}: ${value}`;
    } else if (status === 'removed') {
      acc += `\n${tabs}- ${name}: ${value}`;
    } else {
      acc += `\n${tab}${name}: ${value}`;
    }
    return acc;
  }, '');
  return `{${result}`;
};

export default (data) => `${stringify(data)}\n}`;
