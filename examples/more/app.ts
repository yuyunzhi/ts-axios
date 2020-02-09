import axios from '../../src/index'

// document.cookie = 'a=b'
//
// axios.get('/more/get').then(res => {
//   console.log('false---------',res)
// })
//
// axios.post('http://127.0.0.1:8088/more/server2', { }, {
//   withCredentials: true
// }).then(res => {
//   console.log('true-------',res)
// })

const instance = axios.create({
  xsrfCookieName: 'XSRF-TOKEN-D',
  xsrfHeaderName: 'X-XSRF-TOKEN-D'
})

instance.get('/more/get').then(res => {
  console.log('res get',res)
})

const instance2 = axios.create({
  xsrfCookieName: 'XSRF-TOKEN-D',
  xsrfHeaderName: 'X-XSRF-TOKEN-D'
})
setTimeout(()=>{
  instance2.get('/more/post').then(res => {
    console.log('res post',res)
  })

},5000)

