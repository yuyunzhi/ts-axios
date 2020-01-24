import { AxiosRequestConfg } from './types'

export default function xhr(config: AxiosRequestConfg) {
  // TODO
  const { data = null, url, method = 'get' } = config

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  request.send(data)
}
