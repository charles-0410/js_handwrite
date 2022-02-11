// https://juejin.cn/post/6844904025993773063

const arr = [
  1,
  2,
  3,
  4,
  [1, 2, 3, [1, 2, 3, [1, 2, 3]]],
  5,
  'string',
  { name: '弹铁蛋同学' },
]

/**
 * 使用 reduce 实现
 * @param {*} arr
 * @returns
 */
const flat = (arr) => {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flat(cur) : cur)
  }, [])
}

/**
 * 使用栈的思想实现 flat 函数
 * @param {*} arr
 * @returns
 */
const flat2 = (arr) => {
  const result = []
  // 将数组元素拷贝至栈，直接赋值会改变原数组
  const stack = [].concat(arr)
  // 如果栈不为空，则循环遍历
  while (stack.length !== 0) {
    const val = stack.pop()
    if (Array.isArray(val)) {
      // 如果是数组再次入栈，并且展开了一层
      stack.push(...val)
    } else {
      // 如果不是数组就将其取出来放入结果数组中
      result.unshift(val)
    }
  }
  return result
}

console.log(flat2(arr))
