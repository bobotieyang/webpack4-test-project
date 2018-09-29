// import _ from 'lodash';
// console.log(_.map([1,2,3],v => v * 10));

console.log(Object.assign({}, {a: 100}));

let p = new Promise((resolve,reject) => {
  resolve('abc');
});

console.log('Array.prototype.includes', [1,2,300].includes(300));
