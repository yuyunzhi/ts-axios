import { isCommonObject } from './util'

export function processHeaders(headers: any, data: any): any {
  // 需要根据对headers的key Content-Type 做统大驼峰写处理
  headers = caseWriteHandle(headers, 'Content-Type')
  // 根据data的类型设置默认的headers Content-Type
  if (isCommonObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

/**
 * 根据对headers的key做统一大写处理
 * @param headers
 * @param headerName
 */
function caseWriteHandle(headers: any, headerName: string): any {
  if (JSON.stringify(headers) === '{}' || !headers) {
    return headers
  }

  Object.keys(headers).forEach(key => {
    // 判断是不是content type
    if (key.toLowerCase() === headerName.toLowerCase()) {
      headers[headerName] = headers[key]
      delete headers[key]
    }
  })

  return headers
}

// date: Fri, 05 Apr 2019 12:40:49 GMT
// etag: W/"d-Ssxx4FRxEutDLwo2+xkkxKc4y0k"
// connection: keep-alive
// x-powered-by: Express
// content-length: 13
// content-type: application/json; charset=utf-8

// ------> 转化为

// {
//   date: 'Fri, 05 Apr 2019 12:40:49 GMT'
//   etag: 'W/"d-Ssxx4FRxEutDLwo2+xkkxKc4y0k"',
//     connection: 'keep-alive',
//   'x-powered-by': 'Express',
//   'content-length': '13'
//   'content-type': 'application/json; charset=utf-8'
// }

export function parseStringTypeHeaders(headers: string): any {
  // 创建一个没有原型的对象{}
  let parsed = Object.create(null)

  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach(item => {
    let [key, value] = item.split(':')
    if (!key) {
      return
    }
    key = key.toLowerCase().trim()
    if (value) {
      value = value.trim()
    }
    parsed[key] = value
  })

  return parsed
}
