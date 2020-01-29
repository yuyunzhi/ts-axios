import { AxiosInstance, AxiosRequestConfig } from './types'
import Axios from './core/Axios'
import { extendAixos } from './helpers/util'
import defaults from './default'

function createInstance(config: AxiosRequestConfig): AxiosInstance {
  const _this = new Axios(config)
  console.log('_this', _this)
  const instance = Axios.prototype.request.bind(_this)
  extendAixos(instance, _this)
  return instance as AxiosInstance
}

const axios = createInstance(defaults)

export default axios
