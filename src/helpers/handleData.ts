import { isCommonObject } from './util'

/**
 * 对请求体data进行字符串序列化
 * @param data
 */
export function transformRequest(data: any): any {
  return isCommonObject(data) ? JSON.stringify(data) : data
}

/**
 * 如果data里是对象并且可以解析，那么就解析为对象
 * @param data
 */
export function transformResponseData(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do nothing
    }
  }
  return data
}
