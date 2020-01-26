import { AxiosRequestConfig, AxiosResponse } from '../types'

class AxiosError extends Error {
  isError: boolean
  config: AxiosRequestConfig
  code?: number | null
  request?: any
  response?: AxiosResponse

  constructor(
    message: string,
    config: AxiosRequestConfig,
    response?: AxiosResponse,
    request?: any,
    code?: number | null
  ) {
    super(message)
    this.config = config
    this.isError = true
    this.code = code
    this.response = response
    this.request = request
    // 解决TypeScript的bug
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

export function createAxiosError(
  message: string,
  config: AxiosRequestConfig,
  response?: any,
  request?: any,
  code?: number | null
) {
  return new AxiosError(message, config, response, request, code)
}
