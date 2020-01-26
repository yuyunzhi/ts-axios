import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { buildUrl } from './helpers/handleUrl'
import { transformRequest } from './helpers/handleData'
import { processHeaders } from './helpers/hanldeHeader'

function axios(config: AxiosRequestConfig) {
  // 对config的header url data 做处理
  config = processAxiosConfig(config)
  // 处理后数据用xhr发送请求
  xhr(config)
}

function processAxiosConfig(config: AxiosRequestConfig): AxiosRequestConfig {
  config.url = transformUrl(config)
  config.data = transformRequestData(config)
  config.headers = transformRequestHeaders(config)
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
  return buildUrl(url, params)
}

export default axios
