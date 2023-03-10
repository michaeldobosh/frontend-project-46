import _ from 'lodash';

const getIndent = (deepth, status = 'unchanged', indent = ' ', length = 4) => {
  const signsIndent = status === 'tree' || status === 'unchanged' ? 0 : 2;
  return `\n${indent.repeat(length * deepth - signsIndent)}`;
};

const setValue = (data, handler, deepth) => {
  if (!_.isObject(data)) {
    return data;
  }
  return `{${handler(data, deepth + 1)}${getIndent(deepth)}}`;
};

function stringify(object, deepth = 1) {
  return Object.keys(object).map((key) => {
    const value = setValue(object[key], stringify, deepth);
    return `${getIndent(deepth)}${key}: ${value}`;
  }).join('');
}
function stylish(object, deepth = 1) {
  return object.children.map(({ name, status }, i, node) => {
    const value = setValue(node[i].value, stringify, deepth);
    const oldValue = setValue(node[i].oldValue, stringify, deepth);
    const indent = getIndent(deepth, status);
    switch (status) {
      case 'tree':
        return `${indent}${name}: {${stylish(node[i], deepth + 1)}${indent}}`;
      case 'added':
        return `${indent}+ ${name}: ${value}`;
      case 'updated':
        return `${indent}- ${name}: ${oldValue}${indent}+ ${name}: ${value}`;
      case 'removed':
        return `${indent}- ${name}: ${value}`;
      case 'unchanged':
        return `${indent}${name}: ${value}`;
      default: return null;
    }
  }).join('');
}

export default (object) => `{${stylish(object)}\n}`;
