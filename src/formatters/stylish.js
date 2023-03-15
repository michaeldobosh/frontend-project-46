import _ from 'lodash';

const getIndent = (deepth, status = 'unchanged', indent = ' ', length = 4) => {
  const signsIndent = status === 'tree' || status === 'unchanged' ? 0 : 2;
  return `\n${indent.repeat(length * deepth - signsIndent)}`;
};

function stringify(node, deepth = 1) {
  return Object.keys(node).map((key) => {
    const value = !_.isObject(node[key]) ? node[key] : `{${stringify(node[key], deepth + 1)}${getIndent(deepth)}}`;
    return `${getIndent(deepth)}${key}: ${value}`;
  }).join('');
}
function stylish(object, deepth = 1) {
  return object.children.map(({ name, oldValue, status }, i, node) => {
    const indent = getIndent(deepth, status);
    const setValue = (value) => (!_.isObject(value) ? value : `{${stringify(value, deepth + 1)}${getIndent(deepth)}}`);
    switch (status) {
      case 'tree':
        return `${indent}${name}: {${stylish(node[i], deepth + 1)}${indent}}`;
      case 'added':
        return `${indent}+ ${name}: ${setValue(node[i].value)}`;
      case 'updated':
        return `${indent}- ${name}: ${setValue(oldValue)}${indent}+ ${name}: ${setValue(node[i].value)}`;
      case 'removed':
        return `${indent}- ${name}: ${setValue(node[i].value)}`;
      case 'unchanged':
        return `${indent}${name}: ${setValue(node[i].value)}`;
      default: return null;
    }
  }).join('');
}

export default (object) => `{${stylish(object)}\n}`;
