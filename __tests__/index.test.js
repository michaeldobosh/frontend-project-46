import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import gendiff, { getObject } from '../src/index.js';
import calcDiff from '../src/calcDiff.js';
import structure, { structure2 } from '../src/__fixtures__/structure.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const files = ['file1', 'file2', 'file3', 'file4'];
const format = ['.json', '.yml', '.yaml', '.txt'];

const paths = (file, extname) => path.join(__dirname, '..', 'src', '__fixtures__', `${file}${extname}`);
const diff = calcDiff(getObject(paths(files[2], format[0])), getObject(paths(files[3], format[0])));

test('calcDiff/nested objects', () => {
  const prop = ['children', 'status', 'tree', 'value', 'name', null];
  expect(diff[prop[0]][0][prop[0]][3]).toHaveProperty(prop[3], null);
  expect(diff[prop[0]][0][prop[0]]).toHaveProperty([1], { name: 'setting1', value: 'Value 1', status: 'unchanged' });
  expect(diff[prop[0]][1]).toHaveProperty(prop[4], 'group1');
  expect(diff[prop[0]][1][prop[0]][0]).toHaveProperty(prop[1], 'updated');
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
    .toEqual('n":[');
  expect(gendiff(paths(files[2], format[0]), paths(files[3], format[0]), 'json').slice(350, 421))
    .toEqual('alue5"},"status":"added"},{"name":"setting6","children":[{"name":"doge"');
  expect(gendiff(paths(files[2], format[0]), paths(files[3], format[0]), 'json').slice(752, 834))
    .toEqual('me":"foo","value":"bar","status":"unchanged"},{"name":"nest","oldValue":{"key":"va');
  expect(gendiff(paths(files[2], format[0]), paths(files[3], format[0]), 'json').slice(975, 1036))
    .toEqual(':"group3","value":{"deep":{"id":{"number":45}},"fee":100500},');
});

test('gendiff .json, .yml, .yaml format', () => {
  expect(gendiff(paths(files[2], format[0]), paths(files[3], format[1]), 'stylish'))
    .toEqual(structure);
  expect(gendiff(paths(files[2], format[0]), paths(files[3], format[2]), 'plain'))
    .toEqual(structure2);
  expect(gendiff(paths(files[2], format[1]), paths(files[3], format[2]), 'json').slice(752, 834))
    .toEqual('me":"foo","value":"bar","status":"unchanged"},{"name":"nest","oldValue":{"key":"va');
});

test('others format', () => {
  expect(gendiff(paths(files[2], format[3]), paths(files[3], format[2])))
    .toEqual('This format is incorrect, please upload documents in the format: .json, .yml, .yaml');
});
