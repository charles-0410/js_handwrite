let source = [
  { name: '张三', age: '18' },
  { name: '张三', age: '18' },
  { name: '李四', age: '20' },
  { name: '王五', age: '21' },
  { name: '老六', age: '18' },
  { name: '王五', age: '21' },
]

/**
 * 使用 filter 和 Map 去重
 * @param {*} arr 去重数组
 * @param {*} uniId 字段
 * @returns
 */
function uniqueFunc(arr, uniId) {
  const res = new Map()
  return arr.filter((item) => !res.has(item[uniId]) && res.set(item[uniId], 1))
}

/**
 * 使用 reduce 去重
 * @param {*} arr 去重数组
 * @param {*} uniId 字段
 * @returns
 */
function uniqueFunc2(arr, uniId) {
  let hash = {}
  return arr.reduce((accum, item) => {
    hash[item[uniId]] ? '' : (hash[item[uniId]] = true && accum.push(item))
    console.log(hash)
    return accum
  }, [])
}

/**
 * 利用 indexOf 方法去重
 * @param {*} arr
 * @returns
 */
function uniqueFunc3(arr) {
  if (!Array.isArray(arr)) {
    return
  }
  let res = []
  for (let i = 0; i < arr.length; i++) {
    if (res.indexOf(arr[i]) === -1) {
      res.push(arr[i])
    }
  }
  return res
}

console.log(uniqueFunc3(source, 'name'))
