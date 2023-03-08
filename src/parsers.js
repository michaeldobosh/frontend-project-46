import yaml from 'js-yaml';

export default (path, extname) => {
  switch (extname) {
    case '.json': return JSON.parse(path);
    case '.yml': return yaml.load(path);
    case '.yaml': return yaml.load(path);
    default: return 'error';
  }
};
