import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import stylish from '../src/stylish.js';
import gendiff, { calcDiff } from '../src/index.js';
import getObj from '../src/parsers.js';
import structure from '../src/__fixtures__/structure.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const files = ['file1', 'file2', 'file3', 'file4'];
const format = ['.json', '.yml', '.yaml'];

const paths = (file, extname) => path.join(__dirname, '..', 'src', '__fixtures__', `${file}${extname}`);
const diff = calcDiff(getObj(paths(files[2], format[0])), getObj(paths(files[3], format[0])));

test('calcDiff/nested objects', () => {
  const prop = ['common', '+ setting3', '+ setting5', 'key5', 'setting6', 'doge', '+ wow', '- group2', 'deep', null];
  expect(diff[prop[0]]).toHaveProperty(prop[1], null);
  expect(diff[prop[0]][prop[2]]).toHaveProperty(prop[3], 'value5');
  expect(diff[prop[0]][prop[4]][prop[5]]).toHaveProperty(prop[6], 'so much');
  expect(diff[prop[7]]).toHaveProperty(prop[8], { id: 45 });
  expect(diff[prop[7]]).toHaveProperty(prop[8], { id: 45 });
});

test('object stylish', () => {
  expect(stylish(diff, ' ', 4)).toEqual(structure);
});

test('gendiff .json files', () => {
  expect(gendiff(paths(files[2], format[0]), paths(files[3], format[0]))).toEqual(structure);
});

test('gendiff .yml, .yaml files', () => {
  expect(gendiff(paths(files[2], format[1]), paths(files[3], format[1]))).toEqual(structure);
  expect(gendiff(paths(files[2], format[2]), paths(files[3], format[2]))).toEqual(structure);
});
