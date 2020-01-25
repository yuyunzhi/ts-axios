import { isCommonObject, isDate } from './util'

// const obj = {
//   url: `/a/b`,
//   params: {
//     foo: ['bar', 'baz'],
//     date: new Date(),
//     a: 1,
//     up: '@:$, ',
//     baz: null
//   }
// }
//
// buildUrl(obj.url, obj.params)

/**
 * @param url
 * @param
 * @return：
 *  处理的参数拼接结果
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

  // 用于存入每个部分的参数
  let partParams: string[] = []

  console.log('obj.keys', Object.keys(params))

  Object.keys(params).forEach(key => {
    let value = params[key]

    // 如果value是 undefined 或者 null 就直接跳过不处理
    if (value === null || value === undefined) {
      return
    }

    // 初始化一个字符串数组，方便遍历处理
    let values: string[] = []
    if (Array.isArray(value)) {
      values = value
      // {foo: ['bar', 'baz']}==> foo[]=bar&foo[]=baz
      key = key + '[]'
    } else {
      values = [value]
    }

    // 如果类型是Object，就直接JSON.stringify
    // 如果类型是Date,需要用toISOString转换
    // 剩余就直接用encode去转化key 和 value 储存 到parts
    values.forEach(item => {
      if (isDate(item)) {
        item = new Date(item).toISOString()
      } else if (isCommonObject(item)) {
        // 这里只判断普通对象 {}
        item = JSON.stringify(item)
      }
      partParams.push(`${encode(key)}=${encode(item)}`)
    })

    let serializedParams: string = partParams.join('&')

    if (serializedParams) {
      url = serializedUrl(url, serializedParams)
    }
  })
  console.log('完整URL是啥：', url)
  return url
}

/**
 * 把URL 和 参数拼接一起，并且去掉'#后面的参数' 判断是否有'？'
 * @param url
 * @param params
 */
function serializedUrl(url: string, params: string): string {
  let index: number = params.indexOf('#')
  if (index >= 0) {
    url = url.slice(0, index)
  }
  url = url + (url.indexOf('?') > 0 ? '&' : '?') + params
  return url
}

/**
 * 判断用户是否传入了合法的params对象
 * @param params
 */
function hasParams(params: any): boolean {
  if (JSON.stringify(params) === '{}') {
    return false
  } else if (params === undefined || params === null) {
    return false
  } else {
    return true
  }
}

/**
 *
 * @param val
 */
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
