import axios from '../../src/axios'

axios({
  method:'get',
  url: '/simple/get',
  params: {
    a: 1,
    b: 2
  }
})
