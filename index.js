'use strict'

// This small file bootstraps babel for ES2015 trickeries
// and .jsx compilation for the server

require('babel/register')

const server = require('./server')
const port = process.env.PORT || 3000

server.listen(port, function () {
  console.log('Server listening on port %s, pid %s', port, process.pid)
})