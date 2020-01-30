import { AxiosInstance, AxiosRequestConfig, AxiosStatic } from './types'
import Axios from './core/Axios'
import { extendAixos } from './helpers/util'
import defaults from './default'
import mergeConfig from './core/mergeConfig'

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const _this = new Axios(config)
  console.log('_this', _this)
  const instance = Axios.prototype.request.bind(_this)
  extendAixos(instance, _this)
  return instance as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = function create(config: AxiosRequestConfig) {
  return createInstance(mergeConfig(defaults, config))
}

export default axios
