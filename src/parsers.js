import * as fs from 'fs';
import path from 'node:path';
import yaml from 'js-yaml';
import calcDiff from './calcDiff.js';

const getObject = (filepath) => {
  switch (path.extname(filepath)) {
    case '.json':
      return JSON.parse(fs.readFileSync(path.resolve(filepath), 'utf-8'));
    default:
      return yaml.load(fs.readFileSync(path.resolve(filepath), 'utf-8'));
  }
};

export default (filepath1, filepath2) => calcDiff(getObject(filepath1), getObject(filepath2));
