const isObject = (value) => typeof value === 'object' && value !== null;

const stylish = (data, indent = ' ', length = 4) => {
  const stringifyLite = (object, deepth = 1) => {
    const tab = indent.repeat(length * deepth);
    const result = Object.keys(object).reduce((acc, key) => {
      if (typeof object[key] === 'object' && object[key] !== null) {
        acc += `\n${tab}${key}: ${stringifyLite(object[key], deepth + 1)}\n${tab}}`;
      } else {
        acc += `\n${tab}${key}: ${object[key]}`;
      }
      return acc;
    }, '');
    return `{${result}`;
  };
  const stringify = (object, deepth = 1) => {
    const tabs = indent.repeat(length * deepth - 2);
    const tab = indent.repeat(length * deepth);
    const result = object.children.reduce((acc, node) => {
      const { name, value, status } = node;
      if (status === 'tree') {
        acc += `\n${tab}${name}: ${stringify(node, deepth + 1)}\n${tab}}`;
      } else if (isObject(value)) {
        if (status === 'added' || status === 'updated') {
          acc += `\n${tabs}+ ${name}: ${stringifyLite(value, deepth + 1)}\n${tab}}`;
        } else if (status === 'removed' || status === 'changed') {
          acc += `\n${tabs}- ${name}: ${stringifyLite(value, deepth + 1)}\n${tab}}`;
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

  return `${stringify(data)}\n}`;
};

export default stylish;
