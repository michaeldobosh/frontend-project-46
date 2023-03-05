const isObject = (value) => typeof value === 'object' && value !== null;

const stringifyValue = (object, deepth = 1, indent = ' ', length = 4) => {
  const tab = indent.repeat(length * deepth);
  const result = Object.keys(object).map((key) => {
    if (isObject(object[key])) {
      return `\n${tab}${key}: ${stringifyValue(object[key], deepth + 1)}\n${tab}}`;
    }
    return `\n${tab}${key}: ${object[key]}`;
  });
  return `{${result.join('')}`;
};

const stringify = (object, deepth = 1, indent = ' ', length = 4) => {
  const tabs = indent.repeat(length * deepth - 2);
  const tab = indent.repeat(length * deepth);
  const result = object.children.reduce((acc, node) => {
    const { name, value, status } = node;
    if (status === 'tree') {
      acc += `\n${tab}${name}: ${stringify(node, deepth + 1)}\n${tab}}`;
    } else if (isObject(value)) {
      if (status === 'added' || status === 'updated') {
        acc += `\n${tabs}+ ${name}: ${stringifyValue(value, deepth + 1)}\n${tab}}`;
      } else if (status === 'removed' || status === 'changed') {
        acc += `\n${tabs}- ${name}: ${stringifyValue(value, deepth + 1)}\n${tab}}`;
      }
    } else if (status === 'added' || status === 'updated') {
      acc += `\n${tabs}+ ${name}: ${value}`;
    } else if (status === 'removed' || status === 'changed') {
      acc += `\n${tabs}- ${name}: ${value}`;
    } else {
      acc += `\n${tab}${name}: ${value}`;
    }
    return acc;
  }, '');
  return `{${result}`;
};

export default (data) => `${stringify(data)}\n}`;
