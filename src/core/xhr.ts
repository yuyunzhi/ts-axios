import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from '../types'
import { parseStringTypeHeaders } from '../helpers/hanldeHeader'
import { transformResponseData } from '../helpers/handleData'
import { createAxiosError } from '../helpers/handleError'
import { isURLSameOrigin } from '../helpers/handleUrl'
import cookie from '../helpers/handleCookie'
import { isFormData } from '../helpers/util'

export default function xhr<T>(config: AxiosRequestConfig): AxiosPromise<T> {
  return new Promise((resolve, reject) => {
    let {
      data = null,
      url,
      method = 'get',
      responseType,
      timeout,
      withCredentials,
      xsrfHeaderName,
      xsrfCookieName,
      headers,
      onDownloadProgress,
      onUploadProgress
    } = config

    const request = new XMLHttpRequest()

    request.open(method.toUpperCase(), url!, true)

    configRequest()

    addEvents()

    processHeaders()

    request.send(data)

    function configRequest(): void {
      if (responseType) {
        request.responseType = responseType
      }

      if (timeout) {
        request.timeout = timeout
      }

      if (withCredentials) {
        request.withCredentials = withCredentials
      }
    }

    function addEvents(): void {
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

      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }

      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }
    }

    function processHeaders(): void {
      // 当我们通过 FormData 上传文件的时候，浏览器会把请求 headers 中的 Content-Type 设置为 multipart/form-data
      if (isFormData(data)) {
        delete headers['Content-Type']
      }

      // 通过request.setRequestHeader设置每一个header
      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName)
        if (xsrfValue) {
          headers[xsrfHeaderName!] = xsrfValue
        }
      }

      Object.keys(headers).forEach(key => {
        // data不存在就不需要设置content-type
        if (key.toLowerCase() === 'content-type') {
          delete headers[key]
        } else {
          request.setRequestHeader(key, headers[key])
        }
      })
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
