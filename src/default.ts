import { AxiosRequestConfig } from './types'

const defaults: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  }
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
