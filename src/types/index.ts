export type Methods =
  | 'get'
  | 'GET'
  | 'delete'
  | 'Delete'
  | 'head'
  | 'Head'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'options'
  | ' OPTIONS'

export interface AxiosRequestConfig {
  url: string
  method?: Methods
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType // responseType 的类型是一个 XMLHttpRequestResponseType 类型，它的定义是 "" | "arraybuffer" | "blob" | "document" | "json" | "text" 字符串字面量类型。
  timeout?: number
}

export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

export interface AxiosPromise extends Promise<AxiosResponse> {}
