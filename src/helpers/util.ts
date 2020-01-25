export function isDate(value: any): boolean {
  return Object.prototype.toString.call(value) === `[object Date]`
}

export function isObject(value: any): boolean {
  return value !== null && typeof value === 'object'
}
