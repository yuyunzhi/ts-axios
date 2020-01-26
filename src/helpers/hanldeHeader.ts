import { isCommonObject } from './util'

export function processHeaders(headers: any, data: any): any {
  // 需要根据对headers的key Content-Type 做统大驼峰写处理
  headers = caseWriteHandle(headers, 'Content-Type')
  console.log('hhhhhhh', headers, data, Object.prototype.toString.call(data))
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
