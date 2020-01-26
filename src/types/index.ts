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
}

export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}
