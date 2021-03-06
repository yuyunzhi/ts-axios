const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')
const multipart = require('connect-multiparty')
const path = require('path')

require('./server2')
const app = express()
const compiler = webpack(WebpackConfig)

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))
app.use(multipart({
  uploadDir: path.resolve(__dirname, 'upload-file')
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(express.static(__dirname, {
  setHeaders (res) {
    console.log('6666666')
    res.cookie('XSRF-TOKEN-D', '1234abc')
  }
}))

const router = express.Router()

router.get('/simple/get', function(req, res) {
  res.json({
    msg: `hello world`
  })
})

router.get('/base/get', function(req, res) {
  res.json(req.query)
})

router.post('/base/post', function(req, res) {
  res.json(req.body)
})

router.post('/base/buffer', function(req, res) {
  let msg = []
  req.on('data', (chunk) => {
    if (chunk) {
      msg.push(chunk)
    }
  })
  req.on('end', () => {
    let buf = Buffer.concat(msg)
    res.json(buf.toJSON())
  })
})

router.get('/error/get', function(req, res) {
  if (Math.random() > 0.5) {
    res.json({
      msg: `hello world`
    })
  } else {
    res.status(500)
    res.end()
  }
})

router.get('/error/timeout', function(req, res) {
  setTimeout(() => {
    res.json({
      msg: `hello world`
    })
  }, 3000)
})

router.get('/extend/get', function(req, res) {
    res.json({
      msg: `get`
    })
})

router.options('/extend/options', function(req, res) {
  res.json({
    msg: `options`
  })
})

router.delete('/extend/delete', function(req, res) {
  res.json({
    msg: `delete`
  })
})


router.post('/extend/post', function(req, res) {
    res.json({
      msg: `post`
    })
})

router.put('/extend/put', function(req, res) {
  res.json({
    msg: `put`
  })
})

router.patch('/extend/patch', function(req, res) {
  res.json({
    msg: `patch`
  })
})


router.get('/extend/user', function(req, res) {
  res.json({
    code: 0,
    message: 'ok',
    result: {
      name: 'jack',
      age: 18
    }
  })
})

router.get('/interceptor/get', function(req, res) {
  res.end('hello')
})


router.post('/config/post', function(req, res) {
  res.json({
    msg: `post`
  })
})

router.get('/more/get', function(req, res) {
  console.log('6666666')
  res.cookie("XSRF-TOKEN-D",'1234abc');
  res.json(req.cookies)
})


router.get('/more/post', function(req, res) {
  console.log('7777')
  res.cookie("XSRF-TOKEN-D",'1234abc');
  res.json(req.cookies)
})



router.post('/more/upload', function(req, res) {
  console.log(req.body, req.files)
  res.end('upload success!')
})

app.use(router)

const port = process.env.PORT || 8085
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})

