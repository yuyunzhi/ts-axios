import { AxiosRequestConfig } from './types'
import { processHeaders } from './helpers/hanldeHeader'
import { transformRequest, transformResponseData } from './helpers/handleData'

const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  transformRequest: [
    function(data: any, headers: any): any {
      processHeaders(headers, data)
      return transformRequest(data)
    }
  ],
  transformResponse: [
    function(data: any): any {
      return transformResponseData(data)
    }
  ]
}

const methodsWidthoutData = ['delete', 'get', 'head', 'options']

methodsWidthoutData.forEach(m => {
  defaults.headers[m] = {}
})

const methodsWithData = ['post', 'put', 'patch']

methodsWithData.forEach(m => {
  defaults.headers[m] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
