Function.prototype.call_ = function (obj) {
  // node 环境下没有window
  obj = obj ? Object(obj) : {}
  let args = []
  for (let i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']')
  }
  obj.fn = this
  // es5需要使用eval方法，es6可以使用拓展运算符
  let result = eval('obj.fn(' + args + ')')
  delete obj.fn
  return result
}

// ES6实现
// Function.prototype.call_ = function (obj) {
//   obj = obj ? Object(obj) : window;
//   obj.fn = this;
//   // 利用拓展运算符直接将arguments转为数组
//   let args = [...arguments].slice(1);
//   let result = obj.fn(...args);

//   delete obj.fn
//   return result;
// };

var name = '我我我'
let obj = {
  name: '听风是风',
}

function fn(a, b, c) {
  console.log(a + b + c + this.name)
}

fn.call_(obj, '我的', '名字', '是')
fn.call_(null, '我的', '名字', '是')
fn.call_(undefined, '我的', '名字', '是')
