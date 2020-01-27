import dispatchRequest from './dispatchRequest'
import { AxiosRequestConfig, AxiosPromise, requestMethods } from '../types'

export default class Axios {
  request(config: AxiosRequestConfig): AxiosPromise {
    return dispatchRequest(config)
  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.sendRequestWidthoutData(url, 'get', config)
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.sendRequestWidthoutData(url, 'delete', config)
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.sendRequestWidthoutData(url, 'head', config)
  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.sendRequestWidthoutData(url, 'options', config)
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this.sendRequestWidthData(url, 'post', data, config)
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this.sendRequestWidthData(url, 'put', data, config)
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this.sendRequestWidthData(url, 'patch', data, config)
  }

  sendRequestWidthData(
    url: string,
    method: requestMethods,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    return dispatchRequest(Object.assign(config || {}, { url, method, data }))
  }

  sendRequestWidthoutData(
    url: string,
    method: requestMethods,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    return dispatchRequest(Object.assign(config || {}, { url, method }))
  }
}
