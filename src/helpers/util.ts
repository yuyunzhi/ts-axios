export function isDate(value: any): boolean {
  return Object.prototype.toString.call(value) === `[object Date]`
}

export function isCommonObject(value: any): any {
  return Object.prototype.toString.call(value) === `[object Object]`
}

// export function isObject(value: any): boolean {
//   return value !== null && typeof value === 'object'
// }

export function extendAixos<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
