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

export interface AxiosRequestConfg {
  url: string
  method?: Methods
  data?: any
  params?: any
  headers?: any
}
