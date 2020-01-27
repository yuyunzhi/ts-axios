import dispatchRequest from './dispatchRequest'
import { AxiosRequestConfig, AxiosPromise, requestMethods } from '../types'

export default class Axios {
  request<T>(url: any, config?: any): AxiosPromise<T> {
    if (typeof url === 'string') {
      // 走的是第二个重载函数
      Object.assign(config || {}, { url })
    } else {
      // 走的是第一个重载函数
      config = url
    }
    return dispatchRequest(config)
  }

  get<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this.sendRequestWidthoutData(url, 'get', config)
  }

  delete<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this.sendRequestWidthoutData(url, 'delete', config)
  }

  head<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this.sendRequestWidthoutData(url, 'head', config)
  }

  options<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this.sendRequestWidthoutData(url, 'options', config)
  }

  post<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this.sendRequestWidthData(url, 'post', data, config)
  }

  put<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this.sendRequestWidthData(url, 'put', data, config)
  }

  patch<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
    return this.sendRequestWidthData<T>(url, 'patch', data, config)
  }

  sendRequestWidthData<T>(
    url: string,
    method: requestMethods,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return this.request<T>(Object.assign(config || {}, { url, method, data }))
  }

  sendRequestWidthoutData<T>(
    url: string,
    method: requestMethods,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return this.request<T>(Object.assign(config || {}, { url, method }))
  }
}
