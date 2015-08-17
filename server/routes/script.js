import fs from 'fs'
import zlib from 'zlib'

export default function scriptRoute (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/javascript',
    'Cache-Control': 'public, max-age=31536000',
    'Content-Encoding': 'gzip'
  })

  fs.createReadStream('./public/' + req.url)
    .pipe(zlib.createGzip())
    .pipe(res)
}
