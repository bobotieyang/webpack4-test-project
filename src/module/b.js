// import _ from 'lodash';
// console.log(_.fill(Array(3),'a'));

let hw = 'hello world';
console.log(hw, hw.includes('world')); // babel 不会编译 String.prototype.includes方法 需要自己polyfill 最好用 lodash

console.log(Array.from('foo'));// 非实例方法 @babel/runtime-corejs2 会处理
