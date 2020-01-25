import { isCommonObject } from './util'

/**
 * 对请求体data进行字符串序列化
 * @param data
 */
export function transformRequest(data: any): any {
  return isCommonObject(data) ? JSON.stringify(data) : data
}
