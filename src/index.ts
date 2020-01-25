import { AxiosRequestConfg } from './types'
import xhr from './xhr'
import { buildUrl } from './helpers/url'

function axios(config: AxiosRequestConfg) {
  // TODO
  config = processAxiosConfig(config)
  xhr(config)
}

function processAxiosConfig(config: AxiosRequestConfg): AxiosRequestConfg {
  config.url = transformUrl(config)
  return config
}

function transformUrl(config: AxiosRequestConfg): string {
  const { url, params } = config
  return buildUrl(url, params)
}

export default axios
