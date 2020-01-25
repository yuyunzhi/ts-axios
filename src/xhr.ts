import { AxiosRequestConfg } from './types'
import { buildUrl } from './helpers/url'

export default function xhr(config: AxiosRequestConfg) {
  // TODO
  let { data = null, url, method = 'get', params } = config

  url = buildUrl(url, params)

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  request.send(data)
}
