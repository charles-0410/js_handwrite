// call 使用一个指定的 this 值和一个或多个参数来调用一个函数
// 实现要点：
// ~ this 可能传入null
// ~ 传入不固定个数的参数
// ~ 函数可能有返回值
Function.prototype.MyCall = function (context) {
  let context = context || window
  context.fn = this

  let args = []
  for (let i = 1, len = arguments.length; i < len; i++) {
    args.push(`arguments[${i}]`)
  }

  let result = eval(`context.fn(${args})`)

  delete context.fn
  return result
}

// apply apply和call一样，唯一的区别就是apply是传入一个数组
// 实现要点：
// ~ this 可能传入null
// ~ 传入一个数组
// ~ 函数可能有返回值
Function.prototype.MyApply = function (context, arr) {
  let context = context || window
  context.fn = this

  let result
  if (!arr) {
    result = context.fn()
  } else {
    let args = []
    for (let i = 0, len = arr.length; i < len; i++) {
      args.push(`arr[${i}]`)
    }
    result = eval(`context.fn(${args})`)
  }

  delete context.fn
  return result
}

Function.prototype.MyBind = function (context) {
  let self = this
  let args = Array.prototype.slice.call(arguments, 1)

  let fNOP = function () {}
  let fBound = function () {
    let bindArgs = Array.prototype.slice.call(arguments)
    return self.apply(
      this instanceof fNOP ? this : context,
      args.concat(bindArgs)
    )
  }

  fNOP.prototype = this.prototype
  fBound.prototype = new fNOP()
  return fBound
}
