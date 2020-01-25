import { AxiosRequestConfg } from './types'
import xhr from './xhr'
import { buildUrl } from './helpers/handleUrl'
import { transformRequest } from './helpers/handleData'

function axios(config: AxiosRequestConfg) {
  // TODO
  config = processAxiosConfig(config)
  xhr(config)
}

function processAxiosConfig(config: AxiosRequestConfg): AxiosRequestConfg {
  config.url = transformUrl(config)
  if (config.data) {
    config.data = transformRequestData(config)
  }
  return config
}

function transformRequestData(config: AxiosRequestConfg): any {
  return transformRequest(config.data)
}

function transformUrl(config: AxiosRequestConfg): string {
  const { url, params } = config
  return buildUrl(url, params)
}

export default axios
