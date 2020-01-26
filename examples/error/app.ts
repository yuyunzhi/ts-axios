import axios from '../../src/index'

axios({
  method: 'get',
  url: '/error/get1'
}).then((res) => {
  console.log('第一个用例then',res)
}).catch((e) => {
  console.log('第一个用例catch',e)
})

axios({
  method: 'get',
  url: '/error/get'
}).then((res) => {
  console.log('第2个用例then',res)
}).catch((e) => {
  console.log('第2个用例catch',e)
})

axios({
  method: 'get',
  url: '/error/get'
}).then((res) => {
  console.log('第3个用例then',res)
}).catch((e) => {
  console.log('第3个用例catch',e)
})

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then((res) => {
  console.log('第4个用例then+timeout2000',res)
}).catch((e) => {
  console.log('第4个用例catch+message',e.message)
  console.log('第4个用例catch+response',e.response)
  console.log('第4个用例catch+request',e.request)
  console.log('第4个用例catch+code',e.code)
  console.log('第4个用例catch+config',e.config)
})
