import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extendAixos } from './helpers/util'

function createInstance(): AxiosInstance {
  const _this = new Axios()
  console.log('_this', _this)
  const instance = Axios.prototype.request.bind(_this)
  extendAixos(instance, _this)
  return instance as AxiosInstance
}

const index = createInstance()
export default index
