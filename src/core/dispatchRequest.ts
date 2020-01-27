import { AxiosRequestConfig, AxiosPromise } from '../types'
import xhr from './xhr'
import { buildUrl } from '../helpers/handleUrl'
import { transformRequest } from '../helpers/handleData'
import { processHeaders } from '../helpers/hanldeHeader'

export default function dispatchRequest<T>(config: AxiosRequestConfig): AxiosPromise<T> {
  // 对config的header url data 做处理
  config = processAxiosConfig(config)
  // 处理后数据用xhr发送请求
  return xhr(config)
}

function processAxiosConfig(config: AxiosRequestConfig): AxiosRequestConfig {
  config.url = transformUrl(config)
  // 注意先headers后data
  // transformRequestHeaders 需要根据传入的data类型做判断来处理headers
  // 而transformRequestData 会直接把data 转成JSON.stringfiy 或其他类型
  config.headers = transformRequestHeaders(config)
  config.data = transformRequestData(config)

  return config
}

function transformRequestHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url!, params)
}
