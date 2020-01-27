import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extendAixos } from './helpers/util'

function createInstance(): AxiosInstance {
  const _this = new Axios()
  console.log('_this', _this)
  const instance = Axios.prototype.request
  extendAixos(instance, _this)
  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
