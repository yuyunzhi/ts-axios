import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildUrl } from '../helpers/handleUrl'
import { flattenHeaders, processHeaders } from '../helpers/hanldeHeader'
import transform from './transform'

export default function dispatchRequest<T>(config: AxiosRequestConfig): AxiosPromise<T> {
  // 对config的header url data 做处理
  config = processAxiosConfig(config)
  // 处理后数据用xhr发送请求
  return xhr(config).then((res: AxiosResponse) => {
    // 对响应的结果，走一遍transformResponse 处理data
    res.data = transform(res.data, res.headers, res.config.transformResponse)
    return res
  })
}

function processAxiosConfig(config: AxiosRequestConfig): AxiosRequestConfig {
  config.url = transformUrl(config)
  // 注意先headers后data
  // transformRequestHeaders 需要根据传入的data类型做判断来处理headers
  // 而transformRequestData 会直接把data 转成JSON.stringfiy 或其他类型
  config.headers = transformRequestHeaders(config)
  // 对 transformRequest 里的data header处理一遍，并且在默认的transfromRequest 对 data stringfiy
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)

  return config
}

function transformRequestHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url!, params)
}
