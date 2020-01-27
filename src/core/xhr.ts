import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from '../types'
import { parseStringTypeHeaders } from '../helpers/hanldeHeader'
import { transformResponseData } from '../helpers/handleData'
import { createAxiosError } from '../helpers/handleError'

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

    request.open(method.toUpperCase(), url!, true)

    // 通过request.setRequestHeader设置每一个header
    setAxiosHeaders(config, request)

    request.onreadystatechange = function handleResponse() {
      if (request.readyState !== 4 || request.status === 0) {
        // 说明没有触发结果
        return
      }

      const response = getResponseAllData(config, request)

      if (request.status >= 200 && request.status < 300) {
        resolve(response)
      } else {
        // 401,404……500……
        // message,config,response,request,code
        reject(
          createAxiosError(
            `请求失败状态码:${response.status}`,
            config,
            response,
            request,
            response.status
          )
        )
      }
    }

    // 服务端或者网络超时错误，由前端自己设定timeout大小
    request.ontimeout = function handleTimeout() {
      // message,config,response,request,code
      reject(createAxiosError(` 网络超时超过 ${timeout} ms`, config, null, request, null))
    }

    // 网络不好的错误
    request.onerror = function handleError() {
      // message,config,response,request,code
      reject(createAxiosError(`网络错误`, config, null, request, null))
    }

    request.send(data)
  })
}

/**
 * 设置header，如果header不存在就不处理
 * @param config
 * @param request
 */
function setAxiosHeaders(config: AxiosRequestConfig, request: XMLHttpRequest): void {
  let { data = null, headers } = config
  const hasData = JSON.stringify(data) !== '{}' && data
  Object.keys(headers).forEach(key => {
    // data不存在就不需要设置content-type
    if (!hasData && key.toLowerCase() === 'content-type') {
      delete headers[key]
    } else {
      request.setRequestHeader(key, headers[key])
    }
  })
}
/**
 * 拿到所有需要返回的数据，并组装成对象的格式
 * @param config
 * @param request
 */
function getResponseAllData(config: AxiosRequestConfig, request: XMLHttpRequest): AxiosResponse {
  const { responseType } = config
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
  return response
}
