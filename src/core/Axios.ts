import dispatchRequest from './dispatchRequest'
import { AxiosRequestConfig, AxiosPromise, requestMethods } from '../types'

export default class Axios {
  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      // 走的是第二个重载函数
      Object.assign(config || {}, { url })
    } else {
      // 走的是第一个重载函数
      config = url
    }
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
    return this.request(Object.assign(config || {}, { url, method, data }))
  }

  sendRequestWidthoutData(
    url: string,
    method: requestMethods,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    return this.request(Object.assign(config || {}, { url, method }))
  }
}
