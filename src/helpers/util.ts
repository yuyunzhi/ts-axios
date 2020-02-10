import instantiate = WebAssembly.instantiate

export function isDate(value: any): boolean {
  return Object.prototype.toString.call(value) === `[object Date]`
}

export function isCommonObject(value: any): any {
  return Object.prototype.toString.call(value) === `[object Object]`
}

export function isObject(value: any): boolean {
  return value !== null && typeof value === 'object'
}

export function extendAixos<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isCommonObject(val)) {
          if (isCommonObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge({}, val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}

export function isFormData(val: any): boolean {
  return typeof val !== 'undefined' && val instanceof FormData
}
