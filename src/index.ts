import { AxiosRequestConfg } from './types'
import xhr from './xhr'
import { buildUrl } from './helpers/handleUrl'
import { transformRequest } from './helpers/handleData'
import { processHeaders } from './helpers/hanldeHeader'

function axios(config: AxiosRequestConfg) {
  // 对config的header url data 做处理
  config = processAxiosConfig(config)
  // 处理后数据用xhr发送请求
  xhr(config)
}

function processAxiosConfig(config: AxiosRequestConfg): AxiosRequestConfg {
  config.url = transformUrl(config)
  config.data = transformRequestData(config)
  config.headers = transformRequestHeaders(config)
  return config
}

function transformRequestHeaders(config: AxiosRequestConfg): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformRequestData(config: AxiosRequestConfg): any {
  return transformRequest(config.data)
}

function transformUrl(config: AxiosRequestConfg): string {
  const { url, params } = config
  return buildUrl(url, params)
}

export default axios
