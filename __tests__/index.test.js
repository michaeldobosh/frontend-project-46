import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import gendiff, { calcDiff } from '../src/index.js';
import getObj from '../src/parsers.js';
import structure, { structure2 } from '../src/__fixtures__/structure.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const files = ['file1', 'file2', 'file3', 'file4'];
const format = ['.json', '.yml', '.yaml'];

const paths = (file, extname) => path.join(__dirname, '..', 'src', '__fixtures__', `${file}${extname}`);
const diff = { name: 'diff', children: calcDiff(getObj(paths(files[2], format[0])), getObj(paths(files[3], format[0]))) };

test('getDiff/nested objects', () => {
  const prop = ['children', 'status', 'tree', 'value', 'name', null];
  expect(diff[prop[0]][0][prop[0]][4]).toHaveProperty(prop[3], null);
  expect(diff[prop[0]][0][prop[0]]).toHaveProperty([1], { name: 'setting1', value: 'Value 1', status: 'unchanged' });
  expect(diff[prop[0]][1]).toHaveProperty(prop[4], 'group1');
  expect(diff[prop[0]][1][prop[0]][1]).toHaveProperty(prop[1], 'updated');
  expect(diff[prop[0]][2]).toHaveProperty([prop[3]], { abc: 12345, deep: { id: 45 } });
  expect(diff[prop[0]][3]).toHaveProperty([prop[1]], 'added');
});

test('formatter/stylish', () => {
  expect(gendiff(paths(files[2], format[0]), paths(files[3], format[0]), 'stylish'))
    .toEqual(structure);
});

test('formatter/plain', () => {
  expect(gendiff(paths(files[2], format[0]), paths(files[3], format[0]), 'plain'))
    .toEqual(structure2);
});

test('formatter/json', () => {
  expect(gendiff(paths(files[2], format[0]), paths(files[3], format[0]), 'json').slice(25, 29))
    .toEqual(':[{"');
  expect(gendiff(paths(files[2], format[0]), paths(files[3], format[0]), 'json').slice(35, 69))
    .toEqual('"common","value":"parent","status"');
  expect(gendiff(paths(files[2], format[0]), paths(files[3], format[0]), 'json').slice(75, 99))
    .toEqual('","children":[{"name":"f');
  expect(gendiff(paths(files[2], format[0]), paths(files[3], format[0]), 'json').slice(1075, 1199))
    .toEqual('nest","value":"str","status":"updated"}]},{"name":"group2","value":{"abc":12345,"deep":{"id":45}},"status":"removed"},{"name');
});

test('gendiff .json, .yml, .yaml format', () => {
  expect(gendiff(paths(files[2], format[0]), paths(files[3], format[1]), 'stylish'))
    .toEqual(structure);
  expect(gendiff(paths(files[2], format[0]), paths(files[3], format[2]), 'plain'))
    .toEqual(structure2);
  expect(gendiff(paths(files[2], format[1]), paths(files[3], format[2]), 'json').slice(1075, 1199))
    .toEqual('nest","value":"str","status":"updated"}]},{"name":"group2","value":{"abc":12345,"deep":{"id":45}},"status":"removed"},{"name');
});
