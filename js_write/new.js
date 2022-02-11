// 1、创建一个空对象
// 2、将空对象原型的内存地址 __proto__ 指向函数的原型对象
// 3、改变构造函数的上下文（this）,并将剩余的参数传入
// 4、在构造函数有返回值的情况进行判断

function myNew() {
  let obj = {}
  let Con = [].shift.call(arguments)
  obj.__proto__ = Con.prototype
  let result = Con.apply(obj, arguments)
  return typeof result === 'object' ? result : obj
}
