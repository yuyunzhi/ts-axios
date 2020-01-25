import { isObject, isDate } from './util'

function hasParams(params: any): boolean {
  if (JSON.stringify(params) === '{}') {
    return false
  } else if (params === undefined || params === null) {
    return false
  } else {
    return true
  }
}

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
}

/**
 *
 * @param url
 * @param
 * @result：
 *  params={a:1,b:2} ==>?a=1&b=2
 *  params={foo: ['bar', 'baz']}==> ?foo[]=bar&foo[]=baz
 *  params={foo:{bar:'baz'}} ==> ?foo=%7B%22bar%22:%22baz%22%7D
 *  params={date = new Date()}==> ?date=2019-04-01T05:55:39.030Z
 *  对于字符 @、:、$、,、、[、]，我们是允许出现在 url 中的，不希望被 encode
 *  params={foo: '@:$, '} ==> ?foo=@:$+  我们会把空格转换成 +
 *  对于值为 null 或者 undefined 的属性，我们是不会添加到 url 参数中的
 *  params={foo: 'bar',baz: null} ==> ?foo=bar
 *  丢弃 url 中的哈希标记,保留 url 中已存在的参数
 */
export function buildUrl(url: string, params?: any): string {
  if (!hasParams(params)) {
    return url
  }

  // const resultParams:string[]

  console.log('obj.keys', Object.keys(params))

  Object.keys(params).forEach(key => {
    let value = params[key]

    // 如果value是 undefined 或者 null 就直接跳过不处理
    if (value === null || value === undefined) {
      return
    }

    let values: string[]

    // 如果是Object，就直接JSON.stringfiy
    // 如果是Date,需要用toISOString转换
    // 剩余就直接用encode去转化key 和 value 储存 到parts

    if (Array.isArray(value)) {
      values = value
    } else {
      values = [value]
    }
  })
  return url
}

const obj = {
  url: `/a/b`,
  params: {
    foo: ['bar', 'baz'],
    date: new Date(),
    a: 1,
    up: '@:$, ',
    baz: null
  }
}

buildUrl(obj.url, obj.params)
