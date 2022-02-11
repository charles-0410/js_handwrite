Object.MyAssign = function (target, ...source) {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object')
  }
  let ret = Object(target)
  source.forEach(function (obj) {
    if (obj != null) {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          ret[key] = obj[key]
        }
      }
    }
  })
  return ret
}

console.log(Object.assign({ a: 123 }, { b: 321 }))
console.log(Object.MyAssign({ a: 123 }, { b: 321 }))
