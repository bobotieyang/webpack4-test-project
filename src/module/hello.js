import './a';
import './b';

import g from './global';

export default function() {
  console.log('hello world!!!', g.g);
};
