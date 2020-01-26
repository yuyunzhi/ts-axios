import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig) {
  // TODO
  let { data = null, url, method = 'get', headers } = config

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  // 如果data不存在那么不需要设置content-type,故删之
  const hasData = JSON.stringify(data) !== '{}' && data
  Object.keys(headers).forEach(key => {
    if (!hasData && key.toLowerCase() === 'content-type') {
      delete headers[key]
    } else {
      request.setRequestHeader(key, headers[key])
    }
  })

  request.send(data)
}
