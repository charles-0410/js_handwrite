function fn(num) {
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(num)
  //   }, 1000)
  // })
  return 123345
}

function* gen() {
  const num1 = yield fn(1)
  console.log('aaa', num1)
  const num2 = yield fn(2)
  console.log('aaa', num2)
  const num3 = yield fn(3)
  console.log('aaa', num3)
  return 123
}

const g = gen()

console.log(g.next(123))
console.log(g.next(321))
console.log(g.next(123))
console.log(g.next())
