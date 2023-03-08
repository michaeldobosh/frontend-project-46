import _ from 'lodash';

const getValue = (object) => Object.keys(object).map((key) => {
  switch (typeof object[key]) {
    case 'object': return `"${key}":{${getValue(object[key])}}`;
    case 'string': return `"${key}":"${object[key]}"`;
    default: return `"${key}":${object[key]}`;
  }
});

const setValue = (value) => {
  const newValue = _.isString(value) ? `"${value}"` : value;
  return _.isObject(newValue) ? `{${getValue(newValue)}}` : `${newValue}`;
};

const stringify = (object) => {
  const result = object.children.map((node) => {
    const { name, oldValue, status } = node;
    switch (status) {
      case 'tree':
        return (`{"name":"${name}","status":"${status}","children":[${stringify(node)}]}`);
      case 'updated':
        return (`{"name":"${name}","oldValue":${setValue(oldValue)},"value":${setValue(node.value)},"status":"${status}"}`);
      default: return (`{"name":"${name}","value":${setValue(node.value)},"status":"${status}"}`);
    }
  });
  return `${result.join()}`;
};

export default (object) => `{"name":"diff","children":[${stringify(object)}]}`;
