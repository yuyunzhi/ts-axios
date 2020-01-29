import dispatchRequest from './dispatchRequest'
import {
  AxiosRequestConfig,
  AxiosPromise,
  requestMethods,
  AxiosResponse,
  ResolveFn,
  RejectFn
} from '../types'
import InterceptorManager from './interceptorManager'

interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain {
  resolved: ResolveFn
  rejected?: RejectFn
}

export default class Axios {
  interceptors: Interceptors
  defaults: AxiosRequestConfig

  constructor(config: AxiosRequestConfig) {
    this.defaults = config
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }

  request<T>(url: any, config?: any): AxiosPromise<T> {
    if (typeof url === 'string') {
      // 走的是第二个重载函数
      Object.assign(config || {}, { url })
    } else {
      // 走的是第一个重载函数
      config = url
    }

    const promiseChain: Array<PromiseChain> = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]

    this.interceptors.request.forEach(interceptor => {
      promiseChain.unshift(interceptor)
    })

    this.interceptors.response.forEach(interceptor => {
      promiseChain.push(interceptor)
    })

    let promise = Promise.resolve(config)

    while (promiseChain.length) {
      const { resolved, rejected } = promiseChain.shift()!
      promise = promise.then(resolved, rejected)
    }

    return promise
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
