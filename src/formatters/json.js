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

const stringify = (object) => {
  const result = object.children.reduce((acc, node) => {
    const { name, status } = node;
    node.value = _.isString(node.value) ? `"${node.value}"` : node.value;
    node.oldValue = _.isString(node.oldValue) ? `"${node.oldValue}"` : node.oldValue;
    const value = _.isObject(node.value) ? `{${getValue(node.value)}}` : `${node.value}`;
    const oldValue = _.isObject(node.oldValue) ? `{${getValue(node.oldValue)}}` : `${node.oldValue}`;
    if (status === 'tree') {
      acc.push(`{"name":"${name}","children":[${stringify(node)}],"status":"${status}"}`);
    } else if (status === 'updated') {
      acc.push(`{"name":"${name}","oldValue":${oldValue},"value":${value},"status":"${status}"}`);
    } else {
      acc.push(`{"name":"${name}","value":${value},"status":"${status}"}`);
    }
    return acc;
  }, []);
  return `${result.join()}`;
};

export default stringify;
