import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from './types'
import { parseStringTypeHeaders } from './helpers/hanldeHeader'
import { transformResponseData } from './helpers/handleData'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    let { data = null, url, method = 'get', headers, responseType, timeout } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    if (timeout) {
      request.timeout = timeout
    }

    request.open(method.toUpperCase(), url, true)

    // 服务端或者网络超时错误，由前端自己设定
    request.ontimeout = function handleTimeout() {
      reject(new Error(`Timeout of ${timeout} ms exceeded / 网络超时超过 ${timeout} ms`))
    }

    // 网络不好的错误
    request.onerror = function handleError() {
      reject(new Error('Network Error / 网络错误'))
    }

    request.onreadystatechange = function handleResponse() {
      if (request.readyState !== 4 || request.status === 0) {
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

      if (request.status >= 200 && request.status < 300) {
        resolve(response)
      } else {
        // 401,404……500……
        reject(
          new Error(
            `Request failed with status code ${response.status} / 请求失败状态码${response.status} `
          )
        )
      }
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
