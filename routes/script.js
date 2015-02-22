const fs = require('fs');
const zlib = require('zlib');

const scriptManifest = require('../public/js/manifest');

const isProd = process.env.NODE_ENV == 'production';

module.exports = function scriptRoute(req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/javascript',
		'Cache-Control': 'public, max-age=31536000',
		'Content-Encoding': 'gzip'
	});

	fs.createReadStream('./public/' + req.url)
		.pipe(zlib.createGzip())
		.pipe(res);
};