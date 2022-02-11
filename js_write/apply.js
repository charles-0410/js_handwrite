Function.prototype.apply_ = function (obj, arr) {
  // node 执行环境下没有window
  obj = obj ? Object(obj) : {}
  obj.fn = this
  let result
  if (!arr) {
    obj.fn()
  } else {
    let args = []
    for (let i = 0, len = arr.length; i < len; i++) {
      args.push('arr[' + i + ']')
    }
    // es5需要使用eval方法，es6可以使用拓展运算符
    result = eval('obj.fn(' + args + ')')
  }
  delete obj.fn
  return result
}

// ES6实现
// Function.prototype.apply_ = function (obj, arr) {
//   obj = obj ? Object(obj) : window;
//   obj.fn = this;
//   let result;
//   if (!arr) {
//       result = obj.fn();
//   } else {
//       result = obj.fn(...arr);
//   };

//   delete obj.fn
//   return result;
// };

var name = '时间跳跃'
var obj = {
  name: '听风是风',
}

function fn(a, b, c) {
  console.log(a + b + c + this.name)
}

fn.apply_(obj, ['我的', '名字', '是']) // 我的名字是听风是风
fn.apply_(null, ['我的', '名字', '是']) // 我的名字是时间跳跃
fn.apply_(undefined, ['我的', '名字', '是']) // 我的名字是时间跳跃
