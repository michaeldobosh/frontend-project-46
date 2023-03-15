import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import gendiff, { getObject } from '../src/index.js';
import getDiff from '../src/getDiff.js';
import structure, { structure2 } from '../__fixtures__/structure.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { file1, file2 } = { file1: 'file1', file2: 'file2' };
const { json, yml, yaml } = { json: '.json', yml: '.yml', yaml: '.yaml' };

const paths = (file, extname) => path.join(__dirname, '..', '__fixtures__', `${file}${extname}`);
const diff = getDiff(getObject(paths(file1, json)), getObject(paths(file2, json)));

test('formatter/stylish', () => {
  expect(gendiff(paths(file1, json), paths(file2, json), 'stylish'))
    .toEqual(structure);
});

test('formatter/plain', () => {
  expect(gendiff(paths(file1, json), paths(file2, json), 'plain'))
    .toEqual(structure2);
});

test('formatter/json', () => {
  expect(gendiff(paths(file1, json), paths(file2, json), 'json'))
    .toEqual(JSON.stringify(diff, null, '  '));
});

test('default formatter/ .json, .yml, .yaml format', () => {
  expect(gendiff(paths(file1, json), paths(file2, yml)))
    .toEqual(structure);
  expect(gendiff(paths(file1, json), paths(file2, yaml)))
    .toEqual(structure);
  expect(gendiff(paths(file1, yml), paths(file2, yaml)))
    .toEqual(structure);
});
