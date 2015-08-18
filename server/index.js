import http from 'http'
import url from 'url'

import _index from './routes/index'
import _script from './routes/script'
import _api from './routes/api'

const routes = {
  index: _index,
  script: _script,
  api: _api
}

const SECOND = 1000

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url)

  res.setTimeout(5 * SECOND)

  console.log(new Date().toISOString(), 'incoming request', req.url)

  if (reqUrl.pathname === '/') {
    routes.index(req, res)
  } else if (reqUrl.pathname.indexOf('/api') === 0) {
    routes.api(req, res)
  } else if (reqUrl.pathname.indexOf('/js') === 0) {
    routes.script(req, res)
  } else {
    res.statusCode = 404
    res.end('not found')
  }
})

server.timeout = 5 * SECOND

export default server
