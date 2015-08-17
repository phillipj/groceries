import actions from '../../universal/actions/groceryActions'

function jsonParseBody (req, cb) {
  let data = ''
  req.on('data', (chunk) => data += chunk)
  req.on('end', () => cb(JSON.parse(data)))
}

export default function apiRoutes (req, res) {
  jsonParseBody(req, (payload) => {

    if (req.url.indexOf('/add') > -1) {
      actions.add(payload.content)
    } else if (req.url.indexOf('/toggleDone') > -1) {
      actions.toggleDone(payload.content)
    }

    res.end('yii')
  })
}
