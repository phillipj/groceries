require('babel/register');

const fs = require('fs');
const http = require('http');
const url = require('url');

const port = process.env.PORT || 3000;

const routes = {
	index: require('./routes/index'),
	script: require('./routes/script'),
	api: require('./routes/api')
};

http.createServer(function onRequest(req, res) {
	const reqUrl = url.parse(req.url);

	if (reqUrl.pathname == '/') {
		routes.index(req, res);
	} else if (reqUrl.pathname.indexOf('/api') == 0) {
		routes.api(req, res);
	} else if (reqUrl.pathname.indexOf('/js') == 0) {
		routes.script(req, res);
	} else {
		res.statusCode = 404;
		res.end('not found');
	}
}).listen(port, function onListening() {
	console.log('Server listening on port %s, pid %s', port, process.pid);
});

