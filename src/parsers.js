import path from 'node:path';
import * as fs from 'fs';
import yaml from 'js-yaml';

const getPath = (filepath) => fs.readFileSync(path.resolve(filepath), 'utf-8');

export default (filepath) => {
  if (path.extname(filepath) === '.json') {
    return JSON.parse(getPath(filepath));
  }
  return yaml.load(getPath(filepath));
};
