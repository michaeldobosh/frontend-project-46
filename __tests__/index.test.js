import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const files = ['file1.json', 'file2.json', 'file3.json', 'file4.json'];
const pathFile = (file) => path.join(__dirname, '..', 'src', '__fixtures__', file);

test('gendiff', () => {
  expect(gendiff(pathFile(files[0]), pathFile(files[1])))
    .toEqual(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
  expect(gendiff(pathFile(files[2]), pathFile(files[3])))
    .toEqual(`{
  - age: 18
  + age: 32
  - city: Boston
  + city: New-York
  - hobby: music
  + hobby: IT, music, skiing
    name: Michael
  + salary: 30000$
    sex: male
  - status: unmarried
  - weight: 78kg
  + weight: 86kg
  - work: false
  + work: true
}`);
});
