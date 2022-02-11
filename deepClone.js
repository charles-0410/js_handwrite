// 可继续遍历的数据类型
const mapTag = '[object Map]'
const setTag = '[object Set]'
const arrayTag = '[object Array]'
const objectTag = '[object Object]'
const argsTag = '[object Arguments]'
// 不可继续遍历的数据类型
const boolTag = '[object Boolean]'
const dateTag = '[object Date]'
const numberTag = '[object Number]'
const stringTag = '[object String]'
const symbolTag = '[object Symbol]'
const errorTag = '[object Error]'
const regexpTag = '[object RegExp]'
const funcTag = '[object Function]'

const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag]

// 工具函数 - 通用 while 循环
function forEach(array, iteratee) {
  let index = -1
  const length = array.length
  while (++index < length) {
    iteratee(array[index], index)
  }
  return array
}

// 工具函数 - 判断是否为引用类型
function isObject(target) {
  const type = typeof target
  return target !== null && (type === 'object' || type === 'function')
}

// 工具函数 - 获取实际类型
function getType(target) {
  return Object.prototype.toString.call(target)
}

// 工具函数 - 初始化被克隆的对象
function getInit(target) {
  const Ctor = target.constructor
  return new Ctor()
}

// 工具函数 - 克隆Symbol
function cloneSymbol(target) {
  return Object(Symbol.prototype.valueOf.call(target))
}

// 工具函数 - 克隆正则
function cloneReg(target) {
  const reFlags = /\w*$/
  const result = new target.constructor(target.source, reFlags.exec(target))
  result.lastIndex = target.lastIndex
  return result
}

// 工具函数 - 克隆函数
function cloneFunction(func) {
  const bodyReg = /(?<={)(.|\n)+(?=})/m
  const paramReg = /(?<=\().+(?=\)\s+{)/
  const funcString = func.toString()
  if (func.prototype) {
    const param = paramReg.exec(funcString)
    const body = bodyReg.exec(funcString)
    if (body) {
      if (param) {
        const paramArr = param[0].split(',')
        return new Function(...paramArr, body[0])
      } else {
        return new Function(body[0])
      }
    } else {
      return null
    }
  } else {
    return eval(funcString)
  }
}

// 工具函数 - 克隆不可遍历类型
function cloneOtherType(target, type) {
  const Ctor = target.constructor
  switch (type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new Ctor(target)
    case regexpTag:
      return new cloneReg(target)
    case symbolTag:
      return new cloneSymbol(target)
    case funcTag:
      return new cloneFunction(target)
    default:
      return null
  }
}

function clone(target, map = new WeakMap()) {
  // 原始类型直接返回
  if (!isObject(target)) {
    return target
  }
  // 根据不同类型进行操作
  const type = getType(target)
  let cloneTarget
  if (deepTag.includes(type)) {
    cloneTarget = getInit(target, type)
  } else {
    return cloneOtherType(target, type)
  }
  // 处理循环引用
  if (map.get(target)) {
    return target
  }
  map.set(target, cloneTarget)
  // 处理map和set
  if (type === setTag) {
    target.forEach((value) => {
      cloneTarget.add(clone(value))
    })
  }
  if (type === mapTag) {
    target.forEach((value, key) => {
      cloneTarget.set(key, clone(value))
    })
    return cloneTarget
  }
  // 处理对象和数组
  const keys = type === arrayTag ? undefined : Object.keys(target)
  forEach(keys || target, (value, key) => {
    if (keys) {
      key = value
    }
    cloneTarget[key] = clone(target[key], map)
  })
  return cloneTarget
}

const map = new Map()
map.set('key', 'value')
map.set('ConardLi', 'code秘密花园')

const set = new Set()
set.add('ConardLi')
set.add('code秘密花园')

const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: 'child',
  },
  field4: [2, 4, 8],
  empty: null,
  map,
  set,
  bool: new Boolean(true),
  num: new Number(2),
  str: new String(2),
  symbol: Object(Symbol(1)),
  date: new Date(),
  reg: /\d+/,
  error: new Error(),
  func1: () => {
    console.log('code秘密花园')
  },
  func2: function (a, b) {
    return a + b
  },
}

const copy = clone(target)

console.log(target.field4)
