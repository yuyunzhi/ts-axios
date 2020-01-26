import { AxiosRequestConfg } from './types'

export default function xhr(config: AxiosRequestConfg) {
  // TODO
  let { data = null, url, method = 'get', headers } = config

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)
  console.log('headers', headers)
  Object.keys(headers).forEach(key => {
    const hasData = JSON.stringify(data) !== '{}' && data
    if (!hasData && key.toLowerCase() === 'content-type') {
      delete headers[key]
    } else {
      request.setRequestHeader(key, headers[key])
    }
  })
  request.send(data)
}
