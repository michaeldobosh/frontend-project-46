import stylish from './stylish.js';
import plain from './plain.js';

export default (formatName) => {
  switch (formatName) {
    case 'plain': return plain;
    default: return stylish;
  }
};
