function fn(a, b, c) {
  console.log(a + b + c)
}

let arr = ['我', '哈', '呵呵']
let arr2 = ['arr[' + 0 + ']', 'arr[' + 1 + ']', 'arr[' + 2 + ']']
fn(...arr)
eval('fn(' + arr + ')')
