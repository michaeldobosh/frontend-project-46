const isObject = (value) => typeof value === 'object' && value !== null;

const stringifyValue = (object) => {
  const result = Object.keys(object).reduce((acc, key) => {
    if (isObject(object[key])) {
      acc.push(`"${key}":{${stringifyValue(object[key])}}`);
    } else if (typeof object[key] !== 'string') {
      acc.push(`"${key}":${object[key]}`);
    } else {
      acc.push(`"${key}":"${object[key]}"`);
    }
    return acc;
  }, []);
  return `${result.join()}`;
};

const stringify = (object) => {
  const structuredData = object.children.reduce((acc, node) => {
    const { name, value, status } = node;
    if (status === 'tree') {
      acc.push(`{"name":"${name}","value":"${value}","status":"${status}","children":[${stringify(node)}]}`);
    } else if (isObject(value)) {
      acc.push(`{"name":"${name}","value":{${stringifyValue(value)}},"status":"${status}"}`);
    } else if (typeof value === 'string') {
      acc.push(`{"name":"${name}","value":"${value}","status":"${status}"}`);
    } else {
      acc.push(`{"name":"${name}","value":${value},"status":"${status}"}`);
    }
    return acc;
  }, []);
  return `${structuredData.join()}`;
};

export default (data) => `{"name":"${data.name}","children":[${stringify(data)}]}`;
