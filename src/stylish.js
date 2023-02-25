const stylish = (data, indent = ' ', value = 4) => {
  const stringify = (object, deepth = 1) => {
    const tabs = indent.repeat(value * deepth - 2);
    const tab = indent.repeat(value * deepth);
    const isSpace = (key) => key[0] === '-' || key[0] === '+';
    const result = Object.keys(object).reduce((acc, key) => {
      if (typeof object[key] === 'object' && object[key] !== null && isSpace(key)) {
        acc += `\n${tabs}${key}: ${stringify(object[key], deepth + 1)}\n${tab}}`;
      } else if (typeof object[key] === 'object' && object[key] !== null && !isSpace(key)) {
        acc += `\n${tab}${key}: ${stringify(object[key], deepth + 1)}\n${tab}}`;
      } else if (isSpace(key)) {
        acc += `\n${tabs}${key}: ${object[key]}`;
      } else {
        acc += `\n${tab}${key}: ${object[key]}`;
      }
      return acc;
    }, '');
    return `{${result}`;
  };

  return `${stringify(data)}\n}`;
};

export default stylish;
