import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from './types'
import { parseStringTypeHeaders } from './helpers/hanldeHeader'
import { transformResponseData } from './helpers/handleData'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise(resolve => {
    let { data = null, url, method = 'get', headers, responseType } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    request.open(method.toUpperCase(), url, true)

    request.onreadystatechange = function handleResponse() {
      if (request.readyState !== 4) {
        // 说明没有触发结果
        return
      }

      const responseHeaders = request.getAllResponseHeaders()
      const responseData =
        responseType && responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: transformResponseData(responseData),
        status: request.status,
        statusText: request.statusText,
        headers: parseStringTypeHeaders(responseHeaders),
        config,
        request
      }
      resolve(response)
    }

    // 如果data不存在那么不需要设置content-type,故删之
    // 否则通过setRequestHeader 设置每一个header
    const hasData = JSON.stringify(data) !== '{}' && data
    Object.keys(headers).forEach(key => {
      if (!hasData && key.toLowerCase() === 'content-type') {
        delete headers[key]
      } else {
        request.setRequestHeader(key, headers[key])
      }
    })

    request.send(data)
  })
}
