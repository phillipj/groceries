import fs from 'fs'
import React from 'react'

import store from '../../universal/stores/groceryStore'
import App from '../../universal/components/App'

import scriptManifest from '../../public/js/manifest'

const AppComponent = React.createFactory(App)

const isProd = process.env.NODE_ENV === 'production'

function respondToReq (res, err, buffer) {
  if (err) {
    console.error(err)
    res.statusCode = 500
    return res.end('Something went horribly wrong :/')
  }

  const markup = buffer.toString()
  const rendered = React.renderToString(AppComponent())
  const bundlePath = isProd ?
                      scriptManifest['js/bundle.js'] :
                      'http://localhost:8090/bundle.js'

  const content = markup.replace('REACTIFY', rendered)
                  .replace('BUNDLE_PATH', bundlePath)
                  .replace('STATE', store.hydrate())

  res.writeHead(200, {'Content-Type': 'text/html'})
  res.end(content)
}

export default function indexRoute (req, res) {
  fs.readFile('public/index.html', (err, buffer) => respondToReq(res, err, buffer))
}
