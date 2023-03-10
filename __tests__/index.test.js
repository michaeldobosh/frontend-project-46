import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import gendiff, { getObject } from '../src/index.js';
import getDiff from '../src/getDiff.js';
import structure, { structure2 } from '../__fixtures__/structure.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const files = ['file1', 'file2'];
const format = ['.json', '.yml', '.yaml'];

const paths = (file, extname) => path.join(__dirname, '..', '__fixtures__', `${file}${extname}`);
const diff = getDiff(getObject(paths(files[0], format[0])), getObject(paths(files[1], format[0])));

test('formatter/stylish', () => {
  expect(gendiff(paths(files[0], format[0]), paths(files[1], format[0]), 'stylish'))
    .toEqual(structure);
});

test('formatter/plain', () => {
  expect(gendiff(paths(files[0], format[0]), paths(files[1], format[0]), 'plain'))
    .toEqual(structure2);
});

test('formatter/json', () => {
  expect(gendiff(paths(files[0], format[0]), paths(files[1], format[0]), 'json'))
    .toEqual(JSON.stringify(diff));
});

test('default formatter/ .json, .yml, .yaml format', () => {
  expect(gendiff(paths(files[0], format[0]), paths(files[1], format[1])))
    .toEqual(structure);
  expect(gendiff(paths(files[0], format[0]), paths(files[1], format[2])))
    .toEqual(structure);
  expect(gendiff(paths(files[0], format[1]), paths(files[1], format[2])))
    .toEqual(structure);
});
