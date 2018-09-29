import './global.scss';
import './app.scss';
// import '@babel/polyfill';
// import _ from 'lodash';
import data from './module/data.json';

import './commons';

// 异步加载
// webpack的异步加载依赖Promise
// 并且无法通过babel来转换成 builtIns 方式（不污染全局）
// 需要引入全局的Promise Polyfill
import ('./module/hello').then(module => {
  module.default()
});

import g from './module/global';

console.log('global g is', g.g);

let div = document.createElement('div');
div.id = 'app';
div.innerHTML = 'Hello World!!!!';

document.body.appendChild(div);

// console.log(_.flatten([1,[2,[3,[4]]]]));

console.log([1, 211, 3].map(v => v * 10));

// console.log('bobotie', process.env, process.env.NODE_ENV);

console.log(data);

let {
  x,
  y,
  ...z
} = {
  x: 100,
  y: 200,
  a: 300,
  b: 400
};
console.log(x, y, z);


Promise.resolve('abcd').then(n => console.log('in promise', n));

async function getData() {
  let data = await new Promise((resolve) => {
    setTimeout(() => {
      resolve('from async');
    }, 2000)
  }).then(s => s);
  console.log('async', data);
}

getData();

console.log(this, self, window);
