import { AxiosRequestConfg } from './types'

export default function xhr(config: AxiosRequestConfg) {
  // TODO
  let { data = null, url, method = 'get', params } = config

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  request.send(data)
}
