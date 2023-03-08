import _ from 'lodash';

const getValue = (object) => {
  const result = Object.keys(object).reduce((acc, key) => {
    if (_.isObject(object[key])) {
      acc.push(`"${key}":{${getValue(object[key])}}`);
    } else if (!_.isString(object[key])) {
      acc.push(`"${key}":${object[key]}`);
    } else {
      acc.push(`"${key}":"${object[key]}"`);
    }
    return acc;
  }, []);
  return `${result.join()}`;
};

const setValue = (data) => {
  data = _.isString(data) ? `"${data}"` : data;
  return _.isObject(data) ? `{${getValue(data)}}` : `${data}`;
};

const stringify = (object) => {
  const result = object.children.reduce((acc, node) => {
    const { name, oldValue, status } = node;
    if (status === 'tree') {
      acc.push(`{"name":"${name}","children":[${stringify(node)}],"status":"${status}"}`);
    } else if (status === 'updated') {
      acc.push(`{"name":"${name}","oldValue":${setValue(oldValue)},"value":${setValue(node.value)},"status":"${status}"}`);
    } else {
      acc.push(`{"name":"${name}","value":${setValue(node.value)},"status":"${status}"}`);
    }
    return acc;
  }, []);
  return `${result.join()}`;
};

export default stringify;
