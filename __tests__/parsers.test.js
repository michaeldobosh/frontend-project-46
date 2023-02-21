import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import gendiff from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const files = ['file1', 'file2', 'file3', 'file4'];
const extname = ['.json', '.yml', '.yaml'];
const pathFile = (file, format) => path.join(__dirname, '..', 'src', '__fixtures__', `${file}${format}`);

test('gendiff .json files', () => {
  expect(gendiff(pathFile(files[0], extname[0]), pathFile(files[1], extname[0])))
    .toEqual(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
  expect(gendiff(pathFile(files[2], extname[0]), pathFile(files[3], extname[0])))
    .toEqual(`{
  - accident: true
  + accident: false
    car: toyota
  - color: black
  + color: silver
  - model: aristo
  + model: camry
  - nalog: big
    yer: 2001
}`);
});

test('gendiff .yaml files', () => {
  expect(gendiff(pathFile(files[0], extname[1]), pathFile(files[1], extname[1])))
    .toEqual(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
  expect(gendiff(pathFile(files[2], extname[2]), pathFile(files[3], extname[2])))
    .toEqual(`{
  - accident: true
  + accident: false
    car: toyota
  - color: black
  + color: silver
  - model: aristo
  + model: camry
  - nalog: big
    yer: 2001
}`);
});
