const stringify = (object, depth = '') => {
  const result = object.children.reduce((acc, node, i, nodes) => {
    if (typeof node.value === 'string') node.value = `'${node.value}'`;
    const { name, value, status } = node;
    if (status === 'tree') {
      acc.push(`${stringify(node, `${depth}${name}.`)}`);
    } else if (status === 'added' && typeof value === 'object' && value !== null) {
      acc.push(`Property '${depth}${name}' was ${status} with value: [complex value]`);
    } else if (status === 'updated' && typeof value === 'object' && value !== null) {
      acc.push(`Property '${depth}${name}' was ${status}. From ${nodes[i - 1].value} to [complex value]`);
    } else if (status === 'updated' && typeof nodes[i - 1].value === 'object' && value !== null) {
      acc.push(`Property '${depth}${name}' was ${status}. From [complex value] to ${value}`);
    } else if (status === 'removed') {
      acc.push(`Property '${depth}${name}' was ${status}`);
    } else if (status === 'added') {
      acc.push(`Property '${depth}${name}' was ${status} with value: ${value}`);
    } else if (status === 'updated') {
      acc.push(`Property '${depth}${name}' was ${status}. From ${nodes[i - 1].value} to ${value}`);
    }
    return acc;
  }, []);
  return `${result.join('\n')}`;
};

export default (data) => `${stringify(data)}`;
